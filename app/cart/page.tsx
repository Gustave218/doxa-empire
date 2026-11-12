"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { CartLines } from "@/components/CartLines";
import { money, shopProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { BagIcon, CardMarks, MobileMarks, LockIcon } from "@/components/Icons";

export default function CartPage() {
  const { lines, subtotal, delivery, total, currency, count, clear, hasPhysical, ready } = useCart();
  const suggest = shopProducts.filter((p) => !lines.some((l) => l.slug === p.slug)).slice(0, 4);

  return (
    <div className="wrap section-sm">
      <div className="page-head">
        <h1 className="serif h1">Votre panier</h1>
        {ready && count > 0 && <p className="muted">{count} {count === 1 ? "article" : "articles"}</p>}
      </div>

      {!ready ? null : lines.length === 0 ? (
        <div className="empty big">
          <BagIcon size={52} />
          <p className="serif h3">Votre panier est vide</p>
          <p className="muted">Découvrez nos robes et sandales faites main, faites pour être remarquées.</p>
          <Link href="/shop" className="btn">Voir la sélection</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            <CartLines />
            <div className="row-between cart-under">
              <Link href="/shop" className="link-arrow back">Continuer mes achats</Link>
              <button className="link" onClick={clear}>Vider le panier</button>
            </div>
          </div>
          <aside className="summary">
            <h2 className="serif h3">Récapitulatif</h2>
            <dl>
              <div><dt>Sous total</dt><dd>{money(subtotal, currency)}</dd></div>
              {hasPhysical && <div><dt>Livraison</dt><dd>{delivery === 0 ? "Offerte" : money(delivery, currency)}</dd></div>}
              <div className="grand"><dt>Total</dt><dd>{money(total, currency)}</dd></div>
            </dl>
            <Link href="/checkout" className="btn btn-block"><LockIcon size={16} /> Paiement sécurisé</Link>
            <div className="summary-marks"><CardMarks height={20} /><MobileMarks height={20} /></div>
          </aside>
        </div>
      )}

      {suggest.length > 0 && (
        <section className="section">
          <h2 className="serif h2">Complétez le look</h2>
          <div className="grid-products">{suggest.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        </section>
      )}
    </div>
  );
}
