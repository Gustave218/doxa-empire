"use client";

import { useCart } from "@/components/CartProvider";
import { PayButtons } from "@/components/Pay";
import { money, videos } from "@/lib/catalog";
import { CheckIcon } from "@/components/Icons";

export function Bundle() {
  const { currency } = useCart();
  const full = videos.reduce((n, v) => n + v.price[currency], 0);
  const price = Math.round(full * 0.6);
  return (
    <section className="bundle" id="bundle">
      <div className="wrap bundle-grid">
        <div>
          <p className="eyebrow gold">All-access bundle</p>
          <h2 className="serif h2">Every course. One price. <em>Save 40%.</em></h2>
          <ul className="ticks">
            {videos.map((v) => <li key={v.slug}><CheckIcon size={16} /> {v.name}</li>)}
            <li><CheckIcon size={16} /> Private WhatsApp community</li>
            <li><CheckIcon size={16} /> Monthly live Q&amp;A</li>
          </ul>
        </div>
        <div className="bundle-card">
          <p className="muted-light small"><s>{money(full, currency)}</s></p>
          <p className="bundle-price serif">{money(price, currency)}</p>
          <p className="muted-light small">One payment · lifetime access</p>
          <PayButtons amount={money(price, currency)} title="All-access coaching bundle" />
        </div>
      </div>
    </section>
  );
}
