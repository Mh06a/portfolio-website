export function isRequired(value) {
    if (typeof value === "string") {
        return value.trim().length > 0;
    }

    return value !== null && value !== undefined;
}

export function isValidEmail(email) {
    if (typeof email !== "string") {
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email.trim());
}

export function isValidUrl(value) {
    if (typeof value !== "string" || !value.trim()) {
        return false;
    }

    try {
        const url = new URL(value);

        return url.protocol === "https:" || url.protocol === "http:";
    } catch {
        return false;
    }
}

const FIELD_NAMES = {
    cv_file_path: "CV file",
    profile_image_path: "Profile image",
    institution_logo_path: "Institution logo",
    image_path: "Project image",
};

/** "full_name" → "Full name", with friendly names for file fields. */
export function humanizeField(field) {
    if (FIELD_NAMES[field]) return FIELD_NAMES[field];

    const words = field.replace(/_/g, " ");

    return words.charAt(0).toUpperCase() + words.slice(1);
}
