import { text, optionalText } from "../../../../admin/shared/presentation/form-values.util.js";

/** Raw form values → Experience entity fields. */
export function parseExperienceForm(values) {
    const isCurrent = Boolean(values.is_current);

    return {
        job_title: text(values.job_title),
        company_name: text(values.company_name),
        location: optionalText(values.location),
        employment_type: text(values.employment_type),
        description: text(values.description),
        start_date: text(values.start_date),
        is_current: isCurrent,
        end_date: isCurrent ? null : optionalText(values.end_date),
    };
}
