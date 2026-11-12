import { html } from "../../../shared/presentation/utils/html.util.js";

/** Resolves true when the user confirms, false otherwise. */
export function confirmDialog({ title, message, confirmLabel = "Delete" }) {
    return new Promise(resolve => {
        const dialog = document.createElement("dialog");

        dialog.className = "confirm-dialog";
        dialog.innerHTML = String(html`
            <form method="dialog">
                <h2>${title}</h2>
                <p>${message}</p>
                <div class="form-actions">
                    <button value="confirm" class="btn btn-danger">${confirmLabel}</button>
                    <button value="cancel" class="btn btn-ghost">Cancel</button>
                </div>
            </form>
        `);

        dialog.addEventListener("close", () => {
            resolve(dialog.returnValue === "confirm");
            dialog.remove();
        });

        document.body.append(dialog);
        dialog.showModal();
    });
}
