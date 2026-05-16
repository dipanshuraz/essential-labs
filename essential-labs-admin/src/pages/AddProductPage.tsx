import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function AddProductPage() {
  const [name, setName] = useState("iPhone 15");
  const [desc, setDesc] = useState("Latest flagship with advanced camera system.");
  const [price, setPrice] = useState("999.89");
  const [discount, setDiscount] = useState("99");
  const [stock, setStock] = useState("Unlimited");
  const [unlimited, setUnlimited] = useState(true);
  const [featured, setFeatured] = useState(true);

  const sale = (parseFloat(price || "0") - parseFloat(discount || "0")).toFixed(2);

  return (
    <div className="space-y-4 max-w-[1200px]">
      <div className="flex flex-wrap gap-2 justify-end">
        <input
          type="search"
          placeholder="Search product for add"
          className="form-search max-w-md min-w-[200px] flex-1 focus:outline-none focus:ring-2 focus:ring-brand/25 dark:focus:ring-brand/40"
        />
        <Button variant="primary">Publish Product</Button>
        <Button variant="secondary">Save to draft</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <h2 className="font-semibold text-ink mb-4">Basic Details</h2>
            <label className="block text-sm mb-3">
              <span className="text-ink-muted text-xs font-medium">Product Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-field !mt-0"
              />
            </label>
            <label className="block text-sm">
              <span className="text-ink-muted text-xs font-medium">Product Description</span>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={5}
                className="form-field !mt-0"
              />
            </label>
          </Card>

          <Card>
            <h2 className="font-semibold text-ink mb-4">Pricing</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="text-sm">
                <span className="text-xs text-ink-muted font-medium">Product Price</span>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-field !mt-0"
                />
              </label>
              <label className="text-sm">
                <span className="text-xs text-ink-muted font-medium">Discounted Price</span>
                <input
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="form-field !mt-0"
                />
              </label>
            </div>
            <p className="mt-2 text-sm text-brand font-semibold">Sale = ${sale}</p>
            <fieldset className="mt-4 text-sm">
              <legend className="text-xs text-ink-muted font-medium mb-2">Tax Included</legend>
              <label className="mr-4">
                <input type="radio" name="tax" defaultChecked /> Yes
              </label>
              <label>
                <input type="radio" name="tax" /> No
              </label>
            </fieldset>
          </Card>

          <Card>
            <h2 className="font-semibold text-ink mb-4">Inventory</h2>
            <label className="text-sm block">
              <span className="text-xs text-ink-muted font-medium">Stock Quantity</span>
              <input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                disabled={unlimited}
                className="form-field !mt-0 disabled:opacity-50"
              />
            </label>
            <label className="flex items-center gap-2 mt-3 text-sm">
              <input
                type="checkbox"
                checked={unlimited}
                onChange={(e) => setUnlimited(e.target.checked)}
              />
              Unlimited stock
            </label>
            <label className="block mt-3 text-sm">
              <span className="text-xs text-ink-muted">Stock Status</span>
              <select className="form-field !mt-0">
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </label>
            <label className="flex items-center gap-2 mt-3 text-sm">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              Highlight this product in a featured section
            </label>
          </Card>

          <div className="flex gap-2">
            <Button variant="secondary">Save to draft</Button>
            <Button variant="primary">Publish Product</Button>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <h2 className="font-semibold text-ink mb-4">Upload Product Image</h2>
            <div className="relative aspect-square max-h-[320px] overflow-hidden rounded-2xl bg-surface-alt transition-colors dark:bg-zinc-800/80">
              <img
                src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop"
                alt=""
                className="size-full object-cover"
              />
              <div className="absolute bottom-3 left-3 flex gap-2">
                <Button variant="secondary" className="!text-xs">Browse</Button>
                <Button variant="secondary" className="!text-xs">Replace</Button>
              </div>
            </div>
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {[1, 2].map((i) => (
                <img
                  key={i}
                  src={`https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=80&h=80&fit=crop&${i}`}
                  alt=""
                  className="size-16 rounded-lg object-cover shrink-0"
                />
              ))}
              <button
                type="button"
                className="size-16 rounded-lg border-2 border-dashed border-brand/40 flex items-center justify-center text-brand text-xl shrink-0"
              >
                +
              </button>
            </div>
          </Card>

          <Card>
            <h2 className="font-semibold text-ink mb-4">Categories</h2>
            <label className="block text-sm mb-3">
              <span className="text-xs text-ink-muted">Product Categories</span>
              <select className="form-field !mt-0">
                <option>Select your product</option>
                <option>Electronics</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="text-xs text-ink-muted">Product Tag</span>
              <select className="form-field !mt-0">
                <option>Select your product</option>
              </select>
            </label>
            <p className="text-xs text-ink-muted mt-4 mb-2">Select color</p>
            <div className="flex gap-2">
              {["#c1e6ba", "#f5c6cb", "#bcd4e6", "#f5e6c8", "#333"].map((c) => (
                <button
                  key={c}
                  type="button"
                  className="size-8 rounded-full border-2 border-white shadow ring-1 ring-black/10 dark:border-zinc-600 dark:ring-white/20"
                  style={{ backgroundColor: c }}
                  aria-label={`color ${c}`}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
