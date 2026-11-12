import { parseProfileForm } from "./profile.form.js";

export class ProfileAdminController {
    constructor({ getProfile, updateProfile, uploadAsset }) {
        this.useCases = { getProfile, updateProfile, uploadAsset };
    }

    /** The saved profile, or null when none has been created yet. */
    async load() {
        return await this.useCases.getProfile.execute();
    }

    async save(values) {
        const current = await this.load();
        const { uploadAsset, updateProfile } = this.useCases;

        const profile_image_path = values.image
            ? await uploadAsset.execute(values.image, { folder: "profile", kind: "image", field: "profile_image_path" })
            : current?.profile_image_path ?? null;

        const cv_file_path = values.cv
            ? await uploadAsset.execute(values.cv, { folder: "profile", kind: "pdf", field: "cv_file_path" })
            : current?.cv_file_path ?? null;

        return await updateProfile.execute({
            ...parseProfileForm(values),
            profile_image_path,
            cv_file_path,
        });
    }
}
