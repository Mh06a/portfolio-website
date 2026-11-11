import { supabase } from "../../../config/supabase/supabase-client.js";
import { TABLES } from "../../../core/constants/database.constants.js";

export class SupabaseProjectDataSource {
    async getAll() {
        const { data, error } = await supabase
            .from(TABLES.PROJECTS)
            .select(`
                *,
                project_technologies (
                    technologies (
                        id,
                        name
                    )
                )
            `)
            .order("display_order", { ascending: true });

        if (error) throw error;

        return data.map(project => ({
            ...project,
            technologies: project.project_technologies
                .map(item => item.technologies)
                .filter(Boolean),
        }));
    }

    async getById(id) {
        const { data, error } = await supabase
            .from(TABLES.PROJECTS)
            .select(`
                *,
                project_technologies (
                    technologies (
                        id,
                        name
                    )
                )
            `)
            .eq("id", id)
            .single();

        if (error) throw error;

        return {
            ...data,
            technologies: data.project_technologies
                .map(item => item.technologies)
                .filter(Boolean),
        };
    }

    async syncTechnologies(projectId, technologyNames) {
        const { error: deleteError } = await supabase
            .from(TABLES.PROJECT_TECHNOLOGIES)
            .delete()
            .eq("project_id", projectId);

        if (deleteError) throw deleteError;

        if (technologyNames.length === 0) return;

        const { data: technologies, error: selectError } = await supabase
            .from(TABLES.TECHNOLOGIES)
            .select("id, name")
            .in("name", technologyNames);

        if (selectError) throw selectError;

        const existingNames = new Set(
            technologies.map(item => item.name)
        );

        const missingNames = technologyNames.filter(
            name => !existingNames.has(name)
        );

        if (missingNames.length > 0) {
            const { data: inserted, error: insertError } = await supabase
                .from(TABLES.TECHNOLOGIES)
                .insert(missingNames.map(name => ({ name })))
                .select("id, name");

            if (insertError) throw insertError;

            technologies.push(...inserted);
        }

        const relations = technologies.map(technology => ({
            project_id: projectId,
            technology_id: technology.id,
        }));

        const { error: relationError } = await supabase
            .from(TABLES.PROJECT_TECHNOLOGIES)
            .insert(relations);

        if (relationError) throw relationError;
    }

    async create(project) {
        const { technologies, ...projectData } = project;

        const { data, error } = await supabase
            .from(TABLES.PROJECTS)
            .insert(projectData)
            .select()
            .single();

        if (error) throw error;

        await this.syncTechnologies(data.id, technologies);

        return await this.getById(data.id);
    }

    async update(id, project) {
        const { technologies, ...projectData } = project;

        const { data, error } = await supabase
            .from(TABLES.PROJECTS)
            .update(projectData)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        await this.syncTechnologies(id, technologies);

        return await this.getById(id);
    }

    async delete(id) {
        const { error } = await supabase
            .from(TABLES.PROJECTS)
            .delete()
            .eq("id", id);

        if (error) throw error;

        return true;
    }
}