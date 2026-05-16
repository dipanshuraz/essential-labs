import { Outlet, useLocation } from "react-router-dom";
import { ConsoleTopHeader } from "@console/shells/ConsoleTopHeader";
import { getPageHeaderTitle } from "@console/shells/shellMeta";
import { Sidebar } from "@/layout/Sidebar";

export function AdminLayout() {
  const { pathname } = useLocation();
  const title = getPageHeaderTitle("admin", pathname);

  return (
    <div className="min-h-screen bg-surface-alt transition-colors dark:bg-zinc-950">
      <Sidebar />
      <div className="pl-[260px] min-h-screen flex flex-col">
        <ConsoleTopHeader title={title} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
