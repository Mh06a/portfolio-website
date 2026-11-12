import { html } from "../../../../shared/presentation/utils/html.util.js";
import { pluralize } from "../../../../core/utils/collection.util.js";
import {
    pageHeader, pill, badge, emptyState, formCard, formActions, fieldRow, sideNote,
    inputField, textareaField, selectField, toggleField,
} from "../../../../admin/shared/presentation/components.js";

const BASE = "#/experience";

export function renderExperienceList(viewModel) {
    return html`
        ${pageHeader({
            title: "Experience",
            subtitle: "The roles and projects behind your experience.",
            actionLabel: "Add Experience",
            actionHref: `${BASE}/new`,
        })}

        <div class="pills">${pill(pluralize(viewModel.total, "experience record"))}</div>

        ${viewModel.items.length === 0
            ? emptyState("No experience yet.", "Add Experience", `${BASE}/new`)
            : html`
                <div class="stack">
                    ${viewModel.items.map(item => html`
                        <article class="card item-card">
                            <div class="item-card-head">
                                <div>
                                    <h2 class="item-title">${item.title}</h2>
                                    <p class="item-sub">${item.subtitle}</p>
                                    <p class="item-meta">${item.period}</p>
                                </div>
                                <div class="item-actions">
                                    <a class="btn btn-soft" href="${BASE}/${item.id}">Edit</a>
                                    <button class="btn btn-danger-soft" data-delete="${item.id}" data-name="${item.title}">Delete</button>
                                </div>
                            </div>

                            <div class="badges">
                                ${badge(item.type)}
                                ${badge(item.isCurrent ? "Current position" : "Past position", item.isCurrent ? "accent" : "neutral")}
                            </div>

                            <p class="item-text">${item.description}</p>
                        </article>
                    `)}
                </div>
            `}
    `;
}

export function renderExperienceForm(viewModel) {
    const { values } = viewModel;

    return html`
        ${pageHeader({
            title: viewModel.title,
            subtitle: "Keep your experience details clear, complete, and up to date.",
            backLabel: "Experience",
            backHref: BASE,
        })}

        <form class="form-layout" novalidate>
            ${formCard({
                title: "Role details",
                body: html`
                    ${inputField({ label: "Job Title", name: "job_title", value: values.job_title, required: true })}
                    ${fieldRow(
                        inputField({ label: "Company Name", name: "company_name", value: values.company_name, required: true }),
                        inputField({ label: "Location", name: "location", value: values.location })
                    )}
                    ${selectField({
                        label: "Employment Type", name: "employment_type", value: values.employment_type,
                        options: viewModel.employmentTypes, required: true,
                        hint: "Internship · Full-time · Part-time · Freelance",
                    })}
                    ${toggleField({
                        label: "Currently Working Here", name: "is_current", checked: values.is_current,
                        hint: "Your public profile will show “Present”.",
                    })}
                    ${fieldRow(
                        inputField({ label: "Start Date", name: "start_date", type: "date", value: values.start_date, required: true }),
                        inputField({
                            label: "End Date", name: "end_date", type: "date", value: values.end_date,
                            disabled: values.is_current, hint: "Disabled when this is your current position.",
                        })
                    )}
                    ${textareaField({
                        label: "Description", name: "description", value: values.description, required: true, rows: 5,
                        hint: "One achievement per line — each line becomes a bullet on your website.",
                    })}
                    ${formActions({ cancelHref: BASE })}
                `,
            })}

            ${sideNote({
                title: "Tell the story of the role.",
                text: "When Currently Working Here is enabled, the end date is disabled and “Present” is shown on your portfolio.",
                tip: "Add a bullet per line. Short, result-focused lines read best.",
            })}
        </form>
    `;
}
