import { playVideo } from "@/lib/api";
import { html, useTSElements, useTSSelect } from "@devwareng/vanilla-ts";

export default function AboutJohn(DOM: HTMLElement) {

    const isDev = process.env.NODE_ENV !== "production";
    let url = ""

    if (isDev) {
        url = "http://localhost:8080/api/play-video/championship.mp4"
    } else {
        url = "https://coach-tacks.vercel.app/api/play-video/championship.mp4"
    }

    const ui = useTSElements(
        DOM,
        html`
        <div class="text-white py-12 bg-slate-dark">
            <div class="grid grid-cols-1 md:grid-cols-2 max-w-screen-2xl mx-auto gap-8 px-4 items-center">
                <!-- Video Section -->
                <div class="w-full flex justify-center md:justify-end">
                    <div class="w-full md:w-2/3 lg:w-1/2">
                        <video id="player" data-onselect="playerDiv" autoplay loop muted playsinline preload="metadata"
                            poster="/thumbnails/tacker.jpg" class="w-full rounded-lg shadow-lg object-contain object-bottom">
                            <source src=${url} type="video/mp4" />
                            <track src="/captions/tacker.vtt" kind="subtitles" srclang="en" label="English" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
        
                <!-- Text Section -->
                <div class="flex flex-col justify-start mt-8 gap-4 h-full">
                    <h2 class="text-4xl md:text-6xl lg:text-7xl font-['oxanium'] font-semibold">
                        About John Tacker
                    </h2>
                    <p class="text-base md:text-lg leading-7 text-gray-300 max-w-full md:max-w-lg">
                        As a passionate personal trainer, I believe in empowering individuals
                        to achieve their fitness goals through personalized coaching and
                        support.
                    </p>
        
                    <!-- Stats Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                        <div class="bg-[#1F2F1F] grid place-items-center p-4 rounded-lg text-center">
                            <h3 class="font-['oxanium'] font-extrabold text-yellow-300 text-3xl md:text-4xl">
                                500+
                            </h3>
                            <p class="text-sm md:text-base">Satisfied Clients</p>
                        </div>
                        <div class="bg-[#1F2F1F] grid place-items-center p-4 rounded-lg text-center">
                            <h3 class="font-['oxanium'] font-extrabold text-yellow-300 text-3xl md:text-4xl">
                                6 years
                            </h3>
                            <p class="text-sm md:text-base">Experience</p>
                        </div>
                        <div class="bg-[#1F2F1F] grid place-items-center p-4 rounded-lg text-center">
                            <h3 class="font-['oxanium'] font-extrabold text-yellow-300 text-3xl md:text-4xl">
                                Top 1
                            </h3>
                            <p class="text-sm md:text-base">GYM Body Building Competition</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    );

    playVideo(useTSSelect("#player", DOM) as HTMLVideoElement, "tacker.mp4");

    return ui;
}
