import { createCrudScreens } from "../../../../admin/shared/presentation/crud.screens.js";
import { presentProjectList, presentProjectForm } from "./projects.admin.presenter.js";
import { renderProjectList, renderProjectForm } from "./projects.admin.view.js";

export function createProjectsScreens(controller, { resolveAssetUrl }) {
    return createCrudScreens({
        controller,
        basePath: "/projects",
        labels: { plural: "Projects", singular: "project", singularTitle: "Project" },
        presentList: projects => presentProjectList(projects, resolveAssetUrl),
        renderList: renderProjectList,
        presentForm: (project, options) => presentProjectForm(project, { ...options, resolveAssetUrl }),
        renderForm: renderProjectForm,

        // UI behaviour only: forward clicks to the controller, then refresh.
        bindListExtras(root, viewModel, ctx) {
            root.addEventListener("click", async event => {
                const featureButton = event.target.closest("[data-feature]");
                const moveButton = event.target.closest("[data-move]");

                if (!featureButton && !moveButton) return;

                try {
                    if (featureButton) {
                        await controller.toggleFeatured(featureButton.dataset.feature);
                    } else {
                        await controller.move(moveButton.dataset.move, Number(moveButton.dataset.direction));
                    }

                    ctx.refresh();
                } catch (error) {
                    ctx.toast(error.message, "error");
                }
            });
        },
    });
}
