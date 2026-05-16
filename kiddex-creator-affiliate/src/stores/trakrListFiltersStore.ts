import { create } from "zustand";
import { persist } from "zustand/middleware";

/** One toolbar: category, commission band, sort key, free-text search, optional status bucket. */
export type TrakrFilterSlice = {
  category: string;
  commissionBand: string;
  sort: string;
  search: string;
  /** Transactions / payouts / referrals: all | active | pending. Reports: conversion strength (all | strong | weak). */
  status: string;
};

const emptySlice = (): TrakrFilterSlice => ({
  category: "all",
  commissionBand: "all",
  sort: "default",
  search: "",
  status: "all",
});

export const TRAKR_CATEGORY_OPTIONS = [
  { value: "all", label: "All categories" },
  { value: "Productivity", label: "Productivity" },
  { value: "CRM & Sales", label: "CRM & Sales" },
  { value: "Developer", label: "Developer tools" },
  { value: "Support", label: "Support" },
  { value: "Payments", label: "Payments" },
  { value: "Consumer", label: "Consumer" },
] as const;

export const TRAKR_COMMISSION_OPTIONS = [
  { value: "all", label: "All commission rates" },
  { value: "low", label: "Under 10%" },
  { value: "mid", label: "10% – 14%" },
  { value: "high", label: "15% and up" },
] as const;

export function commissionBandMatches(band: string, pct: number): boolean {
  if (band === "all") return true;
  if (band === "low") return pct < 10;
  if (band === "mid") return pct >= 10 && pct < 15;
  if (band === "high") return pct >= 15;
  return true;
}

type TrakrListFiltersState = {
  marketplace: TrakrFilterSlice;
  affiliates: TrakrFilterSlice;
  transactions: TrakrFilterSlice;
  referrals: TrakrFilterSlice;
  referralsTab: "all" | "active";
  payouts: TrakrFilterSlice;
  reports: TrakrFilterSlice;
  setMarketplace: (p: Partial<TrakrFilterSlice>) => void;
  setAffiliates: (p: Partial<TrakrFilterSlice>) => void;
  setTransactions: (p: Partial<TrakrFilterSlice>) => void;
  setReferrals: (p: Partial<TrakrFilterSlice>) => void;
  setReferralsTab: (tab: "all" | "active") => void;
  setPayouts: (p: Partial<TrakrFilterSlice>) => void;
  setReports: (p: Partial<TrakrFilterSlice>) => void;
};

export const useTrakrListFiltersStore = create<TrakrListFiltersState>()(
  persist(
    (set) => ({
      marketplace: emptySlice(),
      affiliates: emptySlice(),
      transactions: { ...emptySlice(), sort: "date-desc", status: "all" },
      referrals: { ...emptySlice(), status: "all" },
      referralsTab: "all",
      payouts: { ...emptySlice(), sort: "joined-desc", status: "all" },
      reports: { ...emptySlice(), sort: "date-desc", status: "all" },
      setMarketplace: (p) => set((s) => ({ marketplace: { ...s.marketplace, ...p } })),
      setAffiliates: (p) => set((s) => ({ affiliates: { ...s.affiliates, ...p } })),
      setTransactions: (p) => set((s) => ({ transactions: { ...s.transactions, ...p } })),
      setReferrals: (p) => set((s) => ({ referrals: { ...s.referrals, ...p } })),
      setReferralsTab: (referralsTab) => set({ referralsTab }),
      setPayouts: (p) => set((s) => ({ payouts: { ...s.payouts, ...p } })),
      setReports: (p) => set((s) => ({ reports: { ...s.reports, ...p } })),
    }),
    {
      name: "kiddex-trakr-list-filters",
      partialize: (s) => ({
        marketplace: s.marketplace,
        affiliates: s.affiliates,
        transactions: s.transactions,
        referrals: s.referrals,
        referralsTab: s.referralsTab,
        payouts: s.payouts,
        reports: s.reports,
      }),
    },
  ),
);
