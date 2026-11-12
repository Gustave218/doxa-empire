// Order history kept in the browser until a real order backend is connected.
// Stored per signed in user (or "invite" when not signed in).

export type Order = { id: string; date: string; title: string; amount: string; slugs: string[]; status: string };

const KEY = "doxa-orders";
let owner = "invite";
export const setOrderOwner = (id: string | null | undefined) => { owner = id || "invite"; };

function readAll(): Record<string, Order[]> {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}

export function getOrders(): Order[] {
  return readAll()[owner] ?? [];
}

export function saveOrder(o: { title: string; amount: string; slugs: string[]; physical: boolean }) {
  const all = readAll();
  const list = all[owner] ?? [];
  list.unshift({
    id: "DX" + Date.now().toString(36).toUpperCase().slice(-6),
    date: new Date().toISOString(),
    title: o.title, amount: o.amount, slugs: o.slugs,
    status: o.physical ? "En préparation" : "Payé · accès immédiat",
  });
  all[owner] = list;
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch {}
}
