import { AuthRepository } from "../../domain/repositories/auth.repository.js";
import { SupabaseAuthDataSource } from "../datasources/supabase-auth.datasource.js";

export class AuthRepositoryImpl extends AuthRepository {
    constructor() {
        super();
        this.dataSource = new SupabaseAuthDataSource();
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