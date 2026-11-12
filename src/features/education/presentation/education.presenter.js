import {
    formatMonthYear,
    getYear,
} from "../../../core/utils/date.util.js";

function splitLines(text) {
    return String(text ?? "")
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(Boolean);
}

function presentEducation(education, resolveAssetUrl) {
    const endYear = education.end_date ? getYear(education.end_date) : "PRESENT";
    const endLabel = education.end_date ? formatMonthYear(education.end_date, "long") : "Present";

    return {
        dateLabel: `EDUCATION / ${getYear(education.start_date)} – ${endYear}`,
        title: `${education.degree} in ${education.major}`,
        institution: education.institution_name,
        logoUrl: resolveAssetUrl(education.institution_logo_path),
        period: `${formatMonthYear(education.start_date, "long")} – ${endLabel}`,
        gpa: education.gpa ?? null,
        paragraphs: splitLines(education.description),
        subjects: education.subjects,
    };
}

export function presentEducations(educations, resolveAssetUrl) {
    return educations.map(education => presentEducation(education, resolveAssetUrl));
}
