/** Session handling for the admin app. Caches the result so navigation stays instant. */
export class AuthAdminController {
    constructor({ signIn, signOut, getCurrentAdmin }) {
        this.useCases = { signIn, signOut, getCurrentAdmin };
        this.signedIn = undefined;
    }

    async isSignedIn() {
        if (this.signedIn === undefined) {
            try {
                this.signedIn = Boolean(await this.useCases.getCurrentAdmin.execute());
            } catch (error) {
                console.warn("[auth] could not read the session", error);
                this.signedIn = false;
            }
        }

        return this.signedIn;
    }

    async signIn(email, password) {
        await this.useCases.signIn.execute(email, password);

        this.signedIn = true;
    }

    async signOut() {
        await this.useCases.signOut.execute();

        this.signedIn = false;
    }
}
