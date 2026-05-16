import cors from "cors";
import express from "express";
import { createCorsOptions } from "./cors.mjs";
import { authRouter } from "./routes/auth.mjs";
import { productsRouter } from "./routes/products.mjs";
import { recommendationsRouter } from "./routes/recommendations.mjs";
import { storeRouter } from "./routes/store.mjs";

const PORT = Number(process.env.PORT ?? 4000);
const HOST = process.env.HOST ?? "0.0.0.0";
const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(cors(createCorsOptions()));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "kiddex-gateway", ts: new Date().toISOString() });
});

app.get("/v1/ready", (_req, res) => {
  res.json({ ready: true, checks: { database: "skipped" } });
});

app.use("/v1/auth", authRouter);
app.use("/v1/products", productsRouter);
app.use("/v1/store", storeRouter);
app.use("/v1/recommendations", recommendationsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "not_found" });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`[kiddex-gateway] listening on http://${HOST}:${PORT} (health: /health)`);
});

function shutdown(signal) {
  console.log(`[kiddex-gateway] ${signal} — shutting down`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
