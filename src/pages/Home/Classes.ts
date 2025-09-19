
import { html, useTSElements } from '@devwareng/vanilla-ts'

export default function Classes(DOM: HTMLElement) {


    const ui = useTSElements(
        DOM,
        html`
            <div class="bg-black py-12 w-full text-white">
                <div class="max-w-screen-2xl mx-auto flex flex-col items-center justify-center text-center gap-6">
                    <h2 class="font-['oxanium'] text-4xl font-semibold">Training Programs</h2>
                    <p class="text-gray-400 text-xl">Choose your Program</p>
                    <div class="grid grid-cols-3 gap-8 mt-8 w-full px-4 h-[400px]">
                        <div class="flex justify-between items-center flex-col border border-gray-400 p-6 rounded-lg bg-[#1F1F1F]">
                            <div class="grid place-items-center h-full">
                                <div>
                                    <h4 class="text-4xl font-['oxanium'] font-semibold mb-4">Session Training</h4>
                                    <p>Session Training Programme</p>
                                    <p>Upfront session payment</p>
                                </div>
                            </div>
                            <button class="bg-red-600 text-white px-6 py-2 rounded-md">Inquire Now</button>
                        </div>
                        <div class="flex justify-between items-center flex-col border border-red-400 p-6 rounded-lg bg-[#1F1F1F]">
                            <div class="grid place-items-center h-full">
                                <div>
                                    <h4 class="text-4xl font-['oxanium'] font-semibold mb-4">Class Training</h4>
                                    <p>Monthly Training Programme</p>
                                    <p>Join Class Session Training</p>
                                </div>
                            </div>
                            <button class="bg-red-600 text-white px-6 py-2 rounded-md">Inquire Now</button>
                        </div>
                        <div class="flex justify-between items-center flex-col border border-gray-400 p-6 rounded-lg bg-[#1F1F1F]">
                            <div class="grid place-items-center h-full">
                                <div>
                                    <h4 class="text-4xl font-['oxanium'] font-semibold mb-4">Personal Training + Diet</h4>
                                    <p>Monthly Training Programme</p>
                                    <p>Book Private Personal Training</p>
                                </div>
                            </div>
                            <button class="bg-red-600 text-white px-6 py-2 rounded-md">Inquire Now</button>
                        </div>
                    </div>
                </div>
            </div>
`
    );
    return ui
}