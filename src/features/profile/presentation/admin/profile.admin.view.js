import { html } from "../../../../shared/presentation/utils/html.util.js";
import {
    pageHeader, formActions, fieldRow, inputField, textareaField, fileField,
} from "../../../../admin/shared/presentation/components.js";
import { UPLOAD_RULES } from "../../../../shared/domain/usecases/upload-asset.usecase.js";

export function renderProfile(viewModel) {
    const { values } = viewModel;

    return html`
        ${pageHeader({
            title: "Profile",
            subtitle: viewModel.isNew
                ? "No profile yet — fill in your details and save to create it."
                : "The person behind the portfolio.",
        })}

        <form class="profile-layout" novalidate>
            <section class="card form-card">
                <h2 class="card-title">Personal information</h2>
                <p class="card-hint">Your public introduction and contact details.</p>

                ${fieldRow(
                    inputField({ label: "Full Name", name: "full_name", value: values.full_name, required: true }),
                    inputField({ label: "Job Title", name: "job_title", value: values.job_title, required: true })
                )}
                ${textareaField({
                    label: "Short Bio", name: "short_bio", value: values.short_bio, required: true, rows: 3,
                    hint: "A short description shown on the homepage.",
                })}
                ${textareaField({
                    label: "Long Bio", name: "long_bio", value: values.long_bio, required: true, rows: 6,
                    hint: "Shown in the About section. Start a new line for a new paragraph.",
                })}
                ${fieldRow(
                    inputField({ label: "Location", name: "location", value: values.location, required: true }),
                    inputField({ label: "Email", name: "email", type: "email", value: values.email, required: true })
                )}
                ${fieldRow(
                    inputField({ label: "Phone", name: "phone", type: "tel", value: values.phone }),
                    inputField({ label: "GitHub URL", name: "github_url", type: "url", value: values.github_url })
                )}
                ${inputField({ label: "LinkedIn URL", name: "linkedin_url", type: "url", value: values.linkedin_url })}
            </section>

            <section class="card form-card">
                <h2 class="card-title">Profile media</h2>

                ${fileField({
                    label: "Profile image", name: "image", errorKey: "profile_image_path",
                    accept: UPLOAD_RULES.image.types.join(","), buttonLabel: "Replace image",
                    hint: UPLOAD_RULES.image.description,
                    previewUrl: viewModel.imageUrl, currentName: viewModel.imageName,
                })}

                ${fileField({
                    label: "CV document", name: "cv", errorKey: "cv_file_path",
                    accept: "application/pdf", buttonLabel: "Replace PDF",
                    hint: UPLOAD_RULES.pdf.description, currentName: viewModel.cvName,
                })}
                ${viewModel.cvUrl && html`<a class="link" href="${viewModel.cvUrl}" target="_blank" rel="noopener noreferrer">Open current CV ↗</a>`}
            </section>

            <div class="profile-actions">${formActions({ cancelHref: "#/" })}</div>
        </form>
    `;
}
