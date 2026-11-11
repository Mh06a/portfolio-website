export class GetCertificatesUseCase {
    constructor(certificateRepository) {
        this.certificateRepository = certificateRepository;
    }

    async execute() {
        return await this.certificateRepository.getAll();
    }
}