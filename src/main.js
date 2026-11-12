import { createContainer } from "./app/di/container.js";
import { PortfolioController } from "./app/portfolio.controller.js";
import { renderPortfolio, renderFatalError } from "./app/portfolio.view.js";
import { initializeNavbar } from "./shared/presentation/components/navbar/navbar.js";
import { initializeImageFallback } from "./shared/presentation/utils/image-fallback.js";

async function bootstrap() {
    const app = document.querySelector("#app");

    initializeImageFallback();

    try {
        const controller = new PortfolioController(createContainer());
        const viewModel = await controller.load();

        app.innerHTML = renderPortfolio(viewModel);
        initializeNavbar();
    } catch (error) {
        console.error("[portfolio] bootstrap failed", error);

        app.innerHTML = renderFatalError();
    }
}

bootstrap();
