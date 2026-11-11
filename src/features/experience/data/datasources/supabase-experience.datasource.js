import { supabase } from "../../../config/supabase/supabase-client.js";
import { TABLES } from "../../../core/constants/database.constants.js";

export class SupabaseExperienceDataSource {
    async getAll() {
        const { data, error } = await supabase
            .from(TABLES.EXPERIENCE)
            .select("*")
            .order("display_order", { ascending: true });

        if (error) throw error;

        return data;
    }

    async create(experience) {
        const { data, error } = await supabase
            .from(TABLES.EXPERIENCE)
            .insert(experience)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    async update(id, experience) {
        const { data, error } = await supabase
            .from(TABLES.EXPERIENCE)
            .update(experience)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    async delete(id) {
        const { error } = await supabase
            .from(TABLES.EXPERIENCE)
            .delete()
            .eq("id", id);

        if (error) throw error;

        return true;
    }
}