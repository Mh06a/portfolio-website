export class GetCurrentAdminUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    async execute() {
        return await this.authRepository.getCurrentAdmin();
    }
}