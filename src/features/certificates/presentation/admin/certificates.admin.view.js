import { html } from "../../../../shared/presentation/utils/html.util.js";
import { pluralize } from "../../../../core/utils/collection.util.js";
import {
    pageHeader, pill, badge, emptyState, formCard, formActions, fieldRow, sideNote,
    inputField, fileField, radioGroup,
} from "../../../../admin/shared/presentation/components.js";
import { UPLOAD_RULES } from "../../../../shared/domain/usecases/upload-asset.usecase.js";
import { DELIVERY } from "./certificates.form.js";

const BASE = "#/certificates";

export function renderCertificateList(viewModel) {
    return html`
        ${pageHeader({
            title: "Certificates",
            subtitle: "Keep your credentials organized and easy to explore.",
            actionLabel: "Add Certificate",
            actionHref: `${BASE}/new`,
        })}

        <div class="pills">${pill(pluralize(viewModel.total, "certificate"))}</div>

        ${viewModel.items.length === 0
            ? emptyState("No certificates yet.", "Add Certificate", `${BASE}/new`)
            : html`
                <div class="stack">
                    ${viewModel.items.map(item => html`
                        <article class="card item-card">
                            <div class="item-card-head">
                                ${item.imageUrl && html`<img class="item-thumb" src="${item.imageUrl}" alt="" loading="lazy">`}
                                <div class="item-card-info">
                                    <h2 class="item-title">${item.name}</h2>
                                    <p class="item-sub">${item.organization}</p>
                                    <p class="item-meta">${item.meta}</p>
                                </div>
                                <div class="item-actions">
                                    <a class="btn btn-soft" href="${BASE}/${item.id}">Edit</a>
                                    <button class="btn btn-danger-soft" data-delete="${item.id}" data-name="${item.name}">Delete</button>
                                </div>
                            </div>

                            <div class="badges">
                                ${badge(item.deliveryLabel, "accent")}
                                ${item.viewUrl && html`
                                    <a class="btn btn-soft" href="${item.viewUrl}" target="_blank" rel="noopener noreferrer">View Certificate ↗</a>
                                `}
                            </div>
                        </article>
                    `)}
                </div>
            `}

        <p class="footnote">Certificates can link to an external page or to an uploaded PDF.</p>
    `;
}

export function renderCertificateForm(viewModel) {
    const { values } = viewModel;

    return html`
        ${pageHeader({
            title: viewModel.title,
            subtitle: "Keep your certificate details clear, complete, and up to date.",
            backLabel: "Certificates",
            backHref: BASE,
        })}

        <form class="form-layout" novalidate>
            ${formCard({
                title: "Certificate details",
                body: html`
                    ${inputField({ label: "Certificate Name", name: "name", value: values.name, required: true })}
                    ${inputField({ label: "Issuing Organization", name: "issuing_organization", value: values.issuing_organization, required: true })}
                    ${fieldRow(
                        inputField({ label: "Issue Date", name: "issue_date", type: "date", value: values.issue_date }),
                        inputField({ label: "Display Order", name: "display_order", type: "number", min: 0, step: 1, value: values.display_order, required: true })
                    )}
                    ${radioGroup({
                        label: "Delivery method", name: "delivery", value: values.delivery,
                        options: [
                            { value: DELIVERY.URL, label: "External URL" },
                            { value: DELIVERY.FILE, label: "Upload file (image or PDF)" },
                        ],
                        hint: "Use one source only. The unselected one is cleared on save.",
                    })}
                    <div data-delivery="${DELIVERY.URL}">
                        ${inputField({
                            label: "Certificate URL", name: "certificate_url", type: "url", value: values.certificate_url,
                            required: true, hint: "Link to the original credential.",
                        })}
                    </div>
                    <div data-delivery="${DELIVERY.FILE}">
                        ${fileField({
                            label: "Certificate file", name: "file", errorKey: "certificate_file_path",
                            accept: UPLOAD_RULES.document.types.join(","), buttonLabel: "Upload file",
                            hint: UPLOAD_RULES.document.description,
                            currentName: viewModel.fileName, emptyText: "No file uploaded",
                        })}
                    </div>
                    ${fileField({
                        label: "Preview image (optional)", name: "preview", errorKey: "certificate_image_path",
                        accept: UPLOAD_RULES.image.types.join(","), buttonLabel: "Upload preview",
                        hint: `Shown on the website card. ${UPLOAD_RULES.image.description}. If you upload an image as the certificate file, it is used automatically.`,
                        previewUrl: viewModel.previewUrl, currentName: viewModel.previewName, emptyText: "No preview uploaded",
                    })}
                    <p class="field-error" data-error-for="certificate"></p>
                    ${formActions({ cancelHref: BASE })}
                `,
            })}

            ${sideNote({
                title: "One certificate. One source.",
                text: "Link to the original credential or upload a PDF. The selected delivery appears on your portfolio.",
                tip: "Add a URL or a PDF — not both.",
            })}
        </form>
    `;
}
