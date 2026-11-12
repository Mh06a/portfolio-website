import { html } from "../../utils/html.util.js";
import { BRAND_NAME } from "../../../../core/constants/app.constants.js";

const LINKS = [
    ["home", "Home"],
    ["about", "About"],
    ["education", "Education"],
    ["experience", "Experience"],
    ["skills", "Skills"],
    ["projects", "Projects"],
    ["certificates", "Certificates"],
    ["contact", "Contact"],
];

export function renderNavbar(viewModel) {
    return html`
        <header class="navbar">
            <div class="navbar-container">

                <a href="#home" class="navbar-logo">${BRAND_NAME}</a>

                <button
                    class="navbar-toggle"
                    id="navbar-toggle"
                    aria-label="Toggle navigation"
                    aria-expanded="false"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav class="navbar-menu" id="navbar-menu">
                    ${LINKS.map(([id, label]) => html`
                        <a href="#${id}" class="navbar-link ${id === "home" ? "active" : ""}">${label}</a>
                    `)}
                </nav>

                ${viewModel.cvUrl && html`
                    <a href="${viewModel.cvUrl}" class="navbar-cv" download>
                        Download CV <span>↓</span>
                    </a>
                `}

            </div>
        </header>
    `;
}

/** UI behaviour only: open/close the mobile menu. */
export function initializeNavbar() {
    const toggle = document.querySelector("#navbar-toggle");
    const menu = document.querySelector("#navbar-menu");

    if (!toggle || !menu) return;

    const setOpen = isOpen => {
        menu.classList.toggle("is-open", isOpen);
        toggle.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
    };

    toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => setOpen(false));
    });
}
