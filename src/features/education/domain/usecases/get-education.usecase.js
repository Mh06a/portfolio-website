export class GetEducationUseCase {
    constructor(educationRepository) {
        this.educationRepository = educationRepository;
    }

    async execute() {
        return await this.educationRepository.getAll();
    }
}