import { supabase } from "../../../../config/supabase/supabase-client.js";
import { TABLES } from "../../../../core/constants/database.constants.js";

/**
 * The portfolio has ONE profile row. We never assume its id:
 * we simply use the first row, and create it on the first save.
 */
export class SupabaseProfileDataSource {
    /** Returns the profile row, or null when the table is still empty. */
    async getProfile() {
        const { data, error } = await supabase
            .from(TABLES.PROFILE)
            .select("*")
            .order("id", { ascending: true })
            .limit(1)
            .maybeSingle();

        if (error) throw error;

        return data;
    }

    /** Updates the existing profile row, or inserts it if none exists yet. */
    async updateProfile(profile) {
        const existing = await this.getProfile();
        const query = existing
            ? supabase.from(TABLES.PROFILE).update(profile).eq("id", existing.id)
            : supabase.from(TABLES.PROFILE).insert(profile);

        const { data, error } = await query.select().single();

        if (error) throw error;

        return data;
    }
}
