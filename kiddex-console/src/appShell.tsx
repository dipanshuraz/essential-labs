import {
  Outlet,
  ScrollRestoration,
  type RouteObject,
} from "react-router-dom";
import { ConsoleDocumentTitle } from "@console/shells/ConsoleDocumentTitle";
import { ShellTheme } from "@console/shells/ShellTheme";

export function RootLayout() {
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

export function shellRoutes(appRoutes: RouteObject[]): RouteObject[] {
  return [
    {
      element: <RootLayout />,
      children: appRoutes,
    },
  ];
}
