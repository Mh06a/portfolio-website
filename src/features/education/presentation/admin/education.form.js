import { text, optionalText, optionalNumber, textList } from "../../../../admin/shared/presentation/form-values.util.js";

/** Raw form values → Education entity fields (the logo path is added by the controller). */
export function parseEducationForm(values) {
    return {
        institution_name: text(values.institution_name),
        degree: text(values.degree),
        major: text(values.major),
        description: text(values.description),
        start_date: text(values.start_date),
        end_date: optionalText(values.end_date),
        gpa: optionalNumber(values.gpa) ?? null,
        subjects: textList(values.subjects),
    };
}
