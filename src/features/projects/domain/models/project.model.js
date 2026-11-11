export class Project {
    constructor({
        id = null,
        name,
        description,
        image_path,
        github_url = null,
        demo_url = null,
        project_date = null,
        is_featured = false,
        display_order = 0,
        technologies = [],
        created_at = null,
        updated_at = null,
    }) {
        Object.assign(this, {
            id,
            name,
            description,
            image_path,
            github_url,
            demo_url,
            project_date,
            is_featured,
            display_order,
            technologies,
            created_at,
            updated_at,
        });
    }
}