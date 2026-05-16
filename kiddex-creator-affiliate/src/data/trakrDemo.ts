export const DEMO_METRICS = {
  revenue: 83302,
  revenueTrend: 5,
  clicks: 73853,
  clicksTrend: -2.5,
  conversions: 47,
  conversionsTrend: 4.5,
  payouts: 62302,
  payoutsTrend: 5,
};

export const SPARK_REVENUE = [12, 14, 13, 16, 18, 17, 20, 22, 21, 24, 25, 28];
export const SPARK_CLICKS = [30, 28, 29, 27, 26, 25, 24, 23, 24, 22, 21, 20];
export const SPARK_CONV = [8, 9, 8, 10, 11, 10, 12, 13, 12, 14, 15, 14];
export const SPARK_PAYOUT = [10, 11, 12, 11, 13, 14, 15, 14, 16, 17, 18, 19];

export const CHART_MAIN = [
  { m: "Jan", a: 3200, b: 2800 },
  { m: "Feb", a: 4100, b: 3500 },
  { m: "Mar", a: 3800, b: 3600 },
  { m: "Apr", a: 5200, b: 4400 },
  { m: "May", a: 4800, b: 4500 },
  { m: "Jun", a: 6100, b: 5200 },
  { m: "Jul", a: 5500, b: 5000 },
  { m: "Aug", a: 6400, b: 5600 },
  { m: "Sep", a: 7200, b: 6100 },
  { m: "Oct", a: 6800, b: 5900 },
  { m: "Nov", a: 7500, b: 6400 },
  { m: "Dec", a: 8000, b: 6800 },
];

export type MarketplaceProgram = {
  id: string;
  domain: string;
  name: string;
  description: string;
  connected: boolean;
  category: string;
  commissionPct: number;
};

export const MARKETPLACE_PROGRAMS: MarketplaceProgram[] = [
  {
    id: "1",
    domain: "asana.com",
    name: "Asana",
    description: "Team coordination and project management trusted by millions.",
    connected: true,
    category: "Productivity",
    commissionPct: 12,
  },
  {
    id: "2",
    domain: "hubspot.com",
    name: "HubSpot",
    description: "CRM and marketing automation to grow your pipeline.",
    connected: false,
    category: "CRM & Sales",
    commissionPct: 15,
  },
  {
    id: "3",
    domain: "dropbox.com",
    name: "Dropbox",
    description: "Cloud storage and file sync for teams.",
    connected: true,
    category: "Productivity",
    commissionPct: 10,
  },
  {
    id: "4",
    domain: "zendesk.com",
    name: "Zendesk",
    description: "Customer service and engagement platform.",
    connected: false,
    category: "Support",
    commissionPct: 11,
  },
  {
    id: "5",
    domain: "stripe.com",
    name: "Stripe",
    description: "Payments infrastructure for the internet.",
    connected: true,
    category: "Payments",
    commissionPct: 12,
  },
  {
    id: "6",
    domain: "notion.so",
    name: "Notion",
    description: "Docs, wikis, and tasks in one workspace.",
    connected: false,
    category: "Productivity",
    commissionPct: 10,
  },
  {
    id: "7",
    domain: "airbnb.com",
    name: "Airbnb",
    description: "Homes and experiences marketplace.",
    connected: false,
    category: "Consumer",
    commissionPct: 8,
  },
  {
    id: "8",
    domain: "apple.com",
    name: "App Store",
    description: "Digital distribution for apps and media.",
    connected: true,
    category: "Consumer",
    commissionPct: 15,
  },
];

export type AffiliateRow = {
  id: string;
  name: string;
  email: string;
  initials: string;
  joined: string;
  referredBy: string;
  referredEmail: string;
  clicks: number;
  commission: string;
  commissionPct: number;
  category: string;
  status: "Active" | "Pending";
  payment: string;
};

export const AFFILIATES: AffiliateRow[] = [
  {
    id: "a1",
    name: "James Brown",
    email: "james@example.com",
    initials: "JB",
    joined: "Just now",
    referredBy: "Maya H.",
    referredEmail: "maya@example.com",
    clicks: 1240,
    commission: "$246.80",
    commissionPct: 11,
    category: "Productivity",
    status: "Active",
    payment: "PayPal",
  },
  {
    id: "a2",
    name: "Nahid Ahmed",
    email: "nahid@example.com",
    initials: "NA",
    joined: "30 min ago",
    referredBy: "Sara L.",
    referredEmail: "sara@example.com",
    clicks: 892,
    commission: "$124.50",
    commissionPct: 9,
    category: "CRM & Sales",
    status: "Pending",
    payment: "PayPal",
  },
  {
    id: "a3",
    name: "Elena Rossi",
    email: "elena@example.com",
    initials: "ER",
    joined: "2 hr ago",
    referredBy: "James Brown",
    referredEmail: "james@example.com",
    clicks: 2103,
    commission: "$512.00",
    commissionPct: 14,
    category: "Developer",
    status: "Active",
    payment: "Bank",
  },
  {
    id: "a4",
    name: "Marcus Lee",
    email: "marcus@example.com",
    initials: "ML",
    joined: "1 day ago",
    referredBy: "—",
    referredEmail: "",
    clicks: 445,
    commission: "$89.10",
    commissionPct: 16,
    category: "Consumer",
    status: "Pending",
    payment: "PayPal",
  },
];

export type TxRow = {
  id: string;
  customer: string;
  affiliate: string;
  affiliateInitial: string;
  revenue: string;
  commissionPct: string;
  commissionValue: number;
  product: string;
  category: string;
  date: string;
  status: "Active" | "Pending";
};

