import { Outlet, useLocation } from "react-router-dom";
import { ConsoleTopHeader } from "@console/shells/ConsoleTopHeader";
import { getPageHeaderTitle } from "@console/shells/shellMeta";
import { TrakrSidebar } from "@/layout/TrakrSidebar";

export function AppLayout() {
  const { pathname } = useLocation();
  const title = getPageHeaderTitle("creators", pathname);

  return (
    <div className="min-h-screen bg-surface-alt transition-colors dark:bg-zinc-950">
      <TrakrSidebar />
      <div className="flex min-h-screen flex-col pl-[260px]">
        <ConsoleTopHeader title={title} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
