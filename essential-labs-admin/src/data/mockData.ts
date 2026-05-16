export type OrderStatus = "delivered" | "pending" | "shipped" | "cancelled";
export type PayStatus = "paid" | "unpaid";

export type OrderRow = {
  id: string;
  orderId: string;
  product: string;
  image: string;
  date: string;
  price: string;
  payment: PayStatus;
  status: OrderStatus;
};

export type CustomerRow = {
  id: string;
  name: string;
  phone: string;
  orderCount: number;
  totalSpend: string;
  status: "active" | "inactive" | "vip";
};

export type TransactionRow = {
  id: string;
  name: string;
  date: string;
  total: string;
  method: string;
  status: "complete" | "pending" | "canceled";
};

export const weekChartData = [
  { name: "Sun", value: 8 },
  { name: "Mon", value: 11 },
  { name: "Tue", value: 9 },
  { name: "Wed", value: 13 },
  { name: "Thu", value: 14 },
  { name: "Fri", value: 12 },
  { name: "Sat", value: 10 },
];

export const realtimeBars = [
  { m: "1", u: 12 },
  { m: "2", u: 18 },
  { m: "3", u: 15 },
  { m: "4", u: 22 },
  { m: "5", u: 19 },
  { m: "6", u: 25 },
  { m: "7", u: 21 },
];

export const ordersData: OrderRow[] = [
  {
    id: "1",
    orderId: "#ORD0001",
    product: "Wireless Bluetooth Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
    date: "12-01-2025",
    price: "49.99",
    payment: "paid",
    status: "delivered",
  },
  {
    id: "2",
    orderId: "#ORD0002",
    product: "Smart Fitness Tracker",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=80&h=80&fit=crop",
    date: "11-01-2025",
    price: "89.00",
    payment: "paid",
    status: "pending",
  },
  {
    id: "3",
    orderId: "#ORD0003",
    product: "USB-C Hub Pro",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103c?w=80&h=80&fit=crop",
    date: "10-01-2025",
    price: "34.50",
    payment: "unpaid",
    status: "shipped",
  },
  {
    id: "4",
    orderId: "#ORD0004",
    product: "Ergonomic Keyboard",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80&h=80&fit=crop",
    date: "09-01-2025",
    price: "120.00",
    payment: "paid",
    status: "cancelled",
  },
];

export const customersData: CustomerRow[] = [
  {
    id: "CUST001",
    name: "John Doe",
    phone: "+1 555-0101",
    orderCount: 24,
    totalSpend: "$2,904",
    status: "active",
  },
  {
    id: "CUST002",
    name: "Jane Smith",
    phone: "+1 555-0102",
    orderCount: 12,
    totalSpend: "$1,120",
    status: "vip",
  },
  {
    id: "CUST003",
    name: "Emily Davis",
    phone: "+1 555-0103",
    orderCount: 3,
    totalSpend: "$240",
    status: "inactive",
  },
];

export const transactionsData: TransactionRow[] = [
  {
    id: "CUST001",
    name: "John Doe",
    date: "01-01-2025",
    total: "$2,904",
    method: "CC",
    status: "complete",
  },
  {
    id: "CUST002",
    name: "Jane Smith",
    date: "02-01-2025",
    total: "$890",
    method: "PayPal",
    status: "pending",
  },
  {
    id: "CUST003",
    name: "Emily Davis",
    date: "03-01-2025",
    total: "$120",
    method: "Bank",
    status: "canceled",
  },
];

export const dashboardTransactions = [
  { no: 1, customerId: "#CUST001", orderDate: "01-01-2025", status: "paid" as const, amount: "$290" },
  { no: 2, customerId: "#CUST002", orderDate: "02-01-2025", status: "pending" as const, amount: "$120" },
  { no: 3, customerId: "#CUST003", orderDate: "03-01-2025", status: "paid" as const, amount: "$2,904" },
];

export const topProductsDash = [
  {
    name: "Apple iPhone 13",
    id: "SKU-001",
    price: "$999",
    img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=64&h=64&fit=crop",
  },
  {
    name: "Wireless Buds",
    id: "SKU-002",
    price: "$79",
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=64&h=64&fit=crop",
  },
];

export const categoryDiscover = [
  { name: "Electronics", imgs: ["https://images.unsplash.com/photo-1498049810708-7ee4568da027?w=120&h=80&fit=crop"] },
  { name: "Fashion", imgs: ["https://images.unsplash.com/photo-1445205170230-053b83016050?w=120&h=80&fit=crop"] },
  { name: "Accessories", imgs: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=80&fit=crop"] },
  { name: "Home & Kitchen", imgs: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=80&fit=crop"] },
  { name: "Sports", imgs: ["https://images.unsplash.com/photo-1526676520081-232ef9439fa4?w=120&h=80&fit=crop"] },
  { name: "Toys", imgs: ["https://images.unsplash.com/photo-1558060370-e8c04360e63c?w=120&h=80&fit=crop"] },
];

export type CategoryProductRow = {
  no: number;
  name: string;
  img: string;
  created: string;
  orders: number;
  featured: boolean;
  onSale: boolean;
  outOfStock: boolean;
};

export const categoryProducts: CategoryProductRow[] = [
  {
    no: 1,
    name: "Wireless Bluetooth Headphones",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
    created: "01-01-2025",
    orders: 120,
    featured: true,
    onSale: false,
    outOfStock: false,
  },
  {
    no: 2,
    name: "Smart Fitness Tracker",
    img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=80&h=80&fit=crop",
    created: "02-01-2025",
    orders: 89,
    featured: true,
    onSale: true,
    outOfStock: false,
  },
  {
    no: 3,
    name: "USB-C Hub Pro",
    img: "https://images.unsplash.com/photo-1625948515291-69613efd103c?w=80&h=80&fit=crop",
    created: "03-01-2025",
    orders: 54,
    featured: false,
    onSale: true,
    outOfStock: false,
  },
  {
    no: 4,
    name: "Ergonomic Keyboard",
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80&h=80&fit=crop",
    created: "04-01-2025",
    orders: 33,
    featured: false,
    onSale: false,
    outOfStock: true,
  },
  {
    no: 5,
    name: "Desk Lamp LED",
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=80&h=80&fit=crop",
    created: "05-01-2025",
    orders: 12,
    featured: false,
    onSale: false,
    outOfStock: false,
  },
  {
    no: 6,
    name: "Portable Speaker",
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=80&h=80&fit=crop",
    created: "06-01-2025",
    orders: 201,
    featured: true,
    onSale: false,
    outOfStock: false,
  },
];

export const countriesSales = [
  { code: "US", name: "United States", sales: "$120k", pct: "+12%" },
  { code: "BR", name: "Brazil", sales: "$45k", pct: "+8%" },
  { code: "AU", name: "Australia", sales: "$32k", pct: "+5%" },
];
