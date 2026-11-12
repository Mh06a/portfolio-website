import { ValidationError } from "../../../core/errors/app.error.js";

export const UPLOAD_RULES = Object.freeze({
    image: {
        types: ["image/jpeg", "image/png", "image/webp"],
        maxBytes: 2 * 1024 * 1024,
        description: "JPG, PNG or WebP, up to 2 MB",
    },
    document: {
        types: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
        maxBytes: 5 * 1024 * 1024,
        description: "Image (JPG, PNG, WebP) or PDF, up to 5 MB",
    },
    pdf: {
        types: ["application/pdf"],
        maxBytes: 5 * 1024 * 1024,
        description: "PDF only, up to 5 MB",
    },
});

/** Validates a file against the rules for its kind, stores it, and returns the storage path. */
export class UploadAssetUseCase {
    constructor(storageRepository) {
        this.storageRepository = storageRepository;
    }

    async execute(file, { folder, kind, field = "file" }) {
        const rule = UPLOAD_RULES[kind];

        if (!rule) {
            throw new Error(`Unknown upload kind: ${kind}`);
        }

        if (!file || !rule.types.includes(file.type)) {
            throw new ValidationError({ [field]: `Allowed: ${rule.description}` });
        }

        if (file.size > rule.maxBytes) {
            throw new ValidationError({ [field]: `File is too large. Allowed: ${rule.description}` });
        }

        const extension = (file.name.split(".").pop() || "bin")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

        const path = `${folder}/${Date.now()}.${extension}`;

        return await this.storageRepository.uploadFile(path, file);
    }
}
