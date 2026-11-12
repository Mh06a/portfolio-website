import { text, optionalText, optionalNumber, textList } from "../../../../admin/shared/presentation/form-values.util.js";

/** Raw form values → Project entity fields (the image path is added by the controller). */
export function parseProjectForm(values) {
    return {
        name: text(values.name),
        description: text(values.description),
        github_url: optionalText(values.github_url),
        demo_url: optionalText(values.demo_url),
        project_date: optionalText(values.project_date),
        is_featured: Boolean(values.is_featured),
        display_order: optionalNumber(values.display_order),
        technologies: textList(values.technologies),
    };
}
