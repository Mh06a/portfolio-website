export class Profile {
    constructor({
        id,
        full_name,
        job_title,
        short_bio,
        long_bio,
        location,
        email,
        phone = null,
        github_url = null,
        linkedin_url = null,
        profile_image_path = null,
        cv_file_path = null,
        created_at = null,
        updated_at = null,
    }) {
        Object.assign(this, {
            id,
            full_name,
            job_title,
            short_bio,
            long_bio,
            location,
            email,
            phone,
            github_url,
            linkedin_url,
            profile_image_path,
            cv_file_path,
            created_at,
            updated_at,
        });
    }
}