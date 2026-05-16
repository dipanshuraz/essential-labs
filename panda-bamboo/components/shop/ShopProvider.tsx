"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/catalog";
import { getProductById } from "@/lib/catalog";
import type { CartLine } from "@/lib/shop/types";
import { readShopSnapshot, writeCart, writeWishlist } from "@/lib/shop/storage";

type ShopContextValue = {
  cart: CartLine[];
  wishlistIds: string[];
  cartCount: number;
  cartSubtotal: number;
  ready: boolean;
  addToCart: (productId: string, qty?: number, size?: string) => void;
  updateCartQty: (productId: string, size: string | undefined, qty: number) => void;
  removeFromCart: (productId: string, size?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  getCartProducts: () => { line: CartLine; product: Product }[];
  getWishlistProducts: () => Product[];
};

const ShopContext = createContext<ShopContextValue | null>(null);

function lineKey(productId: string, size?: string) {
  return `${productId}::${size ?? ""}`;
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const snapshot = readShopSnapshot();
    setCart(snapshot.cart);
    setWishlistIds(snapshot.wishlist);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeCart(cart);
  }, [cart, ready]);

  useEffect(() => {
    if (!ready) return;
    writeWishlist(wishlistIds);
  }, [wishlistIds, ready]);

  const addToCart = useCallback((productId: string, qty = 1, size?: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((l) => lineKey(l.productId, l.size) === lineKey(productId, size));
      if (idx === -1) return [...prev, { productId, qty, size }];
      return prev.map((l, i) => (i === idx ? { ...l, qty: l.qty + qty } : l));
    });
  }, []);

  const updateCartQty = useCallback((productId: string, size: string | undefined, qty: number) => {
    if (qty < 1) {
      setCart((prev) => prev.filter((l) => lineKey(l.productId, l.size) !== lineKey(productId, size)));
      return;
    }
    setCart((prev) =>
      prev.map((l) =>
        lineKey(l.productId, l.size) === lineKey(productId, size) ? { ...l, qty } : l,
      ),
    );
  }, []);

  const removeFromCart = useCallback((productId: string, size?: string) => {
    setCart((prev) => prev.filter((l) => lineKey(l.productId, l.size) !== lineKey(productId, size)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    let added = false;
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      added = true;
      return [...prev, productId];
    });
    return added;
  }, []);

  const isInWishlist = useCallback((productId: string) => wishlistIds.includes(productId), [wishlistIds]);

  const getCartProducts = useCallback(() => {
    return cart
      .map((line) => {
        const product = getProductById(line.productId);
        return product ? { line, product } : null;
      })
      .filter((x): x is { line: CartLine; product: Product } => x !== null);
  }, [cart]);

  const getWishlistProducts = useCallback(() => {
    return wishlistIds
      .map((id) => getProductById(id))
      .filter((p): p is Product => p !== undefined);
  }, [wishlistIds]);

  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);

  const cartSubtotal = useMemo(
    () =>
      cart.reduce((s, l) => {
        const p = getProductById(l.productId);
        return s + (p?.price ?? 0) * l.qty;
      }, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      wishlistIds,
      cartCount,
      cartSubtotal,
      ready,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isInWishlist,
      getCartProducts,
      getWishlistProducts,
    }),
    [
      cart,
      wishlistIds,
      cartCount,
      cartSubtotal,
      ready,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isInWishlist,
      getCartProducts,
      getWishlistProducts,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

export function useShopOptional() {
  return useContext(ShopContext);
}
