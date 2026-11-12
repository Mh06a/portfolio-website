import { createCrudScreens } from "../../../../admin/shared/presentation/crud.screens.js";
import { presentEducationList, presentEducationForm } from "./education.admin.presenter.js";
import { renderEducationList, renderEducationForm } from "./education.admin.view.js";

export function createEducationScreens(controller, { resolveAssetUrl }) {
    controller.loadFormOptions = async () => ({ resolveAssetUrl });

    return createCrudScreens({
        controller,
        basePath: "/education",
        labels: { plural: "Education", singular: "education record", singularTitle: "Education" },
        presentList: presentEducationList,
        renderList: renderEducationList,
        presentForm: presentEducationForm,
        renderForm: renderEducationForm,
    });
}
