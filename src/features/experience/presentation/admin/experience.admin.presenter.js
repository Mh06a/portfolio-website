import { formatMonthYear } from "../../../../core/utils/date.util.js";
import { EMPLOYMENT_TYPES } from "../../domain/validators/experience.validator.js";

export function presentExperienceList(experiences) {
    return {
        total: experiences.length,
        items: experiences.map(item => ({
            id: item.id,
            title: item.job_title,
            subtitle: [item.company_name, item.location].filter(Boolean).join(" · "),
            period: `${formatMonthYear(item.start_date)} – ${
                item.is_current ? "Present" : formatMonthYear(item.end_date)
            }`,
            type: item.employment_type,
            isCurrent: item.is_current,
            description: item.description,
        })),
    };
}

export function presentExperienceForm(experience) {
    const isEdit = Boolean(experience);

    return {
        id: experience?.id ?? null,
        title: isEdit ? "Edit experience" : "Add experience",
        values: {
            job_title: experience?.job_title ?? "",
            company_name: experience?.company_name ?? "",
            location: experience?.location ?? "",
            employment_type: experience?.employment_type ?? EMPLOYMENT_TYPES[0],
            is_current: experience?.is_current ?? false,
            start_date: experience?.start_date ?? "",
            end_date: experience?.end_date ?? "",
            description: experience?.description ?? "",
        },
        employmentTypes: EMPLOYMENT_TYPES.map(type => ({ value: type, label: type })),
    };
}
