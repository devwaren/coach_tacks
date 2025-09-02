import { html, useTSElements } from '@devwareng/vanilla-ts'

export default function Testimonials(DOM: HTMLElement) {


    const ui = useTSElements(
        DOM,
        html`
        <section class="bg-black py-12 w-full text-white">
            <div class="max-w-screen-2xl mx-auto flex flex-col items-center justify-center text-center gap-6">
                <h2>Hear from Them</h2>
                <div
                    class="border border-gray-600 p-6 rounded-lg bg-[#1F1F1F] max-w-2xl text-left flex flex-col gap-4 relative">
                    <div class=" absolute -top-[20%] -left-[5%]">
                        <img src="/arrow-2.png" alt="arrows" width="50" />
                    </div>
                    <p>"I’ve never felt stronger! John pushed me to my limits while providing the support I needed to succeed.
                        Highly recommended!"</p>
                    <p class="text-gray-400">- Something here</p>
                    <div class=" absolute -bottom-[20%] -right-[5%]">
                        <img src="/arrow-1.png" alt="arrows" width="50" />
                    </div>
                    <div class="absolute top-20 left-20 w-60 h-60 bg-red-400 rounded-full blur-3xl opacity-50"></div>
                </div>
                <div></div>
            </div>
        </section>
        `
    );
    return ui
}