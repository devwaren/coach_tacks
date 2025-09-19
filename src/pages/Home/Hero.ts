// Hero.ts
import { useHeroSettings } from '@/lib/hooks/home'
import { html, useTSElements } from '@devwareng/vanilla-ts'

export default function Hero(DOM: HTMLElement) {
    const ui = useTSElements(
        DOM,
        html`
    <section id="hero" class="relative min-h-svh md:min-h-screen">
        <div class="max-w-screen-2xl mx-auto grid grid-cols-2 overflow-hidden min-h-screen">
            <div class="fixed inset-0">
                <div class="w-full h-full bg-[url('/gym.webp')] bg-cover bg-center"></div>
                <div id="bg-overlay"></div>
            </div>
    
            <!-- left side content -->
            <div class="relative z-10 grid place-items-center gap-4 text-white hero-title">
                <div class="flex flex-col gap-4">
                    <!-- headline -->
                    <div
                        class="leading-[4.5rem] text-7xl animate__animated animate__fadeInLeft animate__slow font-['oxanium']">
                        <p class="font-semibold">Take Your Fitness</p>
                        <p class="text-yellow-300">To The Next Level</p>
                    </div>
    
                    <!-- subheadline -->
                    <p
                        class="text-2xl text-gray-300 uppercase my-8 animate__animated animate__fadeInLeft animate__delay-1s">
                        Premium Online Personal Coach with John Tacker
                    </p>
    
                    <p>
                        As a passionate personal trainer, I believe in empowering individuals to achieve their fitness
                        goals through personalized coaching and support.
                    </p>
    
                    <!-- button -->
                    <button
                        class="text-xs rounded px-6 py-4 border border-gray-500 max-w-fit animate__animated animate__fadeInUp animate__delay-2s mt-8">
                        <span class="font-semibold">GET HEALTHY, & LOSE WEIGHT FAST</span>
                        <p class="text-gray-200">With My Personal Meal Guide >></p>
                    </button>
                </div>
            </div>
    
            <!-- right side image -->
            <div class="relative z-10 flex items-center justify-start">
                <div class="relative rounded-b-full overflow-hidden">
                    <img src="/tacker.png"
                        class="relative animate__animated animate__fadeInRight animate__delay-1s rounded-b-full z-[1]"
                        alt="Coach" width="450" />
                    <div
                        class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/60 to-transparent z-[2]">
                    </div>
                </div>
            </div>
    
            <div class="absolute bottom-0 left-[10px]">
                <div class="relative">
                    <h3 class="text-[10em] font-extrabold uppercase opacity-10">John Tacker</h3>
                </div>
            </div>
    
            <!-- background image -->
            <img src="/group.png"
                class="absolute animate__animated animate__fadeInRight animate__delay-1s right-[-10em] bottom-[-5em]"
                alt="Coach" width="900" height="1800" />
        </div>
    </section>
    `
    )

    useHeroSettings(DOM)

    return ui
}
