import { html } from "../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../shared/presentation/components/empty-note/empty-note.js";

function renderItem(item) {
    return html`
        <article class="experience-item">

            <div class="experience-meta">
                <span class="experience-date">${item.dateLabel}</span>
                <p>${item.durationLabel}</p>
                ${item.location && html`<p>${item.location}</p>`}
            </div>

            <div class="experience-card">
                <span class="experience-type">${item.employmentType}</span>

                <h3>${item.company}</h3>
                <h4>${item.position}</h4>

                <ul>
                    ${item.points.map(point => html`<li>${point}</li>`)}
                </ul>
            </div>

        </article>
    `;
}

export function renderExperience(items) {
    return html`
        <section class="section experience" id="experience">
            <div class="container">

                <span class="section-label">03 / PROFESSIONAL JOURNEY</span>
                <h2 class="section-title">Experience</h2>

                ${items.length === 0
                    ? renderEmptyNote("No experience has been added yet.")
                    : html`<div class="experience-list">${items.map(renderItem)}</div>`}

            </div>
        </section>
    `;
}
