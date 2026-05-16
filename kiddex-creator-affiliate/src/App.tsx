import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { AuthProvider } from "@/auth/AuthContext";
import { RequireAuth } from "@/auth/ProtectedRoute";
import { AppLayout } from "@/layout/AppLayout";
import { LoginPage } from "@/pages/LoginPage";
import { TrakrDashboardPage } from "@/pages/trakr/TrakrDashboardPage";
import { MarketplacePage } from "@/pages/trakr/MarketplacePage";
import { AffiliatesPage } from "@/pages/trakr/AffiliatesPage";
import { AffiliateDetailPage } from "@/pages/trakr/AffiliateDetailPage";
import { TransactionsPage } from "@/pages/trakr/TransactionsPage";
import { ReferralsPage } from "@/pages/trakr/ReferralsPage";
import { ReportsPage } from "@/pages/trakr/ReportsPage";
import { PayoutsPage } from "@/pages/trakr/PayoutsPage";
import { CampaignSettingsPage } from "@/pages/trakr/CampaignSettingsPage";
import { IntegrationsPage } from "@/pages/trakr/IntegrationsPage";
import { EmailSettingsPage } from "@/pages/trakr/EmailSettingsPage";
import { SubscriptionsPage } from "@/pages/trakr/SubscriptionsPage";
import { InfluencerModePage } from "@/pages/trakr/InfluencerModePage";

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
              element: <AppLayout />,
              children: [
                { index: true, element: <TrakrDashboardPage /> },
                { path: "marketplace", element: <MarketplacePage /> },
                { path: "affiliates", element: <AffiliatesPage /> },
                { path: "affiliates/:id", element: <AffiliateDetailPage /> },
                { path: "transactions", element: <TransactionsPage /> },
                { path: "referrals", element: <ReferralsPage /> },
                { path: "reports", element: <ReportsPage /> },
                { path: "payouts", element: <PayoutsPage /> },
                { path: "settings/campaign", element: <CampaignSettingsPage /> },
                { path: "settings/integrations", element: <IntegrationsPage /> },
                { path: "settings/email", element: <EmailSettingsPage /> },
                { path: "billing/subscriptions", element: <SubscriptionsPage /> },
                { path: "influencer", element: <InfluencerModePage /> },
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
