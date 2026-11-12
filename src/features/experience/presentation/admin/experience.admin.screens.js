import { createCrudScreens } from "../../../../admin/shared/presentation/crud.screens.js";
import { presentExperienceList, presentExperienceForm } from "./experience.admin.presenter.js";
import { renderExperienceList, renderExperienceForm } from "./experience.admin.view.js";

export function createExperienceScreens(controller) {
    return createCrudScreens({
        controller,
        basePath: "/experience",
        labels: { plural: "Experience", singular: "experience", singularTitle: "Experience" },
        presentList: presentExperienceList,
        renderList: renderExperienceList,
        presentForm: presentExperienceForm,
        renderForm: renderExperienceForm,

        // UI behaviour only: "currently working here" disables the end date.
        bindFormExtras(root) {
            const current = root.querySelector('input[name="is_current"]');
            const endDate = root.querySelector('input[name="end_date"]');

            current.addEventListener("change", () => {
                endDate.disabled = current.checked;

                if (current.checked) endDate.value = "";
            });
        },
    });
}
