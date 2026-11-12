import { supabase } from "../../../config/supabase/supabase-client.js";

/**
 * Generic CRUD over one Supabase table.
 * Feature data sources extend it and only add what is specific to them.
 */
export class SupabaseCrudDataSource {
    constructor(table, { orderBy = "display_order" } = {}) {
        this.table = table;
        this.orderBy = orderBy;
    }

    async getAll() {
        const { data, error } = await supabase
            .from(this.table)
            .select("*")
            .order(this.orderBy, { ascending: true });

        if (error) throw error;

        return data;
    }

    async create(row) {
        const { data, error } = await supabase
            .from(this.table)
            .insert(row)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    async update(id, row) {
        const { data, error } = await supabase
            .from(this.table)
            .update(row)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    async delete(id) {
        const { error } = await supabase
            .from(this.table)
            .delete()
            .eq("id", id);

        if (error) throw error;

        return true;
    }
}
