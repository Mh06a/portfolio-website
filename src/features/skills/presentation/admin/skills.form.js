import { text, optionalNumber } from "../../../../admin/shared/presentation/form-values.util.js";

export function parseSkillForm(values) {
    return {
        name: text(values.name),
        category: text(values.category),
        proficiency_level: text(values.proficiency_level),
        display_order: optionalNumber(values.display_order),
    };
}
