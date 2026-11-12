/**
 * Minimal hash router. "#/skills/12" → route "/skills/:id" with params { id: "12" }.
 * It only matches paths and calls handlers; it knows nothing about pages.
 */
export class HashRouter {
    constructor(routes, { onNavigate }) {
        this.routes = routes.map(route => ({ ...route, segments: route.path.split("/").filter(Boolean) }));
        this.onNavigate = onNavigate;
    }

    start() {
        window.addEventListener("hashchange", () => this.#dispatch());
        this.#dispatch();
    }

    navigate(path) {
        if (this.currentPath === path) {
            this.#dispatch();
        } else {
            window.location.hash = `#${path}`;
        }
    }

    get currentPath() {
        return window.location.hash.replace(/^#/, "") || "/";
    }

    #dispatch() {
        const path = this.currentPath;
        const parts = path.split("/").filter(Boolean);

        for (const route of this.routes) {
            if (route.segments.length !== parts.length) continue;

            const params = {};

            const matches = route.segments.every((segment, index) => {
                if (segment.startsWith(":")) {
                    params[segment.slice(1)] = decodeURIComponent(parts[index]);

                    return true;
                }

                return segment === parts[index];
            });

            if (matches) {
                this.onNavigate(route, params, path);

                return;
            }
        }

        this.navigate("/");
    }
}
