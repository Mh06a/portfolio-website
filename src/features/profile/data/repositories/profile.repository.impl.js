import { ProfileRepository } from "../../domain/repositories/profile.repository.js";
import { Profile } from "../../domain/models/profile.model.js";

export class ProfileRepositoryImpl extends ProfileRepository {
    constructor(dataSource) {
        super();
        this.dataSource = dataSource;
    }

    async getProfile() {
        const data = await this.dataSource.getProfile();

        return data ? new Profile(data) : null;
    }

    async updateProfile(profile) {
        const data = await this.dataSource.updateProfile(profile);

        return new Profile(data);
    }
}