import { html } from "../../utils/html.util.js";
import { BRAND_NAME } from "../../../../core/constants/app.constants.js";

export function renderFooter(viewModel) {
    return html`
        <footer class="footer">
            <div class="container">

                <a href="#home" class="footer-wordmark">${BRAND_NAME}</a>

                <div class="footer-content">

                    <div class="footer-brand">
                        <span>© ${viewModel.year}</span>
                    </div>

                    <p class="footer-credit">${viewModel.credit}</p>

                    <div class="footer-socials">
                        ${viewModel.socials.map(link => html`
                            <a href="${link.href}" target="_blank" rel="noopener noreferrer">
                                ${link.label} ↗
                            </a>
                        `)}
                    </div>

                </div>

            </div>
        </footer>
    `;
}
