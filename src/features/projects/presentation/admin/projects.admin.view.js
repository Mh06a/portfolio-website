import { html } from "../../../../shared/presentation/utils/html.util.js";
import { pluralize } from "../../../../core/utils/collection.util.js";
import {
    pageHeader, pill, badge, emptyState, formCard, formActions, fieldRow, sideNote,
    inputField, textareaField, fileField, toggleField, chipPicker,
} from "../../../../admin/shared/presentation/components.js";
import { UPLOAD_RULES } from "../../../../shared/domain/usecases/upload-asset.usecase.js";

const BASE = "#/projects";

function renderProjectCard(project) {
    return html`
        <article class="card project-admin-card">
            <div class="project-admin-image">
                ${project.imageUrl && html`<img src="${project.imageUrl}" alt="${project.name}" loading="lazy">`}
            </div>

            <div class="project-admin-body">
                <div class="project-admin-top">
                    <span class="item-meta">#${project.position}</span>
                    ${badge(project.isFeatured ? "Featured" : "Not featured", project.isFeatured ? "accent" : "neutral")}
                </div>

                <h2 class="item-title">${project.name}</h2>
                <p class="item-text clamp">${project.description}</p>

                <div class="badges">${project.technologies.map(tech => badge(tech))}</div>

                <p class="item-meta">${project.meta}</p>

                <div class="item-actions">
                    <a class="btn btn-soft" href="${BASE}/${project.id}">Edit</a>
                    <button class="btn btn-danger-soft" data-delete="${project.id}" data-name="${project.name}">Delete</button>
                </div>

                <button class="btn btn-soft btn-block" data-feature="${project.id}">
                    ${project.isFeatured ? "★ Unfeature" : "☆ Mark as featured"}
                </button>

                <div class="move-row">
                    <button class="btn btn-soft" data-move="${project.id}" data-direction="-1" ${!project.canMoveUp && html`disabled`} aria-label="Move up">↑</button>
                    <button class="btn btn-soft" data-move="${project.id}" data-direction="1" ${!project.canMoveDown && html`disabled`} aria-label="Move down">↓</button>
                    <span class="item-meta">Reorder</span>
                </div>
            </div>
        </article>
    `;
}

export function renderProjectList(viewModel) {
    return html`
        ${pageHeader({
            title: "Projects",
            subtitle: "A home for the applications you build.",
            actionLabel: "Add Project",
            actionHref: `${BASE}/new`,
        })}

        <div class="pills">
            ${pill(pluralize(viewModel.total, "project"))}
            ${pill(`${viewModel.featuredCount} featured`)}
            ${pill("Display order ↑")}
        </div>

        ${viewModel.items.length === 0
            ? emptyState("No projects yet.", "Add Project", `${BASE}/new`)
            : html`<div class="project-admin-grid">${viewModel.items.map(renderProjectCard)}</div>`}

        <p class="footnote">Edit a project to change its image, links or technologies. Use the arrows to change display order.</p>
    `;
}

export function renderProjectForm(viewModel) {
    const { values } = viewModel;

    return html`
        ${pageHeader({
            title: viewModel.title,
            subtitle: "Keep your project details clear, complete, and up to date.",
            backLabel: "Projects",
            backHref: BASE,
        })}

        <form class="form-layout" novalidate>
            ${formCard({
                title: "Project details",
                body: html`
                    ${inputField({ label: "Project Name", name: "name", value: values.name, required: true })}
                    ${textareaField({ label: "Description", name: "description", value: values.description, required: true, rows: 4 })}
                    ${fileField({
                        label: "Project Image (optional)", name: "image", errorKey: "image_path",
                        accept: UPLOAD_RULES.image.types.join(","), buttonLabel: "Replace image",
                        hint: `${UPLOAD_RULES.image.description}. Without an image the website shows a default picture.`,
                        previewUrl: viewModel.imageUrl, currentName: viewModel.imageName, emptyText: "No image uploaded",
                    })}
                    ${fieldRow(
                        inputField({ label: "GitHub URL (optional)", name: "github_url", type: "url", value: values.github_url, placeholder: "https://github.com/you/project" }),
                        inputField({ label: "Demo URL (optional)", name: "demo_url", type: "url", value: values.demo_url, placeholder: "https://example.com" })
                    )}
                    ${fieldRow(
                        inputField({ label: "Project Date (optional)", name: "project_date", type: "date", value: values.project_date }),
                        inputField({ label: "Display Order", name: "display_order", type: "number", min: 0, step: 1, value: values.display_order, required: true })
                    )}
                    ${toggleField({
                        label: "Featured project", name: "is_featured", checked: values.is_featured,
                        hint: "Featured projects are highlighted on your website.",
                    })}
                    ${chipPicker({
                        label: "Technologies *", name: "technologies", values: values.technologies,
                        suggestions: viewModel.technologySuggestions,
                        placeholder: "Search or type a technology…", addLabel: "Add technology",
                        hint: "Pick an existing technology or type a new one, then press Add.",
                    })}
                    ${formActions({ cancelHref: BASE })}
                `,
            })}

            ${sideNote({
                title: "Let the work speak.",
                text: "Each project needs an image and a short description. Linking GitHub or a demo is optional but recommended.",
                tip: "Add a project with a clear image; it is the first thing visitors see.",
            })}
        </form>
    `;
}
