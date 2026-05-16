export type AppMode = "admin" | "creators";

declare global {
  const __KIDDEX_APP_MODE__: string;
}

export function getAppMode(): AppMode {
  const fromDefine =
    typeof __KIDDEX_APP_MODE__ !== "undefined" ? __KIDDEX_APP_MODE__ : undefined;
  const fromEnv = import.meta.env.VITE_APP as string | undefined;
  const mode = fromDefine || fromEnv || "admin";
  if (mode === "creators") return "creators";
  return "admin";
}
