export const fetchCSRF = async () => {
    const res = await fetch("/api/csrf-token", {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch CSRF token");
    }

    return res.json() as Promise<{ csrfToken: string }>;
};
