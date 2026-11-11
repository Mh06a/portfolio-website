import { supabase } from "../../../config/supabase/supabase-client.js";
import { TABLES } from "../../../core/constants/database.constants.js";

export class SupabaseEducationDataSource {
    async getAll() {
        const { data, error } = await supabase
            .from(TABLES.EDUCATION)
            .select("*")
            .order("display_order", { ascending: true });

        if (error) throw error;

        return data;
    }

    async create(education) {
        const { data, error } = await supabase
            .from(TABLES.EDUCATION)
            .insert(education)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    async update(id, education) {
        const { data, error } = await supabase
            .from(TABLES.EDUCATION)
            .update(education)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    async delete(id) {
        const { error } = await supabase
            .from(TABLES.EDUCATION)
            .delete()
            .eq("id", id);

        if (error) throw error;

        return true;
    }
}