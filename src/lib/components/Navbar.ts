import { html, useTSElements, useTSSelect } from "@devwareng/vanilla-ts";
import { createStore } from "zustand/vanilla";

// --------------------
// Zustand store
// --------------------
type SidebarState = {
    open: boolean;
    toggle: () => void;
    close: () => void;
};

export const useSidebarStore = createStore<SidebarState>((set) => ({
    open: false,
    toggle: () => set((state) => ({ open: !state.open })),
    close: () => set({ open: false }),
}));

// --------------------
// Navbar component
// --------------------
export default function Navbar(DOM: HTMLElement) {
    const ui = useTSElements(
        DOM,
        html`
    <header class="relative max-w-[1660px] mx-auto flex items-center justify-between p-4">
        <!-- Logo -->
        <img src="/logo.png" alt="logo of john tacker" width="240" class="z-20" />
    
        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-6 text-white">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Online Coaching</a>
            <a href="#">Get In Touch</a>
            <div class="text-2xl flex gap-3">
                <a href="https://www.facebook.com/johngian.isidro" aria-label="facebook"><i class="bx bxl-facebook"></i></a>
                <a href="https://www.instagram.com/coach_tackssss/" aria-label="instagram"><i
                        class="bx bxl-instagram"></i></a>
            </div>
        </nav>
    
        <!-- Hamburger button -->
        <button id="mobile-toggle" class="md:hidden text-white text-3xl z-20">&#9776;</button>
    
        <!-- Mobile Sidebar -->
        <aside id="mobile-sidebar"
            class="fixed  top-0 right-0 w-64 h-full bg-slate-dark text-white transform translate-x-full transition-transform duration-300 z-99 shadow-lg">
            <div class="flex justify-end p-4">
                <button id="mobile-close" class="text-3xl">&times;</button>
            </div>
            <nav class="flex flex-col gap-6 mt-8 px-6">
                <a href="#" class="text-lg">Home</a>
                <a href="#" class="text-lg">About</a>
                <a href="#" class="text-lg">Online Coaching</a>
                <a href="#" class="text-lg">Get In Touch</a>
                <div class="flex gap-4 mt-4 text-2xl">
                    <a href="https://www.facebook.com/johngian.isidro" aria-label="facebook"><i
                            class="bx bxl-facebook"></i></a>
                    <a href="https://www.instagram.com/coach_tackssss/" aria-label="instagram"><i
                            class="bx bxl-instagram"></i></a>
                </div>
            </nav>
        </aside>
    
        <!-- Overlay -->
        <div id="sidebar-overlay" class="fixed inset-0 bg-black/90 bg-opacity-50 hidden z-5"></div>
    </header>
    `
    );

    // --------------------
    // Sidebar toggle logic
    // --------------------
    const toggleBtn = useTSSelect("#mobile-toggle", DOM) as HTMLButtonElement;
    const closeBtn = useTSSelect("#mobile-close", DOM) as HTMLButtonElement;
    const sidebar = useTSSelect("#mobile-sidebar", DOM) as HTMLElement;
    const overlay = useTSSelect("#sidebar-overlay", DOM) as HTMLElement;

    function renderSidebar() {
        const open = useSidebarStore.getState().open;
        if (open) {
            sidebar.classList.remove("translate-x-full");
            overlay.classList.remove("hidden");
        } else {
            sidebar.classList.add("translate-x-full");
            overlay.classList.add("hidden");
        }
    }

    // Subscribe to state changes
    useSidebarStore.subscribe(renderSidebar);

    // Event handlers
    toggleBtn.addEventListener("click", () => useSidebarStore.getState().toggle());
    closeBtn.addEventListener("click", () => useSidebarStore.getState().close());
    overlay.addEventListener("click", () => useSidebarStore.getState().close());

    // Render initial state
    renderSidebar();

    return ui;
}
