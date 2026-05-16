import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const DEFAULT_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

function b64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromB64url(str) {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  return Buffer.from(str.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function getSecret() {
  const secret = process.env.AUTH_JWT_SECRET ?? "kiddex-dev-auth-secret-change-me";
  if (process.env.NODE_ENV === "production" && secret.includes("dev")) {
    console.warn("[kiddex-gateway] Set AUTH_JWT_SECRET in production.");
  }
  return secret;
}

export function signAccessToken(payload, ttlSec = DEFAULT_TTL_SEC) {
  const now = Math.floor(Date.now() / 1000);
  const body = {
    ...payload,
    iat: now,
    exp: now + ttlSec,
    jti: randomBytes(12).toString("hex"),
  };
  const encoded = b64url(JSON.stringify(body));
  const sig = createHmac("sha256", getSecret()).update(encoded).digest("base64url");
  return `${encoded}.${sig}`;
}

export function verifyAccessToken(token) {
  if (!token || typeof token !== "string") return null;
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;

  const expected = createHmac("sha256", getSecret()).update(encoded).digest();
  const actual = fromB64url(sig);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

  try {
    const payload = JSON.parse(fromB64url(encoded).toString("utf8"));
    if (!payload?.sub || !payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function extractBearer(req) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7).trim();
}
