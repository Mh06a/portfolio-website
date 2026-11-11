import { validateSkill } from "../validators/skill.validator.js";

export class CreateSkillUseCase {
    constructor(skillRepository) {
        this.skillRepository = skillRepository;
    }

    async execute(skill) {
        const validation = validateSkill(skill);

        if (!validation.isValid) {
            throw new Error(JSON.stringify(validation.errors));
        }

        return await this.skillRepository.create(skill);
    }
}