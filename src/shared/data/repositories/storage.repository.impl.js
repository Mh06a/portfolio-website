import { StorageRepository } from "../../domain/repositories/storage.repository.js";
import { SupabaseStorageDataSource } from "../datasources/supabase-storage.datasource.js";

export class StorageRepositoryImpl extends StorageRepository {
    constructor() {
        super();
        this.dataSource = new SupabaseStorageDataSource();
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