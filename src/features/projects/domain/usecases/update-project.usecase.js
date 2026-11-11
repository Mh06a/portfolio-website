import { validateProject } from "../validators/project.validator.js";

export class UpdateProjectUseCase {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }

    async execute(id, project) {
        if (!id) {
            throw new Error("Project ID is required");
        }

        const validation = validateProject(project);

        if (!validation.isValid) {
            throw new Error(JSON.stringify(validation.errors));
        }

        return await this.projectRepository.update(id, project);
    }
}