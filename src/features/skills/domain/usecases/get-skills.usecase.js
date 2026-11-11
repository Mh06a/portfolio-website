export class GetSkillsUseCase {
    constructor(skillRepository) {
        this.skillRepository = skillRepository;
    }

    async execute() {
        return await this.skillRepository.getAll();
    }
}