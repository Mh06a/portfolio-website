export class OverviewAdminController {
    constructor({ getProjects, getSkills, getExperiences, getCertificates, getEducation }) {
        this.useCases = { getProjects, getSkills, getExperiences, getCertificates, getEducation };
    }

    async load() {
        const { getProjects, getSkills, getExperiences, getCertificates, getEducation } = this.useCases;

        const [projects, skills, experiences, certificates, education] = await Promise.all([
            getProjects.execute(),
            getSkills.execute(),
            getExperiences.execute(),
            getCertificates.execute(),
            getEducation.execute(),
        ]);

        return { projects, skills, experiences, certificates, education };
    }
}
