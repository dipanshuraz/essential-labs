/**
 * CORS for local dev vs Railway/Render.
 * Set CORS_ORIGINS to a comma-separated list of allowed origins in production.
 */
export function createCorsOptions() {
  const origins = process.env.CORS_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!origins?.length) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[kiddex-gateway] CORS_ORIGINS is unset — cross-origin browser calls will be blocked.",
      );
    }
    return { origin: true, credentials: true };
  }

  return {
    origin(origin, callback) {
      if (!origin || origins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  };
}
