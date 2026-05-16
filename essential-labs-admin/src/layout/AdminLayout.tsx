import { Outlet, useLocation } from "react-router-dom";
import { Sidebar, TopHeader } from "@/layout/Sidebar";

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/orders": "Order Management",
  "/customers": "Customers",
  "/coupons": "Coupon Code",
  "/categories": "Categories",
  "/transactions": "Transaction",
  "/brand": "Brand",
  "/products/new": "Add Product",
  "/products/media": "Product Media",
  "/products": "Product List",
  "/products/reviews": "Product Reviews",
  "/admin-role": "Admin role",
  "/control": "Control Authority",
};

export function AdminLayout() {
  const { pathname } = useLocation();
  const title = titles[pathname] ?? "Essential Labs Admin";

  return (
    <div className="min-h-screen bg-surface-alt transition-colors dark:bg-zinc-950">
      <Sidebar />
      <div className="pl-[260px] min-h-screen flex flex-col">
        <TopHeader title={title} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
