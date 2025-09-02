import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import fs from "node:fs";
import path from "node:path";

export function generateCsrfToken(_req: Request, res: Response) {
    const token = crypto.randomBytes(32).toString("hex");

    res.cookie("enc_csrf_token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });

    res.json({ csrfToken: token });
}

export function csrfProtection(req: Request, res: Response, next: NextFunction) {
    const csrfCookie = req.cookies["enc_csrf_token"];
    const csrfHeader = req.get("x-csrf-token");

    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
        return res.status(403).json({ error: "Invalid CSRF token" });
    }
    next();
}


export function streamVideo(req: Request, res: Response) {
    const { filename } = req.params; // dynamic filename
    const videoPath = path.resolve(__dirname, "../public/videos", filename);

    if (!fs.existsSync(videoPath)) {
        return res.status(404).send("Video not found");
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;

        const file = fs.createReadStream(videoPath, { start, end });
        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "video/mp4",
        });
        file.pipe(res);
    } else {
        res.writeHead(200, {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
        });
        fs.createReadStream(videoPath).pipe(res);
    }
}
