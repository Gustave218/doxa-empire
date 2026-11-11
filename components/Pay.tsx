"use client";

// SHOWCASE ONLY: no payment is taken. Wire these to the real card gateway and
// mobile money APIs (Daraja for M-Pesa, Airtel Money, Orange Money) later.

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CardMarks, MobileMarks, VisaMark, MastercardMark, MpesaMark, AirtelMark, OrangeMark, CloseIcon, LockIcon, CheckIcon, CardIcon, PhoneIcon } from "./Icons";

export type Method = "card" | "mobile";
type Provider = "mpesa" | "airtel" | "orange";

const PROVIDERS: { id: Provider; label: string; Mark: typeof MpesaMark; prefix: string }[] = [
  { id: "mpesa", label: "M-Pesa", Mark: MpesaMark, prefix: "+254" },
  { id: "airtel", label: "Airtel Money", Mark: AirtelMark, prefix: "+254" },
  { id: "orange", label: "Orange Money", Mark: OrangeMark, prefix: "+243" },
];

export function PayButtons({ amount, title, onPaid, disabled, onBeforeOpen }: {
  amount: string; title: string; onPaid?: () => void; disabled?: boolean; onBeforeOpen?: () => boolean;
}) {
  const [method, setMethod] = useState<Method | null>(null);
  const open = (m: Method) => { if (onBeforeOpen && !onBeforeOpen()) return; setMethod(m); };
  return (
    <>
      <div className="pay-buttons">
        <button type="button" className="pay-btn" onClick={() => open("card")} disabled={disabled}>
          <span className="pay-btn-label"><CardIcon size={20} /> Pay with card</span>
          <CardMarks height={20} />
        </button>
        <button type="button" className="pay-btn" onClick={() => open("mobile")} disabled={disabled}>
          <span className="pay-btn-label"><PhoneIcon size={20} /> Mobile money</span>
          <MobileMarks height={20} />
        </button>
      </div>
      {method && <PayModal method={method} amount={amount} title={title} onClose={() => setMethod(null)} onPaid={onPaid} />}
    </>
  );
}

export function PayModal({ method, amount, title, onClose, onPaid }: {
  method: Method; amount: string; title: string; onClose: () => void; onPaid?: () => void;
}) {
  const [provider, setProvider] = useState<Provider>("mpesa");
  const [stage, setStage] = useState<"form" | "processing" | "done">("form");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    ref.current?.querySelector<HTMLElement>("input, button")?.focus();
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setStage("processing");
    setTimeout(() => { setStage("done"); onPaid?.(); }, 1600);
  }

  const p = PROVIDERS.find((x) => x.id === provider)!;

  // Rendered into <body> so its form never nests inside a page form (e.g. checkout).
  return createPortal(
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={method === "card" ? "Pay with card" : "Pay with mobile money"} ref={ref} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><CloseIcon size={20} /></button>

        {stage === "done" ? (
          <div className="modal-done">
            <span className="done-tick"><CheckIcon size={30} /></span>
            <h2 className="serif">Payment received</h2>
            <p className="muted">{title}<br /><strong>{amount}</strong></p>
            <p className="demo-note">Demo mode: no money was taken. Live payments will be connected soon.</p>
            <button className="btn btn-block" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="eyebrow">{method === "card" ? "Card payment" : "Mobile money"}</p>
            <h2 className="serif modal-title">{amount}</h2>
            <p className="muted small">{title}</p>

            {method === "card" ? (
              <>
                <div className="modal-marks"><VisaMark height={26} /><MastercardMark height={26} /></div>
                <div className="field"><label htmlFor="c-name">Name on card</label><input id="c-name" required autoComplete="cc-name" placeholder="Amina Wanjiru" /></div>
                <div className="field"><label htmlFor="c-num">Card number</label><input id="c-num" required inputMode="numeric" autoComplete="cc-number" placeholder="4242 4242 4242 4242" maxLength={19} /></div>
                <div className="two">
                  <div className="field"><label htmlFor="c-exp">Expiry</label><input id="c-exp" required autoComplete="cc-exp" placeholder="MM / YY" maxLength={7} /></div>
                  <div className="field"><label htmlFor="c-cvc">CVC</label><input id="c-cvc" required inputMode="numeric" autoComplete="cc-csc" placeholder="123" maxLength={4} /></div>
                </div>
              </>
            ) : (
              <>
                <fieldset className="providers">
                  <legend className="sr-only">Choose provider</legend>
                  {PROVIDERS.map(({ id, label, Mark }) => (
                    <label key={id} className={`provider ${provider === id ? "on" : ""}`}>
                      <input type="radio" name="provider" value={id} checked={provider === id} onChange={() => setProvider(id)} className="sr-only" />
                      <Mark height={26} />
                      <span>{label}</span>
                    </label>
                  ))}
                </fieldset>
                <div className="field">
                  <label htmlFor="m-phone">{p.label} number</label>
                  <div className="prefix-input"><span>{p.prefix}</span><input id="m-phone" required type="tel" inputMode="tel" placeholder="712 345 678" /></div>
                  <span className="hint">You will get a prompt on your phone to enter your PIN.</span>
                </div>
              </>
            )}

            <button className="btn btn-block" disabled={stage === "processing"}>
              {stage === "processing" ? <span className="spinner" aria-label="Processing" /> : <><LockIcon size={16} /> Pay {amount}</>}
            </button>
            <p className="demo-note">Showcase only. Payment APIs are not connected yet.</p>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
