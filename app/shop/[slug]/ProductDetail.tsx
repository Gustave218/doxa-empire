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
    if (p.sizes && !size) { setErr("Please choose a size."); document.getElementById("sizes")?.focus(); return false; }
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
            <button key={src} className={i === img ? "on" : ""} onClick={() => setImg(i)} aria-label={`View image ${i + 1}`}>
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
            <span>{p.rating.toFixed(1)}</span><span className="muted">· {p.reviews} reviews</span>
          </p>
        )}
        <p className="pdp-price">
          {formatPrice(p.price, currency)}
          {p.was && <s>{formatPrice(p.was, currency)}</s>}
          {p.was && <span className="save">Save {money(p.was[currency] - p.price[currency], currency)}</span>}
        </p>
        <p className="pdp-short">{p.short}</p>

        {p.colours && p.colours.length > 1 && (
          <div className="opt">
            <p className="opt-label">Colour: <strong>{colour}</strong></p>
            <div className="opt-row">
              {p.colours.map((c) => <button key={c} className={`pill ${c === colour ? "on" : ""}`} onClick={() => setColour(c)} aria-pressed={c === colour}>{c}</button>)}
            </div>
          </div>
        )}

        {p.sizes && (
          <div className="opt">
            <p className="opt-label">Size{size && <>: <strong>{size}</strong></>}</p>
            <div className="opt-row" id="sizes" tabIndex={-1} role="radiogroup" aria-label="Size" aria-invalid={!!err}>
              {p.sizes.map((s) => (
                <button key={s.size} role="radio" aria-checked={size === s.size} disabled={s.stock === 0}
                  className={`size ${size === s.size ? "on" : ""}`} onClick={() => { setSize(s.size); setErr(""); setQty(1); }}>
                  {s.size}
                </button>
              ))}
            </div>
            {size && stockFor <= 3 && <p className="low">Only {stockFor} left in this size</p>}
            {err && <p className="error" role="alert">{err}</p>}
          </div>
        )}

        <div className="buy-row">
          <div className="qty big" role="group" aria-label="Quantity">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease quantity"><MinusIcon /></button>
            <span aria-live="polite">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(stockFor, q + 1))} disabled={qty >= stockFor} aria-label="Increase quantity"><PlusIcon /></button>
          </div>
          <button className={`btn grow add-btn ${added ? "added" : ""}`} onClick={addToBag} disabled={soldOut}>
            {soldOut ? "Sold out" : added ? <><CheckIcon size={18} /> Added to bag</> : <><BagIcon size={18} /> Add to bag · {money(p.price[currency] * qty, currency)}</>}
          </button>
        </div>

        <div className="express">
          <p className="opt-label">Express checkout</p>
          <PayButtons
            amount={money(p.price[currency] * qty, currency)}
            title={`${p.name}${size ? ` · Size ${size}` : ""} × ${qty}`}
            onBeforeOpen={check}
            disabled={soldOut}
          />
          <button className="link small" onClick={() => { if (check()) { add({ slug, size, colour, qty }); router.push("/checkout"); } }}>
            Or add to bag and go to full checkout
          </button>
        </div>

        <ul className="assure">
          <li><TruckIcon size={20} /><span><strong>Delivery</strong> Nairobi same day before 1pm · Rest of Kenya 2–4 days</span></li>
          <li><ReturnIcon size={20} /><span><strong>Returns</strong> Free exchange within 14 days</span></li>
          <li><ShieldIcon size={20} /><span><strong>Secure</strong> Card, M-Pesa, Airtel Money, Orange Money</span></li>
        </ul>

        <details className="acc" open>
          <summary>Description</summary>
          <p>{p.description}</p>
        </details>
        <details className="acc">
          <summary>Details & care</summary>
          <ul>{p.details?.map((d) => <li key={d}>{d}</li>)}</ul>
        </details>
        <details className="acc">
          <summary>Size guide</summary>
          {p.category === "Dresses"
            ? <p>XS 6 · S 8 · M 10 · L 12 · XL 14 (UK). Between sizes? Size up for a relaxed fit.</p>
            : <p>EU sizing. 37 = UK 4 · 38 = UK 5 · 39 = UK 6 · 40 = UK 6.5 · 41 = UK 7 · 42 = UK 8.</p>}
        </details>
      </div>
    </section>
  );
}
