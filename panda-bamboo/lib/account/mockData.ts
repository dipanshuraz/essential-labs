import storefrontDemo from "@/lib/seed/storefront-demo.json";
import { formatInr } from "@/lib/format";

export type OrderStatus = "delivered" | "on_the_way" | "cancelled" | "returned";

export type OrderItem = {
  id: string;
  productId?: string;
  title: string;
  image: string;
  price: number;
  status: OrderStatus;
  deliveredOn?: string;
  orderId: string;
  seller: string;
  earnedCoins?: number;
  size?: string;
};

export type OrderDetail = Omit<OrderItem, "price"> & {
  unitPrice: number;
  timeline: { label: string; date: string; done: boolean }[];
  address: { label: string; lines: string; phone: string };
  priceBreakdown: { listing: number; discount: number; fees: number; total: number };
  payment: string;
};

export type Coupon = {
  id: string;
  title: string;
  description: string;
  validTill: string;
};

export type Address = {
  id: string;
  type: "HOME" | "WORK";
  name: string;
  phone: string;
  lines: string;
};

export type SavedCard = {
  id: string;
  label: string;
  last4: string;
};

export type WishlistItem = {
  id: string;
  productId?: string;
  title: string;
  image: string;
  price: number;
};

const demo = storefrontDemo as {
  supercoinBalance: number;
  orders: OrderItem[];
  wishlist: WishlistItem[];
  coupons: Coupon[];
  notifications: { id: string; title: string; body: string; when: string }[];
  addresses: Address[];
  savedCards: SavedCard[];
};

export const SUPERCOIN_BALANCE = demo.supercoinBalance;
export const ORDERS = demo.orders;
export const COUPONS = demo.coupons;
export const ADDRESSES = demo.addresses;
export const SAVED_CARDS = demo.savedCards;
export const WISHLIST = demo.wishlist;
export const NOTIFICATIONS = demo.notifications;

export function getOrderDetail(id: string): OrderDetail | undefined {
  const item = ORDERS.find((o) => o.id === id);
  if (!item) return undefined;

  const listing = item.price + Math.round(item.price * 0.15);
  const discount = listing - item.price;

  return {
    ...item,
    unitPrice: item.price,
    timeline: [
      { label: "Order Confirmed", date: "May 10, 2026", done: true },
      { label: "Shipped", date: "May 11, 2026", done: item.status !== "cancelled" },
      { label: "Delivered", date: item.deliveredOn ?? "—", done: item.status === "delivered" },
    ],
    address: {
      label: ADDRESSES[0]?.type ?? "HOME",
      lines: ADDRESSES[0]?.lines ?? "",
      phone: ADDRESSES[0]?.phone ?? "",
    },
    priceBreakdown: {
      listing,
      discount,
      fees: 0,
      total: item.price,
    },
    payment: "UPI / Card",
  };
}

export { formatInr };
