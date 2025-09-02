import { playVideo } from "@/lib/api";
import { html, useTSElements, useTSSelect } from "@devwareng/vanilla-ts";

export default function AboutJohn(DOM: HTMLElement) {


    const ui = useTSElements(
        DOM,
        html`
    <div class="text-white py-12 bg-[#1F1F1F]">
        <div class="grid grid-cols-2 max-w-screen-2xl mx-auto gap-8 px-4 items-center">
            <div class="w-full flex items-center justify-center">
                <div class="w-1/2 flex justify-end">
                    <video id="player" data-onselect="playerDiv" autoplay loop muted playsinline preload="metadata"
                        poster="/thumbnails/tacker.jpg"
                        class="w-full max-w-xl rounded-lg shadow-lg object-contain object-bottom">
                        <source src="/api/play-video/championship.mp4" type="video/mp4" />
                        <track src="/captions/tacker.vtt" kind="subtitles" srclang="en" label="English" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
    
            <div class="flex flex-col justify-start mt-8 gap-4 h-full">
                <h2 class="text-7xl font-['oxanium'] font-semibold mt-16">
                    About John Tacker
                </h2>
                <p class="text-lg leading-7 text-gray-300 max-w-2/3">
                    As a passionate personal trainer, I believe in empowering individuals
                    to achieve their fitness goals through personalized coaching and
                    support.
                </p>
                <div class="grid grid-cols-3 gap-4 mt-4">
                    <div class="bg-[#1F2F1F] grid place-items-center p-4 rounded-lg text-center">
                        <h3 class="font-['oxanium'] font-extrabold text-yellow-300 text-4xl">
                            500+
                        </h3>
                        <p>Satisfied Clients</p>
                    </div>
                    <div class="bg-[#1F2F1F] grid place-items-center p-4 rounded-lg text-center">
                        <h3 class="font-['oxanium'] font-extrabold text-yellow-300 text-4xl">
                            6 years
                        </h3>
                        <p>Experience</p>
                    </div>
                    <div class="bg-[#1F2F1F] grid place-items-center p-4 rounded-lg text-center">
                        <h3 class="font-['oxanium'] font-extrabold text-yellow-300 text-4xl">
                            Top 1
                        </h3>
                        <p>GYM Body Building Competition</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    );

    playVideo(useTSSelect("#player", DOM) as HTMLVideoElement, "tacker.mp4");

    return ui;
}
