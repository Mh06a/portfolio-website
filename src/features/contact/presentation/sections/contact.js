import { html } from "../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../shared/presentation/components/empty-note/empty-note.js";

function renderRow(item) {
    return html`
        <a
            href="${item.href}"
            class="contact-card"
            ${item.isExternal && html`target="_blank" rel="noopener noreferrer"`}
        >
            <span class="contact-label">${item.label}</span>
            <p>${item.value}</p>
            <span class="contact-arrow">↗</span>
        </a>
    `;
}

export function renderContact(items) {
    return html`
        <section class="section contact" id="contact">
            <div class="container">

                <span class="section-index" aria-hidden="true">07</span>
                <span class="section-label">Start a conversation</span>

                <h2 class="section-title contact-title">Let's<br>Connect</h2>

                <p class="contact-description">
                    Have an opportunity or a project in mind? Feel free to reach out.
                </p>

                ${items.length === 0
                    ? renderEmptyNote("No contact details have been added yet.")
                    : html`<div class="contact-list">${items.map(renderRow)}</div>`}

            </div>
        </section>
    `;
}
