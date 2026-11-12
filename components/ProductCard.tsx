"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { formatPrice, totalStock, type Product } from "@/lib/catalog";
import { BagIcon, CheckIcon, StarIcon } from "./Icons";

export function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  const { add, currency } = useCart();
  const [added, setAdded] = useState(false);
  const soldOut = totalStock(p) === 0;
  const firstSize = p.sizes?.find((s) => s.stock > 0)?.size;
  const off = p.was ? Math.round((1 - p.price[currency] / p.was[currency]) * 100) : 0;

  function quickAdd() {
    add({ slug: p.slug, size: firstSize, colour: p.colours?.[0], qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="card">
      <Link href={`/shop/${p.slug}`} className="card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.images![0]} alt={p.name} loading={priority ? "eager" : "lazy"} />
        {p.images![1] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.images![1]} alt="" className="card-alt" loading="lazy" />
        )}
        {p.badge && <span className={`tag ${p.was ? "tag-sale" : ""}`}>{p.was ? `-${off}%` : p.badge}</span>}
      </Link>
      <div className="card-body">
        <p className="card-cat">{p.category}</p>
        <h3 className="card-name"><Link href={`/shop/${p.slug}`}>{p.name}</Link></h3>
        {p.rating && (
          <p className="rating"><StarIcon /> {p.rating.toFixed(1)} <span className="muted">({p.reviews})</span></p>
        )}
        <p className="price">
          <strong>{formatPrice(p.price, currency)}</strong>
          {p.was && <s className="muted">{formatPrice(p.was, currency)}</s>}
        </p>
        <button className={`btn btn-block add-btn ${added ? "added" : ""}`} onClick={quickAdd} disabled={soldOut}>
          {soldOut ? "Épuisé" : added ? <><CheckIcon size={16} /> Ajouté</> : <><BagIcon size={16} /> Ajouter au panier</>}
        </button>
      </div>
    </article>
  );
}
