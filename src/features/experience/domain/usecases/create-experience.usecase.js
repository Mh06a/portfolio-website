import { validateExperience } from "../validators/experience.validator.js";

export class CreateExperienceUseCase {
    constructor(experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    async execute(experience) {
        const validation = validateExperience(experience);

        if (!validation.isValid) {
            throw new Error(JSON.stringify(validation.errors));
        }

        return await this.experienceRepository.create(experience);
    }
}