export class SignOutUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    async execute() {
        return await this.authRepository.signOut();
    }
}