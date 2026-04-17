"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE = "pb_cart_v1";

export type CartLine = { productId: string; quantity: number };

type CartState = Record<string, number>;

type CartContextValue = {
  lines: CartLine[];
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function load(): CartState {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return {};
    const p = JSON.parse(raw) as unknown;
    if (typeof p !== "object" || p === null) return {};
    const out: CartState = {};
    for (const [k, v] of Object.entries(p)) {
      if (typeof v === "number" && v > 0 && Number.isFinite(v)) out[k] = Math.floor(v);
    }
    return out;
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({});

  useEffect(() => {
    // Hydrate from localStorage after mount (SSR-safe).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional client-only hydration
    setState(load());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(state));
  }, [state]);

  const lines = useMemo(
    () =>
      Object.entries(state).map(([productId, quantity]) => ({
        productId,
        quantity,
      })),
    [state],
  );

  const add = useCallback((productId: string, qty = 1) => {
    setState((s) => ({
      ...s,
      [productId]: (s[productId] ?? 0) + qty,
    }));
  }, []);

  const setQty = useCallback((productId: string, quantity: number) => {
    setState((s) => {
      const next = { ...s };
      if (quantity < 1) delete next[productId];
      else next[productId] = quantity;
      return next;
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setState((s) => {
      const next = { ...s };
      delete next[productId];
      return next;
    });
  }, []);

  const clear = useCallback(() => setState({}), []);

  const totalItems = useMemo(
    () => lines.reduce((a, l) => a + l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      add,
      setQty,
      remove,
      clear,
      totalItems,
    }),
    [lines, add, setQty, remove, clear, totalItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
