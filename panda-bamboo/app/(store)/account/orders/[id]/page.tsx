import Link from "next/link";
import { notFound } from "next/navigation";
import { formatInr, getOrderDetail } from "@/lib/account/mockData";

type Props = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = getOrderDetail(id);
  if (!order) notFound();

  return (
    <div>
      <h3>Order {order.orderId}</h3>
      <div className="single-history" style={{ marginBottom: 24 }}>
        <div className="product-box">
          <figure className="image-box">
            <img src={order.image} alt="" />
          </figure>
          <div className="product-info">
            <h6>
              <Link href="/shop-details">{order.title}</Link>
            </h6>
            <span>{order.orderId}</span>
            <h4>{formatInr(order.unitPrice)}</h4>
          </div>
        </div>
        <span className="text">{order.deliveredOn ? `Delivered on ${order.deliveredOn}` : "In progress"}</span>
      </div>
      <p>
        <strong>Delivery:</strong> {order.address.lines} · {order.address.phone}
      </p>
      <p style={{ marginTop: 12 }}>
        <strong>Total paid:</strong> {formatInr(order.priceBreakdown.total)} ({order.payment})
      </p>
      <Link href="/account/orders" className="theme-btn btn-one" style={{ display: "inline-block", marginTop: 20 }}>
        Back to orders
      </Link>
    </div>
  );
}
