import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useState, type ComponentType, type ReactNode } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: { retry: 0 },
    },
  });
}

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-query-devtools").then((m) => ({
        default: m.ReactQueryDevtools as ComponentType<{
          initialIsOpen?: boolean;
          buttonPosition?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
        }>,
      })),
    )
  : null;

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(makeQueryClient);
  return (
    <QueryClientProvider client={client}>
      {children}
      {ReactQueryDevtools ? (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        </Suspense>
      ) : null}
    </QueryClientProvider>
  );
}
