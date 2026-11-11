export class Skill {
    constructor({
        id = null,
        name,
        category,
        proficiency_level,
        display_order = 0,
        created_at = null,
        updated_at = null,
    }) {
        Object.assign(this, {
            id,
            name,
            category,
            proficiency_level,
            display_order,
            created_at,
            updated_at,
        });
    }
}