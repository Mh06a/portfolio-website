import { html } from "../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../shared/presentation/components/empty-note/empty-note.js";
import { renderSectionAside } from "../../../../shared/presentation/components/section-header/section-header.js";

function renderCard(education) {
    return html`
        <article class="education-card">

            <div class="education-when">
                <span class="education-date">${education.dateLabel}</span>
                <p class="education-period">${education.period}</p>
            </div>

            <div class="education-what">
                <h3>${education.title}</h3>
                <p class="education-institution">${education.institution}</p>

                ${education.paragraphs.length > 0 && html`
                    <div class="education-description">
                        ${education.paragraphs.map(text => html`<p>${text}</p>`)}
                    </div>
                `}

                ${education.subjects.length > 0 && html`
                    <span class="education-skills-label">Relevant coursework</span>

                    <ul class="education-tags">
                        ${education.subjects.map(subject => html`<li>${subject}</li>`)}
                    </ul>
                `}
            </div>

            <div class="education-side">
                <div class="education-logo">
                    ${education.logoUrl && html`
                        <img src="${education.logoUrl}" alt="${education.institution} logo" loading="lazy">
                    `}
                </div>

                ${education.gpa !== null && html`
                    <span class="education-gpa">GPA ${education.gpa} / 5</span>
                `}
            </div>

        </article>
    `;
}

export function renderEducation(items) {
    return html`
        <section class="section education" id="education">
            <div class="container section-grid">

                ${renderSectionAside({ index: "02", label: "Academic background", title: "Education" })}

                <div class="section-main">
                    ${items.length === 0
                        ? renderEmptyNote("No education has been added yet.")
                        : html`<div class="education-list">${items.map(renderCard)}</div>`}
                </div>

            </div>
        </section>
    `;
}
