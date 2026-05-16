import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { AuthProvider } from "@/auth/AuthContext";
import { RequireAuth } from "@/auth/ProtectedRoute";
import { AdminLayout } from "@/layout/AdminLayout";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { OrdersPage } from "@/pages/OrdersPage";
import { CustomersPage } from "@/pages/CustomersPage";
import { CategoriesPage } from "@/pages/CategoriesPage";
import { TransactionsPage } from "@/pages/TransactionsPage";
import { AddProductPage } from "@/pages/AddProductPage";
import { AdminRolePage } from "@/pages/AdminRolePage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";

function getRouterBasename(): string {
  const raw = import.meta.env.BASE_URL ?? "/";
  if (raw === "/" || raw === "./") return "/";
  const trimmed = raw.endsWith("/") ? raw.slice(0, -1) : raw;
  if (!trimmed || trimmed === ".") return "/";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { path: "/login", element: <LoginPage /> },
        {
          element: <RequireAuth />,
          children: [
            {
              element: <AdminLayout />,
              children: [
                { index: true, element: <DashboardPage /> },
                { path: "orders", element: <OrdersPage /> },
                { path: "customers", element: <CustomersPage /> },
                { path: "categories", element: <CategoriesPage /> },
                { path: "transactions", element: <TransactionsPage /> },
                { path: "products/new", element: <AddProductPage /> },
                { path: "products/media", element: <PlaceholderPage title="Product Media" /> },
                { path: "products/reviews", element: <PlaceholderPage title="Product Reviews" /> },
                { path: "products", element: <PlaceholderPage title="Product List" /> },
                { path: "admin-role", element: <AdminRolePage /> },
                {
                  path: "coupons",
                  element: (
                    <PlaceholderPage
                      title="Coupon Code"
                      hint="Create and manage discount coupons (coming soon)."
                    />
                  ),
                },
                { path: "brand", element: <PlaceholderPage title="Brand" /> },
                { path: "control", element: <PlaceholderPage title="Control Authority" /> },
              ],
            },
          ],
        },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ],
  { basename: getRouterBasename() },
);

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
