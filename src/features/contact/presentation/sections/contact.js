import { html } from "../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../shared/presentation/components/empty-note/empty-note.js";

function renderCard(item) {
    return html`
        <a
            href="${item.href}"
            class="contact-card"
            ${item.isExternal && html`target="_blank" rel="noopener noreferrer"`}
        >
            <div class="contact-card-top">
                <span>${item.label}</span>
                <span class="contact-arrow">↗</span>
            </div>

            <p>${item.value}</p>
        </a>
    `;
}

export function renderContact(items) {
    return html`
        <section class="section contact" id="contact">
            <div class="container">

                <span class="section-label">07 / START A CONVERSATION</span>

                <h2 class="section-title contact-title">Let's Connect</h2>

                <p class="contact-description">
                    Have an opportunity or a project in mind? Feel free to reach out.
                </p>

                ${items.length === 0
                    ? renderEmptyNote("No contact details have been added yet.")
                    : html`<div class="contact-grid">${items.map(renderCard)}</div>`}

            </div>
        </section>
    `;
}
