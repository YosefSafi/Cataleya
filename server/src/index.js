import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { LOCAL_UPLOAD_DIR } from "./lib/storage.js";

import authRoutes from "./routes/auth.js";
import loyaltyRoutes from "./routes/loyalty.js";
import labResultsRoutes from "./routes/labResults.js";
import uploadRoutes from "./routes/upload.js";
import newsletterRoutes from "./routes/newsletter.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/loyalty-accounts", loyaltyRoutes);
app.use("/api/lab-results", labResultsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/newsletter", newsletterRoutes);

// Served only when STORAGE_PROVIDER=local; in production (STORAGE_PROVIDER=azure)
// uploaded files are served directly from Azure Blob Storage instead.
if (process.env.STORAGE_PROVIDER !== "azure") {
  app.use("/uploads", express.static(LOCAL_UPLOAD_DIR));
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Cattleya Labs API listening on port ${port}`);
});
