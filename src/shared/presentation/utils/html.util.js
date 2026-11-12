/**
 * Tiny safe-by-default HTML templating.
 *
 *   html`<p>${userText}</p>`      → userText is escaped
 *   html`<ul>${items.map(li)}</ul>` → nested html`` results are inserted as-is
 *
 * Data coming from the database can never inject markup through a view.
 */
class SafeHtml {
    constructor(value) {
        this.value = value;
    }

    toString() {
        return this.value;
    }
}

const ESCAPES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
};

export function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ESCAPES[char]);
}

function render(value) {
    if (value === null || value === undefined || value === false) {
        return "";
    }

    if (value instanceof SafeHtml) {
        return value.value;
    }

    if (Array.isArray(value)) {
        return value.map(render).join("");
    }

    return escapeHtml(value);
}

export function html(strings, ...values) {
    const result = strings.reduce(
        (output, chunk, index) =>
            output + chunk + (index < values.length ? render(values[index]) : ""),
        ""
    );

    return new SafeHtml(result);
}
