import { toSafeUrl } from "../../../core/utils/url.util.js";

const DIRECT_URL_PATTERN = /^(https?:\/\/|\/|\.{1,2}\/)/;

/**
 * Turns a stored asset reference into a URL the browser can load.
 * - full URLs and local paths ("./assets/...") are used as they are
 * - anything else is treated as a storage key and resolved to its public URL
 */
export class ResolveAssetUrlUseCase {
    constructor(storageRepository) {
        this.storageRepository = storageRepository;
    }

    execute(path) {
        if (typeof path !== "string" || !path.trim()) {
            return null;
        }

        const value = path.trim();

        if (DIRECT_URL_PATTERN.test(value)) {
            return toSafeUrl(value);
        }

        return toSafeUrl(this.storageRepository.getPublicUrl(value));
    }
}
