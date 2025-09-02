import "./index.css"
import "typeface-oxanium/index.css"
import "boxicons/css/boxicons.min.css"
import "animate.css"
import { useSSR } from "./lib/hooks";
import { useMainSettings } from "./lib/hooks";
import { html, useTSAnchorMount, useTSElements } from '@devwareng/vanilla-ts';

export default function Start(DOM?: HTMLElement) {
    const { isDOM } = useSSR(DOM);

    if (!isDOM) return;

    const title = document.title

    const ui = useTSElements(
        isDOM,
        html`
            <div class="relative">
                <header id="navbar" class="p-4 fixed top-0 left-0 w-full text-white z-[99] bg-black"></header>
                <main id='router' class='main'></main>
                <footer id="footer" class="relative"></footer>
            </div>
        `
    );

    useMainSettings(isDOM, title)
    useTSAnchorMount()

    return ui;
}

// For SSR string output
export const startHTML = Start();
