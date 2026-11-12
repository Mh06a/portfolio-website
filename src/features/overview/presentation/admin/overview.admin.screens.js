import { presentOverview } from "./overview.admin.presenter.js";
import { renderOverview } from "./overview.admin.view.js";

export function createOverviewScreen(controller) {
    return {
        breadcrumb: "Overview",
        load: async () => presentOverview(await controller.load()),
        render: renderOverview,
        bind() {},
    };
}
