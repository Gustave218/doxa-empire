"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { CartLines } from "@/components/CartLines";
import { money } from "@/lib/catalog";
import { PayButtons } from "@/components/Pay";
import { ShieldIcon } from "@/components/Icons";

export default function CheckoutPage() {
  const { lines, subtotal, delivery, total, currency, hasPhysical, clear, ready } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paid, setPaid] = useState(false);

  function validate() {
    const form = document.getElementById("details") as HTMLFormElement;
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const e: Record<string, string> = {};
    if (!d.name?.trim()) e.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(d.email || "")) e.email = "Enter a valid email.";
    if (!/^\+?[0-9 ]{9,16}$/.test(d.phone || "")) e.phone = "Enter a phone number.";
    if (hasPhysical && !d.area) e.area = "Choose a delivery area.";
    if (hasPhysical && !d.street?.trim()) e.street = "Enter your address.";
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`k-${first}`)?.focus();
    return !first;
  }

  if (!ready) return null;

  if (paid) {
    return (
      <div className="wrap section narrow center">
        <p className="eyebrow">Order confirmed</p>
        <h1 className="serif h1">Thank you. Asante sana.</h1>
        <p className="lede">We have your order and will send updates to your email and WhatsApp.</p>
        <p className="demo-note">Demo checkout: no payment was taken.</p>
        <Link href="/shop" className="btn">Keep shopping</Link>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="wrap section narrow center">
        <h1 className="serif h1">Nothing to check out</h1>
        <p className="muted">Your bag is empty.</p>
        <Link href="/shop" className="btn">Go to the shop</Link>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <span className="error">{errors[k]}</span>;

  return (
    <div className="wrap section-sm">
      <div className="page-head">
        <h1 className="serif h1">Checkout</h1>
        <p className="muted small"><ShieldIcon size={16} /> Secure, encrypted checkout</p>
      </div>
      <div className="cart-layout">
        <form id="details" className="checkout-form" noValidate onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend className="step"><span>1</span> Contact</legend>
            <div className="field"><label htmlFor="k-name">Full name</label><input id="k-name" name="name" autoComplete="name" aria-invalid={!!errors.name} />{err("name")}</div>
            <div className="two">
              <div className="field"><label htmlFor="k-email">Email</label><input id="k-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />{err("email")}</div>
              <div className="field"><label htmlFor="k-phone">Phone / WhatsApp</label><input id="k-phone" name="phone" type="tel" autoComplete="tel" placeholder="+254 7…" aria-invalid={!!errors.phone} />{err("phone")}</div>
            </div>
          </fieldset>

          {hasPhysical && (
            <fieldset>
              <legend className="step"><span>2</span> Delivery</legend>
              <div className="field">
                <label htmlFor="k-area">Area</label>
                <select id="k-area" name="area" defaultValue="" aria-invalid={!!errors.area}>
                  <option value="" disabled>Choose…</option>
                  <option>Nairobi CBD</option><option>Westlands / Kilimani</option><option>Karen / Lang&apos;ata</option>
                  <option>Other Nairobi</option><option>Mombasa</option><option>Kisumu</option><option>Rest of Kenya</option>
                </select>{err("area")}
              </div>
              <div className="field"><label htmlFor="k-street">Address, building, apartment</label><input id="k-street" name="street" autoComplete="street-address" aria-invalid={!!errors.street} />{err("street")}</div>
              <div className="field"><label htmlFor="k-notes">Delivery notes (optional)</label><input id="k-notes" name="notes" placeholder="Gate code, landmark…" /></div>
            </fieldset>
          )}

          <fieldset>
            <legend className="step"><span>{hasPhysical ? 3 : 2}</span> Payment</legend>
            <p className="muted small">Choose how you want to pay {money(total, currency)}.</p>
            <PayButtons
              amount={money(total, currency)}
              title={`Doxa Empire order · ${lines.length} ${lines.length === 1 ? "item" : "items"}`}
              onBeforeOpen={validate}
              onPaid={() => setTimeout(() => { clear(); setPaid(true); }, 2200)}
            />
          </fieldset>
        </form>

        <aside className="summary">
          <h2 className="serif h3">In your bag</h2>
          <CartLines compact />
          <dl>
            <div><dt>Subtotal</dt><dd>{money(subtotal, currency)}</dd></div>
            {hasPhysical && <div><dt>Delivery</dt><dd>{delivery === 0 ? "Free" : money(delivery, currency)}</dd></div>}
            <div className="grand"><dt>Total</dt><dd>{money(total, currency)}</dd></div>
          </dl>
          <Link href="/cart" className="link small">Edit bag</Link>
        </aside>
      </div>
    </div>
  );
}
