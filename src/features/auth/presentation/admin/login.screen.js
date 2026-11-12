import { renderLogin } from "./login.view.js";

export function createLoginScreen(auth) {
    return {
        breadcrumb: "Login",
        render: renderLogin,

        bind(root, viewModel, ctx) {
            const form = root.querySelector("#login-form");
            const error = root.querySelector("#login-error");
            const button = form.querySelector('button[type="submit"]');

            form.addEventListener("submit", async event => {
                event.preventDefault();

                error.textContent = "";
                button.disabled = true;

                try {
                    await auth.signIn(form.email.value, form.password.value);

                    ctx.navigate("/");
                } catch (failure) {
                    error.textContent = failure.message || "Could not sign in";
                } finally {
                    button.disabled = false;
                }
            });
        },
    };
}
