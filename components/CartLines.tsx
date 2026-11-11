"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { bySlug, money, productHref } from "@/lib/catalog";
import { MinusIcon, PlusIcon, TrashIcon, PlayIcon, BookIcon } from "./Icons";

export function CartLines({ compact = false }: { compact?: boolean }) {
  const { lines, currency, setQty, remove } = useCart();
  return (
    <ul className={`lines ${compact ? "compact" : ""}`}>
      {lines.map((l, i) => {
        const p = bySlug(l.slug);
        if (!p) return null;
        const digital = p.type !== "physical";
        return (
          <li key={`${l.slug}-${l.size}-${l.colour}`} className="line">
            <Link href={productHref(p)} className="line-img">
              {p.images ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.images[0]} alt="" />
              ) : (
                <span className="line-digital" style={p.cover ? { background: p.cover.bg, color: p.cover.fg } : undefined}>
                  {p.type === "video" ? <PlayIcon size={20} /> : <BookIcon size={20} />}
                </span>
              )}
            </Link>
            <div className="line-info">
              <Link href={productHref(p)} className="line-name">{p.name}</Link>
              <p className="line-meta">
                {digital ? (p.type === "video" ? "Video course" : "Ebook · PDF") : [l.colour, l.size && `Size ${l.size}`].filter(Boolean).join(" · ")}
              </p>
              <div className="line-actions">
                {digital ? <span className="small muted">Instant access</span> : (
                  <div className="qty" role="group" aria-label={`Quantity for ${p.name}`}>
                    <button onClick={() => setQty(i, l.qty - 1)} aria-label="Decrease quantity" disabled={l.qty <= 1}><MinusIcon /></button>
                    <span aria-live="polite">{l.qty}</span>
                    <button onClick={() => setQty(i, l.qty + 1)} aria-label="Increase quantity" disabled={l.qty >= 10}><PlusIcon /></button>
                  </div>
                )}
                <button className="line-remove" onClick={() => remove(i)} aria-label={`Remove ${p.name}`}><TrashIcon size={16} />{!compact && " Remove"}</button>
              </div>
            </div>
            <p className="line-price">{money(p.price[currency] * l.qty, currency)}</p>
          </li>
        );
      })}
    </ul>
  );
}
