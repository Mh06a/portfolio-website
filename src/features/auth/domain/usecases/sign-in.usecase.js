export class SignInUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    async execute(email, password) {
        if (!email?.trim() || !password) {
            throw new Error("Email and password are required");
        }

        return await this.authRepository.signIn(email.trim(), password);
    }
}