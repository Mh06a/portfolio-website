import { html } from "../../../../shared/presentation/utils/html.util.js";

export function renderOverview(viewModel) {
    return html`
        <header class="page-header overview-header">
            <div>
                <span class="eyebrow">Portfolio / content workspace</span>
                <h1 class="page-title">Welcome back</h1>
                <p class="page-subtitle">Manage your portfolio content from one place.</p>
            </div>
            <a class="btn btn-soft" href="./index.html" target="_blank" rel="noopener noreferrer">View website ↗</a>
        </header>

        <div class="stat-grid">
            ${viewModel.stats.map(stat => html`
                <div class="card stat-card">
                    <span class="stat-label">${stat.label}</span>
                    <strong class="stat-value">${stat.value}</strong>
                    <span class="stat-hint">${stat.hint}</span>
                </div>
            `)}
        </div>

        <section class="quick-card">
            <h2 class="section-heading">Create something new</h2>
            <div class="quick-grid">
                <a class="quick-tile quick-tile-primary" href="#/projects/new"><span>+</span> Add new project</a>
                <a class="quick-tile" href="#/experience/new"><span>+</span> Add new experience</a>
                <a class="quick-tile" href="#/skills/new"><span>+</span> Add new skill</a>
                <a class="quick-tile" href="#/certificates/new"><span>+</span> Add new certificate</a>
            </div>
        </section>

        <div class="overview-grid">
            <section class="card">
                <div class="card-head">
                    <h2 class="card-title">Recent updates</h2>
                    <span class="item-meta">Latest updated</span>
                </div>

                ${viewModel.updates.length === 0
                    ? html`<p class="item-meta">Nothing yet — add your first item.</p>`
                    : viewModel.updates.map(update => html`
                        <div class="update-row">
                            <div>
                                <strong>${update.title}</strong>
                                <span class="item-meta">${update.kind}</span>
                            </div>
                            <span class="item-meta">${update.dateLabel}</span>
                        </div>
                    `)}
            </section>

            <aside class="card public-card">
                <span class="eyebrow">The public site</span>
                <h2>Your work.<br>Out in the world.</h2>
                <p>Preview your portfolio as visitors see it.</p>
                <a class="btn btn-primary btn-block" href="./index.html" target="_blank" rel="noopener noreferrer">View website ↗</a>
            </aside>
        </div>
    `;
}
