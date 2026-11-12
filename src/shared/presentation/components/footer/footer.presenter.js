import { presentSocialLinks } from "../../presenters/social-links.presenter.js";

export function presentFooter(profile) {
    return {
        year: new Date().getFullYear(),
        credit: profile ? `Designed & Developed by ${profile.full_name}` : "",
        socials: profile ? presentSocialLinks(profile) : [],
    };
}
