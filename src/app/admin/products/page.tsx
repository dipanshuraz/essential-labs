import { prisma } from "@/lib/prisma";
import { DUMMY_PRODUCT_IMAGE, formatMoney, parseImages } from "@/lib/format";
import { createProduct } from "../actions";
import Image from "next/image";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#2d2a28]">Products</h1>
      <p className="mt-1 text-sm text-[#7a716b]">Manage catalog — mirrors shop.html inventory.</p>

      <section className="mt-8 rounded-2xl border border-[#eadfd6] bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-[#2d2a28]">Add product</h2>
        <form action={createProduct} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm text-[#5c534d]">Name</span>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-[#eadfd6] px-3 py-2"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm text-[#5c534d]">Description</span>
            <textarea
              name="description"
              required
              rows={3}
              className="mt-1 w-full rounded-lg border border-[#eadfd6] px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[#5c534d]">Price (USD)</span>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              className="mt-1 w-full rounded-lg border border-[#eadfd6] px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm text-[#5c534d]">Stock</span>
            <input
              name="stock"
              type="number"
              min="0"
              defaultValue={0}
              className="mt-1 w-full rounded-lg border border-[#eadfd6] px-3 py-2"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm text-[#5c534d]">Category</span>
            <select
              name="categoryId"
              required
              className="mt-1 w-full rounded-lg border border-[#eadfd6] px-3 py-2"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm text-[#5c534d]">Image URL (optional)</span>
            <input
              name="imageUrl"
              type="url"
              placeholder="https://images.unsplash.com/..."
              className="mt-1 w-full rounded-lg border border-[#eadfd6] px-3 py-2"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-[#2d5a4a] px-6 py-2 text-sm font-semibold text-white"
            >
              Create product
            </button>
          </div>
        </form>
      </section>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-[#eadfd6] bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#eadfd6] bg-[#fffdfb] text-[#7a716b]">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const img = parseImages(p.images)[0] ?? DUMMY_PRODUCT_IMAGE;
              return (
                <tr key={p.id} className="border-b border-[#f5ebe3]">
                  <td className="px-4 py-2">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-[#f7f2ed]">
                      <Image src={img} alt="" fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-2 font-medium text-[#2d2a28]">{p.name}</td>
                  <td className="px-4 py-2">{p.category.name}</td>
                  <td className="px-4 py-2">{formatMoney(p.priceCents)}</td>
                  <td className="px-4 py-2">{p.stock}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
