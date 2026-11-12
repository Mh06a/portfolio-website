import { formatMonthYear } from "../../../../core/utils/date.util.js";

export function presentEducationList(educations) {
    return {
        total: educations.length,
        items: educations.map(item => ({
            id: item.id,
            institution: item.institution_name,
            program: `${item.degree} · ${item.major}`,
            period: [
                `${formatMonthYear(item.start_date)} – ${item.end_date ? formatMonthYear(item.end_date) : "Present"}`,
                item.gpa !== null && item.gpa !== undefined ? `GPA ${item.gpa} / 5` : null,
            ].filter(Boolean).join(" · "),
            subjects: item.subjects,
        })),
    };
}

export function presentEducationForm(education, { resolveAssetUrl }) {
    return {
        id: education?.id ?? null,
        title: education ? "Edit education" : "Add education",
        values: {
            institution_name: education?.institution_name ?? "",
            degree: education?.degree ?? "",
            major: education?.major ?? "",
            start_date: education?.start_date ?? "",
            end_date: education?.end_date ?? "",
            gpa: education?.gpa ?? "",
            description: education?.description ?? "",
            subjects: education?.subjects ?? [],
        },
        logoUrl: resolveAssetUrl(education?.institution_logo_path),
        logoName: education?.institution_logo_path?.split("/").pop() ?? "",
    };
}
