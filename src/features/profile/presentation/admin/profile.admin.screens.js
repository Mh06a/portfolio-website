import { bindForm, bindFilePreview } from "../../../../admin/shared/presentation/form.binder.js";
import { presentProfileForm } from "./profile.admin.presenter.js";
import { renderProfile } from "./profile.admin.view.js";

export function createProfileScreen(controller, { resolveAssetUrl }) {
    return {
        breadcrumb: "Profile",

        load: async () => presentProfileForm(await controller.load(), resolveAssetUrl),

        render: renderProfile,

        bind(root, viewModel, ctx) {
            bindFilePreview(root);

            bindForm(root.querySelector("form"), {
                toast: ctx.toast,
                submit: async values => {
                    await controller.save(values);

                    ctx.toast("Profile saved");
                    ctx.refresh();
                },
            });
        },
    };
}
