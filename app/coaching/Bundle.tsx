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
          <p className="eyebrow gold">Pack accès complet</p>
          <h2 className="serif h2">Tous les cours. Un seul prix. <em>40 % d’économie.</em></h2>
          <ul className="ticks">
            {videos.map((v) => <li key={v.slug}><CheckIcon size={16} /> {v.name}</li>)}
            <li><CheckIcon size={16} /> Communauté WhatsApp privée</li>
            <li><CheckIcon size={16} /> Questions réponses en direct chaque mois</li>
          </ul>
        </div>
        <div className="bundle-card">
          <p className="muted-light small"><s>{money(full, currency)}</s></p>
          <p className="bundle-price serif">{money(price, currency)}</p>
          <p className="muted-light small">Un seul paiement · accès à vie</p>
          <PayButtons amount={money(price, currency)} title="Pack coaching accès complet" slugs={videos.map((v) => v.slug)} />
        </div>
      </div>
    </section>
  );
}
