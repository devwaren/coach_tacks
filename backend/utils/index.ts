import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { encryptAESGCM, decryptAESGCM } from "./encryptAES.js";

// In-memory store (use Redis/DB in prod!)
const refreshStore = new Map<string, { csrfToken: string; expires: number }>();

const REFRESH_TTL = 30 * 1000; // 30 sec
const CSRF_TTL = REFRESH_TTL;

setInterval(() => {
    const now = Date.now();
    for (const [refreshToken, session] of refreshStore.entries()) {
        if (session.expires < now) {
            refreshStore.delete(refreshToken);
            if (process.env.NODE_ENV === "development") {
                console.log(`⏳ Revoked expired refresh_token=${refreshToken}`);
            }
        }
    }
}, 2000);

// Generate new csrf + refresh
export function generateTokens(_req: Request, res: Response) {
    const csrfToken = crypto.randomBytes(32).toString("hex");
    const refreshToken = crypto.randomBytes(48).toString("hex");
    const expires = Date.now() + REFRESH_TTL;

    refreshStore.set(refreshToken, { csrfToken, expires });

    // 🔒 Refresh token stays HttpOnly
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: REFRESH_TTL,
    });

    // 🔐 Store encrypted CSRF token in cookie
    const encryptedCsrf = encryptAESGCM(csrfToken);
    res.cookie("enc_csrf_token", encryptedCsrf, {
        httpOnly: false, // ✅ frontend can read but it’s encrypted
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: CSRF_TTL,
    });

    res.json({ csrfToken }); // still send raw for JS use
}

// Rotate refresh + csrf
export function refreshTokens(req: Request, res: Response) {
    const oldRefresh = req.cookies["refresh_token"];
    if (!oldRefresh) return res.status(401).json({ error: "Missing refresh token" });

    const session = refreshStore.get(oldRefresh);
    if (!session) return res.status(403).json({ error: "Invalid refresh token" });

    if (Date.now() > session.expires) {
        refreshStore.delete(oldRefresh);
        return res.status(403).json({ error: "Refresh expired" });
    }

    // Rotate
    const newCsrf = crypto.randomBytes(32).toString("hex");
    const newRefresh = crypto.randomBytes(48).toString("hex");
    const expires = Date.now() + REFRESH_TTL;

    refreshStore.set(newRefresh, { csrfToken: newCsrf, expires });
    refreshStore.delete(oldRefresh);

    res.cookie("refresh_token", newRefresh, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: REFRESH_TTL,
    });

    const encryptedCsrf = encryptAESGCM(newCsrf);
    res.cookie("enc_csrf_token", encryptedCsrf, {
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: CSRF_TTL,
    });

    res.json({ csrfToken: newCsrf });
}

// CSRF protection middleware
export function csrfProtection(req: Request, res: Response, next: NextFunction) {
    const encCookie = req.cookies["enc_csrf_token"];
    const csrfHeader = req.get("x-csrf-token");
    const csrfQuery = req.query.csrf as string | undefined;

    let csrfCookie: string | undefined;
    try {
        if (encCookie) csrfCookie = decryptAESGCM(encCookie);
    } catch {
        return res.status(403).json({ error: "Invalid CSRF cookie" });
    }

    const csrfValue = csrfHeader || csrfQuery;

    if (!csrfCookie || !csrfValue || csrfCookie !== csrfValue) {
        return res.status(403).json({ error: "Invalid CSRF token" });
    }
    next();
}
