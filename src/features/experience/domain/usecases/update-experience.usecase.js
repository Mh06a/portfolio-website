import { ValidationError } from "../../../../core/errors/app.error.js";
import { validateExperience } from "../validators/experience.validator.js";

export class UpdateExperienceUseCase {
    constructor(experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    async execute(id, experience) {
        if (!id) {
            throw new Error("Experience ID is required");
        }

        const validation = validateExperience(experience);

        if (!validation.isValid) {
            throw new ValidationError(validation.errors);
        }

        return await this.experienceRepository.update(id, experience);
    }
}