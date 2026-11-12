const pad = number => String(number).padStart(2, "0");

const IMAGE_EXTENSION = /\.(jpe?g|png|webp)$/i;

/** The card picture: the preview image, or the certificate file itself when it is an image. */
function pickImage(certificate, resolveAssetUrl) {
    if (certificate.certificate_image_path) {
        return resolveAssetUrl(certificate.certificate_image_path);
    }

    return IMAGE_EXTENSION.test(certificate.certificate_file_path ?? "")
        ? resolveAssetUrl(certificate.certificate_file_path)
        : null;
}

export function presentCertificates(certificates, resolveAssetUrl) {
    return certificates.map((certificate, index) => ({
        number: pad(index + 1),
        name: certificate.name,
        organization: certificate.issuing_organization,
        imageUrl: pickImage(certificate, resolveAssetUrl),
        url:
            resolveAssetUrl(certificate.certificate_url) ??
            resolveAssetUrl(certificate.certificate_file_path),
    }));
}
