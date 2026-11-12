import { formatMonthYear } from "../../../../core/utils/date.util.js";
import { DELIVERY } from "./certificates.form.js";

const IMAGE_EXTENSION = /\.(jpe?g|png|webp)$/i;

const pickImage = (certificate, resolveAssetUrl) =>
    resolveAssetUrl(certificate.certificate_image_path) ??
    (IMAGE_EXTENSION.test(certificate.certificate_file_path ?? "")
        ? resolveAssetUrl(certificate.certificate_file_path)
        : null);

export function presentCertificateList(certificates, resolveAssetUrl) {
    const sorted = [...certificates].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

    return {
        total: certificates.length,
        items: sorted.map(item => ({
            id: item.id,
            name: item.name,
            organization: item.issuing_organization,
            meta: [
                item.issue_date ? `Issued ${formatMonthYear(item.issue_date)}` : null,
                `Display order ${item.display_order}`,
            ].filter(Boolean).join(" · "),
            deliveryLabel: item.certificate_url ? "External URL" : "Uploaded file",
            imageUrl: pickImage(item, resolveAssetUrl),
            viewUrl: resolveAssetUrl(item.certificate_url) ?? resolveAssetUrl(item.certificate_file_path),
        })),
    };
}

export function presentCertificateForm(certificate, { resolveAssetUrl }) {
    const hasFile = Boolean(certificate?.certificate_file_path);

    return {
        id: certificate?.id ?? null,
        title: certificate ? "Edit certificate" : "Add certificate",
        values: {
            name: certificate?.name ?? "",
            issuing_organization: certificate?.issuing_organization ?? "",
            issue_date: certificate?.issue_date ?? "",
            display_order: certificate?.display_order ?? "",
            certificate_url: certificate?.certificate_url ?? "",
            delivery: hasFile ? DELIVERY.FILE : DELIVERY.URL,
        },
        fileUrl: resolveAssetUrl(certificate?.certificate_file_path),
        previewUrl: resolveAssetUrl(certificate?.certificate_image_path),
        previewName: certificate?.certificate_image_path?.split("/").pop() ?? "",
        fileName: certificate?.certificate_file_path?.split("/").pop() ?? "",
    };
}
