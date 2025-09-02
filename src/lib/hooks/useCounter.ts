import { createSignal } from '@devwareng/vanilla-ts'

export function useCounter() {
    const count = createSignal<number>(0)
    const handleClick = () => count.set(count.get() + 1)

    return {
        handleClick,
        subscribe: count.subscribe,
        getCount: count.get
    }
}
