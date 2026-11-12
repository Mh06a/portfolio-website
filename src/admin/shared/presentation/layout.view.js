import { html } from "../../../shared/presentation/utils/html.util.js";
import { BRAND_NAME } from "../../../core/constants/app.constants.js";

export const NAV_ITEMS = [
    { id: "overview", path: "/", label: "Overview", icon: "▦" },
    { id: "profile", path: "/profile", label: "Profile", icon: "◉" },
    { id: "education", path: "/education", label: "Education", icon: "◈" },
    { id: "experience", path: "/experience", label: "Experience", icon: "▣" },
    { id: "skills", path: "/skills", label: "Skills", icon: "</>" },
    { id: "projects", path: "/projects", label: "Projects", icon: "❒" },
    { id: "certificates", path: "/certificates", label: "Certificates", icon: "✦" },
];

export function renderLayout() {
    return html`
        <div class="admin-shell">
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-brand">
                    <strong>${BRAND_NAME}</strong>
                    <span>ADMIN PANEL</span>
                </div>

                <span class="sidebar-label">WORKSPACE</span>

                <nav class="sidebar-nav">
                    ${NAV_ITEMS.map(item => html`
                        <a href="#${item.path}" class="sidebar-link" data-nav="${item.id}">
                            <span class="sidebar-icon" aria-hidden="true">${item.icon}</span>${item.label}
                        </a>
                    `)}
                </nav>

                <div class="sidebar-footer">
                    <a href="./index.html" target="_blank" rel="noopener">View website ↗</a>
                    <button type="button" id="logout-button">Logout ↪</button>
                    <span>PORTFOLIO ADMINISTRATION</span>
                </div>
            </aside>

            <div class="admin-main">
                <header class="topbar">
                    <button type="button" class="topbar-menu" id="menu-button" aria-label="Toggle menu">☰</button>
                    <span class="breadcrumb" id="breadcrumb">Workspace</span>
                    <div class="topbar-right">
                        <a href="./index.html" target="_blank" rel="noopener">View website ↗</a>
                        <strong>Admin</strong>
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
