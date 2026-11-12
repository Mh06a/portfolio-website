import { presentSocialLinks } from "../../../shared/presentation/presenters/social-links.presenter.js";

function splitLines(text) {
    return String(text ?? "")
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(Boolean);
}

export function presentHero(profile, resolveAssetUrl) {
    if (!profile) return null;

    const [firstName, ...rest] = profile.full_name.trim().split(/\s+/);

    return {
        firstName,
        lastName: rest.join(" "),
        fullName: profile.full_name,
        jobTitle: profile.job_title,
        description: profile.short_bio,
        imageUrl: resolveAssetUrl(profile.profile_image_path),
        cvUrl: resolveAssetUrl(profile.cv_file_path),
        socials: presentSocialLinks(profile),
    };
}

export function presentAbout(profile) {
    if (!profile) return null;

    return { paragraphs: splitLines(profile.long_bio) };
}
