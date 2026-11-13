import { html } from "../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../shared/presentation/components/empty-note/empty-note.js";
import { renderSectionAside } from "../../../../shared/presentation/components/section-header/section-header.js";

function renderGroup(group) {
    return html`
        <article class="skill-card">

            <div class="skill-head">
                <span class="skill-number">${group.number}</span>
                <h3>${group.category}</h3>
            </div>

            <ul class="skill-tags">
                ${group.skills.map(skill => html`<li>${skill}</li>`)}
            </ul>

        </article>
    `;
}

export function renderSkills(groups) {
    return html`
        <section class="section skills" id="skills">
            <div class="container section-grid">

                ${renderSectionAside({ index: "04", label: "Technologies & tools", title: "Skills" })}

                <div class="section-main">
                    ${groups.length === 0
                        ? renderEmptyNote("No skills have been added yet.")
                        : html`<div class="skills-list">${groups.map(renderGroup)}</div>`}
                </div>

            </div>
        </section>
    `;
}
