"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { bySlug, formatPrice, money } from "@/lib/catalog";
import { useCart } from "@/components/CartProvider";
import { BagIcon, CheckIcon, MinusIcon, PlusIcon, StarIcon, TruckIcon, ReturnIcon, ShieldIcon } from "@/components/Icons";
import { PayButtons } from "@/components/Pay";

export function ProductDetail({ slug }: { slug: string }) {
  const p = bySlug(slug)!;
  const { add, currency } = useCart();
  const router = useRouter();
  const [img, setImg] = useState(0);
  const [size, setSize] = useState<string | undefined>();
  const [colour, setColour] = useState(p.colours?.[0]);
  const [qty, setQty] = useState(1);
  const [err, setErr] = useState("");
  const [added, setAdded] = useState(false);
  const stockFor = p.sizes?.find((s) => s.stock > 0 && s.size === size)?.stock ?? 10;
  const soldOut = p.sizes?.every((s) => s.stock === 0);

  function check() {
    if (p.sizes && !size) { setErr("Veuillez choisir une taille."); document.getElementById("sizes")?.focus(); return false; }
    setErr(""); return true;
  }
  function addToBag() {
    if (!check()) return;
    add({ slug, size, colour, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <section className="wrap pdp">
      <div className="gallery">
        <div className="gallery-thumbs">
          {p.images!.map((src, i) => (
            <button key={src} className={i === img ? "on" : ""} onClick={() => setImg(i)} aria-label={`Voir l'image ${i + 1}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
            </button>
          ))}
        </div>
        <div className="gallery-main">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.images![img]} alt={p.name} />
          {p.badge && <span className="tag">{p.badge}</span>}
        </div>
      </div>

      <div className="pdp-info">
        <p className="eyebrow">{p.category}</p>
        <h1 className="serif pdp-title">{p.name}</h1>
        {p.rating && (
          <p className="rating big">
            {[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} size={15} className={n <= Math.round(p.rating!) ? "" : "dim"} />)}
            <span>{p.rating.toFixed(1)}</span><span className="muted">· {p.reviews} avis</span>
          </p>
        )}
        <p className="pdp-price">
          {formatPrice(p.price, currency)}
          {p.was && <s>{formatPrice(p.was, currency)}</s>}
          {p.was && <span className="save">Économisez {money(p.was[currency] - p.price[currency], currency)}</span>}
        </p>
        <p className="pdp-short">{p.short}</p>

        {p.colours && p.colours.length > 1 && (
          <div className="opt">
            <p className="opt-label">Couleur : <strong>{colour}</strong></p>
            <div className="opt-row">
              {p.colours.map((c) => <button key={c} className={`pill ${c === colour ? "on" : ""}`} onClick={() => setColour(c)} aria-pressed={c === colour}>{c}</button>)}
            </div>
          </div>
        )}

        {p.sizes && (
          <div className="opt">
            <p className="opt-label">Taille{size && <> : <strong>{size}</strong></>}</p>
            <div className="opt-row" id="sizes" tabIndex={-1} role="radiogroup" aria-label="Taille" aria-invalid={!!err}>
              {p.sizes.map((s) => (
                <button key={s.size} role="radio" aria-checked={size === s.size} disabled={s.stock === 0}
                  className={`size ${size === s.size ? "on" : ""}`} onClick={() => { setSize(s.size); setErr(""); setQty(1); }}>
                  {s.size}
                </button>
              ))}
            </div>
            {size && stockFor <= 3 && <p className="low">Plus que {stockFor} dans cette taille</p>}
            {err && <p className="error" role="alert">{err}</p>}
          </div>
        )}

        <div className="buy-row">
          <div className="qty big" role="group" aria-label="Quantité">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Diminuer la quantité"><MinusIcon /></button>
            <span aria-live="polite">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(stockFor, q + 1))} disabled={qty >= stockFor} aria-label="Augmenter la quantité"><PlusIcon /></button>
          </div>
          <button className={`btn grow add-btn ${added ? "added" : ""}`} onClick={addToBag} disabled={soldOut}>
            {soldOut ? "Épuisé" : added ? <><CheckIcon size={18} /> Ajouté au panier</> : <><BagIcon size={18} /> Ajouter au panier · {money(p.price[currency] * qty, currency)}</>}
          </button>
        </div>

        <div className="express">
          <p className="opt-label">Paiement express</p>
          <PayButtons
            amount={money(p.price[currency] * qty, currency)}
            title={`${p.name}${size ? ` · Taille ${size}` : ""} × ${qty}`}
            onBeforeOpen={check}
            disabled={soldOut}
          />
          <button className="link small" onClick={() => { if (check()) { add({ slug, size, colour, qty }); router.push("/checkout"); } }}>
            Ou ajouter au panier et passer à la caisse
          </button>
        </div>

        <ul className="assure">
          <li><TruckIcon size={20} /><span><strong>Livraison</strong> Nairobi le jour même avant 13 h · Reste du Kenya 2 à 4 jours</span></li>
          <li><ReturnIcon size={20} /><span><strong>Retours</strong> Échange gratuit sous 14 jours</span></li>
          <li><ShieldIcon size={20} /><span><strong>Sécurisé</strong> Carte, M-Pesa, Airtel Money, Orange Money</span></li>
        </ul>

        <details className="acc" open>
          <summary>Description</summary>
          <p>{p.description}</p>
        </details>
        <details className="acc">
          <summary>Détails et entretien</summary>
          <ul>{p.details?.map((d) => <li key={d}>{d}</li>)}</ul>
        </details>
        <details className="acc">
          <summary>Guide des tailles</summary>
          {p.category === "Robes"
            ? <p>XS 6 · S 8 · M 10 · L 12 · XL 14 (UK). Entre deux tailles ? Prenez la taille au dessus pour plus d’aisance.</p>
            : <p>Pointures EU. 37 = UK 4 · 38 = UK 5 · 39 = UK 6 · 40 = UK 6.5 · 41 = UK 7 · 42 = UK 8.</p>}
        </details>
      </div>
    </section>
  );
}
