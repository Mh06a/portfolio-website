import { html } from "../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../shared/presentation/components/empty-note/empty-note.js";

function renderGroup(group) {
    return html`
        <article class="skill-card">

            <span class="skill-number">${group.number} / SKILLS</span>

            <h3>${group.category}</h3>

            <div class="skill-tags">
                ${group.skills.map(skill => html`<span>${skill}</span>`)}
            </div>

        </article>
    `;
}

export function renderSkills(groups) {
    return html`
        <section class="section skills" id="skills">
            <div class="container">

                <span class="section-label">04 / TECHNOLOGIES & TOOLS</span>
                <h2 class="section-title">Skills</h2>

                ${groups.length === 0
                    ? renderEmptyNote("No skills have been added yet.")
                    : html`<div class="skills-grid">${groups.map(renderGroup)}</div>`}

            </div>
        </section>
    `;
}
