import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { backendRouter } from "./backend/routes/setup.router.ts";

export function runServer(app: express.Express) {

    // ✅ Enable CORS for frontend
    app.use(
        cors({
            origin: "http://localhost:5173", // your frontend port
            credentials: true, // allow cookies
        })
    );

    app.use(cookieParser());
    app.use(express.json());

    // Routes
    app.use(backendRouter);

}
