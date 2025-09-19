import { Router } from "express";
import path from "path";
import fs from "fs";
import { csrfProtection, generateCsrfToken } from "../utils";

export const backendRouter = Router();

// CSRF token endpoint
backendRouter.get("/csrf-token", generateCsrfToken);

// Example protected route
backendRouter.get("/play-video", (req, res) => {
    const csrfHeader = req.headers["x-csrf-token"];
    const csrfCookie = req.cookies["csrf_token"];

    if (csrfHeader !== csrfCookie) {
        return res.status(403).json({ error: "Invalid CSRF token" });
    }

    res.json({ message: "CSRF token valid" });
});

// ✅ Protected video route
backendRouter.get("/play-video/:filename", csrfProtection, (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), "videos", filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "Video not found" });
    }

    res.setHeader("Content-Type", "video/mp4");
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
});
