import { ExperienceRepository } from "../../domain/repositories/experience.repository.js";
import { Experience } from "../../domain/models/experience.model.js";

export class ExperienceRepositoryImpl extends ExperienceRepository {
    constructor(dataSource) {
        super();
        this.dataSource = dataSource;
    }

    async getAll() {
        const data = await this.dataSource.getAll();

        return data.map(item => new Experience(item));
    }

    async create(experience) {
        const data = await this.dataSource.create(experience);

        return new Experience(data);
    }

    async update(id, experience) {
        const data = await this.dataSource.update(id, experience);

        return new Experience(data);
    }

    async delete(id) {
        return await this.dataSource.delete(id);
    }
}