"use client";

import { useState } from "react";
import { bySlug, money } from "@/lib/catalog";
import { useCart } from "@/components/CartProvider";
import { PayButtons } from "@/components/Pay";
import { BagIcon, CheckIcon } from "@/components/Icons";

export function EbookBuy({ slug }: { slug: string }) {
  const p = bySlug(slug)!;
  const { currency, add } = useCart();
  const [owned, setOwned] = useState(false);
  const [added, setAdded] = useState(false);

  if (owned) {
    return (
      <a className="btn btn-block" href="#" onClick={(e) => e.preventDefault()}><CheckIcon size={16} /> Télécharger votre exemplaire</a>
    );
  }
  return (
    <div className="ebook-buy">
      <p className="pdp-price">{money(p.price[currency], currency)}</p>
      <PayButtons amount={money(p.price[currency], currency)} title={`${p.name} (ebook)`} slugs={[slug]} onPaid={() => setOwned(true)} />
      <button className={`btn btn-outline btn-block ${added ? "added" : ""}`} onClick={() => { add({ slug, qty: 1 }); setAdded(true); setTimeout(() => setAdded(false), 1400); }}>
        {added ? <><CheckIcon size={16} /> Ajouté au panier</> : <><BagIcon size={16} /> Ajouter au panier</>}
      </button>
    </div>
  );
}
