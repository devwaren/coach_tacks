export const playVideo = async (
    videoElement: HTMLVideoElement,
    filename: string
) => {
    try {
        // Step 1: Get CSRF
        const resToken = await fetch("http://localhost:4000/api/csrf-token", {
            credentials: "include",
        });
        const { csrfToken } = await resToken.json();

        // Step 2: Request video
        const res = await fetch(
            `http://localhost:4000/api/play-video/${filename}`,
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
        console.error("Error playing video:", err);
    }
};
