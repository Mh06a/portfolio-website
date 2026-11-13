import { formatDay } from "../../../../core/utils/date.util.js";
import { categoryLabel } from "../../../skills/domain/skill-categories.js";

const pad = number => String(number).padStart(2, "0");

const stamp = item => item.updated_at ?? item.created_at ?? null;

export function presentOverview({ projects, skills, experiences, certificates, education }) {
    const updates = [
        ...projects.map(item => ({ title: item.name, kind: "Project", at: stamp(item) })),
        ...skills.map(item => ({ title: item.name, kind: categoryLabel(item.category), at: stamp(item) })),
        ...experiences.map(item => ({ title: item.job_title, kind: "Experience", at: stamp(item) })),
        ...certificates.map(item => ({ title: item.name, kind: "Certificate", at: stamp(item) })),
        ...education.map(item => ({ title: item.institution_name, kind: "Education", at: stamp(item) })),
    ]
        .filter(update => update.at)
        .sort((a, b) => new Date(b.at) - new Date(a.at))
        .slice(0, 4)
        .map(update => ({ ...update, dateLabel: formatDay(update.at) }));

    const skillGroups = new Set(skills.map(item => item.category)).size;
    const featured = projects.filter(item => item.is_featured).length;
    const current = experiences.filter(item => item.is_current).length;
    const issuers = new Set(certificates.map(item => item.issuing_organization)).size;

    return {
        stats: [
            { label: "Projects", value: pad(projects.length), hint: `${featured} featured` },
            { label: "Skills", value: pad(skills.length), hint: `${skillGroups} ${skillGroups === 1 ? "group" : "groups"}` },
            { label: "Experience", value: pad(experiences.length), hint: `${current} current` },
            { label: "Certificates", value: pad(certificates.length), hint: `${issuers} ${issuers === 1 ? "issuer" : "issuers"}` },
            { label: "Education", value: pad(education.length), hint: "academic records" },
        ],
        updates,
    };
}
