// PREVIEW ORDER STORE: orders live in this browser's localStorage so the full
// flow (checkout → awaiting confirmation → admin confirms → fulfilment) can be
// clicked through. Phase 4 replaces this with PostgreSQL + server-side pricing.

import type { CartLine } from "@/components/CartProvider";
import { bySlug, type Currency } from "./catalog";

export type OrderStatus = "awaiting_payment" | "awaiting_confirmation" | "paid" | "packed" | "shipped" | "delivered" | "failed";

export type Order = {
  id: string;
  createdAt: string;
  currency: Currency;
  lines: (CartLine & { name: string; type: string; unit: number })[];
  subtotal: number;
  delivery: number;
  total: number;
  customer: { name: string; email: string; phone: string };
  address?: { area: string; street: string; notes: string };
  status: OrderStatus;
  mpesaCode?: string;
  log: { at: string; status: OrderStatus; note?: string }[];
};

const KEY = "doxa-orders";

export function loadOrders(): Order[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function saveOrders(o: Order[]) {
  try { localStorage.setItem(KEY, JSON.stringify(o)); } catch {}
}
export function getOrder(id: string) {
  return loadOrders().find((o) => o.id === id);
}
export function updateOrder(id: string, patch: Partial<Order>, note?: string) {
  const all = loadOrders();
  const i = all.findIndex((o) => o.id === id);
  if (i < 0) return;
  const next = { ...all[i], ...patch };
  if (patch.status && patch.status !== all[i].status) next.log = [...all[i].log, { at: new Date().toISOString(), status: patch.status, note }];
  all[i] = next;
  saveOrders(all);
  return next;
}

export const DELIVERY = { KES: { nairobi: 300, kenya: 600 }, USD: { nairobi: 3, kenya: 5 } } as const;

export function priceLines(lines: CartLine[], currency: Currency) {
  // Recomputes from the catalogue: never trusts a price stored in the cart.
  return lines.map((l) => {
    const p = bySlug(l.slug)!;
    return { ...l, name: p.name, type: p.type, unit: p.price[currency] ?? 0 };
  });
}

export const statusLabel: Record<OrderStatus, string> = {
  awaiting_payment: "Awaiting payment",
  awaiting_confirmation: "Payment being checked",
  paid: "Paid",
  packed: "Packed",
  shipped: "Shipped",
  delivered: "Delivered",
  failed: "Payment failed",
};
