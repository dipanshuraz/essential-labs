"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE = "pb_wishlist_v1";

type WishlistContextValue = {
  ids: Set<string>;
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  count: number;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

function load(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return [];
    const p = JSON.parse(raw) as unknown;
    return Array.isArray(p) ? p.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [idsArr, setIdsArr] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client hydration
    setIdsArr(load());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(idsArr));
  }, [idsArr]);

  const ids = useMemo(() => new Set(idsArr), [idsArr]);

  const toggle = useCallback((productId: string) => {
    setIdsArr((prev) => {
      const s = new Set(prev);
      if (s.has(productId)) s.delete(productId);
      else s.add(productId);
      return [...s];
    });
  }, []);

  const has = useCallback((id: string) => ids.has(id), [ids]);

  const value = useMemo(
    () => ({
      ids,
      toggle,
      has,
      count: idsArr.length,
    }),
    [ids, idsArr.length, toggle, has],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
