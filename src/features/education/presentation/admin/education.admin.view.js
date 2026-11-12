import { html } from "../../../../shared/presentation/utils/html.util.js";
import { pluralize } from "../../../../core/utils/collection.util.js";
import {
    pageHeader, pill, emptyState, formCard, formActions, fieldRow, sideNote,
    inputField, textareaField, fileField, chipPicker,
} from "../../../../admin/shared/presentation/components.js";
import { UPLOAD_RULES } from "../../../../shared/domain/usecases/upload-asset.usecase.js";

const BASE = "#/education";

export function renderEducationList(viewModel) {
    return html`
        ${pageHeader({
            title: "Education",
            subtitle: "Your academic background and the subjects that shaped it.",
            actionLabel: "Add Education",
            actionHref: `${BASE}/new`,
        })}

        <div class="pills">${pill(pluralize(viewModel.total, "education record"))}</div>

        ${viewModel.items.length === 0
            ? emptyState("No education yet.", "Add Education", `${BASE}/new`)
            : html`
                <div class="stack">
                    ${viewModel.items.map(item => html`
                        <article class="card item-card">
                            <div class="item-card-head">
                                <div>
                                    <h2 class="item-title">${item.institution}</h2>
                                    <p class="item-sub">${item.program}</p>
                                    <p class="item-meta">${item.period}</p>
                                </div>
                                <div class="item-actions">
                                    <a class="btn btn-soft" href="${BASE}/${item.id}">Edit</a>
                                    <button class="btn btn-danger-soft" data-delete="${item.id}" data-name="${item.institution}">Delete</button>
                                </div>
                            </div>

                            ${item.subjects.length > 0 && html`
                                <div class="subjects-box">
                                    <span class="eyebrow">RELEVANT SUBJECTS</span>
                                    <div class="chips">
                                        ${item.subjects.map(subject => html`<span class="chip">${subject}</span>`)}
                                    </div>
                                </div>
                            `}

                            <a class="btn btn-soft" href="${BASE}/${item.id}">Manage subjects</a>
                        </article>
                    `)}
                </div>
            `}

        <p class="footnote">Education records and GPA are optional context for the public page.</p>
    `;
}

export function renderEducationForm(viewModel) {
    const { values } = viewModel;

    return html`
        ${pageHeader({
            title: viewModel.title,
            subtitle: "Keep your education details clear, complete, and up to date.",
            backLabel: "Education",
            backHref: BASE,
        })}

        <form class="form-layout" novalidate>
            ${formCard({
                title: "Education details",
                body: html`
                    ${inputField({ label: "Institution Name", name: "institution_name", value: values.institution_name, required: true })}
                    ${fieldRow(
                        inputField({ label: "Degree", name: "degree", value: values.degree, required: true }),
                        inputField({ label: "Major", name: "major", value: values.major, required: true })
                    )}
                    ${fieldRow(
                        inputField({ label: "Start Date", name: "start_date", type: "date", value: values.start_date, required: true }),
                        inputField({ label: "End Date", name: "end_date", type: "date", value: values.end_date, hint: "Leave empty if still studying." })
                    )}
                    ${inputField({
                        label: "GPA (optional)", name: "gpa", type: "number", min: 0, step: 0.01, value: values.gpa,
                        hint: "Leave empty if not applicable. Use a value from 0 to 5.",
                    })}
                    ${textareaField({
                        label: "Description", name: "description", value: values.description, required: true, rows: 4,
                        hint: "One paragraph per line — shown on your About section.",
                    })}
                    ${fileField({
                        label: "Institution Logo", name: "logo", errorKey: "institution_logo_path",
                        accept: UPLOAD_RULES.image.types.join(","), buttonLabel: "Upload logo",
                        hint: `${UPLOAD_RULES.image.description}. Optional.`,
                        previewUrl: viewModel.logoUrl, currentName: viewModel.logoName, emptyText: "No logo uploaded",
                    })}
                    <div id="subjects">
                        ${chipPicker({
                            label: "Relevant subjects", name: "subjects", values: values.subjects,
                            placeholder: "Enter subject name", addLabel: "Add subject",
                            hint: "Add the subjects most relevant to your work.",
                        })}
                    </div>
                    ${formActions({ cancelHref: BASE })}
                `,
            })}

            ${sideNote({
                title: "A little context goes a long way.",
                text: "Relevant subjects can be added or removed individually. Display order is optional and used as a tie-breaker.",
                tip: "Add and edit use the same form with empty fields.",
            })}
        </form>
    `;
}
