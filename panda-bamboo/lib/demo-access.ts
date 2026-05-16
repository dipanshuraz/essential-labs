/** Local dev credentials and URLs — mirrors kiddex-console static auth. */
export const DEMO_ACCESS = {
  storefront: {
    label: "Storefront (shoppers)",
    url: "http://localhost:3000/login",
    note: "Demo shopper login — opens Flipkart-style account hub after sign-in.",
    email: "shopper@kiddex.com",
    password: "shop123",
  },
  admin: {
    label: "Merchant admin",
    url: "http://127.0.0.1:5173/login",
    email: "admin@essentiallabs.com",
    password: "admin123",
  },
  affiliate: {
    label: "Affiliate / creator hub",
    url: "http://127.0.0.1:5174/login",
    email: "creator@kiddexcreators.com",
    password: "creator123",
  },
} as const;
