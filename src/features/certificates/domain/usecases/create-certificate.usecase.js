import { validateCertificate } from "../validators/certificate.validator.js";

export class CreateCertificateUseCase {
    constructor(certificateRepository) {
        this.certificateRepository = certificateRepository;
    }

    async execute(certificate) {
        const validation = validateCertificate(certificate);

        if (!validation.isValid) {
            throw new Error(JSON.stringify(validation.errors));
        }

        return await this.certificateRepository.create(certificate);
    }
}