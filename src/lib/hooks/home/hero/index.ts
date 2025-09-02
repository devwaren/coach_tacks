import { BgOverlay } from "@/lib/components"
import { useTSCollection } from "@devwareng/vanilla-ts"

const useHeroSettings = (DOM: HTMLElement) => {
    enum IDs {
        Overlay = "bg-overlay",
    }

    const sections = [IDs.Overlay]

    const components = [BgOverlay]

    return useTSCollection(sections, DOM, components)
}

export { useHeroSettings }