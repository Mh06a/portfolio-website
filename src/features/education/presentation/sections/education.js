import { html } from "../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../shared/presentation/components/empty-note/empty-note.js";

function renderCard(education) {
    return html`
        <article class="education-card">

            <div class="education-head">
                <div class="education-logo">
                    ${education.logoUrl && html`
                        <img src="${education.logoUrl}" alt="${education.institution} logo" loading="lazy">
                    `}
                </div>

                <div>
                    <span class="education-date">${education.dateLabel}</span>
                    <p class="education-institution">${education.institution}</p>
                </div>
            </div>

            <h3>${education.title}</h3>

            <p class="education-period">
                ${education.period}${education.gpa !== null && html` · GPA ${education.gpa} / 5`}
            </p>

            ${education.paragraphs.length > 0 && html`
                <div class="education-description">
                    ${education.paragraphs.map(text => html`<p>${text}</p>`)}
                </div>
            `}

            ${education.subjects.length > 0 && html`
                <span class="education-skills-label">RELEVANT COURSEWORK</span>

                <div class="education-tags">
                    ${education.subjects.map(subject => html`<span>${subject}</span>`)}
                </div>
            `}

        </article>
    `;
}

export function renderEducation(items) {
    return html`
        <section class="section education" id="education">
            <div class="container">

                <span class="section-label">02 / ACADEMIC BACKGROUND</span>
                <h2 class="section-title">Education</h2>

                ${items.length === 0
                    ? renderEmptyNote("No education has been added yet.")
                    : html`<div class="education-grid">${items.map(renderCard)}</div>`}

            </div>
        </section>
    `;
}
