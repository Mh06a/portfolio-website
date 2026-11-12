/** Pure helpers that turn raw form strings into the values the domain expects. */

export const text = value => String(value ?? "").trim();

export const optionalText = value => text(value) || null;

export function optionalNumber(value) {
    const trimmed = text(value);

    return trimmed === "" ? undefined : Number(trimmed);
}

export function textList(values) {
    return (Array.isArray(values) ? values : [])
        .map(text)
        .filter(Boolean);
}
