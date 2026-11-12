import { html } from "../../../../shared/presentation/utils/html.util.js";
import { renderEmptyNote } from "../../../../shared/presentation/components/empty-note/empty-note.js";

function renderPicture(certificate) {
    const image = html`<img src="${certificate.imageUrl}" alt="${certificate.name} certificate" loading="lazy">`;

    return certificate.url
        ? html`<a class="certificate-thumb" href="${certificate.url}" target="_blank" rel="noopener noreferrer">${image}</a>`
        : html`<div class="certificate-thumb">${image}</div>`;
}

function renderCertificate(certificate) {
    return html`
        <article class="certificate-card">

            ${certificate.imageUrl && renderPicture(certificate)}

            <div class="certificate-body">
                <span class="certificate-number">${certificate.number} / CERTIFICATION</span>

                <h3>${certificate.name}</h3>

                <p>${certificate.organization}</p>

                ${certificate.url && html`
                    <a href="${certificate.url}" class="certificate-link" target="_blank" rel="noopener noreferrer">
                        View certificate ↗
                    </a>
                `}
            </div>

        </article>
    `;
}

export function renderCertificates(certificates) {
    return html`
        <section class="section certificates" id="certificates">
            <div class="container">

                <span class="section-label">06 / CONTINUOUS LEARNING</span>
                <h2 class="section-title">Certifications</h2>

                ${certificates.length === 0
                    ? renderEmptyNote("No certificates have been added yet.")
                    : html`<div class="certificates-grid">${certificates.map(renderCertificate)}</div>`}

            </div>
        </section>
    `;
}
