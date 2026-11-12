import { AdminApp } from "./app/admin-app.js";
import { createAdminApp } from "./app/admin.container.js";
import { initializeImageFallback } from "../shared/presentation/utils/image-fallback.js";

initializeImageFallback();

const { routes, auth } = createAdminApp();

new AdminApp({
    root: document.querySelector("#admin-root"),
    routes,
    auth,
}).start();
