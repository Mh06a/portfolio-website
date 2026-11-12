import {
    countMonthsInclusive,
    formatMonthYear,
} from "../../../core/utils/date.util.js";

function presentExperience(experience) {
    const start = formatMonthYear(experience.start_date).toUpperCase();
    const end = experience.is_current
        ? "PRESENT"
        : formatMonthYear(experience.end_date).toUpperCase();

    const months = countMonthsInclusive(
        experience.start_date,
        experience.is_current ? new Date().toISOString() : experience.end_date
    );

    return {
        dateLabel: `${start} – ${end}`,
        durationLabel: `${months}-month ${experience.employment_type.toLowerCase()}`,
        location: experience.location,
        company: experience.company_name,
        position: experience.job_title,
        employmentType: experience.employment_type,
        points: experience.description
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(Boolean),
    };
}

export function presentExperiences(experiences) {
    return experiences.map(presentExperience);
}
