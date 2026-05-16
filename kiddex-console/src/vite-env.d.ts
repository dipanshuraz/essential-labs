/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP?: "admin" | "creators";
  readonly VITE_STOREFRONT_URL?: string;
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __KIDDEX_APP_MODE__: "admin" | "creators";
