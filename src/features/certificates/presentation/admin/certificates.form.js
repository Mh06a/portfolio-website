import { text, optionalText, optionalNumber } from "../../../../admin/shared/presentation/form-values.util.js";

export const DELIVERY = Object.freeze({ URL: "url", FILE: "file" });

/** Raw form values → Certificate entity fields (the file path is resolved by the controller). */
export function parseCertificateForm(values) {
    return {
        name: text(values.name),
        issuing_organization: text(values.issuing_organization),
        issue_date: optionalText(values.issue_date),
        display_order: optionalNumber(values.display_order),
        certificate_url: values.delivery === DELIVERY.URL ? optionalText(values.certificate_url) : null,
    };
}
