import type { Product } from "@/lib/catalog";

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "name-asc";

export type CatalogFilters = {
  q?: string;
  category?: string;
  sort?: SortOption;
};

export function getProductCategories(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.category))].sort();
}

export function filterCatalog(products: Product[], filters: CatalogFilters): Product[] {
  const q = filters.q?.trim().toLowerCase();
  let list = products.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.ageGroup?.toLowerCase().includes(q) ?? false)
    );
  });

  switch (filters.sort ?? "featured") {
    case "price-asc":
      list = [...list].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list = [...list].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    case "name-asc":
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "featured":
    default:
      list = [...list].sort((a, b) => {
        const hot = (p: Product) => (p.badge === "hot" ? 2 : p.badge === "discount" ? 1 : 0);
        return hot(b) - hot(a) || (b.rating ?? 0) - (a.rating ?? 0);
      });
  }

  return list;
}
