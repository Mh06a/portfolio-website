import { categoryLabel, orderedCategories } from "../domain/skill-categories.js";

const pad = number => String(number).padStart(2, "0");

/** One group per category, in the official group order; skills keep their display_order. */
export function presentSkillGroups(skills) {
    return orderedCategories(skills).map((category, index) => ({
        number: pad(index + 1),
        category: categoryLabel(category),
        skills: skills
            .filter(skill => skill.category === category)
            .map(skill => skill.name),
    }));
}
