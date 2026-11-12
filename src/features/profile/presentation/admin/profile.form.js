import { text, optionalText } from "../../../../admin/shared/presentation/form-values.util.js";

/** Raw form values → Profile fields (image and CV paths are added by the controller). */
export function parseProfileForm(values) {
    return {
        full_name: text(values.full_name),
        job_title: text(values.job_title),
        short_bio: text(values.short_bio),
        long_bio: text(values.long_bio),
        location: text(values.location),
        email: text(values.email),
        phone: optionalText(values.phone),
        github_url: optionalText(values.github_url),
        linkedin_url: optionalText(values.linkedin_url),
    };
}
