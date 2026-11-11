export class DeleteProjectUseCase {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }

    async execute(id) {
        if (!id) {
            throw new Error("Project ID is required");
        }

        return await this.projectRepository.delete(id);
    }
}