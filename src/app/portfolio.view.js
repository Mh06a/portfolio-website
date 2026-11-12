import { html } from "../shared/presentation/utils/html.util.js";
import { renderNavbar } from "../shared/presentation/components/navbar/navbar.js";
import { renderFooter } from "../shared/presentation/components/footer/footer.js";
import { renderHero } from "../features/profile/presentation/sections/hero/hero.js";
import { renderAbout } from "../features/profile/presentation/sections/about/about.js";
import { renderEducation } from "../features/education/presentation/sections/education.js";
import { renderExperience } from "../features/experience/presentation/sections/experience.js";
import { renderSkills } from "../features/skills/presentation/sections/skills.js";
import { renderProjects } from "../features/projects/presentation/sections/projects.js";
import { renderCertificates } from "../features/certificates/presentation/sections/certificates.js";
import { renderContact } from "../features/contact/presentation/sections/contact.js";

/** Pure function: view models in, HTML out. */
export function renderPortfolio(viewModel) {
    return html`
        ${renderNavbar(viewModel.navbar)}

        <main>
            ${renderHero(viewModel.hero)}
            ${renderAbout(viewModel.about)}
            ${renderEducation(viewModel.educations)}
            ${renderExperience(viewModel.experiences)}
            ${renderSkills(viewModel.skillGroups)}
            ${renderProjects(viewModel.projects)}
            ${renderCertificates(viewModel.certificates)}
            ${renderContact(viewModel.contact)}
        </main>

        ${renderFooter(viewModel.footer)}
    `;
}

export function renderFatalError() {
    return html`
        <main class="app-message">
            <p>Something went wrong while loading the page. Please refresh and try again.</p>
        </main>
    `;
}
