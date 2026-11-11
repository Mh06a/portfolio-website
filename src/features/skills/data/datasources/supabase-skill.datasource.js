import { supabase } from "../../../config/supabase/supabase-client.js";
import { TABLES } from "../../../core/constants/database.constants.js";

export class SupabaseSkillDataSource {
    async getAll() {
        const { data, error } = await supabase
            .from(TABLES.SKILLS)
            .select("*")
            .order("display_order", { ascending: true });

        if (error) throw error;

        return data;
    }

    async create(skill) {
        const { data, error } = await supabase
            .from(TABLES.SKILLS)
            .insert(skill)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    async update(id, skill) {
        const { data, error } = await supabase
            .from(TABLES.SKILLS)
            .update(skill)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    async delete(id) {
        const { error } = await supabase
            .from(TABLES.SKILLS)
            .delete()
            .eq("id", id);

        if (error) throw error;

        return true;
    }
}