import { HashRouter } from "./router.js";
import { renderLayout, renderLoading, renderPageError, NAV_ITEMS } from "../shared/presentation/layout.view.js";
import { showToast } from "../shared/presentation/toast.js";
import { confirmDialog } from "../shared/presentation/confirm-dialog.js";

/**
 * The admin shell: owns the router, the layout and page rendering.
 * Pages are plain screen objects; auth is an injected controller.
 */
export class AdminApp {
    constructor({ root, routes, auth }) {
        this.root = root;
        this.auth = auth;
        this.navigationId = 0;
        this.layoutMounted = false;

        this.router = new HashRouter(routes, {
            onNavigate: (route, params, path) => this.#show(route, params, path),
        });

        this.context = {
            navigate: path => this.router.navigate(path),
            refresh: () => this.router.navigate(this.router.currentPath),
            toast: showToast,
            confirm: confirmDialog,
        };
    }

    start() {
        this.router.start();
    }

    async #show(route, params, path) {
        const navigationId = ++this.navigationId;
        const signedIn = await this.auth.isSignedIn();

        if (navigationId !== this.navigationId) return;

        if (route.public) {
            if (signedIn) return this.router.navigate("/");

            this.layoutMounted = false;
            this.root.innerHTML = String(route.screen.render({}));
            route.screen.bind(this.root, {}, this.context);

            return;
        }

        if (!signedIn) return this.router.navigate("/login");

        this.#mountLayout();
        this.#highlight(route.nav);
        document.querySelector("#breadcrumb").textContent = `Workspace / ${route.screen.breadcrumb}`;

        const content = document.querySelector("#admin-content");

        content.innerHTML = String(renderLoading());

        try {
            const viewModel = await route.screen.load(params);

            if (navigationId !== this.navigationId) return;

            // A fresh element per page, so listeners bound by one page never leak into the next.
            content.innerHTML = '<div class="screen"></div>';

            const screenRoot = content.firstElementChild;

            screenRoot.innerHTML = String(route.screen.render(viewModel));
            route.screen.bind(screenRoot, viewModel, this.context);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error(`[admin] failed to open ${path}`, error);

            if (navigationId === this.navigationId) {
                content.innerHTML = String(renderPageError(error.message || "Could not load this page."));
            }
        }
    }

    #mountLayout() {
        if (this.layoutMounted) return;

        this.root.innerHTML = String(renderLayout());
        this.layoutMounted = true;

        const sidebar = document.querySelector("#sidebar");

        document.querySelector("#menu-button").addEventListener("click", () => sidebar.classList.toggle("is-open"));
        const shell = document.querySelector(".admin-shell");
        shell.addEventListener("click", event => {
            if (event.target === shell) sidebar.classList.remove("is-open");
        });
        sidebar.addEventListener("click", event => {
            if (event.target.closest("a")) sidebar.classList.remove("is-open");
        });

        document.querySelector("#logout-button").addEventListener("click", async () => {
            try {
                await this.auth.signOut();
                this.layoutMounted = false;
                this.router.navigate("/login");
            } catch (error) {
                showToast(error.message, "error");
            }
        });
    }

    #highlight(activeId) {
        for (const item of NAV_ITEMS) {
            document
                .querySelector(`[data-nav="${item.id}"]`)
                ?.classList.toggle("is-active", item.id === activeId);
        }
    }
}
