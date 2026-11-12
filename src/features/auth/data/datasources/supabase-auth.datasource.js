import { supabase } from "../../../../config/supabase/supabase-client.js";
import { TABLES } from "../../../../core/constants/database.constants.js";

export class SupabaseAuthDataSource {
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        const admin = await this.getAdminByUserId(data.user.id);

        if (!admin) {
            await supabase.auth.signOut();
            throw new Error("This account is not authorized as an admin");
        }

        return {
            user: data.user,
            session: data.session,
            admin,
        };
    }

    async getAdminByUserId(userId) {
        const { data, error } = await supabase
            .from(TABLES.ADMINS)
            .select("auth_user_id")
            .eq("auth_user_id", userId)
            .maybeSingle();

        if (error) throw error;

        return data;
    }

    async getCurrentAdmin() {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
            return null;
        }

        const admin = await this.getAdminByUserId(data.user.id);

        if (!admin) {
            await supabase.auth.signOut();
            return null;
        }

        return {
            user: data.user,
            admin,
        };
    }

    async signOut() {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;
    }
}