import { useTSCollection } from "@devwareng/vanilla-ts"
import { useHeroSettings } from "./hero"
import { AboutJohn, Classes, Hero, Testimonials } from "@/pages/Home"

const useHomeSettings = (DOM: HTMLElement) => {

    enum IDs {
        Hero = "hero",
        AboutJohn = "about-john",
        Classes = "classes",
        testimonials = "testimonials"
    }

    const sections = [IDs.Hero, IDs.AboutJohn, IDs.Classes, IDs.testimonials]

    const components = [Hero, AboutJohn, Classes, Testimonials]

    return useTSCollection(sections, DOM, components)

}

export { useHomeSettings, useHeroSettings }