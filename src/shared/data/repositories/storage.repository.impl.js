import { StorageRepository } from "../../domain/repositories/storage.repository.js";

export class StorageRepositoryImpl extends StorageRepository {
    constructor(dataSource) {
        super();
        this.dataSource = dataSource;
    }

    async uploadFile(path, file) {
        return await this.dataSource.upload(path, file);
    }

    async deleteFile(path) {
        return await this.dataSource.remove(path);
    }

    getPublicUrl(path) {
        return this.dataSource.getPublicUrl(path);
    }
}
