import { CertificateRepository } from "../../domain/repositories/certificate.repository.js";
import { Certificate } from "../../domain/models/certificate.model.js";
import { SupabaseCertificateDataSource } from "../datasources/supabase-certificate.datasource.js";

export class CertificateRepositoryImpl extends CertificateRepository {
    constructor() {
        super();
        this.dataSource = new SupabaseCertificateDataSource();
    }

    async getAll() {
        const data = await this.dataSource.getAll();

        return data.map(item => new Certificate(item));
    }

    async create(certificate) {
        const data = await this.dataSource.create(certificate);

        return new Certificate(data);
    }

    async update(id, certificate) {
        const data = await this.dataSource.update(id, certificate);

        return new Certificate(data);
    }

    async delete(id) {
        return await this.dataSource.delete(id);
    }
}