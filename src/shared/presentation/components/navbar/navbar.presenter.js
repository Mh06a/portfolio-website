export function presentNavbar(profile, resolveAssetUrl) {
    return {
        cvUrl: profile ? resolveAssetUrl(profile.cv_file_path) : null,
    };
}
