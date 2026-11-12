import { ValidationError } from "../../../core/errors/app.error.js";
import { chip } from "./components.js";

/** Reads a form into a plain object. `name[]` → array, checkbox → boolean, file → File | null. */
export function readFormValues(form) {
    const values = {};

    for (const element of form.elements) {
        const { name, type } = element;

        if (!name || element.disabled || element.tagName === "BUTTON") continue;

        if (name.endsWith("[]")) {
            const key = name.slice(0, -2);

            values[key] = [...(values[key] ?? []), element.value];
        } else if (type === "checkbox") {
            values[name] = element.checked;
        } else if (type === "radio") {
            if (element.checked) values[name] = element.value;
        } else if (type === "file") {
            values[name] = element.files[0] ?? null;
        } else {
            values[name] = element.value;
        }
    }

    return values;
}

function clearErrors(form) {
    form.querySelectorAll("[data-error-for]").forEach(element => {
        element.textContent = "";
    });
}

function showErrors(form, error, toast) {
    if (!(error instanceof ValidationError)) {
        console.error(error);
        toast(error?.message || "Something went wrong", "error");

        return;
    }

    const unplaced = [];

    for (const [key, message] of Object.entries(error.errors)) {
        const target = form.querySelector(`[data-error-for="${key}"]`);

        if (target) {
            target.textContent = message;
        } else {
            unplaced.push(message);
        }
    }

    if (unplaced.length > 0) {
        form.querySelector('[data-error-for="_form"]').textContent = unplaced.join(" · ");
    }

    form.querySelector(".field-error:not(:empty)")?.scrollIntoView({ block: "center", behavior: "smooth" });
}

/** Wires submit → `submit(values)` with busy state and validation-error display. */
export function bindForm(form, { submit, toast }) {
    form.addEventListener("submit", async event => {
        event.preventDefault();

        const button = form.querySelector('button[type="submit"]');

        clearErrors(form);
        button.disabled = true;

        try {
            await submit(readFormValues(form));
        } catch (error) {
            showErrors(form, error, toast);
        } finally {
            button.disabled = false;
        }
    });
}

/** Shows the picked file's name (and image preview) before it is saved. */
export function bindFilePreview(root) {
    root.querySelectorAll("[data-file-field]").forEach(field => {
        const input = field.querySelector('input[type="file"]');
        const nameElement = field.querySelector("[data-file-name]");
        const preview = field.querySelector("[data-file-preview]");

        input.addEventListener("change", () => {
            const file = input.files[0];

            nameElement.textContent = file ? `${file.name} (will be uploaded on save)` : nameElement.dataset.empty;

            if (file && file.type.startsWith("image/")) {
                preview.src = URL.createObjectURL(file);
                preview.hidden = false;
            }
        });
    });
}

/** Add/remove chips (subjects, technologies). Pressing Enter in the input adds the chip. */
export function bindChipPickers(root) {
    root.querySelectorAll("[data-chip-picker]").forEach(picker => {
        const name = picker.dataset.chipPicker;
        const list = picker.querySelector("[data-chip-list]");
        const input = picker.querySelector("[data-chip-input]");

        const exists = value =>
            [...list.querySelectorAll(`input[name="${name}[]"]`)]
                .some(hidden => hidden.value.toLowerCase() === value.toLowerCase());

        const add = () => {
            const value = input.value.trim();

            if (value && !exists(value)) {
                list.insertAdjacentHTML("beforeend", String(chip(name, value)));
            }

            input.value = "";
            input.focus();
        };

        picker.querySelector("[data-chip-add]").addEventListener("click", add);

        input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                add();
            }
        });

        list.addEventListener("click", event => {
            event.target.closest("[data-chip-remove]")?.closest("[data-chip]").remove();
        });
    });
}
