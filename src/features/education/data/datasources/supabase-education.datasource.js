import { SupabaseCrudDataSource } from "../../../../shared/data/datasources/supabase-crud.datasource.js";
import { supabase } from "../../../../config/supabase/supabase-client.js";
import {
    TABLES,
    EDUCATION_SUBJECT_COLUMNS as COLUMN,
} from "../../../../core/constants/database.constants.js";

export class SupabaseEducationDataSource extends SupabaseCrudDataSource {
    constructor() {
        super(TABLES.EDUCATION);
    }

    async getAll() {
        const [rows, subjectsByEducation] = await Promise.all([
            super.getAll(),
            this.#fetchSubjects(),
        ]);

        return rows.map(row => ({
            ...row,
            subjects: subjectsByEducation.get(row.id) ?? [],
        }));
    }

    async create(education) {
        const { subjects = [], ...row } = education;

        const created = await super.create(row);

        await this.#syncSubjects(created.id, subjects);

        return { ...created, subjects };
    }

    async update(id, education) {
        const { subjects = [], ...row } = education;

        const updated = await super.update(id, row);

        await this.#syncSubjects(id, subjects);

        return { ...updated, subjects };
    }

    async delete(id) {
        await this.#removeSubjects(id);

        return await super.delete(id);
    }

    /** Reading is tolerant: a problem with the subjects table must not hide the education records. */
    async #fetchSubjects() {
        const { data, error } = await supabase
            .from(TABLES.EDUCATION_SUBJECTS)
            .select("*")
            .order(COLUMN.displayOrder, { ascending: true })
            .order("id", { ascending: true });

        if (error) {
            console.warn("[education] could not read subjects:", error.message);

            return new Map();
        }

        const grouped = new Map();

        for (const row of data) {
            const key = row[COLUMN.educationId];

            grouped.set(key, [...(grouped.get(key) ?? []), row[COLUMN.name]]);
        }

        return grouped;
    }

    async #removeSubjects(educationId) {
        const { error } = await supabase
            .from(TABLES.EDUCATION_SUBJECTS)
            .delete()
            .eq(COLUMN.educationId, educationId);

        if (error) throw error;
    }

    // NOTE: delete → insert is not atomic (same trade-off as project technologies).
    async #syncSubjects(educationId, subjects) {
        await this.#removeSubjects(educationId);

        if (subjects.length === 0) return;

        const { error } = await supabase
            .from(TABLES.EDUCATION_SUBJECTS)
            .insert(
                subjects.map((name, index) => ({
                    [COLUMN.educationId]: educationId,
                    [COLUMN.name]: name,
                    [COLUMN.displayOrder]: index + 1,
                }))
            );

        if (error) throw error;
    }
}
