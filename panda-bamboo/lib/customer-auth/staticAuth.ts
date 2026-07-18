import type { AuthSession, CustomerUser } from "./types";

/** Seeded demo shopper — works without the API gateway. */
export const CUSTOMER_LOGIN = {
  email: "shopper@kiddex.com",
  password: "shop123",
} as const;

export const DEMO_ACCESS_TOKEN = "kiddex-demo-static-token";

export const DEMO_CUSTOMER_USER: CustomerUser = {
  id: "demo-shopper",
  email: CUSTOMER_LOGIN.email,
  firstName: "Demo",
  lastName: "Shopper",
  phone: "+1 555 0100",
};

export function isDemoAccessToken(token: string | null | undefined): boolean {
  return token === DEMO_ACCESS_TOKEN;
}

export function matchesDemoLogin(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === CUSTOMER_LOGIN.email &&
    password === CUSTOMER_LOGIN.password
  );
}

export function createDemoSession(): AuthSession {
  return {
    accessToken: DEMO_ACCESS_TOKEN,
    user: DEMO_CUSTOMER_USER,
  };
}
