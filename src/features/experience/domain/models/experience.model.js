export class Experience {
    constructor({
        id = null,
        job_title,
        company_name,
        location = null,
        employment_type,
        description,
        start_date,
        end_date = null,
        is_current = false,
        display_order = 0,
        created_at = null,
        updated_at = null,
    }) {
        Object.assign(this, {
            id,
            job_title,
            company_name,
            location,
            employment_type,
            description,
            start_date,
            end_date,
            is_current,
            display_order,
            created_at,
            updated_at,
        });
    }
}