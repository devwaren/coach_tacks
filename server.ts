import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import type { ViteDevServer } from "vite";
import crypto from "crypto"; // nonce
import cookieParser from "cookie-parser";
import { backendRouter } from "./backend/routes/setup.router"; // 🔧 no .ts

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

const app = express();

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());

// ✅ Security headers (prod)
if (!isDev) {
  app.use((req, res, next) => {
    const nonce = crypto.randomBytes(16).toString("base64");
    res.locals.nonce = nonce;

    const csp = [
      "default-src 'self'",
      "img-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline'",
      `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com`,
      "font-src 'self' https: data:",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://www.googleapis.com https://www.gstatic.com http://localhost:4000 ws://localhost:5173 ws://localhost:4000",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "cross-origin");
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");

    const ua = req.headers["user-agent"] || "";
    if (/Lighthouse|Chrome-Lighthouse|PageSpeed/i.test(ua)) {
      res.setHeader("Content-Security-Policy-Report-Only", csp);
    } else {
      res.setHeader("Content-Security-Policy", csp);
    }

    next();
  });
}

// ✅ Mount backend API under /api
app.use("/api", backendRouter);

// Dev server (Vite) or static handler
let vite: ViteDevServer | undefined;
if (isDev) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv(path.resolve(__dirname, "dist/client"), { extensions: [] }));
}

// HTML rendering
app.use("*all", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template: string;
    let render: (url: string, nonce: string) => Promise<{ html?: string; head?: string }>;

    if (isDev && vite) {
      template = await fs.readFile(path.resolve(__dirname, "index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.ts")).render;
    } else {
      template = await fs.readFile(path.resolve(__dirname, "dist/client/index.html"), "utf-8");
      const mod = await import(`file://${path.resolve(__dirname, "dist/server/entry-server.js")}`); // 🔧
      render = mod.render as typeof render;
    }

    const rendered = await render(url, res.locals.nonce);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "")
      .replace(/<script(?![^>]*src)/g, `<script nonce="${res.locals.nonce}"`);

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace?.(e as Error);
    console.error((e as Error).stack);
    res.status(500).end((e as Error).stack);
  }
});

app.listen(port, () => {
  console.log(`✅ Server started at http://localhost:${port} (${isDev ? "dev" : "prod"})`);
});
