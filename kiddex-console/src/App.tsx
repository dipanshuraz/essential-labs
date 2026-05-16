import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { QueryProvider } from "../../kiddex-creator-affiliate/src/providers/QueryProvider";
import { getAppMode } from "@console/env";
import { ConsoleDocumentTitle } from "@console/shells/ConsoleDocumentTitle";
import { ShellTheme } from "@console/shells/ShellTheme";
import { createAdminRoutes } from "@console/shells/adminRoutes";
import { createCreatorsRoutes } from "@console/shells/creatorsRoutes";

function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <ConsoleDocumentTitle />
      <ShellTheme>
        <Outlet />
      </ShellTheme>
    </>
  );
}

function buildRoutes() {
  const mode = getAppMode();
  const appRoutes = mode === "creators" ? createCreatorsRoutes() : createAdminRoutes();

  return [
    {
      element: <RootLayout />,
      children: appRoutes,
    },
  ];
}

const router = createBrowserRouter(buildRoutes());

export function App() {
  const mode = getAppMode();

  if (mode === "creators") {
    return (
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    );
  }

  return <RouterProvider router={router} />;
}
