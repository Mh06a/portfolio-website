export class DeleteCertificateUseCase {
    constructor(certificateRepository) {
        this.certificateRepository = certificateRepository;
    }

    async execute(id) {
        if (!id) {
            throw new Error("Certificate ID is required");
        }

        return await this.certificateRepository.delete(id);
    }
}