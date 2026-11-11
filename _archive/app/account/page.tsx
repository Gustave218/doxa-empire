"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { bySlug, formatPrice } from "@/lib/catalog";
import { loadOrders, statusLabel, type Order } from "@/lib/orders";
import { BookCover } from "@/components/BookCover";

export default function Account() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [tab, setTab] = useState<"library" | "orders">("library");
  const [playing, setPlaying] = useState<string | null>(null);
  useEffect(() => setOrders(loadOrders()), []);

  if (!orders) return <div className="wrap empty"><p>Loading…</p></div>;

  const paid = orders.filter((o) => !["awaiting_payment", "awaiting_confirmation", "failed"].includes(o.status));
  const owned = Array.from(new Set(paid.flatMap((o) => o.lines.filter((l) => l.type === "ebook" || l.type === "course").map((l) => l.slug))))
    .map((s) => bySlug(s)!).filter(Boolean);

  return (
    <div className="wrap" style={{ paddingBottom: 56 }}>
      <div className="page-head">
        <h1 className="display h1">My account</h1>
        <p className="muted small">Preview: sign-in by email code is added with the database (Phase 4). This page shows orders placed in this browser.</p>
      </div>
      <div className="admin-tabs" role="tablist">
        <button role="tab" aria-selected={tab === "library"} onClick={() => setTab("library")}>My library ({owned.length})</button>
        <button role="tab" aria-selected={tab === "orders"} onClick={() => setTab("orders")}>Orders ({orders.length})</button>
      </div>

      {tab === "library" && (owned.length === 0 ? (
        <div className="empty"><p>Courses and ebooks you buy appear here once payment is confirmed.</p><Link href="/academy" className="btn">Browse the Academy</Link></div>
      ) : (
        <div className="grid grid-3">
          {owned.map((p) => (
            <div key={p.slug} className="panel">
              {p.type === "ebook" ? <div style={{ padding: "0 20%" }}><BookCover p={p} /></div> : (
                <div className="card-type card-type-course" style={{ position: "relative", aspectRatio: "16 / 9" }}>
                  <span>{p.lessons?.length} lessons</span><strong>{p.name}</strong>
                </div>
              )}
              <h2 className="h3" style={{ fontSize: 18, margin: "14px 0 8px" }}>{p.name}</h2>
              {p.type === "ebook" ? (
                <button className="btn btn-block" onClick={() => alert("Preview: the real site creates a private download link that expires after a few minutes.")}>Download PDF</button>
              ) : (
                <>
                  <button className="btn btn-block" onClick={() => setPlaying(playing === p.slug ? null : p.slug)}>{playing === p.slug ? "Hide lessons" : "Watch"}</button>
                  {playing === p.slug && (
                    <ol className="lessons" style={{ marginTop: 12 }}>
                      {p.lessons!.map((l, i) => <li key={l.title}><span>{l.title}</span><span className="muted">{i === 0 ? "Watched" : `${l.minutes} min`}</span></li>)}
                    </ol>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}

      {tab === "orders" && (orders.length === 0 ? (
        <div className="empty"><p>No orders yet.</p><Link href="/shop" className="btn">Start shopping</Link></div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td><Link href={`/order/${o.id}`}>{o.id}</Link></td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>{o.lines.map((l) => l.name).join(", ")}</td>
                  <td>{formatPrice({ [o.currency]: o.total }, o.currency)}</td>
                  <td><span className="status">{statusLabel[o.status]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
