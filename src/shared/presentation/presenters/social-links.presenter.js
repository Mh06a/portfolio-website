import { toSafeUrl } from "../../../core/utils/url.util.js";

export function presentSocialLinks(profile) {
    return [
        { label: "GitHub", href: toSafeUrl(profile.github_url) },
        { label: "LinkedIn", href: toSafeUrl(profile.linkedin_url) },
    ].filter(link => link.href);
}
