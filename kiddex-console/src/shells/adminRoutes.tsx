import { Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "../../../essential-labs-admin/src/auth/AuthContext";
import { RequireAuth } from "../../../essential-labs-admin/src/auth/ProtectedRoute";
import { AdminLayout } from "../../../essential-labs-admin/src/layout/AdminLayout";
import { LoginPage } from "../../../essential-labs-admin/src/pages/LoginPage";
import { DashboardPage } from "../../../essential-labs-admin/src/pages/DashboardPage";
import { OrdersPage } from "../../../essential-labs-admin/src/pages/OrdersPage";
import { CustomersPage } from "../../../essential-labs-admin/src/pages/CustomersPage";
import { CategoriesPage } from "../../../essential-labs-admin/src/pages/CategoriesPage";
import { TransactionsPage } from "../../../essential-labs-admin/src/pages/TransactionsPage";
import { AddProductPage } from "../../../essential-labs-admin/src/pages/AddProductPage";
import { AdminRolePage } from "../../../essential-labs-admin/src/pages/AdminRolePage";
import { PlaceholderPage } from "../../../essential-labs-admin/src/pages/PlaceholderPage";

const authedAdminPages = [
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
];

/** Merchant admin — routes at `/` (standalone Cloudflare deploy). */
export function createAdminRoutes(loginPath = "/login", homePath = "/") {
  const loginSegment = loginPath.replace(/^\//, "") || "login";

  return [
    {
      element: (
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      ),
      children: [
        { path: loginSegment, element: <LoginPage /> },
        {
          element: <RequireAuth />,
          children: [
            {
              element: <AdminLayout />,
              children: authedAdminPages,
            },
          ],
        },
        { path: "*", element: <Navigate to={homePath} replace /> },
      ],
    },
  ];
}
