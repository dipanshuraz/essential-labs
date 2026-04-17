import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/format";
import { redirect } from "next/navigation";
import { KiddexPageTitle } from "@/components/kiddex/kiddex-page-title";

export default async function AccountOrdersPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/account/orders");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: { include: { product: true } },
    },
    take: 50,
  });

  return (
    <>
      <KiddexPageTitle
        items={[
          { href: "/", label: "Home" },
          { label: "Orders" },
        ]}
      />
      <section className="account-section pb_120">
        <div className="large-container">
          <div className="sec-title centred mb_40">
            <h2>
              Order <span>history</span>
            </h2>
          </div>
          <p className="centred mb_40 text-sm opacity-80">
            Signed in as {session.user.email ?? "your account"}.
          </p>
          {orders.length === 0 ? (
            <p className="text-center">
              No orders yet.{" "}
              <Link href="/shop" className="theme-btn btn-one">
                Shop now
              </Link>
            </p>
          ) : (
            <div className="table-outer">
              <table className="cart-table">
                <thead className="cart-header">
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>
                        <span className="font-mono text-sm">{o.id.slice(0, 8)}…</span>
                      </td>
                      <td>{o.createdAt.toLocaleString()}</td>
                      <td>{o.status}</td>
                      <td>{formatMoney(o.totalCents)}</td>
                      <td>
                        <ul className="list-unstyled m-0 p-0 text-start">
                          {o.items.map((i) => (
                            <li key={i.id}>
                              <Link href={`/product/${i.product.slug}`}>
                                {i.product.name} × {i.quantity}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
