import { html } from "../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../shared/presentation/components/empty-note/empty-note.js";

function renderProjectCard(project, { isLead = false } = {}) {
    return html`
        <article class="project-card ${isLead ? "project-lead featured" : ""}">

            <div class="project-image-wrapper">
                ${project.imageUrl && html`
                    <img
                        src="${project.imageUrl}"
                        alt="${project.name} application preview"
                        class="project-image"
                        loading="lazy"
                    >
                `}
            </div>

            <div class="project-content">

                <div class="project-meta">
                    <span>${project.metaLabel}</span>
                    ${project.statusBadge && html`
                        <span class="project-status">${project.statusBadge}</span>
                    `}
                </div>

                <h3>${project.name}</h3>

                <p class="project-description">${project.description}</p>

                <ul class="project-technologies">
                    ${project.technologies.map(technology => html`<li>${technology}</li>`)}
                </ul>

                <div class="project-links">
                    ${project.githubUrl && html`
                        <a href="${project.githubUrl}" class="text-link project-link" target="_blank" rel="noopener noreferrer">
                            View GitHub ↗
                        </a>
                    `}

                    ${project.demoUrl && html`
                        <a href="${project.demoUrl}" class="text-link project-link" target="_blank" rel="noopener noreferrer">
                            Live Demo ↗
                        </a>
                    `}
                </div>
            </div>

        </article>
    `;
}

export function renderProjects(viewModel) {
    return html`
        <section class="section projects" id="projects">
            <div class="container">

                <div class="projects-heading">
                    <div>
                        <span class="section-index" aria-hidden="true">05</span>
                        <span class="section-label">What I've built</span>
                        <h2 class="section-title">Selected Projects</h2>
                    </div>

                    <div class="projects-heading-side">
                        <p class="projects-subtitle">
                            Applications and systems built through practical learning.
                        </p>

                        ${viewModel.githubProfileUrl && html`
                            <a
                                href="${viewModel.githubProfileUrl}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn-secondary github-profile-link"
                            >
                                GitHub profile <span>↗</span>
                            </a>
                        `}
                    </div>
                </div>

                ${viewModel.items.length === 0
                    ? renderEmptyNote("No projects have been added yet.")
                    : html`
                        ${renderProjectCard(viewModel.featured, { isLead: true })}

                        ${viewModel.others.length > 0 && html`
                            <div class="projects-grid">
                                ${viewModel.others.map(project => renderProjectCard(project))}
                            </div>
                        `}

                        <p class="projects-note">
                            Several projects are illustrative previews, not production
                            deployments. Project repositories and demos are linked when available.
                        </p>
                    `}

            </div>
        </section>
    `;
}
