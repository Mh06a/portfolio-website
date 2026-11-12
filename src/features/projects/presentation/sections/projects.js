import { html } from "../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../shared/presentation/components/empty-note/empty-note.js";

function renderProjectCard(project) {
    return html`
        <article class="project-card ${project.isFeatured ? "featured" : ""}">

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

                <div class="project-technologies">
                    ${project.technologies.map(technology => html`<span>${technology}</span>`)}
                </div>

                ${project.githubUrl && html`
                    <a href="${project.githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
                        View GitHub ↗
                    </a>
                `}

                ${project.demoUrl && html`
                    <a href="${project.demoUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
                        Live Demo ↗
                    </a>
                `}
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
                        <span class="section-label">05 / WHAT I'VE BUILT</span>
                        <h2 class="section-title">Selected Projects</h2>
                        <p class="projects-subtitle">
                            Applications and systems built through practical learning.
                        </p>
                    </div>

                    ${viewModel.githubProfileUrl && html`
                        <a
                            href="${viewModel.githubProfileUrl}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="github-profile-link"
                        >
                            GITHUB PROFILE ↗
                        </a>
                    `}
                </div>

                ${viewModel.items.length === 0
                    ? renderEmptyNote("No projects have been added yet.")
                    : html`
                        <div class="projects-grid">${viewModel.items.map(renderProjectCard)}</div>

                        <p class="projects-note">
                            Several projects are illustrative previews, not production
                            deployments. Project repositories and demos are linked when available.
                        </p>
                    `}

            </div>
        </section>
    `;
}
