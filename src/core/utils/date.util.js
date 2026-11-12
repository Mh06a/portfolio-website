const MONTH_FORMATS = Object.freeze({
    short: { month: "short", year: "numeric", timeZone: "UTC" },
    long: { month: "long", year: "numeric", timeZone: "UTC" },
    day: { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" },
});

export function isValidDate(value) {
    if (!value) {
        return false;
    }

    const date = new Date(value);

    return !Number.isNaN(date.getTime());
}

export function isDateRangeValid(startDate, endDate) {
    if (!isValidDate(startDate)) {
        return false;
    }

    if (endDate === null || endDate === undefined) {
        return true;
    }

    if (!isValidDate(endDate)) {
        return false;
    }

    return new Date(startDate) <= new Date(endDate);
}

/** "2026-01-15" → "Jan 2026" (style "short") or "January 2026" (style "long"). */
export function formatMonthYear(value, style = "short") {
    if (!isValidDate(value)) {
        return "";
    }

    return new Intl.DateTimeFormat("en-US", MONTH_FORMATS[style]).format(new Date(value));
}

/** "2026-11-07" → "Nov 07, 2026". */
export function formatDay(value) {
    return formatMonthYear(value, "day");
}

export function getYear(value) {
    return isValidDate(value) ? new Date(value).getUTCFullYear() : null;
}

/** Number of calendar months touched by the range, both ends included (Jan→May = 5). */
export function countMonthsInclusive(startDate, endDate) {
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return 0;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    return (
        (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
        (end.getUTCMonth() - start.getUTCMonth()) +
        1
    );
}
