import { toSafeUrl } from "../../../core/utils/url.util.js";

const stripProtocol = url => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function presentContact(profile) {
    if (!profile) return [];

    const github = toSafeUrl(profile.github_url);
    const linkedin = toSafeUrl(profile.linkedin_url);

    return [
        profile.email && {
            label: "EMAIL",
            value: profile.email,
            href: `mailto:${profile.email}`,
        },
        profile.phone && {
            label: "PHONE",
            value: profile.phone,
            href: `tel:${profile.phone.replace(/\s+/g, "")}`,
        },
        github && { label: "GITHUB", value: stripProtocol(github), href: github },
        linkedin && { label: "LINKEDIN", value: stripProtocol(linkedin), href: linkedin },
    ]
        .filter(Boolean)
        .map(item => ({ ...item, isExternal: item.href.startsWith("http") }));
}
