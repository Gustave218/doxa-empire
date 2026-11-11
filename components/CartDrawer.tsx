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
      <aside className={`drawer ${open ? "show" : ""}`} aria-hidden={!open} aria-label="Shopping bag">
        <div className="drawer-head">
          <h2 className="serif">Your bag <span className="muted">({count})</span></h2>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close bag"><CloseIcon /></button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <BagIcon size={44} />
            <p className="serif">Your bag is empty</p>
            <Link href="/shop" className="btn">Start shopping</Link>
          </div>
        ) : (
          <>
            {hasPhysical && (
              <div className="ship-meter">
                <p className="small">{left > 0 ? <>Add <strong>{money(left, currency)}</strong> for free Nairobi delivery</> : <>You have unlocked <strong>free delivery</strong></>}</p>
                <div className="meter"><span style={{ width: `${Math.min(100, (subtotal / freeAt) * 100)}%` }} /></div>
              </div>
            )}
            <div className="drawer-body"><CartLines compact /></div>
            <div className="drawer-foot">
              <p className="row-between total-line"><span>Subtotal</span><strong>{money(subtotal, currency)}</strong></p>
              <p className="small muted">Delivery calculated at checkout.</p>
              <Link href="/checkout" className="btn btn-block">Checkout</Link>
              <Link href="/cart" className="btn btn-outline btn-block">View bag</Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
