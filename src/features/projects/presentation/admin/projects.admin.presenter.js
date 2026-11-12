import { formatMonthYear } from "../../../../core/utils/date.util.js";

export function presentProjectList(projects, resolveAssetUrl) {
    const sorted = [...projects].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

    return {
        total: projects.length,
        featuredCount: projects.filter(project => project.is_featured).length,
        items: sorted.map((project, index) => ({
            id: project.id,
            position: index + 1,
            name: project.name,
            description: project.description,
            imageUrl: resolveAssetUrl(project.image_path),
            technologies: project.technologies,
            isFeatured: project.is_featured,
            meta: [
                project.project_date ? formatMonthYear(project.project_date) : null,
                `Order ${project.display_order}`,
            ].filter(Boolean).join(" · "),
            canMoveUp: index > 0,
            canMoveDown: index < sorted.length - 1,
        })),
    };
}

export function presentProjectForm(project, { resolveAssetUrl, technologies }) {
    return {
        id: project?.id ?? null,
        title: project ? "Edit project" : "Add project",
        values: {
            name: project?.name ?? "",
            description: project?.description ?? "",
            github_url: project?.github_url ?? "",
            demo_url: project?.demo_url ?? "",
            project_date: project?.project_date ?? "",
            display_order: project?.display_order ?? "",
            is_featured: project?.is_featured ?? false,
            technologies: project?.technologies ?? [],
        },
        technologySuggestions: technologies,
        imageUrl: resolveAssetUrl(project?.image_path),
        imageName: project?.image_path?.split("/").pop() ?? "",
    };
}
