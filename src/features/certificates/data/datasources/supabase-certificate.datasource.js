import { SupabaseCrudDataSource } from "../../../../shared/data/datasources/supabase-crud.datasource.js";
import { TABLES } from "../../../../core/constants/database.constants.js";

export class SupabaseCertificateDataSource extends SupabaseCrudDataSource {
    constructor() {
        super(TABLES.CERTIFICATES);
    }
}
