import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/format";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      affiliate: true,
      items: { include: { product: true } },
    },
    take: 50,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#2d2a28]">Orders</h1>
      <p className="mt-1 text-sm text-[#7a716b]">Fulfillment queue — affiliate commission shown per order.</p>
      <ul className="mt-8 space-y-6">
        {orders.map((o) => (
          <li
            key={o.id}
            className="rounded-2xl border border-[#eadfd6] bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-mono text-xs text-[#9a928b]">{o.id}</p>
                <p className="font-semibold text-[#2d2a28]">{o.email}</p>
                <p className="text-sm text-[#7a716b]">
                  {o.createdAt.toLocaleString()} · {o.status} · {o.paymentProvider}
                  {o.stripeCheckoutSessionId ? (
                    <span className="ml-1 font-mono text-[10px] text-[#9a928b]">
                      stripe:{o.stripeCheckoutSessionId.slice(0, 12)}…
                    </span>
                  ) : null}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#2d5a4a]">{formatMoney(o.totalCents)}</p>
                {o.affiliate && (
                  <p className="text-xs text-[#7a716b]">
                    Affiliate {o.affiliate.code}: {formatMoney(o.affiliateCommissionCents ?? 0)}
                  </p>
                )}
              </div>
            </div>
            <ul className="mt-4 space-y-1 border-t border-[#f5ebe3] pt-4 text-sm">
              {o.items.map((i) => (
                <li key={i.id} className="flex justify-between text-[#5c534d]">
                  <span>
                    {i.product.name} × {i.quantity}
                  </span>
                  <span>{formatMoney(i.priceCents * i.quantity)}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
        {orders.length === 0 && (
          <li className="rounded-2xl border border-dashed border-[#eadfd6] p-8 text-center text-[#7a716b]">
            No orders yet.
          </li>
        )}
      </ul>
    </div>
  );
}
