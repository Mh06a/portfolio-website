/** The skill groups shown on the portfolio, in display order. */
export const SKILL_CATEGORIES = Object.freeze([
    "Mobile Application Development",
    "Programming Languages",
    "Backend Development",
    "Databases & Integration",
    "Software Development Concepts",
    "Tools & Development Environments",
    "Soft Skills",
]);

/** Rows saved before the groups existed still display, under a readable name. */
const LEGACY_LABELS = { TECHNICAL: "Technical Skills", SOFT: "Soft Skills" };

export const categoryLabel = category => LEGACY_LABELS[category] ?? category;

/** Sort key: known groups in their official order, anything else after them. */
export function categoryRank(category) {
    const index = SKILL_CATEGORIES.indexOf(category);

    return index === -1 ? SKILL_CATEGORIES.length : index;
}

/** Distinct categories of the given skills, in display order. */
export function orderedCategories(skills) {
    return [...new Set(skills.map(skill => skill.category))]
        .sort((a, b) => categoryRank(a) - categoryRank(b));
}
