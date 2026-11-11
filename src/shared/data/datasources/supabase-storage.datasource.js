import { supabase } from "../../../config/supabase/supabase-client.js";

export class SupabaseStorageDataSource {
    constructor() {
        this.bucket = "portfolio-assets";
    }

    async upload(path, file) {
        const { data, error } = await supabase.storage
            .from(this.bucket)
            .upload(path, file, {
                upsert: true,
            });

        if (error) throw error;

        return data.path;
    }

    async remove(path) {
        const { error } = await supabase.storage
            .from(this.bucket)
            .remove([path]);

        if (error) throw error;
    }

    getPublicUrl(path) {
        const { data } = supabase.storage
            .from(this.bucket)
            .getPublicUrl(path);

        return data.publicUrl;
    }
}