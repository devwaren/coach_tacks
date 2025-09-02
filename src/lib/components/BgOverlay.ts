import { html, mapper, useTSElements } from '@devwareng/vanilla-ts'

export default function BgOverlay(DOM: HTMLElement) {
    const bgPositions = [
        "bg-gradient-to-b",
        "bg-gradient-to-l",
        "bg-gradient-to-r",
    ]

    const overlays = mapper(
        bgPositions.map(
            (cls, i) => html`
            <div data-id="${i}" class="absolute inset-0 ${cls} from-black via-black/60 to-transparent"></div>`
        )
    )

    const ui = useTSElements(DOM, html`${overlays}`)

    return ui
}
