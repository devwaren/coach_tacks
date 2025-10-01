import { html, useTSElements } from "@devwareng/vanilla-ts";

export default function Footer(DOM: HTMLElement) {

    const ui = useTSElements(
        DOM,
        html`
        <footer class="relative text-white w-full bg-slate-dark py-16 px-4 md:px-16">
            <div class="max-w-screen-2xl mx-auto flex flex-wrap justify-start gap-12">
        
                <!-- About / Personal Trainer -->
                <div class="flex-1 min-w-[280px] flex flex-col gap-4">
                    <h3 class="text-xl font-semibold">Personal Trainer</h3>
                    <p class="text-gray-300 text-sm md:text-base">
                        Get the right guidance to achieve your fitness goals with a coach who tailors
                        workouts and nutrition to your lifestyle. Whether you want to build strength,
                        lose weight, or simply stay active, you’ll gain the motivation and strategies
                        needed to create lasting healthy habits.
                    </p>
                </div>
        
                <!-- Menu -->
                <div class="flex-1 min-w-[120px] flex flex-col gap-2">
                    <h3 class="text-xl font-semibold">Menu</h3>
                    <div class="flex flex-col gap-1 text-gray-200">
                        <a href="/" class="hover:text-red-600 transition-colors">Home</a>
                        <a href="/" class="hover:text-red-600 transition-colors">Services</a>
                        <a href="/" class="hover:text-red-600 transition-colors">About</a>
                        <a href="/" class="hover:text-red-600 transition-colors">Contact</a>
                    </div>
                </div>
        
                <!-- Contact -->
                <div class="flex-1 min-w-[180px] flex flex-col gap-2">
                    <h3 class="text-xl font-semibold">Contact</h3>
                    <div class="flex items-center gap-2 text-gray-300">
                        <span class="bx bx-phone"></span>
                        <span>+639957920174</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-300">
                        <span class="bx bxl-gmail"></span>
                        <span>johntackerabardo@gmail.com</span>
                    </div>
                </div>
        
            </div>
        
            <!-- Divider -->
            <div class="max-w-screen-2xl mx-auto h-px border border-gray-600 my-8"></div>
        
            <!-- Footer text -->
            <p class="text-center text-gray-400 text-sm md:text-base">
                &copy; 2025 All Rights Reserved. John Tacker Abardo &trade;
            </p>
        </footer>
        `
    );

    return ui;
}
