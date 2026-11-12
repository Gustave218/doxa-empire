"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { bySlug, DELIVERY, FREE_DELIVERY_FROM, type Currency } from "@/lib/catalog";

export type CartLine = { slug: string; size?: string; colour?: string; qty: number };

type Ctx = {
  lines: CartLine[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  add: (l: CartLine) => void;
  setQty: (i: number, qty: number) => void;
  remove: (i: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  hasPhysical: boolean;
  open: boolean;
  setOpen: (o: boolean) => void;
  ready: boolean;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("doxa-bag") || "null");
      if (Array.isArray(saved?.lines)) setLines(saved.lines.filter((l: CartLine) => bySlug(l.slug)));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem("doxa-bag", JSON.stringify({ lines, currency })); } catch {}
  }, [lines, currency, ready]);

  const value = useMemo<Ctx>(() => {
    let subtotal = 0;
    let hasPhysical = false;
    for (const l of lines) {
      const p = bySlug(l.slug);
      if (!p) continue;
      subtotal += p.price[currency] * l.qty;
      if (p.type === "physical") hasPhysical = true;
    }
    const delivery = !hasPhysical || subtotal >= FREE_DELIVERY_FROM[currency] ? 0 : DELIVERY[currency];
    return {
      lines, currency, setCurrency, open, setOpen, ready,
      subtotal, delivery, total: subtotal + delivery, hasPhysical,
      count: lines.reduce((n, l) => n + l.qty, 0),
      add: (l) => {
        setLines((prev) => {
          const i = prev.findIndex((p) => p.slug === l.slug && p.size === l.size && p.colour === l.colour);
          const digital = bySlug(l.slug)?.type !== "physical";
          if (i >= 0) {
            if (digital) return prev;
            const next = [...prev];
            next[i] = { ...next[i], qty: Math.min(10, next[i].qty + l.qty) };
            return next;
          }
          return [...prev, { ...l, qty: digital ? 1 : l.qty }];
        });
        setOpen(true);
      },
      setQty: (i, qty) => setLines((prev) => prev.map((p, j) => (j === i ? { ...p, qty: Math.max(1, Math.min(10, qty)) } : p))),
      remove: (i) => setLines((prev) => prev.filter((_, j) => j !== i)),
      clear: () => setLines([]),
    };
  }, [lines, currency, open, ready]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
