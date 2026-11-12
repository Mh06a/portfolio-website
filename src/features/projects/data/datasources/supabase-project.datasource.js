import { SupabaseCrudDataSource } from "../../../../shared/data/datasources/supabase-crud.datasource.js";
import { supabase } from "../../../../config/supabase/supabase-client.js";
import { TABLES } from "../../../../core/constants/database.constants.js";

const PROJECT_WITH_TECHNOLOGIES = `
    *,
    project_technologies (
        technologies (
            id,
            name
        )
    )
`;

/** Flattens the join table into `technologies: ["Flutter", ...]`. */
function toProjectRow({ project_technologies = [], ...project }) {
    return {
        ...project,
        technologies: project_technologies
            .map(item => item.technologies?.name)
            .filter(Boolean),
    };
}

export class SupabaseProjectDataSource extends SupabaseCrudDataSource {
    constructor() {
        super(TABLES.PROJECTS);
    }

    async getAll() {
        const { data, error } = await supabase
            .from(this.table)
            .select(PROJECT_WITH_TECHNOLOGIES)
            .order(this.orderBy, { ascending: true });

        if (error) throw error;

        return data.map(toProjectRow);
    }

    async getById(id) {
        const { data, error } = await supabase
            .from(this.table)
            .select(PROJECT_WITH_TECHNOLOGIES)
            .eq("id", id)
            .single();

        if (error) throw error;

        return toProjectRow(data);
    }

    /** Names of every technology already in the database (for the admin picker). */
    async getTechnologies() {
        const { data, error } = await supabase
            .from(TABLES.TECHNOLOGIES)
            .select("name")
            .order("name", { ascending: true });

        if (error) throw error;

        return data.map(item => item.name);
    }

    async create(project) {
        const { technologies = [], ...projectData } = project;

        const { data, error } = await supabase
            .from(this.table)
            .insert(projectData)
            .select()
            .single();

        if (error) throw error;

        await this.#syncTechnologies(data.id, technologies);

        return await this.getById(data.id);
    }

    async update(id, project) {
        const { technologies = [], ...projectData } = project;

        const { error } = await supabase
            .from(this.table)
            .update(projectData)
            .eq("id", id);

        if (error) throw error;

        await this.#syncTechnologies(id, technologies);

        return await this.getById(id);
    }

    // NOTE: delete → insert is not atomic. If you need all-or-nothing behaviour,
    // move this into a Postgres function (RPC) and call it from here.
    async #syncTechnologies(projectId, technologyNames) {
        const names = [...new Set(technologyNames.map(name => name.trim()))];

        const { error: deleteError } = await supabase
            .from(TABLES.PROJECT_TECHNOLOGIES)
            .delete()
            .eq("project_id", projectId);

        if (deleteError) throw deleteError;

        if (names.length === 0) return;

        const { data: existing, error: selectError } = await supabase
            .from(TABLES.TECHNOLOGIES)
            .select("id, name")
            .in("name", names);

        if (selectError) throw selectError;

        const known = new Set(existing.map(item => item.name));
        const missing = names.filter(name => !known.has(name));
        const technologies = [...existing];

        if (missing.length > 0) {
            const { data: inserted, error: insertError } = await supabase
                .from(TABLES.TECHNOLOGIES)
                .insert(missing.map(name => ({ name })))
                .select("id, name");

            if (insertError) throw insertError;

            technologies.push(...inserted);
        }

        const { error: relationError } = await supabase
            .from(TABLES.PROJECT_TECHNOLOGIES)
            .insert(
                technologies.map(technology => ({
                    project_id: projectId,
                    technology_id: technology.id,
                }))
            );

        if (relationError) throw relationError;
    }
}
