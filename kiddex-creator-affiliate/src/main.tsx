import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/App";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/theme/ThemeContext";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
);
