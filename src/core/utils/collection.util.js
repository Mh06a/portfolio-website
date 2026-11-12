/** Next free display_order for a list of items that have a numeric display_order. */
export function nextDisplayOrder(items) {
    return Math.max(0, ...items.map(item => item.display_order ?? 0)) + 1;
}

/** Copy of the object without keys whose value is undefined. */
export function withoutUndefined(object) {
    return Object.fromEntries(
        Object.entries(object).filter(([, value]) => value !== undefined)
    );
}

/** pluralize(1, "project") → "1 project", pluralize(2, "project") → "2 projects". */
export function pluralize(count, singular, plural = `${singular}s`) {
    return `${count} ${count === 1 ? singular : plural}`;
}
