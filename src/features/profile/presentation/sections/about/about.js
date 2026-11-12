import { html } from "../../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../../shared/presentation/components/empty-note/empty-note.js";

export function renderAbout(viewModel) {
    const hasContent = viewModel && viewModel.paragraphs.length > 0;

    return html`
        <section class="section about" id="about">
            <div class="container">

                <span class="section-label">01 / BACKGROUND</span>
                <h2 class="section-title">About Me</h2>

                ${hasContent
                    ? html`
                        <div class="about-description">
                            ${viewModel.paragraphs.map(text => html`<p>${text}</p>`)}

                            <div class="about-languages">
                                <span>Arabic</span>
                                <span>English</span>
                            </div>
                        </div>
                    `
                    : renderEmptyNote("The About section has not been written yet.")}

            </div>
        </section>
    `;
}
