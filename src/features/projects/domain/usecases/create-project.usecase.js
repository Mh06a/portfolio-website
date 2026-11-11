import { validateProject } from "../validators/project.validator.js";

export class CreateProjectUseCase {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }

    async execute(project) {
        const validation = validateProject(project);

        if (!validation.isValid) {
            throw new Error(JSON.stringify(validation.errors));
        }

        return await this.projectRepository.create(project);
    }
}