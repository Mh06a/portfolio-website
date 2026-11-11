export class DeleteExperienceUseCase {
    constructor(experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    async execute(id) {
        if (!id) {
            throw new Error("Experience ID is required");
        }

        return await this.experienceRepository.delete(id);
    }
}