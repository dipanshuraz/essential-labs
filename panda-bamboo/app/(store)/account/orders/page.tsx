import Link from "next/link";
import { ORDERS, formatInr } from "@/lib/account/mockData";

const STATUS_TEXT: Record<string, string> = {
  delivered: "Delivered",
  on_the_way: "On the way",
  cancelled: "Cancelled",
  returned: "Returned",
};

export default function OrdersPage() {
  return (
    <div>
      <h3>Order History</h3>
      <div className="history-box">
        {ORDERS.map((order) => (
          <Link
            key={order.id}
            href={`/account/orders/${order.id}`}
            className="single-history"
            style={{ display: "block", textDecoration: "none", color: "inherit" }}
          >
            <div className="product-box">
              <figure className="image-box">
                <img src={order.image} alt="" />
              </figure>
              <div className="product-info">
                <h6>{order.title}</h6>
                <span>{order.orderId}</span>
                <h4>{formatInr(order.price)}</h4>
              </div>
            </div>
            <span className="text">{STATUS_TEXT[order.status] ?? order.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
