import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  AFFILIATES,
  CHART_MAIN,
  DEMO_METRICS,
  MARKETPLACE_PROGRAMS,
  SPARK_CLICKS,
  SPARK_CONV,
  SPARK_PAYOUT,
  SPARK_REVENUE,
  type AffiliateRow,
  type MarketplaceProgram,
} from "@/data/trakrDemo";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const trakrKeys = {
  root: ["trakr"] as const,
  dashboard: () => [...trakrKeys.root, "dashboard"] as const,
  marketplace: () => [...trakrKeys.root, "marketplace"] as const,
  affiliates: () => [...trakrKeys.root, "affiliates"] as const,
};

export type DashboardSummary = {
  metrics: typeof DEMO_METRICS;
  chartMain: typeof CHART_MAIN;
  sparks: {
    revenue: typeof SPARK_REVENUE;
    clicks: typeof SPARK_CLICKS;
    conversions: typeof SPARK_CONV;
    payouts: typeof SPARK_PAYOUT;
  };
};

async function fetchDashboardSummary(): Promise<DashboardSummary> {
  await delay(120);
  return {
    metrics: { ...DEMO_METRICS },
    chartMain: CHART_MAIN.map((row) => ({ ...row })),
    sparks: {
      revenue: [...SPARK_REVENUE],
      clicks: [...SPARK_CLICKS],
      conversions: [...SPARK_CONV],
      payouts: [...SPARK_PAYOUT],
    },
  };
}

export function useTrakrDashboardQuery(): UseQueryResult<DashboardSummary, Error> {
  return useQuery({
    queryKey: trakrKeys.dashboard(),
    queryFn: fetchDashboardSummary,
  });
}

async function fetchMarketplacePrograms(): Promise<MarketplaceProgram[]> {
  await delay(100);
  return MARKETPLACE_PROGRAMS.map((p) => ({ ...p }));
}

export function useMarketplaceProgramsQuery(): UseQueryResult<MarketplaceProgram[], Error> {
  return useQuery({
    queryKey: trakrKeys.marketplace(),
    queryFn: fetchMarketplacePrograms,
  });
}

export function useMarketplaceProgramToggleMutation(): UseMutationResult<
  void,
  Error,
  string,
  { previous: MarketplaceProgram[] | undefined }
> {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await delay(80);
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: trakrKeys.marketplace() });
      const previous = qc.getQueryData<MarketplaceProgram[]>(trakrKeys.marketplace());
      if (previous) {
        qc.setQueryData(
          trakrKeys.marketplace(),
          previous.map((p) => (p.id === id ? { ...p, connected: !p.connected } : p)),
        );
      }
      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) qc.setQueryData(trakrKeys.marketplace(), ctx.previous);
    },
  });
}

async function fetchAffiliates(): Promise<AffiliateRow[]> {
  await delay(100);
  return AFFILIATES.map((a) => ({ ...a }));
}

export function useAffiliatesQuery(): UseQueryResult<AffiliateRow[], Error> {
  return useQuery({
    queryKey: trakrKeys.affiliates(),
    queryFn: fetchAffiliates,
  });
}
