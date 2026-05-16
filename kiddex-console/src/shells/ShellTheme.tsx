import { ThemeProvider } from "@kiddex/ui";
import type { ReactNode } from "react";
import { getAppMode } from "@console/env";

export function ShellTheme({ children }: { children: ReactNode }) {
  const shell = getAppMode() === "creators" ? "creators" : "admin";
  return <ThemeProvider shell={shell}>{children}</ThemeProvider>;
}
