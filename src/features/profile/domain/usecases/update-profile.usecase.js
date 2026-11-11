import { validateProfile } from "../validators/profile.validator.js";

export class UpdateProfileUseCase {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }

    async execute(profile) {
        const validation = validateProfile(profile);

        if (!validation.isValid) {
            throw new Error(JSON.stringify(validation.errors));
        }

        return await this.profileRepository.updateProfile(profile);
    }
}