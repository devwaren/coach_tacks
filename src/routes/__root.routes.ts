import { Home, NotFound } from "@/pages";
import { TSRouter, useTSParams, useTSPurifier } from "@devwareng/vanilla-ts";

export const Router = (DOM: HTMLElement, websiteName: string) => {

    useTSParams.getState()

    const routes = new TSRouter(
        [
            {
                path: "/",
                element: () => Home(DOM, websiteName),
            },
            {
                path: "*",
                element: () => NotFound(DOM, websiteName),
            },
        ],
        [String(useTSPurifier(window.location.search)), "id", "sort", "name", "page", "pageSize"]
    );
    return routes.navigate("");
};
