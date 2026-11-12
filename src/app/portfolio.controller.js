import { presentNavbar } from "../shared/presentation/components/navbar/navbar.presenter.js";
import { presentFooter } from "../shared/presentation/components/footer/footer.presenter.js";
import { presentHero, presentAbout } from "../features/profile/presentation/profile.presenter.js";
import { presentEducations } from "../features/education/presentation/education.presenter.js";
import { presentExperiences } from "../features/experience/presentation/experience.presenter.js";
import { presentSkillGroups } from "../features/skills/presentation/skills.presenter.js";
import { presentProjects } from "../features/projects/presentation/projects.presenter.js";
import { presentCertificates } from "../features/certificates/presentation/certificates.presenter.js";
import { presentContact } from "../features/contact/presentation/contact.presenter.js";

/**
 * Orchestrates the page: calls the use cases, hands the results to the
 * presenters and returns ready-to-render view models.
 * It knows nothing about HTML, the DOM or Supabase.
 */
export class PortfolioController {
    constructor(useCases) {
        this.useCases = useCases;
    }

    async load() {
        const { getProfile, getEducation, getExperiences, getSkills, getProjects, getCertificates } =
            this.useCases;

        // Each section loads independently: one failing section must not blank the whole page.
        const [profile, educations, experiences, skills, projects, certificates] =
            await Promise.all([
                this.#safely("profile", () => getProfile.execute(), null),
                this.#safely("education", () => getEducation.execute(), []),
                this.#safely("experience", () => getExperiences.execute(), []),
                this.#safely("skills", () => getSkills.execute(), []),
                this.#safely("projects", () => getProjects.execute(), []),
                this.#safely("certificates", () => getCertificates.execute(), []),
            ]);

        const resolveAssetUrl = path => this.useCases.resolveAssetUrl.execute(path);

        return {
            navbar: presentNavbar(profile, resolveAssetUrl),
            hero: presentHero(profile, resolveAssetUrl),
            about: presentAbout(profile),
            educations: presentEducations(educations, resolveAssetUrl),
            experiences: presentExperiences(experiences),
            skillGroups: presentSkillGroups(skills),
            projects: presentProjects(projects, {
                githubProfileUrl: profile?.github_url,
                resolveAssetUrl,
            }),
            certificates: presentCertificates(certificates, resolveAssetUrl),
            contact: presentContact(profile),
            footer: presentFooter(profile),
        };
    }

    async #safely(section, action, fallbackValue) {
        try {
            return await action();
        } catch (error) {
            console.error(`[portfolio] failed to load "${section}"`, error);

            return fallbackValue;
        }
    }
}
