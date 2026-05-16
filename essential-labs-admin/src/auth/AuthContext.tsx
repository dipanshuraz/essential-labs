import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SESSION_STORAGE_KEY, STATIC_LOGIN } from "@/config/staticAuth";

type AuthState = {
  isAuthed: boolean;
  email: string | null;
};

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStored(): AuthState {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return { isAuthed: false, email: null };
    const parsed = JSON.parse(raw) as { email?: string };
    if (typeof parsed.email === "string") return { isAuthed: true, email: parsed.email };
  } catch {
    /* ignore */
  }
  return { isAuthed: false, email: null };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() =>
    typeof window !== "undefined" ? readStored() : { isAuthed: false, email: null },
  );

  const login = useCallback((email: string, password: string) => {
    const ok =
      email.trim().toLowerCase() === STATIC_LOGIN.email &&
      password === STATIC_LOGIN.password;
    if (!ok) return false;
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ email: STATIC_LOGIN.email }));
    setState({ isAuthed: true, email: STATIC_LOGIN.email });
    return true;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setState({ isAuthed: false, email: null });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [state, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
