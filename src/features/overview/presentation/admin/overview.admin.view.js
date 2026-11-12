import { html } from "../../../../shared/presentation/utils/html.util.js";

export function renderOverview(viewModel) {
    return html`
        <span class="eyebrow">PORTFOLIO / CONTENT WORKSPACE</span>
        <h1 class="page-title">Welcome back</h1>
        <p class="page-subtitle">Manage your portfolio content from one place.</p>

        <div class="stat-grid">
            ${viewModel.stats.map(stat => html`
                <div class="card stat-card">
                    <span class="stat-label">${stat.label}</span>
                    <strong class="stat-value">${stat.value}</strong>
                </div>
            `)}
        </div>

        <section class="card quick-card">
            <h2 class="card-title">Create something new</h2>
            <p class="card-hint">Keep your portfolio up to date with your latest work.</p>
            <div class="item-actions">
                <a class="btn btn-primary" href="#/projects/new">+ Add New Project</a>
                <a class="btn btn-soft" href="#/experience/new">+ Add New Experience</a>
                <a class="btn btn-soft" href="#/skills/new">+ Add New Skill</a>
                <a class="btn btn-soft" href="#/certificates/new">+ Add New Certificate</a>
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
                <span class="eyebrow">THE PUBLIC SITE</span>
                <h2>Your work.<br>Out in the world.</h2>
                <p>Preview your portfolio as visitors see it.</p>
                <a class="btn btn-soft btn-block" href="./index.html" target="_blank" rel="noopener noreferrer">View website ↗</a>
            </aside>
        </div>
    `;
}
