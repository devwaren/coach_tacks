type PlayVideo = (videoElement: HTMLVideoElement, filename: string) => Promise<void>;

// frontend
export const playVideo: PlayVideo = async (videoElement, filename) => {
    try {
        // Step 1: Get CSRF
        const resToken = await fetch("/api/csrf-token", {
            credentials: "include",
        });
        const { csrfToken } = await resToken.json();

        // Step 2: Stream with CSRF in query
        videoElement.src = `/api/play-video/${filename}?csrf=${csrfToken}`;
        videoElement.setAttribute("crossorigin", "use-credentials");

        await videoElement.play();
    } catch (err) {
        if (import.meta.env.DEV) console.error("Video play error:", err);
    }
};
