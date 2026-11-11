"use client";

import { useEffect, useState } from "react";
import { formatPrice, products, totalStock } from "@/lib/catalog";
import { loadOrders, statusLabel, updateOrder, type Order, type OrderStatus } from "@/lib/orders";

const sampleEnquiries = [
  { id: 1, name: "Sample: Grace M.", nationality: "DR Congo", whatsapp: "+243 81 000 0000", school: "Strathmore University, BBIT", arrival: "2027-01-08", services: "Airport pickup, A place to stay", read: false },
  { id: 2, name: "Sample: Jean-Paul K.", nationality: "Burundi", whatsapp: "+257 79 000 000", school: "USIU-Africa, IR", arrival: "2027-01-12", services: "SIM and M-Pesa setup", read: true },
];

const NEXT: Partial<Record<OrderStatus, OrderStatus>> = { paid: "packed", packed: "shipped", shipped: "delivered" };
const FEE_RATE = 0; // manual M-Pesa: no gateway fee. A real gateway sets this.

export default function Admin() {
  const [tab, setTab] = useState<"orders" | "products" | "enquiries" | "ledger">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [enq, setEnq] = useState(sampleEnquiries);
  useEffect(() => setOrders(loadOrders()), []);
  const refresh = () => setOrders(loadOrders());

  const waiting = orders.filter((o) => o.status === "awaiting_confirmation");
  const paidOrders = orders.filter((o) => !["awaiting_payment", "awaiting_confirmation", "failed"].includes(o.status));
  const kes = paidOrders.filter((o) => o.currency === "KES").reduce((n, o) => n + o.total, 0);

  function exportCsv() {
    const rows = [["date", "order", "product_type", "currency", "gross", "fee", "net", "payout_status"]];
    for (const o of paidOrders) for (const l of o.lines) {
      const gross = l.unit * l.qty, fee = Math.round(gross * FEE_RATE);
      rows.push([o.createdAt.slice(0, 10), o.id, l.type, o.currency, String(gross), String(fee), String(gross - fee), "received"]);
    }
    const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "doxa-ledger.csv";
    a.click();
  }

  return (
    <div className="wrap" style={{ paddingBottom: 56 }}>
      <div className="page-head">
        <h1 className="display h1">Admin</h1>
        <p className="notice small">Preview admin. In the real site this needs an admin login, and changes are saved in the database. Here it works on orders placed in this browser.</p>
      </div>

      <div className="stat-row">
        <div className="stat"><b>{waiting.length}</b>Payments to confirm</div>
        <div className="stat"><b>{paidOrders.length}</b>Paid orders</div>
        <div className="stat"><b>{enq.filter((e) => !e.read).length}</b>New enquiries</div>
        <div className="stat"><b>{formatPrice({ KES: kes }, "KES")}</b>Sales (KES)</div>
      </div>

      <div className="admin-tabs" role="tablist">
        {(["orders", "products", "enquiries", "ledger"] as const).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === "orders" && (orders.length === 0 ? <p className="empty">No orders yet. Place one through checkout to try the flow.</p> : (
        <div className="table-wrap"><table className="table">
          <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>M-Pesa code</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>{orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}<br /><span className="muted small">{new Date(o.createdAt).toLocaleString()}</span></td>
              <td>{o.customer.name}<br /><span className="muted small">{o.customer.phone}</span></td>
              <td>{o.lines.map((l) => `${l.name}${l.size ? " (" + l.size + ")" : ""} ×${l.qty}`).join(", ")}</td>
              <td>{formatPrice({ [o.currency]: o.total }, o.currency)}</td>
              <td>{o.mpesaCode ?? "—"}</td>
              <td><span className="status">{statusLabel[o.status]}</span></td>
              <td style={{ whiteSpace: "nowrap" }}>
                {o.status === "awaiting_confirmation" && <>
                  <button className="btn" style={{ minHeight: 38, padding: "0 12px" }} onClick={() => { updateOrder(o.id, { status: "paid" }, "confirmed by admin"); refresh(); }}>Confirm paid</button>{" "}
                  <button className="link" onClick={() => { updateOrder(o.id, { status: "failed" }, "rejected by admin"); refresh(); }}>Reject</button>
                </>}
                {NEXT[o.status] && o.lines.some((l) => l.type === "physical") && (
                  <button className="btn btn-outline" style={{ minHeight: 38, padding: "0 12px" }} onClick={() => { updateOrder(o.id, { status: NEXT[o.status]! }); refresh(); }}>Mark {NEXT[o.status]}</button>
                )}
              </td>
            </tr>
          ))}</tbody>
        </table></div>
      ))}

      {tab === "products" && (
        <div className="table-wrap"><table className="table">
          <thead><tr><th>Product</th><th>Type</th><th>KES</th><th>USD</th><th>Stock</th><th></th></tr></thead>
          <tbody>{products.map((p) => (
            <tr key={p.slug}>
              <td>{p.name}</td><td>{p.type}</td><td>{p.price.KES}</td><td>{p.price.USD}</td>
              <td>{p.type === "physical" ? (totalStock(p) === 0 ? <span className="status">Sold out</span> : totalStock(p)) : "—"}</td>
              <td><button className="link" onClick={() => alert("Preview: editing products, prices, stock, images, lessons and ebook files is saved to the database in Phase 4.")}>Edit</button></td>
            </tr>
          ))}</tbody>
        </table></div>
      )}

      {tab === "enquiries" && (
        <div className="table-wrap"><table className="table">
          <thead><tr><th>Name</th><th>From</th><th>WhatsApp</th><th>School</th><th>Arrival</th><th>Needs</th><th></th></tr></thead>
          <tbody>{enq.map((e) => (
            <tr key={e.id} style={{ fontWeight: e.read ? 400 : 700 }}>
              <td>{e.name}</td><td>{e.nationality}</td><td>{e.whatsapp}</td><td>{e.school}</td><td>{e.arrival}</td><td>{e.services}</td>
              <td><button className="link" onClick={() => setEnq(enq.map((x) => x.id === e.id ? { ...x, read: !x.read } : x))}>{e.read ? "Mark unread" : "Mark read"}</button></td>
            </tr>
          ))}</tbody>
        </table></div>
      )}

      {tab === "ledger" && (
        <>
          <button className="btn" onClick={exportCsv} style={{ marginBottom: 16 }}>Export CSV</button>
          <div className="table-wrap"><table className="table">
            <thead><tr><th>Date</th><th>Order</th><th>Type</th><th>Gross</th><th>Fee</th><th>Net</th><th>Payout</th></tr></thead>
            <tbody>{paidOrders.flatMap((o) => o.lines.map((l, i) => {
              const g = l.unit * l.qty;
              return <tr key={o.id + i}><td>{o.createdAt.slice(0, 10)}</td><td>{o.id}</td><td>{l.type}</td><td>{formatPrice({ [o.currency]: g }, o.currency)}</td><td>0</td><td>{formatPrice({ [o.currency]: g }, o.currency)}</td><td>Received</td></tr>;
            }))}</tbody>
          </table></div>
          {paidOrders.length === 0 && <p className="muted">Confirmed payments appear here.</p>}
        </>
      )}
    </div>
  );
}
