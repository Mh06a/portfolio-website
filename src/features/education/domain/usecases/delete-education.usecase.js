export class DeleteEducationUseCase {
    constructor(educationRepository) {
        this.educationRepository = educationRepository;
    }

    async execute(id) {
        if (!id) {
            throw new Error("Education ID is required");
        }

        return await this.educationRepository.delete(id);
    }
}