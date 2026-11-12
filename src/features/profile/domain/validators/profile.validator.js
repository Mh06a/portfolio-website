import {
    humanizeField,
    isRequired,
    isValidEmail,
    isValidUrl,
} from "../../../../core/utils/validation.util.js";

export function validateProfile(profile) {
    const errors = {};

    const requiredFields = [
        "full_name",
        "job_title",
        "short_bio",
        "long_bio",
        "location",
        "email",
        "profile_image_path",
        "cv_file_path",
    ];

    for (const field of requiredFields) {
        if (!isRequired(profile[field])) {
            errors[field] = `${humanizeField(field)} is required`;
        }
    }

    if (
        isRequired(profile.email) &&
        !isValidEmail(profile.email)
    ) {
        errors.email = "Invalid email address";
    }

    const optionalUrls = ["github_url", "linkedin_url"];

    for (const field of optionalUrls) {
        if (isRequired(profile[field]) && !isValidUrl(profile[field])) {
            errors[field] = `Invalid ${field}`;
        }
    }

    if (
        isRequired(profile.phone) &&
        typeof profile.phone !== "string"
    ) {
        errors.phone = "Invalid phone number";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}