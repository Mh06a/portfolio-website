import {
    humanizeField,
    isRequired,
} from "../../../../core/utils/validation.util.js";
import {
    isValidDate,
    isDateRangeValid,
} from "../../../../core/utils/date.util.js";

export const EMPLOYMENT_TYPES = [
    "Internship",
    "Full-time",
    "Part-time",
    "Freelance",
];

export function validateExperience(experience) {
    const errors = {};

    const requiredFields = [
        "job_title",
        "company_name",
        "employment_type",
        "description",
        "start_date",
    ];

    for (const field of requiredFields) {
        if (!isRequired(experience[field])) {
            errors[field] = `${humanizeField(field)} is required`;
        }
    }

    if (
        isRequired(experience.employment_type) &&
        !EMPLOYMENT_TYPES.includes(experience.employment_type)
    ) {
        errors.employment_type = "Invalid employment type";
    }

    if (
        isRequired(experience.start_date) &&
        !isValidDate(experience.start_date)
    ) {
        errors.start_date = "Invalid start date";
    }

    if (typeof experience.is_current !== "boolean") {
        errors.is_current = "is_current must be boolean";
    }

    if (experience.is_current === true) {
        if (
            experience.end_date !== null &&
            experience.end_date !== undefined &&
            experience.end_date !== ""
        ) {
            errors.end_date = "Current experience cannot have an end date";
        }
    } else {
        if (!isRequired(experience.end_date)) {
            errors.end_date = "End date is required for completed experience";
        } else if (!isValidDate(experience.end_date)) {
            errors.end_date = "Invalid end date";
        } else if (
            isValidDate(experience.start_date) &&
            !isDateRangeValid(experience.start_date, experience.end_date)
        ) {
            errors.end_date = "End date cannot be before start date";
        }
    }

    if (
        experience.display_order !== undefined &&
        (!Number.isInteger(experience.display_order) ||
            experience.display_order < 0)
    ) {
        errors.display_order = "Invalid display order";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}