import { CrudAdminController } from "../../../../admin/shared/application/crud.admin.controller.js";
import { parseProjectForm } from "./projects.form.js";

export class ProjectsAdminController extends CrudAdminController {
    constructor(useCases, { getTechnologies, uploadAsset }) {
        super(useCases);
        this.getTechnologies = getTechnologies;
        this.uploadAsset = uploadAsset;
    }

    async loadFormOptions() {
        try {
            return { technologies: await this.getTechnologies.execute() };
        } catch (error) {
            console.warn("[projects] could not load technologies", error);

            return { technologies: [] };
        }
    }

    async buildEntity(values, existing) {
        const imageFile = values.image;

        const image_path = imageFile
            ? await this.uploadAsset.execute(imageFile, { folder: "projects", kind: "image", field: "image_path" })
            : existing?.image_path ?? null;

        return { ...parseProjectForm(values), image_path };
    }

    toEditable(item) {
        return {
            name: item.name,
            description: item.description,
            image_path: item.image_path,
            github_url: item.github_url,
            demo_url: item.demo_url,
            project_date: item.project_date,
            is_featured: item.is_featured,
            display_order: item.display_order,
            technologies: item.technologies,
        };
    }

    async toggleFeatured(id) {
        const project = await this.find(id);

        await this.useCases.update.execute(id, {
            ...this.toEditable(project),
            is_featured: !project.is_featured,
        });
    }
}
