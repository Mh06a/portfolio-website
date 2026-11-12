import { createCrudScreens } from "../../../../admin/shared/presentation/crud.screens.js";
import { presentCertificateList, presentCertificateForm } from "./certificates.admin.presenter.js";
import { renderCertificateList, renderCertificateForm } from "./certificates.admin.view.js";

export function createCertificatesScreens(controller, { resolveAssetUrl }) {
    controller.loadFormOptions = async () => ({ resolveAssetUrl });

    return createCrudScreens({
        controller,
        basePath: "/certificates",
        labels: { plural: "Certificates", singular: "certificate", singularTitle: "Certificate" },
        presentList: items => presentCertificateList(items, resolveAssetUrl),
        renderList: renderCertificateList,
        presentForm: presentCertificateForm,
        renderForm: renderCertificateForm,

        // UI behaviour only: show the URL field or the PDF field depending on the chosen delivery.
        bindFormExtras(root) {
            const radios = root.querySelectorAll('input[name="delivery"]');
            const sections = root.querySelectorAll("[data-delivery]");

            const sync = () => {
                const selected = root.querySelector('input[name="delivery"]:checked')?.value;

                sections.forEach(section => {
                    const active = section.dataset.delivery === selected;

                    section.hidden = !active;
                    section.querySelectorAll("input").forEach(input => {
                        input.disabled = !active;
                    });
                });
            };

            radios.forEach(radio => radio.addEventListener("change", sync));
            sync();
        },
    });
}
