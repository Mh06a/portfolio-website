import { createCrudScreens } from "../../../../admin/shared/presentation/crud.screens.js";
import { presentSkillList, presentSkillForm } from "./skills.admin.presenter.js";
import { renderSkillList, renderSkillForm } from "./skills.admin.view.js";

export function createSkillsScreens(controller) {
    return createCrudScreens({
        controller,
        basePath: "/skills",
        labels: { plural: "Skills", singular: "skill", singularTitle: "Skill" },
        presentList: presentSkillList,
        renderList: renderSkillList,
        presentForm: presentSkillForm,
        renderForm: renderSkillForm,

        // UI behaviour only: drag rows inside a category, then hand the new id order to the controller.
        bindListExtras(root, viewModel, ctx) {
            let dragged = null;

            root.addEventListener("dragstart", event => {
                dragged = event.target.closest("[data-skill-id]");
                dragged?.classList.add("is-dragging");
            });

            root.addEventListener("dragover", event => {
                const row = event.target.closest("[data-skill-id]");

                if (!dragged || !row || row === dragged || row.parentElement !== dragged.parentElement) return;

                event.preventDefault();

                const { top, height } = row.getBoundingClientRect();

                row.parentElement.insertBefore(dragged, event.clientY < top + height / 2 ? row : row.nextSibling);
            });

            root.addEventListener("dragend", async () => {
                if (!dragged) return;

                const container = dragged.parentElement;

                dragged.classList.remove("is-dragging");
                dragged = null;

                const ids = [...container.querySelectorAll("[data-skill-id]")].map(row => row.dataset.skillId);

                try {
                    await controller.reorder(ids);
                    ctx.toast("Order saved");
                    ctx.refresh();
                } catch (error) {
                    ctx.toast(error.message, "error");
                    ctx.refresh();
                }
            });
        },
    });
}
