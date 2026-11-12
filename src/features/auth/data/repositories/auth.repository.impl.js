import { AuthRepository } from "../../domain/repositories/auth.repository.js";

export class AuthRepositoryImpl extends AuthRepository {
    constructor(dataSource) {
        super();
        this.dataSource = dataSource;
    }

    async signIn(email, password) {
        return await this.dataSource.signIn(email, password);
    }

    async getCurrentAdmin() {
        return await this.dataSource.getCurrentAdmin();
    }

    async signOut() {
        return await this.dataSource.signOut();
    }
}