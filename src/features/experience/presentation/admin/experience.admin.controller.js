import { CrudAdminController } from "../../../../admin/shared/application/crud.admin.controller.js";
import { parseExperienceForm } from "./experience.form.js";

export class ExperienceAdminController extends CrudAdminController {
    async buildEntity(values) {
        return parseExperienceForm(values);
    }

    toEditable(item) {
        return {
            job_title: item.job_title,
            company_name: item.company_name,
            location: item.location,
            employment_type: item.employment_type,
            description: item.description,
            start_date: item.start_date,
            end_date: item.end_date,
            is_current: item.is_current,
            display_order: item.display_order,
        };
    }
}
