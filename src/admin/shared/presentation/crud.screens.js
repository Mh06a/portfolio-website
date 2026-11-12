import { bindForm, bindFilePreview, bindChipPickers } from "./form.binder.js";

/**
 * Builds the two screens every content type has: a list and an add/edit form.
 * A screen is { breadcrumb, load(params), render(viewModel), bind(root, viewModel, ctx) }.
 */
export function createCrudScreens({
    controller,
    basePath,
    labels,
    presentList,
    renderList,
    presentForm,
    renderForm,
    bindListExtras,
    bindFormExtras,
}) {
    const list = {
        breadcrumb: labels.plural,

        load: async () => presentList(await controller.list()),

        render: renderList,

        bind(root, viewModel, ctx) {
            root.addEventListener("click", async event => {
                const button = event.target.closest("[data-delete]");

                if (!button) return;

                const confirmed = await ctx.confirm({
                    title: `Delete ${labels.singular}?`,
                    message: `"${button.dataset.name}" will be permanently removed.`,
                });

                if (!confirmed) return;

                try {
                    await controller.remove(button.dataset.delete);
                    ctx.toast(`${labels.singularTitle} deleted`);
                    ctx.refresh();
                } catch (error) {
                    ctx.toast(error.message, "error");
                }
            });

            bindListExtras?.(root, viewModel, ctx);
        },
    };

    const form = {
        breadcrumb: labels.plural,

        async load(params) {
            const id = params.id === "new" ? null : params.id;
            const existing = id ? await controller.find(id) : null;
            const options = (await controller.loadFormOptions?.()) ?? {};

            return presentForm(existing, options);
        },

        render: renderForm,

        bind(root, viewModel, ctx) {
            bindFilePreview(root);
            bindChipPickers(root);

            bindForm(root.querySelector("form"), {
                toast: ctx.toast,
                submit: async values => {
                    await controller.save(viewModel.id, values);

                    ctx.toast(`${labels.singularTitle} saved`);
                    ctx.navigate(basePath);
                },
            });

            bindFormExtras?.(root, viewModel, ctx);
        },
    };

    return { list, form };
}
