import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { shellRoutes } from "@console/appShell";
import { createAdminRoutes } from "@console/shells/adminRoutes";

const router = createBrowserRouter(shellRoutes(createAdminRoutes()));

export function App() {
  return <RouterProvider router={router} />;
}
