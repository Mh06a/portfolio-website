const SAFE_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];

/**
 * Returns the URL only if it is safe to put in an href/src
 * (http, https, mailto, tel or a relative path). Otherwise null.
 * Protects against `javascript:` links coming from the database.
 */
export function toSafeUrl(value) {
    if (typeof value !== "string") {
        return null;
    }

    const url = value.trim();

    if (!url) {
        return null;
    }

    if (url.startsWith("/") || url.startsWith("./") || url.startsWith("../")) {
        return url;
    }

    try {
        return SAFE_PROTOCOLS.includes(new URL(url).protocol) ? url : null;
    } catch {
        return null;
    }
}
