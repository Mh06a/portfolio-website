import { ValidationError } from "../../../../core/errors/app.error.js";
import { validateSkill } from "../validators/skill.validator.js";

export class CreateSkillUseCase {
    constructor(skillRepository) {
        this.skillRepository = skillRepository;
    }

    async execute(skill) {
        const validation = validateSkill(skill);

        if (!validation.isValid) {
            throw new ValidationError(validation.errors);
        }

        return await this.skillRepository.create(skill);
    }
}