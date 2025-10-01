// Hero.ts
import { useHeroSettings } from '@/lib/hooks/home'
import { html, useTSElements } from '@devwareng/vanilla-ts'

export default function Hero(DOM: HTMLElement) {
    const ui = useTSElements(
        DOM,
        html`
    //Hero.ts - improved responsive version
    <section id="hero" class="relative min-h-svh md:min-h-screen overflow-hidden">
        <div
            class="max-w-screen-2xl mx-auto grid md:grid-cols-2 grid-cols-1 min-h-screen relative items-center mt-16 md:mt-0">
    
            <!-- Background -->
            <div class="fixed inset-0">
                <div class="w-full h-full bg-gym bg-cover bg-center"></div>
                <div id="bg-overlay" class="absolute inset-0 bg-black/50"></div>
            </div>
    
            <!-- Left content -->
            <div class="relative z-10 px-6 md:px-16 text-white flex flex-col gap-4 justify-center md:justify-start">
                <div
                    class="leading-snug md:leading-[4.5rem] text-4xl md:text-7xl font-['oxanium'] animate__animated animate__fadeInLeft animate__slow">
                    <p class="font-semibold">Take Your Fitness</p>
                    <p class="text-yellow-300">To The Next Level</p>
                </div>
    
                <p
                    class="text-lg md:text-2xl text-gray-300 uppercase my-4 md:my-8 animate__animated animate__fadeInLeft animate__delay-1s">
                    Premium Online Personal Coach with John Tacker
                </p>
    
                <p class="text-sm md:text-base">
                    As a passionate personal trainer, I believe in empowering individuals to achieve their fitness goals
                    through personalized coaching and support.
                </p>
    
                <button
                    class="mt-6 md:mt-8 text-xs md:text-sm px-4 md:px-6 py-3 md:py-4 border border-gray-500 rounded max-w-fit animate__animated animate__fadeInUp animate__delay-2s">
                    <span class="font-semibold">GET HEALTHY, & LOSE WEIGHT FAST</span>
                    <p class="text-gray-200 text-xs md:text-sm">With My Personal Meal Guide >></p>
                </button>
            </div>
    
            <!-- Right image -->
            <div class="relative z-10 flex justify-center md:justify-end px-6 md:px-0 mt-12 md:mt-0">
                <div class="relative w-[300px] sm:w-[350px] md:w-[450px] rounded-b-full overflow-hidden">
                    <img src="/tacker.png" alt="Coach"
                        class="rounded-b-full animate__animated animate__fadeInRight animate__delay-1s" />
                    <div
                        class="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-black via-black/60 to-transparent z-10">
                    </div>
                </div>
            </div>
    
            <!-- Decorative name -->
            <h3
                class="absolute left-4 md:left-30 -bottom-10 md:-bottom-10 text-[5rem] md:text-[10rem] font-extrabold uppercase opacity-10">
                John Tacker
            </h3>
    
            <!-- Background image -->
            <img src="/group.png" alt="Group"
                class="absolute animate__animated animate__fadeInRight animate__delay-1s right-4 md:right-10 -bottom-40 md:-bottom-90 w-[300px] sm:w-[500px] md:w-[900px]" />
        </div>
    </section>

    `
    )

    useHeroSettings(DOM)

    return ui
}
