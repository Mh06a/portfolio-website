import { SkillRepository } from "../../domain/repositories/skill.repository.js";
import { Skill } from "../../domain/models/skill.model.js";

export class SkillRepositoryImpl extends SkillRepository {
    constructor(dataSource) {
        super();
        this.dataSource = dataSource;
    }

    async getAll() {
        const data = await this.dataSource.getAll();

        return data.map(item => new Skill(item));
    }

    async create(skill) {
        const data = await this.dataSource.create(skill);

        return new Skill(data);
    }

    async update(id, skill) {
        const data = await this.dataSource.update(id, skill);

        return new Skill(data);
    }

    async delete(id) {
        return await this.dataSource.delete(id);
    }
}