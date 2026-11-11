export class GetExperiencesUseCase {
    constructor(experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    async execute() {
        return await this.experienceRepository.getAll();
    }
}