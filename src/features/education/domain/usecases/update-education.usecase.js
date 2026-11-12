import { ValidationError } from "../../../../core/errors/app.error.js";
import { validateEducation } from "../validators/education.validator.js";

export class UpdateEducationUseCase {
    constructor(educationRepository) {
        this.educationRepository = educationRepository;
    }

    async execute(id, education) {
        if (!id) {
            throw new Error("Education ID is required");
        }

        const validation = validateEducation(education);

        if (!validation.isValid) {
            throw new ValidationError(validation.errors);
        }

        return await this.educationRepository.update(id, education);
    }
}