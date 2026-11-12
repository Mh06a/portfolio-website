export class GetTechnologiesUseCase {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }

    async execute() {
        return await this.projectRepository.getTechnologies();
    }
}
