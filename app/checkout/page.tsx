"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/components/CartProvider";
import { CartLines } from "@/components/CartLines";
import { money } from "@/lib/catalog";
import { PayButtons } from "@/components/Pay";
import { ShieldIcon } from "@/components/Icons";

export default function CheckoutPage() {
  const { lines, subtotal, delivery, total, currency, hasPhysical, clear, ready } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paid, setPaid] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const mustLogin = auth.configured && auth.ready && !auth.user;
  useEffect(() => { if (mustLogin && !paid) router.replace("/connexion?next=/checkout"); }, [mustLogin, paid, router]);

  function validate() {
    const form = document.getElementById("details") as HTMLFormElement;
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const e: Record<string, string> = {};
    if (!d.name?.trim()) e.name = "Indiquez votre nom complet.";
    if (!/^\S+@\S+\.\S+$/.test(d.email || "")) e.email = "Indiquez un email valide.";
    if (!/^\+?[0-9 ]{9,16}$/.test(d.phone || "")) e.phone = "Indiquez un numéro de téléphone.";
    if (hasPhysical && !d.area) e.area = "Choisissez une zone de livraison.";
    if (hasPhysical && !d.street?.trim()) e.street = "Indiquez votre adresse.";
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`k-${first}`)?.focus();
    return !first;
  }

  if (!ready || !auth.ready || (mustLogin && !paid)) return null;

  if (paid) {
    return (
      <div className="wrap section narrow center">
        <p className="eyebrow">Commande confirmée</p>
        <h1 className="serif h1">Merci. Asante sana.</h1>
        <p className="lede">Nous avons bien reçu votre commande et vous tiendrons informé par email et WhatsApp.</p>
        <p className="demo-note">Paiement de démonstration : aucun montant débité.</p>
        <Link href="/shop" className="btn">Continuer mes achats</Link>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="wrap section narrow center">
        <h1 className="serif h1">Rien à payer</h1>
        <p className="muted">Votre panier est vide.</p>
        <Link href="/shop" className="btn">Aller à la boutique</Link>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <span className="error">{errors[k]}</span>;

  return (
    <div className="wrap section-sm">
      <div className="page-head">
        <h1 className="serif h1">Paiement</h1>
        <p className="muted small"><ShieldIcon size={16} /> Paiement sécurisé et chiffré</p>
      </div>
      <div className="cart-layout">
        <form id="details" className="checkout-form" noValidate onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend className="step"><span>1</span> Coordonnées</legend>
            <div className="field"><label htmlFor="k-name">Nom complet</label><input id="k-name" name="name" autoComplete="name" defaultValue={auth.user?.name} aria-invalid={!!errors.name} />{err("name")}</div>
            <div className="two">
              <div className="field"><label htmlFor="k-email">Email</label><input id="k-email" name="email" type="email" autoComplete="email" defaultValue={auth.user?.email} aria-invalid={!!errors.email} />{err("email")}</div>
              <div className="field"><label htmlFor="k-phone">Téléphone / WhatsApp</label><input id="k-phone" name="phone" type="tel" autoComplete="tel" defaultValue={auth.user?.phone} placeholder="+254 7…" aria-invalid={!!errors.phone} />{err("phone")}</div>
            </div>
          </fieldset>

          {hasPhysical && (
            <fieldset>
              <legend className="step"><span>2</span> Livraison</legend>
              <div className="field">
                <label htmlFor="k-area">Zone</label>
                <select id="k-area" name="area" defaultValue="" aria-invalid={!!errors.area}>
                  <option value="" disabled>Choisir…</option>
                  <option>Nairobi CBD</option><option>Westlands / Kilimani</option><option>Karen / Lang&apos;ata</option>
                  <option>Autre quartier de Nairobi</option><option>Mombasa</option><option>Kisumu</option><option>Reste du Kenya</option>
                </select>{err("area")}
              </div>
              <div className="field"><label htmlFor="k-street">Adresse, immeuble, appartement</label><input id="k-street" name="street" autoComplete="street-address" aria-invalid={!!errors.street} />{err("street")}</div>
              <div className="field"><label htmlFor="k-notes">Instructions de livraison (facultatif)</label><input id="k-notes" name="notes" placeholder="Code du portail, point de repère…" /></div>
            </fieldset>
          )}

          <fieldset>
            <legend className="step"><span>{hasPhysical ? 3 : 2}</span> Paiement</legend>
            <p className="muted small">Choisissez comment payer {money(total, currency)}.</p>
            <PayButtons
              amount={money(total, currency)}
              title={`Commande Doxa Empire · ${lines.length} ${lines.length === 1 ? "article" : "articles"}`}
              onBeforeOpen={validate}
              onPaid={() => setTimeout(() => { clear(); setPaid(true); }, 2200)}
            />
          </fieldset>
        </form>

        <aside className="summary">
          <h2 className="serif h3">Dans votre panier</h2>
          <CartLines compact />
          <dl>
            <div><dt>Sous total</dt><dd>{money(subtotal, currency)}</dd></div>
            {hasPhysical && <div><dt>Livraison</dt><dd>{delivery === 0 ? "Offerte" : money(delivery, currency)}</dd></div>}
            <div className="grand"><dt>Total</dt><dd>{money(total, currency)}</dd></div>
          </dl>
          <Link href="/cart" className="link small">Modifier le panier</Link>
        </aside>
      </div>
    </div>
  );
}
