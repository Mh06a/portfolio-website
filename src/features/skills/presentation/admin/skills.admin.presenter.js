import { pluralize } from "../../../../core/utils/collection.util.js";
import { PROFICIENCY_LEVELS } from "../../domain/validators/skill.validator.js";
import { SKILL_CATEGORIES, categoryLabel, orderedCategories } from "../../domain/skill-categories.js";

const capitalize = word => word.charAt(0) + word.slice(1).toLowerCase();

const pad = number => String(number).padStart(2, "0");

export function presentSkillList(skills) {
    const sorted = [...skills].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

    const groups = orderedCategories(sorted)
        .map(category => {
            const items = sorted.filter(skill => skill.category === category);

            return {
                category,
                title: categoryLabel(category),
                countLabel: pluralize(items.length, "skill"),
                items: items.map((skill, index) => ({
                    id: skill.id,
                    number: pad(index + 1),
                    name: skill.name,
                    level: capitalize(skill.proficiency_level),
                })),
            };
        })
        .filter(group => group.items.length > 0);

    return {
        total: skills.length,
        categoryCount: groups.length,
        groups,
    };
}

export function presentSkillForm(skill) {
    return {
        id: skill?.id ?? null,
        title: skill ? "Edit skill" : "Add skill",
        values: {
            name: skill?.name ?? "",
            category: skill?.category ?? SKILL_CATEGORIES[0],
            proficiency_level: skill?.proficiency_level ?? PROFICIENCY_LEVELS[0],
            display_order: skill?.display_order ?? "",
        },
        categories: SKILL_CATEGORIES.map(value => ({ value, label: value })),
        levels: PROFICIENCY_LEVELS.map(value => ({ value, label: capitalize(value) })),
    };
}
