import { html } from "../../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../../shared/presentation/components/empty-note/empty-note.js";
import { renderSectionAside } from "../../../../../shared/presentation/components/section-header/section-header.js";

function renderContent(viewModel) {
    const [lead, ...rest] = viewModel.paragraphs;

    return html`
        <div class="about-description">
            <p class="about-lead">${lead}</p>

            ${rest.length > 0 && html`
                <div class="about-body">
                    ${rest.map(text => html`<p>${text}</p>`)}
                </div>
            `}

            <div class="about-languages">
                <span class="about-languages-label">Languages</span>
                <span>Arabic</span>
                <span>English</span>
            </div>
        </div>
    `;
}

export function renderAbout(viewModel) {
    const hasContent = viewModel && viewModel.paragraphs.length > 0;

    return html`
        <section class="section about" id="about">
            <div class="container section-grid">

                ${renderSectionAside({ index: "01", label: "Background", title: "About Me" })}

                <div class="section-main">
                    ${hasContent
                        ? renderContent(viewModel)
                        : renderEmptyNote("The About section has not been written yet.")}
                </div>

            </div>
        </section>
    `;
}
