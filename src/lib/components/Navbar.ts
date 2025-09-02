
import { html, useTSElements } from '@devwareng/vanilla-ts'

export default function Navbar(DOM: HTMLElement) {

    const ui = useTSElements(
        DOM,
        html`
        <div class="relative max-w-[1660px] mx-auto flex items-center justify-between">
            <img src="/logo.png" alt="logo of john tacker" width="240" />
            <nav class="flex items-center gap-6">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Online Coaching</a>
                <a href="#">Get In Touch</a>
                <div class="text-2xl">
                    <a href="https://www.facebook.com/johngian.isidro" aria-label="facebook"><i class="bx bxl-facebook"></i></a>
                    <a href="https://www.instagram.com/coach_tackssss/" aria-label="instagram"><i
                            class="bx bxl-instagram"></i></a>
                </div>
            </nav>
        </div>
        `
    );

    return ui
}