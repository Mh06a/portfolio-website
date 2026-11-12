const fileNameOf = path => path?.split("/").pop() ?? "";

export function presentProfileForm(savedProfile, resolveAssetUrl) {
    const profile = savedProfile ?? {};

    return {
        isNew: !savedProfile,
        values: {
            full_name: profile.full_name ?? "",
            job_title: profile.job_title ?? "",
            short_bio: profile.short_bio ?? "",
            long_bio: profile.long_bio ?? "",
            location: profile.location ?? "",
            email: profile.email ?? "",
            phone: profile.phone ?? "",
            github_url: profile.github_url ?? "",
            linkedin_url: profile.linkedin_url ?? "",
        },
        imageUrl: resolveAssetUrl(profile.profile_image_path),
        imageName: fileNameOf(profile.profile_image_path),
        cvName: fileNameOf(profile.cv_file_path),
        cvUrl: resolveAssetUrl(profile.cv_file_path),
    };
}
