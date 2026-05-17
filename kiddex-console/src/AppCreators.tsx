import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryProvider } from "../../kiddex-creator-affiliate/src/providers/QueryProvider";
import { shellRoutes } from "@console/appShell";
import { createCreatorsRoutes } from "@console/shells/creatorsRoutes";

const router = createBrowserRouter(shellRoutes(createCreatorsRoutes()));

export function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}
