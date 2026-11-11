import { validateCertificate } from "../validators/certificate.validator.js";

export class UpdateCertificateUseCase {
    constructor(certificateRepository) {
        this.certificateRepository = certificateRepository;
    }

    async execute(id, certificate) {
        if (!id) {
            throw new Error("Certificate ID is required");
        }

        const validation = validateCertificate(certificate);

        if (!validation.isValid) {
            throw new Error(JSON.stringify(validation.errors));
        }

        return await this.certificateRepository.update(id, certificate);
    }
}