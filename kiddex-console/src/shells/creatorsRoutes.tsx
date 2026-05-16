import { Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "../../../kiddex-creator-affiliate/src/auth/AuthContext";
import { RequireAuth } from "../../../kiddex-creator-affiliate/src/auth/ProtectedRoute";
import { AppLayout } from "../../../kiddex-creator-affiliate/src/layout/AppLayout";
import { LoginPage } from "../../../kiddex-creator-affiliate/src/pages/LoginPage";
import { TrakrDashboardPage } from "../../../kiddex-creator-affiliate/src/pages/trakr/TrakrDashboardPage";
import { MarketplacePage } from "../../../kiddex-creator-affiliate/src/pages/trakr/MarketplacePage";
import { AffiliatesPage } from "../../../kiddex-creator-affiliate/src/pages/trakr/AffiliatesPage";
import { AffiliateDetailPage } from "../../../kiddex-creator-affiliate/src/pages/trakr/AffiliateDetailPage";
import { TransactionsPage } from "../../../kiddex-creator-affiliate/src/pages/trakr/TransactionsPage";
import { ReferralsPage } from "../../../kiddex-creator-affiliate/src/pages/trakr/ReferralsPage";
import { ReportsPage } from "../../../kiddex-creator-affiliate/src/pages/trakr/ReportsPage";
import { PayoutsPage } from "../../../kiddex-creator-affiliate/src/pages/trakr/PayoutsPage";
import { CampaignSettingsPage } from "../../../kiddex-creator-affiliate/src/pages/trakr/CampaignSettingsPage";
import { IntegrationsPage } from "../../../kiddex-creator-affiliate/src/pages/trakr/IntegrationsPage";
import { EmailSettingsPage } from "../../../kiddex-creator-affiliate/src/pages/trakr/EmailSettingsPage";
import { SubscriptionsPage } from "../../../kiddex-creator-affiliate/src/pages/trakr/SubscriptionsPage";
import { InfluencerModePage } from "../../../kiddex-creator-affiliate/src/pages/trakr/InfluencerModePage";

const authedCreatorPages = [
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
];

/** Creator / Trakr hub — routes at `/` (standalone Cloudflare deploy). */
export function createCreatorsRoutes(loginPath = "/login", homePath = "/") {
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
              element: <AppLayout />,
              children: authedCreatorPages,
            },
          ],
        },
        { path: "*", element: <Navigate to={homePath} replace /> },
      ],
    },
  ];
}
