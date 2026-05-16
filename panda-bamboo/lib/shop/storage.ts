import type { ShopSnapshot } from "./types";

export const CART_STORAGE_KEY = "kiddex-cart";
export const WISHLIST_STORAGE_KEY = "kiddex-wishlist";

export function readShopSnapshot(): ShopSnapshot {
  if (typeof window === "undefined") return { cart: [], wishlist: [] };
  try {
    const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? "[]");
    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) ?? "[]");
    return {
      cart: Array.isArray(cart) ? cart : [],
      wishlist: Array.isArray(wishlist) ? wishlist : [],
    };
  } catch {
    return { cart: [], wishlist: [] };
  }
}

export function writeCart(cart: ShopSnapshot["cart"]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function writeWishlist(wishlist: string[]) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
}
