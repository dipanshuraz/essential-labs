import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/format";

export default async function AdminDashboardPage() {
  const [orders, revenue, products, affiliates] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { totalCents: true } }),
    prisma.product.count(),
    prisma.affiliateProfile.count(),
  ]);

  const totalRev = revenue._sum.totalCents ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#2d2a28]">Dashboard</h1>
      <p className="mt-1 text-sm text-[#7a716b]">Panda ❤️ Bamboo — operations overview</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li className="rounded-2xl border border-[#eadfd6] bg-white p-5 shadow-sm">
          <p className="text-sm text-[#7a716b]">Orders</p>
          <p className="mt-1 text-2xl font-bold text-[#2d2a28]">{orders}</p>
        </li>
        <li className="rounded-2xl border border-[#eadfd6] bg-white p-5 shadow-sm">
          <p className="text-sm text-[#7a716b]">Revenue (demo)</p>
          <p className="mt-1 text-2xl font-bold text-[#2d5a4a]">{formatMoney(totalRev)}</p>
        </li>
        <li className="rounded-2xl border border-[#eadfd6] bg-white p-5 shadow-sm">
          <p className="text-sm text-[#7a716b]">Products</p>
          <p className="mt-1 text-2xl font-bold text-[#2d2a28]">{products}</p>
        </li>
        <li className="rounded-2xl border border-[#eadfd6] bg-white p-5 shadow-sm">
          <p className="text-sm text-[#7a716b]">Affiliate partners</p>
          <p className="mt-1 text-2xl font-bold text-[#2d2a28]">{affiliates}</p>
        </li>
      </ul>
    </div>
  );
}
