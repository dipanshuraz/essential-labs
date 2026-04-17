import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/format";
import { createAffiliate } from "../actions";

export const revalidate = 0;

export default async function AdminAffiliatesPage() {
  const profiles = await prisma.affiliateProfile.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  const orderStats = await prisma.order.groupBy({
    by: ["affiliateId"],
    where: { affiliateId: { not: null } },
    _sum: { affiliateCommissionCents: true },
    _count: { _all: true },
  });

  const statsByAff = Object.fromEntries(
    orderStats.map((s) => [
      s.affiliateId!,
      {
        count: s._count._all,
        earned: s._sum.affiliateCommissionCents ?? 0,
      },
    ]),
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#2d2a28]">Affiliates</h1>
      <p className="mt-1 text-sm text-[#7a716b]">
        Partners earn commission on orders that arrive with{" "}
        <code className="rounded bg-[#fff5f0] px-1">?ref=CODE</code> (30-day cookie).
      </p>

      <section className="mt-8 rounded-2xl border border-[#eadfd6] bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-[#2d2a28]">Invite partner</h2>
        <p className="mt-1 text-sm text-[#7a716b]">
          User must already exist (register first). Sets their role to affiliate.
        </p>
        <form action={createAffiliate} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm text-[#5c534d]">User email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="partner@example.com"
              className="mt-1 w-full rounded-lg border border-[#eadfd6] px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[#5c534d]">Code</span>
            <input
              name="code"
              required
              placeholder="MYCODE"
              className="mt-1 w-full rounded-lg border border-[#eadfd6] px-3 py-2"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm text-[#5c534d]">Commission %</span>
            <input
              name="commissionPercent"
              type="number"
              min={1}
              max={50}
              defaultValue={10}
              className="mt-1 w-full max-w-xs rounded-lg border border-[#eadfd6] px-3 py-2"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-[#2d5a4a] px-6 py-2 text-sm font-semibold text-white"
            >
              Create affiliate
            </button>
          </div>
        </form>
      </section>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-[#eadfd6] bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#eadfd6] bg-[#fffdfb] text-[#7a716b]">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">%</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Orders / earned</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((p) => {
              const s = statsByAff[p.id];
              return (
                <tr key={p.id} className="border-b border-[#f5ebe3]">
                  <td className="px-4 py-2 font-mono font-medium">{p.code}</td>
                  <td className="px-4 py-2">{p.user.email}</td>
                  <td className="px-4 py-2">{p.commissionPercent}%</td>
                  <td className="px-4 py-2">{p.active ? "yes" : "no"}</td>
                  <td className="px-4 py-2">
                    {s ? `${s.count} · ${formatMoney(s.earned)}` : "0 · $0.00"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
