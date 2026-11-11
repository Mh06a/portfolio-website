import { supabase } from "../../../config/supabase/supabase-client.js";
import { TABLES } from "../../../core/constants/database.constants.js";

export class SupabaseCertificateDataSource {
    async getAll() {
        const { data, error } = await supabase
            .from(TABLES.CERTIFICATES)
            .select("*")
            .order("display_order", { ascending: true });

        if (error) throw error;

        return data;
    }

    async create(certificate) {
        const { data, error } = await supabase
            .from(TABLES.CERTIFICATES)
            .insert(certificate)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    async update(id, certificate) {
        const { data, error } = await supabase
            .from(TABLES.CERTIFICATES)
            .update(certificate)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    async delete(id) {
        const { error } = await supabase
            .from(TABLES.CERTIFICATES)
            .delete()
            .eq("id", id);

        if (error) throw error;

        return true;
    }
}