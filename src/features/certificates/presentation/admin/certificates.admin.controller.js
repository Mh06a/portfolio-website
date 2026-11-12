import { CrudAdminController } from "../../../../admin/shared/application/crud.admin.controller.js";
import { parseCertificateForm, DELIVERY } from "./certificates.form.js";

export class CertificatesAdminController extends CrudAdminController {
    constructor(useCases, { uploadAsset }) {
        super(useCases);
        this.uploadAsset = uploadAsset;
    }

    async buildEntity(values, existing) {
        const entity = parseCertificateForm(values);

        const certificate_image_path = values.preview
            ? await this.uploadAsset.execute(values.preview, { folder: "certificates", kind: "image", field: "certificate_image_path" })
            : existing?.certificate_image_path ?? null;

        if (values.delivery !== DELIVERY.FILE) {
            return { ...entity, certificate_file_path: null, certificate_image_path };
        }

        const certificate_file_path = values.file
            ? await this.uploadAsset.execute(values.file, { folder: "certificates", kind: "document", field: "certificate_file_path" })
            : existing?.certificate_file_path ?? null;

        return { ...entity, certificate_file_path, certificate_image_path };
    }

    toEditable(item) {
        return {
            name: item.name,
            issuing_organization: item.issuing_organization,
            issue_date: item.issue_date,
            certificate_url: item.certificate_url,
            certificate_file_path: item.certificate_file_path,
            certificate_image_path: item.certificate_image_path,
            display_order: item.display_order,
        };
    }
}
