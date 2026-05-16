import type { FetchRecommendationsParams, RecommendationsResponse } from "@/lib/recommendations";
import { getLocalRecommendations } from "@/lib/recommendations";

const GATEWAY_URL = process.env.GATEWAY_URL ?? "http://localhost:4000";
const FETCH_TIMEOUT_MS = 2_500;

function buildQuery(params: FetchRecommendationsParams): string {
  const q = new URLSearchParams();
  if (params.context) q.set("context", params.context);
  if (params.productId) q.set("productId", params.productId);
  if (params.productIds?.length) q.set("productIds", params.productIds.join(","));
  if (params.limit != null) q.set("limit", String(params.limit));
  return q.toString();
}

/** Fetch recommendations from kiddex-gateway, with local rules fallback. */
export async function fetchRecommendations(
  params: FetchRecommendationsParams = {},
): Promise<RecommendationsResponse> {
  const query = buildQuery(params);
  const url = `${GATEWAY_URL.replace(/\/$/, "")}/v1/recommendations${query ? `?${query}` : ""}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      return getLocalRecommendations(params);
    }

    const data = (await res.json()) as RecommendationsResponse;
    if (!Array.isArray(data.products) || data.products.length === 0) {
      return getLocalRecommendations(params);
    }

    return { ...data, source: "gateway" };
  } catch {
    return getLocalRecommendations(params);
  }
}
