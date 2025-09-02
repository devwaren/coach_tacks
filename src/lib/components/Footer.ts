import { html, useTSElements } from "@devwareng/vanilla-ts";

export default function Footer(DOM: HTMLElement) {

    const ui = useTSElements(
        DOM,
        html`
        <div class="relative text-white w-full bg-[#1F1F1F] py-16 px-16">
            <div class="max-w-screen-2xl mx-auto flex justify-between gap-8">
                <div class="flex flex-col gap-6 max-w-1/2">
                    <h3>Personal Trainer</h3>
                    <p class="text-gray-300">
                        Get the right guidance to achieve your fitness goals with a coach who tailors
                        workouts and nutrition to your lifestyle. Whether you want to build strength,
                        lose weight, or simply stay active, you’ll gain the motivation and strategies
                        needed to create lasting healthy habits.
                    </p>
                </div>
                <div class="flex flex-col gap-6">
                    <h3>Menu</h3>
                    <div class="grid gap-4 text-gray-200">
                        <a href="/">Home</a>
                        <a href="/">Services</a>
                        <a href="/">About</a>
                        <a href="/">Contact</a>
                    </div>
                </div>
                <div class="flex flex-col gap-6">
                    <h3>Contact</h3>
                    <p><span class="bx bx-phone mr-4"></span> <span class="text-gray-300">+639957920174</span></p>
                    <p><span class="bx bxl-gmail mr-4"></span> <span class="text-gray-300">johntackerabardo@gmail.com</span></p>
                </div>
            </div>
            <div class="max-w-screen-2xl mx-auto h-[1px] border border-gray-600 my-8"></div>
            <p class="text-center">&copy;<span class="text-gray-400 mr-5"> 2025 Allrights Reserved.</span> John Tacker Abardo
                &trade;
            </p>
        </div>
        `,
    );



    return ui;
}
