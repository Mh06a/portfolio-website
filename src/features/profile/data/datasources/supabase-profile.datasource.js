import { supabase } from "../../../config/supabase/supabase-client.js";
import { TABLES } from "../../../core/constants/database.constants.js";

export class SupabaseProfileDataSource {
    async getProfile() {
        const { data, error } = await supabase
            .from(TABLES.PROFILE)
            .select("*")
            .eq("id", 1)
            .single();

        if (error) throw error;

        return data;
    }

    async updateProfile(profile) {
        const { data, error } = await supabase
            .from(TABLES.PROFILE)
            .update(profile)
            .eq("id", 1)
            .select()
            .single();

        if (error) throw error;

        return data;
    }
}