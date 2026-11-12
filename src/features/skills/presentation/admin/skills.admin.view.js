import { html } from "../../../../shared/presentation/utils/html.util.js";
import { pluralize } from "../../../../core/utils/collection.util.js";
import {
    pageHeader, pill, badge, emptyState, formCard, formActions, sideNote,
    inputField, selectField,
} from "../../../../admin/shared/presentation/components.js";

const BASE = "#/skills";

function renderGroup(group) {
    return html`
        <section class="card table-card" data-skill-group="${group.category}">
            <h2 class="table-title">${group.title} ${badge(group.countLabel, "accent")}</h2>

            <div class="skill-table">
                <div class="skill-row skill-row-head">
                    <span>ORDER</span><span>SKILL</span><span>PROFICIENCY</span><span></span>
                </div>

                <div data-skill-rows>
                    ${group.items.map(skill => html`
                        <div class="skill-row" draggable="true" data-skill-id="${skill.id}">
                            <span class="skill-order"><span class="drag-handle" aria-hidden="true">⋮⋮</span>${skill.number}</span>
                            <span class="skill-name">${skill.name}</span>
                            <span>${badge(skill.level)}</span>
                            <span class="item-actions">
                                <a class="btn btn-soft" href="${BASE}/${skill.id}">Edit</a>
                                <button class="btn btn-danger-soft" data-delete="${skill.id}" data-name="${skill.name}">Delete</button>
                            </span>
                        </div>
                    `)}
                </div>
            </div>
        </section>
    `;
}

export function renderSkillList(viewModel) {
    return html`
        ${pageHeader({
            title: "Skills",
            subtitle: "The tools you use and the strengths you bring.",
            actionLabel: "Add Skill",
            actionHref: `${BASE}/new`,
        })}

        <div class="pills">
            ${pill(pluralize(viewModel.total, "skill"))}
            ${pill(pluralize(viewModel.categoryCount, "category", "categories"))}
            ${pill("Order ranks your public portfolio")}
        </div>

        ${viewModel.groups.length === 0
            ? emptyState("No skills yet.", "Add Skill", `${BASE}/new`)
            : html`
                <div class="stack">${viewModel.groups.map(renderGroup)}</div>
                <p class="footnote">Drag the order handles to arrange skills. Saved on drop.</p>
            `}
    `;
}

export function renderSkillForm(viewModel) {
    const { values } = viewModel;

    return html`
        ${pageHeader({
            title: viewModel.title,
            subtitle: "Keep your skill details clear, complete, and up to date.",
            backLabel: "Skills",
            backHref: BASE,
        })}

        <form class="form-layout" novalidate>
            ${formCard({
                title: "Skill details",
                body: html`
                    ${inputField({ label: "Skill Name", name: "name", value: values.name, required: true })}
                    ${selectField({
                        label: "Category", name: "category", value: values.category, options: viewModel.categories,
                        required: true, hint: "Pick the group this skill belongs to — it is how visitors find it quickly.",
                    })}
                    ${selectField({
                        label: "Proficiency Level", name: "proficiency_level", value: values.proficiency_level,
                        options: viewModel.levels, required: true, hint: "Beginner · Intermediate · Advanced",
                    })}
                    ${inputField({
                        label: "Display Order", name: "display_order", type: "number", min: 0, step: 1,
                        value: values.display_order, hint: "Lower numbers appear first within the category. Leave empty to add at the end.",
                    })}
                    ${formActions({ cancelHref: BASE })}
                `,
            })}

            ${sideNote({
                title: "Keep it meaningful.",
                text: "Choose an honest proficiency label. Display order controls where the skill appears; there are no percentage ratings.",
                tip: "You can also drag skills on the list page to reorder them.",
            })}
        </form>
    `;
}
