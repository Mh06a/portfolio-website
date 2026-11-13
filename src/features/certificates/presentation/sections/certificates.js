import { html } from "../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../shared/presentation/components/empty-note/empty-note.js";
import { renderSectionAside } from "../../../../shared/presentation/components/section-header/section-header.js";

function renderPicture(certificate) {
    const image = certificate.imageUrl
        ? html`<img src="${certificate.imageUrl}" alt="${certificate.name} certificate" loading="lazy">`
        : "";

    return certificate.url
        ? html`<a class="certificate-thumb" href="${certificate.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${certificate.name}">${image}</a>`
        : html`<div class="certificate-thumb">${image}</div>`;
}

function renderCertificate(certificate) {
    return html`
        <article class="certificate-card">

            <span class="certificate-number">${certificate.number}</span>

            ${renderPicture(certificate)}

            <div class="certificate-body">
                <h3>${certificate.name}</h3>
                <p>${certificate.organization}</p>
            </div>

            ${certificate.url && html`
                <a href="${certificate.url}" class="certificate-link" target="_blank" rel="noopener noreferrer">
                    View <span>↗</span>
                </a>
            `}

        </article>
    `;
}

export function renderCertificates(certificates) {
    return html`
        <section class="section certificates" id="certificates">
            <div class="container section-grid">

                ${renderSectionAside({ index: "06", label: "Continuous learning", title: "Certifications" })}

                <div class="section-main">
                    ${certificates.length === 0
                        ? renderEmptyNote("No certificates have been added yet.")
                        : html`<div class="certificates-list">${certificates.map(renderCertificate)}</div>`}
                </div>

            </div>
        </section>
    `;
}
