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