export const TRANSACTIONS: TxRow[] = [
  {
    id: "t1",
    customer: "James Brown",
    affiliate: "MH Jihaad",
    affiliateInitial: "M",
    revenue: "$2,500.00",
    commissionPct: "10%",
    commissionValue: 10,
    product: "App Store",
    category: "Consumer",
    date: "12-06-2026",
    status: "Active",
  },
  {
    id: "t2",
    customer: "Nahid Ahmed",
    affiliate: "MH Jihaad",
    affiliateInitial: "M",
    revenue: "$890.00",
    commissionPct: "10%",
    commissionValue: 10,
    product: "Airbnb",
    category: "Consumer",
    date: "11-06-2026",
    status: "Pending",
  },
  {
    id: "t3",
    customer: "Sam Rivera",
    affiliate: "Elena R.",
    affiliateInitial: "E",
    revenue: "$420.00",
    commissionPct: "12%",
    commissionValue: 12,
    product: "Asana",
    category: "Productivity",
    date: "10-06-2026",
    status: "Active",
  },
  {
    id: "t4",
    customer: "Jordan Lee",
    affiliate: "Marcus L.",
    affiliateInitial: "M",
    revenue: "$1,120.00",
    commissionPct: "10%",
    commissionValue: 10,
    product: "Dropbox",
    category: "Productivity",
    date: "09-06-2026",
    status: "Active",
  },
];

export type ReferralRow = {
  id: string;
  name: string;
  affiliate: string;
  affiliateInitial: string;
  revenue: string;
  profit: string;
  method: string;
  status: "Active" | "Pending";
  category: string;
  commissionPct: number;
};

export const REFERRALS: ReferralRow[] = [
  {
    id: "r1",
    name: "Spring push",
    affiliate: "James Brown",
    affiliateInitial: "JB",
    revenue: "$4,200",
    profit: "$420",
    method: "PayPal",
    status: "Active",
    category: "Productivity",
    commissionPct: 12,
  },
  {
    id: "r2",
    name: "Reels batch #2",
    affiliate: "Elena Rossi",
    affiliateInitial: "ER",
    revenue: "$1,890",
    profit: "$189",
    method: "PayPal",
    status: "Pending",
    category: "Developer",
    commissionPct: 14,
  },
  {
    id: "r3",
    name: "Newsletter CTA",
    affiliate: "Marcus Lee",
    affiliateInitial: "ML",
    revenue: "$760",
    profit: "$76",
    method: "PayPal",
    status: "Active",
    category: "Consumer",
    commissionPct: 16,
  },
];

export type ReportRow = {
  date: string;
  clicks: number;
  conversions: number;
  revenue: string;
  payout: string;
  mlm: string;
  avgPayout: string;
};

export const REPORT_ROWS: ReportRow[] = [
  { date: "22/12/2024", clicks: 24, conversions: 30, revenue: "$1,200.00", payout: "$850.00", mlm: "10%", avgPayout: "15%" },
  { date: "21/12/2024", clicks: 18, conversions: 22, revenue: "$980.00", payout: "$720.00", mlm: "10%", avgPayout: "14%" },
  { date: "20/12/2024", clicks: 32, conversions: 28, revenue: "$1,450.00", payout: "$900.00", mlm: "10%", avgPayout: "16%" },
];

export type PayoutRow = {
  id: string;
  name: string;
  method: string;
  email: string;
  commission: string;
  commissionPct: number;
  joined: string;
  status: "Active" | "Pending";
};

export const PAYOUT_ROWS: PayoutRow[] = [
  {
    id: "p1",
    name: "James Brown",
    method: "PayPal",
    email: "james@example.com",
    commission: "10%",
    commissionPct: 10,
    joined: "01/06/2026",
    status: "Pending",
  },
  {
    id: "p2",
    name: "Nahid Ahmed",
    method: "PayPal",
    email: "nahid@example.com",
    commission: "12%",
    commissionPct: 12,
    joined: "15/05/2026",
    status: "Active",
  },
  {
    id: "p3",
    name: "Elena Rossi",
    method: "Bank",
    email: "elena@example.com",
    commission: "10%",
    commissionPct: 10,
    joined: "02/04/2026",
    status: "Active",
  },
];

export const INTEGRATIONS = [
  { id: "i1", domain: "stripe.com", title: "Stripe Session API", desc: "Collect payments and sync affiliate commissions automatically.", diff: "Medium" as const, category: "Stripe", dev: true },
  { id: "i2", domain: "asana.com", title: "Asana Goals", desc: "Track partner OKRs alongside your program.", diff: "Easy" as const, category: "Asana", dev: false },
  { id: "i3", domain: "dropbox.com", title: "Dropbox Business", desc: "Share creative assets with verified partners.", diff: "Easy" as const, category: "Dropbox", dev: false },
  { id: "i4", domain: "hubspot.com", title: "HubSpot CRM", desc: "Two-way sync for leads attributed to affiliates.", diff: "Medium" as const, category: "HubSpot", dev: true },
  { id: "i5", domain: "zendesk.com", title: "Zendesk Support", desc: "Route affiliate tickets to a dedicated queue.", diff: "Easy" as const, category: "Zendesk", dev: false },
  { id: "i6", domain: "webflow.com", title: "Webflow CMS", desc: "Publish landing pages with embedded tracking.", diff: "Medium" as const, category: "Webflow", dev: true },
];

export function formatUsd(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function parseUsdToNumber(value: string): number {
  const n = Number.parseFloat(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
