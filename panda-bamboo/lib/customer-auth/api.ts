import { getGatewayBaseUrl } from "@/lib/config/gateway";
import type { ApiErrorBody, AuthSession, CustomerUser } from "./types";

class AuthApiError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "AuthApiError";
  }
}

async function parseError(res: Response): Promise<AuthApiError> {
  let body: ApiErrorBody = {};
  try {
    body = (await res.json()) as ApiErrorBody;
  } catch {
    /* ignore */
  }
  const code = body.error ?? "request_failed";
  const message = body.message ?? "Something went wrong. Try again.";
  return new AuthApiError(code, message);
}

async function authFetch<T>(
  path: string,
  init: RequestInit & { accessToken?: string | null } = {},
): Promise<T> {
  const { accessToken, headers, ...rest } = init;
  const res = await fetch(`${getGatewayBaseUrl()}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(headers ?? {}),
    },
  });

  if (!res.ok) throw await parseError(res);
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export async function loginCustomer(email: string, password: string): Promise<AuthSession> {
  return authFetch<AuthSession>("/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function registerCustomer(input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}): Promise<AuthSession> {
  return authFetch<AuthSession>("/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function fetchCurrentCustomer(accessToken: string): Promise<CustomerUser> {
  const data = await authFetch<{ user: CustomerUser }>("/v1/auth/me", {
    method: "GET",
    accessToken,
  });
  return data.user;
}

export async function logoutCustomer(accessToken: string | null): Promise<void> {
  if (!accessToken) return;
  try {
    await authFetch<void>("/v1/auth/logout", { method: "POST", accessToken });
  } catch {
    /* best-effort */
  }
}

export function isAuthApiError(err: unknown): err is AuthApiError {
  return err instanceof AuthApiError;
}

export { AuthApiError };
