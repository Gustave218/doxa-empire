"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice, type Product } from "@/lib/catalog";
import { useCart } from "./CartProvider";

export function BuyBox({ p, showTitle = true }: { p: Product; showTitle?: boolean }) {
  const { currency, add, lines } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [colour, setColour] = useState<string | undefined>(p.colours?.[0]);
  const [tried, setTried] = useState(false);

  const physical = p.type === "physical";
  const soldOut = physical && !p.sizes?.some((s) => s.stock > 0);
  const chosen = p.sizes?.find((s) => s.size === size);
  const inBag = !physical && lines.some((l) => l.slug === p.slug);
  const label =
    p.type === "ebook" ? "Buy ebook" : p.type === "course" ? "Buy course" : p.type === "coaching" ? "Book and pay" : "Add to bag";

  function onAdd() {
    if (physical && !size) { setTried(true); return; }
    add({ slug: p.slug, size: size ?? undefined, colour: physical ? colour : undefined, qty: 1 });
  }

  return (
    <div>
      {showTitle && <h1>{p.name}</h1>}
      <p className="pdp-price">{formatPrice(p.price, currency)}</p>

      {p.colours && p.colours.length > 0 && (
        <>
          <p className="opt-label"><span>Colour: {colour}</span></p>
          <div className="chips">
            {p.colours.map((c) => (
              <button key={c} className="chip" aria-pressed={colour === c} onClick={() => setColour(c)}>{c}</button>
            ))}
          </div>
        </>
      )}

      {p.sizes && (
        <>
          <p className="opt-label"><span>Size (EU)</span><Link href="/shop#size-guide" className="small">Size guide</Link></p>
          <div className="sizes" role="group" aria-label="Choose a size">
            {p.sizes.map((s) => (
              <button key={s.size} className="size" disabled={s.stock === 0} aria-pressed={size === s.size} onClick={() => { setSize(s.size); setTried(false); }}>
                {s.size}
              </button>
            ))}
          </div>
          <p className="stock-note" role="status">
            {tried && !size ? "Please choose a size." : chosen && chosen.stock <= 2 ? `Only ${chosen.stock} left in size ${chosen.size}` : ""}
          </p>
        </>
      )}

      {p.type === "coaching" && <p className="muted">After payment is confirmed, you get a link to choose your time.</p>}
      {p.type === "course" && <p className="muted">Lifetime access in your private library. Watch on any phone or laptop.</p>}
      {p.type === "ebook" && <p className="muted">PDF download from your library after payment. {p.pages} pages.</p>}

      <div className="add-row">
        {soldOut ? (
          <button className="btn btn-block" disabled>Sold out</button>
        ) : inBag ? (
          <button className="btn btn-block" disabled>In your bag</button>
        ) : (
          <button className="btn btn-pink btn-block" onClick={onAdd}>{label}</button>
        )}
        {!physical && <p className="small muted" style={{ margin: 0 }}>Digital purchases need a free account (we send you a sign-in code by email).</p>}
      </div>
    </div>
  );
}
