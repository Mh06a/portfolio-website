import { CrudAdminController } from "../../../../admin/shared/application/crud.admin.controller.js";
import { nextDisplayOrder } from "../../../../core/utils/collection.util.js";
import { parseSkillForm } from "./skills.form.js";

export class SkillsAdminController extends CrudAdminController {
    async buildEntity(values) {
        return parseSkillForm(values);
    }

    /** Order is scoped to the category: a new skill goes to the end of its own category. */
    nextOrderFor(entity, skills) {
        return nextDisplayOrder(skills.filter(skill => skill.category === entity.category));
    }

    toEditable(item) {
        return {
            name: item.name,
            category: item.category,
            proficiency_level: item.proficiency_level,
            display_order: item.display_order,
        };
    }

    /** `orderedIds` are the skill ids of ONE category, in their new visual order. */
    async reorder(orderedIds) {
        const skills = await this.list();
        const ordered = orderedIds
            .map(id => skills.find(skill => String(skill.id) === String(id)))
            .filter(Boolean);

        await this.applyOrder(ordered);
    }
}
