import { isRequired } from "../../../core/utils/validation.util.js";

const SKILL_CATEGORIES = ["TECHNICAL", "SOFT"];

const PROFICIENCY_LEVELS = [
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
];

export function validateSkill(skill) {
    const errors = {};

    if (!isRequired(skill.name)) {
        errors.name = "Skill name is required";
    }

    if (!SKILL_CATEGORIES.includes(skill.category)) {
        errors.category = "Invalid skill category";
    }

    if (!PROFICIENCY_LEVELS.includes(skill.proficiency_level)) {
        errors.proficiency_level = "Invalid proficiency level";
    }

    if (
        skill.display_order !== undefined &&
        (!Number.isInteger(skill.display_order) ||
            skill.display_order < 0)
    ) {
        errors.display_order = "Invalid display order";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}