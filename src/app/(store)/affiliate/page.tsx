import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/format";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AffiliateDashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/affiliate");
  }

  if (session.user.role === "ADMIN") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 md:px-6">
        <h1 className="text-2xl font-bold text-[#2d2a28]">Affiliate program</h1>
        <p className="mt-2 text-[#5c534d]">
          As admin, manage partners and codes in the admin panel.
        </p>
        <Link
          href="/admin/affiliates"
          className="mt-6 inline-block rounded-full bg-[#2d5a4a] px-6 py-2 text-sm font-semibold text-white"
        >
          Open affiliates
        </Link>
      </div>
    );
  }

  const profile = await prisma.affiliateProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 md:px-6">
        <h1 className="text-2xl font-bold text-[#2d2a28]">Affiliate access</h1>
        <p className="mt-2 text-[#5c534d]">
          You do not have an affiliate profile yet. Ask an admin to assign a code to your account.
        </p>
        <Link href="/shop" className="mt-6 inline-block text-[#c45c6a] hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const orders = await prisma.order.findMany({
    where: { affiliateId: profile.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const earned = await prisma.order.aggregate({
    where: { affiliateId: profile.id },
    _sum: { affiliateCommissionCents: true },
  });

  const origin =
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const shareUrl = `${origin}/?ref=${encodeURIComponent(profile.code)}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:px-6">
      <h1 className="text-2xl font-bold text-[#2d2a28]">Your affiliate dashboard</h1>
      <p className="mt-2 text-[#7a716b]">
        Share your link — when someone orders within 30 days of visiting with your ref, you earn{" "}
        {profile.commissionPercent}% (demo ledger).
      </p>

      <div className="mt-8 rounded-2xl border border-[#eadfd6] bg-white p-6 shadow-sm">
        <p className="text-sm text-[#7a716b]">Your code</p>
        <p className="mt-1 font-mono text-2xl font-bold text-[#2d5a4a]">{profile.code}</p>
        <p className="mt-4 text-sm text-[#7a716b]">Share URL</p>
        <p className="mt-1 break-all rounded-lg bg-[#fff5f0] p-3 text-sm">{shareUrl}</p>
        <p className="mt-6 text-sm text-[#7a716b]">Total commission (demo)</p>
        <p className="text-xl font-semibold text-[#c45c6a]">
          {formatMoney(earned._sum.affiliateCommissionCents ?? 0)}
        </p>
      </div>

      <h2 className="mt-10 font-semibold text-[#2d2a28]">Recent attributed orders</h2>
      <ul className="mt-4 space-y-3">
        {orders.map((o) => (
          <li
            key={o.id}
            className="flex justify-between rounded-xl border border-[#f0e6de] bg-[#fffdfb] px-4 py-3 text-sm"
          >
            <span className="font-mono text-xs text-[#9a928b]">{o.id.slice(0, 8)}…</span>
            <span>{formatMoney(o.affiliateCommissionCents ?? 0)}</span>
          </li>
        ))}
        {orders.length === 0 && (
          <li className="text-center text-[#7a716b]">No orders yet — start sharing your link.</li>
        )}
      </ul>
    </div>
  );
}
