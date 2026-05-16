import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const THEME_STORAGE_KEY = "kiddex-console-theme";

export type Theme = "light" | "dark";
export type Shell = "admin" | "creators";

type ThemeContextValue = {
  theme: Theme;
  shell: Shell;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): Theme {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (v === "dark" || v === "light") return v;
  } catch {
    /* ignore */
  }
  return "light";
}

function applyDom(theme: Theme, shell: Shell) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.shell = shell;
}

export function ThemeProvider({
  children,
  shell,
}: {
  children: ReactNode;
  shell: Shell;
}) {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window !== "undefined" ? readStoredTheme() : "light",
  );

  useEffect(() => {
    applyDom(theme, shell);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme, shell]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ theme, shell, setTheme, toggleTheme }),
    [theme, shell, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
