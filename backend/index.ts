import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { backendRouter } from "./routes/setup.router.ts";

const app = express();

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

// Run backend on another port (e.g., 4000)
const PORT = process.env.BACKEND_PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
});
