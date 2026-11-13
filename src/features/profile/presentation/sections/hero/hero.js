import { html } from "../../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../../shared/presentation/components/empty-note/empty-note.js";

function renderEmptyHero() {
    return html`
        <section class="hero" id="home">
            <div class="container">
                ${renderEmptyNote("Profile information has not been added yet.")}
            </div>
        </section>
    `;
}

export function renderHero(viewModel) {
    if (!viewModel) return renderEmptyHero();

    return html`
        <section class="hero" id="home">
            <div class="container">

                <div class="hero-content">

                    <div class="hero-info">
                        <span class="section-label">Software Developer / Portfolio</span>

                        <h1>
                            <span class="hero-first">${viewModel.firstName}</span>
                            <span class="hero-last">${viewModel.lastName}</span>
                        </h1>

                        <h2>${viewModel.jobTitle}</h2>

                        <div class="hero-lower">
                            <p class="hero-description">${viewModel.description}</p>

                            <p class="hero-tagline">
                                Building practical software solutions, one application at a time.
                            </p>

                            <div class="hero-actions">
                                <a href="#projects" class="btn-primary">
                                    Explore My Work <span>↗</span>
                                </a>

                                ${viewModel.cvUrl && html`
                                    <a href="${viewModel.cvUrl}" class="btn-secondary" download>
                                        Download CV <span>↓</span>
                                    </a>
                                `}
                            </div>

                            ${viewModel.socials.length > 0 && html`
                                <div class="hero-socials">
                                    ${viewModel.socials.map(link => html`
                                        <a href="${link.href}" target="_blank" rel="noopener noreferrer">
                                            ${link.label} ↗
                                        </a>
                                    `)}
                                </div>
                            `}
                        </div>
                    </div>

                    <figure class="hero-image-wrapper">
                        ${viewModel.imageUrl && html`
                            <img
                                src="${viewModel.imageUrl}"
                                alt="${viewModel.fullName}"
                                class="hero-image"
                            >
                        `}
                    </figure>

                </div>

                <div class="hero-bottom">
                    <span>Flutter / .NET MAUI / Swift / Kotlin</span>
                    <a href="#about">Scroll to explore ↓</a>
                </div>

            </div>
        </section>
    `;
}
