import { html } from "../../utils/html.util.js";

/** The editorial left rail of a section: outlined index, mono label, big title. */
export function renderSectionAside({ index, label, title, lede }) {
    return html`
        <header class="section-aside">
            <span class="section-index" aria-hidden="true">${index}</span>
            <span class="section-label">${label}</span>
            <h2 class="section-title">${title}</h2>
            ${lede && html`<p class="section-lede">${lede}</p>`}
        </header>
    `;
}
