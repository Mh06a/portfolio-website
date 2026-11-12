import { ProjectRepository } from "../../domain/repositories/project.repository.js";
import { Project } from "../../domain/models/project.model.js";

export class ProjectRepositoryImpl extends ProjectRepository {
    constructor(dataSource) {
        super();
        this.dataSource = dataSource;
    }

    async getAll() {
        const data = await this.dataSource.getAll();

        return data.map(item => new Project(item));
    }

    async getById(id) {
        const data = await this.dataSource.getById(id);

        return new Project(data);
    }

    async getTechnologies() {
        return await this.dataSource.getTechnologies();
    }

    async create(project) {
        const data = await this.dataSource.create(project);

        return new Project(data);
    }

    async update(id, project) {
        const data = await this.dataSource.update(id, project);

        return new Project(data);
    }

    async delete(id) {
        return await this.dataSource.delete(id);
    }
}