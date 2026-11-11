export class Education {
    constructor({
        id = null,
        institution_name,
        institution_logo_path,
        degree,
        major,
        description,
        gpa = null,
        start_date,
        end_date = null,
        display_order = 0,
        created_at = null,
        updated_at = null,
    }) {
        Object.assign(this, {
            id,
            institution_name,
            institution_logo_path,
            degree,
            major,
            description,
            gpa,
            start_date,
            end_date,
            display_order,
            created_at,
            updated_at,
        });
    }
}