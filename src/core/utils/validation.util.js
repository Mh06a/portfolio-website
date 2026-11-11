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