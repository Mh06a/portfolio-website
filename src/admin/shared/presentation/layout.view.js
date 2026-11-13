import { html } from "../../../shared/presentation/utils/html.util.js";
import { BRAND_NAME } from "../../../core/constants/app.constants.js";

const svg = body => html`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const ICONS = {
    overview: svg(html`<rect x="3" y="3" width="7.5" height="9" rx="2"/><rect x="13.5" y="3" width="7.5" height="5" rx="2"/><rect x="13.5" y="11" width="7.5" height="10" rx="2"/><rect x="3" y="15" width="7.5" height="6" rx="2"/>`),
    profile: svg(html`<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.5c.6-4 3.6-6 7.5-6s6.9 2 7.5 6"/>`),
    education: svg(html`<path d="m2.5 9 9.5-5 9.5 5-9.5 5z"/><path d="M6.5 11.5v4.6c0 1.2 2.5 2.4 5.5 2.4s5.5-1.2 5.5-2.4v-4.6"/><path d="M21.5 9v6"/>`),
    experience: svg(html`<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M3 13h18"/>`),
    skills: svg(html`<path d="m8.5 8-4 4 4 4"/><path d="m15.5 8 4 4-4 4"/><path d="m13.2 5-2.4 14"/>`),
    projects: svg(html`<path d="m12 3 9 4.5-9 4.5-9-4.5z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16.5 9 4.5 9-4.5"/>`),
    certificates: svg(html`<circle cx="12" cy="9" r="5.5"/><path d="m8.8 13.6-1.3 6.9L12 18.3l4.5 2.2-1.3-6.9"/>`),
};

export const NAV_ITEMS = [
    { id: "overview", path: "/", label: "Overview", group: "main" },
    { id: "profile", path: "/profile", label: "Profile", group: "content" },
    { id: "education", path: "/education", label: "Education", group: "content" },
    { id: "experience", path: "/experience", label: "Experience", group: "content" },
    { id: "skills", path: "/skills", label: "Skills", group: "content" },
    { id: "projects", path: "/projects", label: "Projects", group: "content" },
    { id: "certificates", path: "/certificates", label: "Certificates", group: "content" },
];

const renderLink = item => html`
    <a href="#${item.path}" class="sidebar-link" data-nav="${item.id}">
        <span class="sidebar-icon">${ICONS[item.id]}</span>
        <span>${item.label}</span>
    </a>
`;

export function renderLayout() {
    return html`
        <div class="admin-shell">
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-brand">
                    <span class="sidebar-mark" aria-hidden="true"></span>
                    <div>
                        <strong>${BRAND_NAME}</strong>
                        <span>Admin panel</span>
                    </div>
                </div>

                <nav class="sidebar-nav" aria-label="Admin">
                    ${NAV_ITEMS.filter(item => item.group === "main").map(renderLink)}

                    <span class="sidebar-label">Content</span>
                    ${NAV_ITEMS.filter(item => item.group === "content").map(renderLink)}
                </nav>

                <div class="sidebar-footer">
                    <a href="./index.html" target="_blank" rel="noopener" class="sidebar-ext">View website <span>↗</span></a>
                    <button type="button" id="logout-button">Logout <span>↪</span></button>
                </div>
            </aside>

            <div class="admin-main">
                <header class="topbar">
                    <button type="button" class="topbar-menu" id="menu-button" aria-label="Toggle menu">
                        <span></span><span></span><span></span>
                    </button>
                    <span class="breadcrumb" id="breadcrumb">Workspace</span>
                    <div class="topbar-right">
                        <a href="./index.html" target="_blank" rel="noopener">View website ↗</a>
                        <span class="topbar-user"><i aria-hidden="true">A</i><strong>Admin</strong></span>
                    </div>
                </header>

                <main class="admin-content" id="admin-content"></main>
            </div>
        </div>
    `;
}

export function renderLoading() {
    return html`<p class="loading">Loading…</p>`;
}

export function renderPageError(message) {
    return html`
        <div class="empty-state">
            <p>${message}</p>
        </div>
    `;
}
