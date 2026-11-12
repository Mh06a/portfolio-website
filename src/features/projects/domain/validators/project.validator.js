import {
    humanizeField,
    isRequired,
    isValidUrl,
} from "../../../../core/utils/validation.util.js";

import { isValidDate } from "../../../../core/utils/date.util.js";

export function validateProject(project) {
    const errors = {};

    const requiredFields = [
        "name",
        "description",
    ];

    for (const field of requiredFields) {
        if (!isRequired(project[field])) {
            errors[field] = `${humanizeField(field)} is required`;
        }
    }

    const optionalUrls = ["github_url", "demo_url"];

    for (const field of optionalUrls) {
        if (isRequired(project[field]) && !isValidUrl(project[field])) {
            errors[field] = `Invalid ${field}`;
        }
    }

    if (
        project.project_date !== null &&
        project.project_date !== undefined &&
        project.project_date !== "" &&
        !isValidDate(project.project_date)
    ) {
        errors.project_date = "Invalid project date";
    }

    if (typeof project.is_featured !== "boolean") {
        errors.is_featured = "is_featured must be boolean";
    }

    if (
        project.display_order !== undefined &&
        (!Number.isInteger(project.display_order) ||
            project.display_order < 0)
    ) {
        errors.display_order = "Invalid display order";
    }

    if (
        !Array.isArray(project.technologies) ||
        project.technologies.some(
            item => typeof item !== "string" || !item.trim()
        )
    ) {
        errors.technologies = "Technologies must be an array of names";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}