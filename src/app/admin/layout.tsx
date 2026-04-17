import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import "@/styles/admin-tailwind.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div className="min-h-screen bg-[#f7f4f1]">
      <aside className="fixed left-0 top-0 z-40 h-full w-56 border-r border-[#e5ddd4] bg-[#2d2a28] p-4 text-[#f5ebe3]">
        <p className="font-semibold">
          Admin <span className="text-[#f5a3b0]">❤️</span>
        </p>
        <nav className="mt-6 flex flex-col gap-2 text-sm">
          <Link href="/admin" className="rounded-lg px-2 py-1.5 hover:bg-white/10">
            Dashboard
          </Link>
          <Link href="/admin/products" className="rounded-lg px-2 py-1.5 hover:bg-white/10">
            Products
          </Link>
          <Link href="/admin/orders" className="rounded-lg px-2 py-1.5 hover:bg-white/10">
            Orders
          </Link>
          <Link href="/admin/affiliates" className="rounded-lg px-2 py-1.5 hover:bg-white/10">
            Affiliates
          </Link>
          <Link href="/admin/contacts" className="rounded-lg px-2 py-1.5 hover:bg-white/10">
            Contacts
          </Link>
          <Link href="/" className="mt-4 rounded-lg px-2 py-1.5 text-[#f5a3b0] hover:bg-white/10">
            ← Storefront
          </Link>
        </nav>
      </aside>
      <div className="pl-56">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
