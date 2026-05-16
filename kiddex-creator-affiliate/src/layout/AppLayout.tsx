import { Outlet } from "react-router-dom";
import { TrakrSidebar } from "@/layout/TrakrSidebar";
import { TopBar } from "@/layout/TopBar";
import { useSidebarStore } from "@/stores/useSidebarStore";

function MainShell() {
  const collapsed = useSidebarStore((s) => s.collapsed);
  return (
    <div className="min-h-screen bg-surface-muted dark:bg-zinc-950">
      <TrakrSidebar />
      <div
        className={`transition-[padding] duration-200 ease-out ${
          collapsed ? "pl-[72px]" : "pl-[260px]"
        }`}
      >
        <TopBar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function AppLayout() {
  return <MainShell />;
}
