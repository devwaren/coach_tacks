const useSSR = (DOM?: HTMLElement) => {
    // SSR: no window or document available
    if (typeof window === "undefined" || typeof document === "undefined") {
        return { isDOM: null };
    }

    // CSR: DOM is available
    const isDOM = DOM || document.body;
    return { isDOM };
};

export { useSSR }
