import type { CustomerUser } from "./types";

export const CUSTOMER_ACCESS_TOKEN_KEY = "kiddex-customer-access-token";
export const CUSTOMER_SESSION_KEY = "kiddex-customer-session";

export function readAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(CUSTOMER_ACCESS_TOKEN_KEY);
}

export function readStoredUser(): CustomerUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CUSTOMER_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CustomerUser;
    return parsed?.email ? parsed : null;
  } catch {
    return null;
  }
}

export function persistSession(accessToken: string, user: CustomerUser) {
  sessionStorage.setItem(CUSTOMER_ACCESS_TOKEN_KEY, accessToken);
  sessionStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  sessionStorage.removeItem(CUSTOMER_ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(CUSTOMER_SESSION_KEY);
}
