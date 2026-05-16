import productsJson from "@/lib/seed/products.json";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  ageGroup?: string;
  sizes?: string[];
  price: number;
  compareAt?: number;
  discount?: string;
  image: string;
  rating?: number;
  badge?: "hot" | "discount";
};

export const categories = [
  { name: "Newborn", image: "resource/category-1.png" },
  { name: "Girls Wear", image: "resource/category-2.png" },
  { name: "Boys Wear", image: "resource/category-3.png" },
  { name: "Winterwear", image: "resource/category-4.png" },
  { name: "Footwear", image: "resource/category-5.png" },
  { name: "Ethnic", image: "resource/category-6.png" },
] as const;

export const products = productsJson as Product[];

export { formatInr as formatPrice } from "./format";

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug) ?? products[0];
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
