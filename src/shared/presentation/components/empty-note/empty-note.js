import { html } from "../../utils/html.util.js";

/** Shown inside a section when the database has nothing for it yet. */
export function renderEmptyNote(message) {
    return html`<p class="empty-note">${message}</p>`;
}
