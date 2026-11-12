"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { CartLines } from "./CartLines";
import { CloseIcon, BagIcon } from "./Icons";
import { money, FREE_DELIVERY_FROM } from "@/lib/catalog";

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, currency, count, hasPhysical } = useCart();
  const path = usePathname();

  useEffect(() => { setOpen(false); }, [path, setOpen]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const freeAt = FREE_DELIVERY_FROM[currency];
  const left = Math.max(0, freeAt - subtotal);

  return (
    <>
      <div className={`sheet-scrim ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? "show" : ""}`} aria-hidden={!open} aria-label="Panier">
        <div className="drawer-head">
          <h2 className="serif">Votre panier <span className="muted">({count})</span></h2>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Fermer le panier"><CloseIcon /></button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <BagIcon size={44} />
            <p className="serif">Votre panier est vide</p>
            <Link href="/shop" className="btn">Commencer mes achats</Link>
          </div>
        ) : (
          <>
            {hasPhysical && (
              <div className="ship-meter">
                <p className="small">{left > 0 ? <>Plus que <strong>{money(left, currency)}</strong> pour la livraison offerte à Nairobi</> : <>Livraison <strong>offerte</strong> débloquée</>}</p>
                <div className="meter"><span style={{ width: `${Math.min(100, (subtotal / freeAt) * 100)}%` }} /></div>
              </div>
            )}
            <div className="drawer-body"><CartLines compact /></div>
            <div className="drawer-foot">
              <p className="row-between total-line"><span>Sous total</span><strong>{money(subtotal, currency)}</strong></p>
              <p className="small muted">Livraison calculée au paiement.</p>
              <Link href="/checkout" className="btn btn-block">Payer</Link>
              <Link href="/cart" className="btn btn-outline btn-block">Voir le panier</Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
