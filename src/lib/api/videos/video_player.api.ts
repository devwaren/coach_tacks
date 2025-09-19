type PlayVideo = (videoElement: HTMLVideoElement, filename: string) => Promise<void>;

export const playVideo: PlayVideo = async (videoElement, filename) => {
    try {
        // Step 1: Get CSRF
        const resToken = await fetch("/api/csrf-token", {
            credentials: "include",
        });
        const { csrfToken } = await resToken.json();

        // Step 2: Set video src directly (streaming supported!)
        videoElement.src = `/api/play-video/${filename}`;
        videoElement.setAttribute("crossorigin", "use-credentials");
        videoElement.setAttribute("x-csrf-token", csrfToken); // if needed, handled differently

        await videoElement.play();
    } catch (err) {
        if (import.meta.env.DEV) console.error("Video play error:", err);
    }
};
