import cors from "cors";
import express from "express";

const PORT = Number(process.env.PORT ?? 4000);
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "kiddex-gateway", ts: new Date().toISOString() });
});

app.get("/v1/ready", (_req, res) => {
  res.json({ ready: true, checks: { database: "skipped" } });
});

/** Placeholder for product recommendation engine — replace with model + catalog service. */
app.get("/v1/recommendations", (req, res) => {
  const productId = typeof req.query.productId === "string" ? req.query.productId : null;
  res.json({
    source: "stub",
    productId,
    ids: [],
    message: "Wire to recommendation_service + vector store in a later iteration.",
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: "not_found" });
});

app.listen(PORT, () => {
  console.log(`[kiddex-gateway] http://localhost:${PORT} (health: /health)`);
});
