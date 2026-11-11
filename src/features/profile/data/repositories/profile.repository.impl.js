import { ProfileRepository } from "../../domain/repositories/profile.repository.js";
import { Profile } from "../../domain/models/profile.model.js";
import { SupabaseProfileDataSource } from "../datasources/supabase-profile.datasource.js";

export class ProfileRepositoryImpl extends ProfileRepository {
    constructor() {
        super();
        this.dataSource = new SupabaseProfileDataSource();
    }

    async getProfile() {
        const data = await this.dataSource.getProfile();

        return new Profile(data);
    }

    async updateProfile(profile) {
        const data = await this.dataSource.updateProfile(profile);

        return new Profile(data);
    }
}