import { html } from "../../../../shared/presentation/utils/html.util.js";
import { BRAND_NAME } from "../../../../core/constants/app.constants.js";

export function renderLogin() {
    return html`
        <div class="login-page">
            <strong class="login-brand">${BRAND_NAME}</strong>

            <div class="login-grid">
                <div class="login-intro">
                    <span class="eyebrow">THE DATA BEHIND THE SITE</span>
                    <h1>Build. Refine.<br>Make it yours.</h1>
                    <p>A focused workspace for the stories, skills, and applications that make up your portfolio.</p>
                    <ul class="login-list">
                        <li><span>01</span> Profile &amp; background</li>
                        <li><span>02</span> Projects &amp; technologies</li>
                        <li><span>03</span> Skills &amp; credentials</li>
                    </ul>
                </div>

                <form class="card login-card" id="login-form" novalidate>
                    <span class="eyebrow">ADMIN ACCESS</span>
                    <h2>Welcome back</h2>
                    <p class="card-hint">Sign in to manage your portfolio.</p>

                    <div class="field">
                        <label class="field-label" for="login-email">Email</label>
                        <input class="input" id="login-email" name="email" type="email" autocomplete="username" required>
                    </div>

                    <div class="field">
                        <label class="field-label" for="login-password">Password</label>
                        <input class="input" id="login-password" name="password" type="password" autocomplete="current-password" required>
                    </div>

                    <p class="field-error" id="login-error" role="alert"></p>

                    <button class="btn btn-primary btn-block" type="submit">Sign in →</button>

                    <p class="field-hint">This sign-in is for the site owner only.</p>
                </form>
            </div>

            <a class="link" href="./index.html">← Back to website</a>
        </div>
    `;
}
