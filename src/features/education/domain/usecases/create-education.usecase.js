import { validateEducation } from "../validators/education.validator.js";

export class CreateEducationUseCase {
    constructor(educationRepository) {
        this.educationRepository = educationRepository;
    }

    async execute(education) {
        const validation = validateEducation(education);

        if (!validation.isValid) {
            throw new Error(JSON.stringify(validation.errors));
        }

        return await this.educationRepository.create(education);
    }
}