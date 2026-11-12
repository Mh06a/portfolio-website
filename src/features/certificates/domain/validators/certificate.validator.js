import {
    isRequired,
    isValidUrl,
} from "../../../../core/utils/validation.util.js";

import { isValidDate } from "../../../../core/utils/date.util.js";

export function validateCertificate(certificate) {
    const errors = {};

    if (!isRequired(certificate.name)) {
        errors.name = "Certificate name is required";
    }

    if (!isRequired(certificate.issuing_organization)) {
        errors.issuing_organization = "Issuing organization is required";
    }

    if (!isRequired(certificate.issue_date)) {
        errors.issue_date = "Issue date is required";
    } else if (!isValidDate(certificate.issue_date)) {
        errors.issue_date = "Invalid issue date";
    }

    const hasUrl = isRequired(certificate.certificate_url);
    const hasFile = isRequired(certificate.certificate_file_path);

    if (hasUrl === hasFile) {
        errors.certificate = "Provide either a URL or a file path";
    }

    if (hasUrl && !isValidUrl(certificate.certificate_url)) {
        errors.certificate_url = "Invalid certificate URL";
    }

    if (
        certificate.display_order !== undefined &&
        (!Number.isInteger(certificate.display_order) ||
            certificate.display_order < 0)
    ) {
        errors.display_order = "Display order must be a non-negative integer";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}