"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  fetchCurrentCustomer,
  isAuthApiError,
  loginCustomer,
  logoutCustomer,
  registerCustomer,
} from "./api";
import {
  createDemoSession,
  DEMO_CUSTOMER_USER,
  isDemoAccessToken,
  matchesDemoLogin,
} from "./staticAuth";
import {
  clearSession,
  persistSession,
  readAccessToken,
  readStoredUser,
} from "./session";
import type { CustomerUser } from "./types";

type CustomerAuthContextValue = {
  user: CustomerUser | null;
  isAuthed: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; message: string }>;
  register: (input: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => Promise<{ ok: true } | { ok: false; message: string }>;
  logout: () => Promise<void>;
};

const CustomerAuthContext = createContext<CustomerAuthContextValue | null>(null);

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const token = readAccessToken();
      const cached = readStoredUser();
      if (cached) setUser(cached);

      if (!token) {
        if (!cancelled) setIsLoading(false);
        return;
      }

      if (isDemoAccessToken(token)) {
        const demoUser = cached ?? DEMO_CUSTOMER_USER;
        persistSession(token, demoUser);
        if (!cancelled) {
          setUser(demoUser);
          setIsLoading(false);
        }
        return;
      }

      try {
        const me = await fetchCurrentCustomer(token);
        if (!cancelled) {
          persistSession(token, me);
          setUser(me);
        }
      } catch {
        clearSession();
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (matchesDemoLogin(email, password)) {
      const session = createDemoSession();
      persistSession(session.accessToken, session.user);
      setUser(session.user);
      return { ok: true as const };
    }

    try {
      const session = await loginCustomer(email, password);
      persistSession(session.accessToken, session.user);
      setUser(session.user);
      return { ok: true as const };
    } catch (err) {
      const message = isAuthApiError(err) ? err.message : "Could not sign in. Is the API running?";
      return { ok: false as const, message };
    }
  }, []);

  const register = useCallback(
    async (input: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone?: string;
    }) => {
      if (matchesDemoLogin(input.email, input.password)) {
        const session = createDemoSession();
        const user: CustomerUser = {
          ...session.user,
          firstName: input.firstName || session.user.firstName,
          lastName: input.lastName || session.user.lastName,
          phone: input.phone || session.user.phone,
        };
        persistSession(session.accessToken, user);
        setUser(user);
        return { ok: true as const };
      }

      try {
        const session = await registerCustomer(input);
        persistSession(session.accessToken, session.user);
        setUser(session.user);
        return { ok: true as const };
      } catch (err) {
        const message = isAuthApiError(err) ? err.message : "Could not create account.";
        return { ok: false as const, message };
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    const token = readAccessToken();
    if (!isDemoAccessToken(token)) {
      await logoutCustomer(token);
    }
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthed: !!user,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  );

  return <CustomerAuthContext.Provider value={value}>{children}</CustomerAuthContext.Provider>;
}

export function useCustomerAuth() {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error("useCustomerAuth must be used within CustomerAuthProvider");
  return ctx;
}
