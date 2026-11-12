import { escapeHtml } from "../../../shared/presentation/utils/html.util.js";

export function showToast(message, type = "success") {
    let host = document.querySelector("#toast-host");

    if (!host) {
        host = document.createElement("div");
        host.id = "toast-host";
        host.setAttribute("role", "status");
        document.body.append(host);
    }

    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;
    toast.innerHTML = escapeHtml(message);
    host.append(toast);

    setTimeout(() => toast.remove(), 3500);
}
