import { toSafeUrl } from "../../../core/utils/url.util.js";

const pad = number => String(number).padStart(2, "0");

const IN_PROGRESS = "In Progress";

function presentProject(project, index, resolveAssetUrl) {
    return {
        metaLabel: `${pad(index + 1)} / ${project.category ?? "PROJECT"}`,
        statusBadge: project.status === IN_PROGRESS ? project.status : null,
        name: project.name,
        description: project.description,
        technologies: project.technologies,
        imageUrl: resolveAssetUrl(project.image_path),
        githubUrl: toSafeUrl(project.github_url),
        demoUrl: toSafeUrl(project.demo_url),
        isFeatured: project.is_featured,
    };
}

export function presentProjects(projects, { githubProfileUrl, resolveAssetUrl }) {
    return {
        githubProfileUrl: toSafeUrl(githubProfileUrl),
        items: projects.map((project, index) =>
            presentProject(project, index, resolveAssetUrl)
        ),
    };
}
