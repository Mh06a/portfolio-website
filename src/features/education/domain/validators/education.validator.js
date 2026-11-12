import {
    humanizeField,
    isRequired,
} from "../../../../core/utils/validation.util.js";
import {
    isValidDate,
    isDateRangeValid,
} from "../../../../core/utils/date.util.js";

export function validateEducation(education) {
    const errors = {};

    const requiredFields = [
        "institution_name",
        "institution_logo_path",
        "degree",
        "major",
        "description",
        "start_date",
    ];

    for (const field of requiredFields) {
        if (!isRequired(education[field])) {
            errors[field] = `${humanizeField(field)} is required`;
        }
    }

    if (
        isRequired(education.start_date) &&
        !isValidDate(education.start_date)
    ) {
        errors.start_date = "Invalid start date";
    }

    if (
        education.end_date !== null &&
        education.end_date !== undefined &&
        education.end_date !== ""
    ) {
        if (!isValidDate(education.end_date)) {
            errors.end_date = "Invalid end date";
        } else if (
            isValidDate(education.start_date) &&
            !isDateRangeValid(education.start_date, education.end_date)
        ) {
            errors.end_date = "End date cannot be before start date";
        }
    }

    if (
        education.gpa !== null &&
        education.gpa !== undefined &&
        education.gpa !== ""
    ) {
        const gpa = Number(education.gpa);

        if (!Number.isFinite(gpa) || gpa < 0 || gpa > 5) {
            errors.gpa = "GPA must be between 0 and 5";
        }
    }

    if (
        education.subjects !== undefined &&
        (!Array.isArray(education.subjects) ||
            education.subjects.some(item => typeof item !== "string" || !item.trim()))
    ) {
        errors.subjects = "Subjects must be a list of names";
    }

    if (
        education.display_order !== undefined &&
        (!Number.isInteger(education.display_order) ||
            education.display_order < 0)
    ) {
        errors.display_order = "Invalid display order";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}