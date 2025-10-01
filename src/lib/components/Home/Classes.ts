import { html, useTSElements } from '@devwareng/vanilla-ts';

export default function Classes(DOM: HTMLElement) {

    const ui = useTSElements(
        DOM,
        html`
            <div class="bg-black py-12 w-full text-white">
                <div class="max-w-screen-2xl mx-auto flex flex-col items-center justify-center text-center gap-6">
                    <h2 class="font-oxanium text-4xl font-semibold">Training Programs</h2>
                    <p class="text-gray-400 text-xl">Choose your Program</p>
            
                    <!-- Flex container for responsive cards -->
                    <div class="flex flex-wrap justify-center gap-8 mt-8 w-full px-4">
                        <div
                            class="flex flex-col justify-between items-center border border-gray-400 p-6 rounded-lg bg-slate-dark flex-1 min-w-[250px] max-w-[320px]">
                            <div class="flex flex-col items-center justify-center h-full text-center">
                                <h4 class="text-4xl font-oxanium font-semibold mb-4">Session Training</h4>
                                <p>Session Training Programme</p>
                                <p>Upfront session payment</p>
                            </div>
                            <button class="bg-red-600 text-white px-6 py-2 rounded-md mt-8 cursor-pointer hover:bg-red-800">Inquire
                                Now</button>
                        </div>
            
                        <div
                            class="flex flex-col justify-between items-center border border-red-400 p-6 rounded-lg bg-slate-dark flex-1 min-w-[250px] max-w-[320px]">
                            <div class="flex flex-col items-center justify-center h-full text-center">
                                <h4 class="text-4xl font-oxanium font-semibold mb-4">Class Training</h4>
                                <p>Monthly Training Programme</p>
                                <p>Join Class Session Training</p>
                            </div>
                            <button class="bg-red-600 text-white px-6 py-2 rounded-md mt-8 cursor-pointer hover:bg-red-800">Inquire
                                Now</button>
                        </div>
            
                        <div
                            class="flex flex-col justify-between items-center border border-gray-400 p-6 rounded-lg bg-slate-dark flex-1 min-w-[250px] max-w-[320px]">
                            <div class="flex flex-col items-center justify-center h-full text-center">
                                <h4 class="text-4xl font-oxanium font-semibold mb-4">Personal Training + Diet</h4>
                                <p>Monthly Training Programme</p>
                                <p>Book Private Personal Training</p>
                            </div>
                            <button class="bg-red-600 text-white px-6 py-2 rounded-md mt-8 cursor-pointer hover:bg-red-800">Inquire
                                Now</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    );

    return ui;
}
