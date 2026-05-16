import { create } from "zustand";
import { persist } from "zustand/middleware";

type UiStore = {
  dashboardSetupGuideOpen: boolean;
  setDashboardSetupGuideOpen: (open: boolean) => void;
  toggleDashboardSetupGuide: () => void;
};

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      dashboardSetupGuideOpen: true,
      setDashboardSetupGuideOpen: (dashboardSetupGuideOpen) => set({ dashboardSetupGuideOpen }),
      toggleDashboardSetupGuide: () =>
        set((s) => ({ dashboardSetupGuideOpen: !s.dashboardSetupGuideOpen })),
    }),
    {
      name: "kiddex-affiliate-ui",
      partialize: (s) => ({
        dashboardSetupGuideOpen: s.dashboardSetupGuideOpen,
      }),
    },
  ),
);
