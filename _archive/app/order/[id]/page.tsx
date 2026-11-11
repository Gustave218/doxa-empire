"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { formatPrice } from "@/lib/catalog";
import { getOrder, statusLabel, updateOrder, type Order } from "@/lib/orders";

const TILL = "[NEEDS CLIENT] Till number";

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { setOrder(getOrder(id) ?? null); }, [id]);

  if (order === undefined) return <div className="wrap empty"><p>Loading your order…</p></div>;
  if (order === null) return <div className="wrap empty"><p>We could not find order {id}.</p><Link className="btn" href="/account">My orders</Link></div>;

  const fmt = (v: number) => formatPrice({ [order.currency]: v }, order.currency);
  const paid = !["awaiting_payment", "awaiting_confirmation", "failed"].includes(order.status);

  function submitCode(e: React.FormEvent) {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (!/^[A-Z0-9]{10}$/.test(c)) { setError("An M-Pesa code has 10 letters and numbers, e.g. SLK4H7XT2P."); return; }
    setError("");
    setOrder(updateOrder(order!.id, { mpesaCode: c, status: "awaiting_confirmation" }, `code ${c}`)!);
  }

  return (
    <div className="wrap" style={{ maxWidth: 860, paddingBottom: 56 }}>
      <div className="page-head">
        <p className="crumbs">Order {order.id}</p>
        <h1 className="display h1">{paid ? "Thank you!" : order.status === "awaiting_confirmation" ? "We are checking your payment" : "Pay with M-Pesa"}</h1>
        <p><span className={`status ${paid ? "status-paid" : ""}`}>{statusLabel[order.status]}</span></p>
      </div>

      {order.status === "awaiting_payment" && (
        <div className="form">
          <div className="till">
            <span>Go to M-Pesa → Lipa na M-Pesa → Buy Goods</span>
            <span>Till number</span><strong>{TILL}</strong>
            <span>Amount</span><strong>{fmt(order.total)}</strong>
          </div>
          {order.currency === "USD" && <p className="notice">Paying from outside Kenya? Message us on WhatsApp and we will send other ways to pay.</p>}
          <form className="form" onSubmit={submitCode} noValidate>
            <div className="field">
              <label htmlFor="code">M-Pesa confirmation code</label>
              <input id="code" value={code} onChange={(e) => setCode(e.target.value)} autoCapitalize="characters" placeholder="e.g. SLK4H7XT2P" aria-invalid={!!error} aria-describedby={error ? "code-err" : "code-hint"} />
              {error ? <span className="error" id="code-err">{error}</span> : <span className="hint" id="code-hint">You will find it at the start of the M-Pesa SMS.</span>}
            </div>
            <button className="btn btn-pink">I have paid</button>
          </form>
        </div>
      )}

      {order.status === "awaiting_confirmation" && (
        <p className="notice">We received code <strong>{order.mpesaCode}</strong>. We confirm payments by hand, usually within a few hours. You will get an email at {order.customer.email} when it is confirmed.</p>
      )}

      {paid && (
        <div className="form">
          {order.lines.some((l) => l.type === "ebook" || l.type === "course") && <p className="notice">Your courses and ebooks are in <Link href="/account">My library</Link>.</p>}
          {order.lines.some((l) => l.type === "coaching") && <p className="notice">Book your coaching time: <a href="#" aria-disabled>booking link</a> <span className="needs">[NEEDS CLIENT: Cal.com link]</span></p>}
          {order.lines.some((l) => l.type === "physical") && <p className="notice">Slippers: {statusLabel[order.status]}. We deliver to {order.address?.street}, {order.address?.area}.</p>}
        </div>
      )}

      <div className="summary" style={{ marginTop: 28 }}>
        {order.lines.map((l, i) => <p key={i} className="row-between"><span>{l.name}{l.size ? `, size ${l.size}` : ""} × {l.qty}</span><span>{fmt(l.unit * l.qty)}</span></p>)}
        {order.delivery > 0 && <p className="row-between"><span>Delivery</span><span>{fmt(order.delivery)}</span></p>}
        <p className="row-between total"><span>Total</span><span>{fmt(order.total)}</span></p>
      </div>
      <p className="muted small" style={{ marginTop: 20 }}>Preview: to see the next step, open <Link href="/admin">Admin</Link> and confirm this payment.</p>
    </div>
  );
}
