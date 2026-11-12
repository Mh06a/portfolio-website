import { EducationRepository } from "../../domain/repositories/education.repository.js";
import { Education } from "../../domain/models/education.model.js";

export class EducationRepositoryImpl extends EducationRepository {
    constructor(dataSource) {
        super();
        this.dataSource = dataSource;
    }

    async getAll() {
        const data = await this.dataSource.getAll();

        return data.map(item => new Education(item));
    }

    async create(education) {
        const data = await this.dataSource.create(education);

        return new Education(data);
    }

    async update(id, education) {
        const data = await this.dataSource.update(id, education);

        return new Education(data);
    }

    async delete(id) {
        return await this.dataSource.delete(id);
    }
}