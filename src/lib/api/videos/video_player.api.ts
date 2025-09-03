
type PlayVideo = (videoElement: HTMLVideoElement, filename: string) => Promise<void>

const isDev = import.meta.env.DEV

export const playVideo: PlayVideo = async (
    videoElement,
    filename
) => {
    try {
        // Step 1: Get CSRF
        const resToken = await fetch("/api/csrf-token", {
            credentials: "include",
        });
        const { csrfToken } = await resToken.json();

        // Step 2: Request video
        const res = await fetch(
            `/api/play-video/${filename}`,
            {
                headers: { "x-csrf-token": csrfToken },
                credentials: "include",
            }
        );

        if (!res.ok) throw new Error(`Failed: ${res.statusText}`);

        // Step 3: Blob + assign
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        videoElement.src = url;
        await videoElement.play();
    } catch (err) {
        if (isDev) console.error("Video play error:", err);
    }
};
