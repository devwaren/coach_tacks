import { Router } from "express";
import path from "path";
import fs from "fs";
import { csrfProtection, generateTokens } from "../utils/index.js";

export const backendRouter = Router();

// CSRF + refresh endpoint
backendRouter.get("/csrf-token", generateTokens);

// Example protected route (manual check)
backendRouter.get("/play-video", (req, res) => {
    const csrfHeader = req.headers["x-csrf-token"];
    const csrfCookie = req.cookies["enc_csrf_token"]; // ✅ match generateTokens cookie

    if (csrfHeader !== csrfCookie) {
        return res.status(403).json({ error: "Invalid CSRF token" });
    }

    res.json({ message: "CSRF token valid" });
});

// ✅ Protected video route (uses middleware)
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
