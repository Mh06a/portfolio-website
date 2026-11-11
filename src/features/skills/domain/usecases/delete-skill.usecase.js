export class DeleteSkillUseCase {
    constructor(skillRepository) {
        this.skillRepository = skillRepository;
    }

    async execute(id) {
        if (!id) {
            throw new Error("Skill ID is required");
        }

        return await this.skillRepository.delete(id);
    }
}