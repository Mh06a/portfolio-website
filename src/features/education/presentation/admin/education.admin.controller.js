import { CrudAdminController } from "../../../../admin/shared/application/crud.admin.controller.js";
import { parseEducationForm } from "./education.form.js";

export class EducationAdminController extends CrudAdminController {
    constructor(useCases, { uploadAsset }) {
        super(useCases);
        this.uploadAsset = uploadAsset;
    }

    async buildEntity(values, existing) {
        const logoFile = values.logo;

        const institution_logo_path = logoFile
            ? await this.uploadAsset.execute(logoFile, { folder: "education", kind: "image", field: "institution_logo_path" })
            : existing?.institution_logo_path ?? null;

        return { ...parseEducationForm(values), institution_logo_path };
    }

    toEditable(item) {
        return {
            institution_name: item.institution_name,
            institution_logo_path: item.institution_logo_path,
            degree: item.degree,
            major: item.major,
            description: item.description,
            gpa: item.gpa,
            start_date: item.start_date,
            end_date: item.end_date,
            subjects: item.subjects,
            display_order: item.display_order,
        };
    }
}
