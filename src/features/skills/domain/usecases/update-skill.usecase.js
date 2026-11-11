import { validateSkill } from "../validators/skill.validator.js";

export class UpdateSkillUseCase {
    constructor(skillRepository) {
        this.skillRepository = skillRepository;
    }

    async execute(id, skill) {
        if (!id) {
            throw new Error("Skill ID is required");
        }

        const validation = validateSkill(skill);

        if (!validation.isValid) {
            throw new Error(JSON.stringify(validation.errors));
        }

        return await this.skillRepository.update(id, skill);
    }
}