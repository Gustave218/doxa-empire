"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/Icons";

const TYPES = ["Student", "Relocating / settling", "Holiday"] as const;
const SERVICES = ["Airport pickup", "Accommodation", "SIM & M-Pesa setup", "Bank account", "School admission", "Visa & permits guidance", "Safari or beach trip", "City orientation", "Something else"];

export function EnquiryForm() {
  const [type, setType] = useState<(typeof TYPES)[number]>("Student");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const services = fd.getAll("services") as string[];
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Please enter your name.";
    if (!data.nationality?.trim()) errs.nationality = "Please enter your nationality.";
    if (!/^\+?[0-9 ]{8,16}$/.test(data.whatsapp || "")) errs.whatsapp = "Include your country code, e.g. +243 812 345 678.";
    if (!/^\S+@\S+\.\S+$/.test(data.email || "")) errs.email = "Enter a valid email address.";
    if (!services.length) errs.services = "Choose at least one.";
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) { document.getElementById(`f-${first}`)?.focus(); return; }
    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, school: data.school || type, message: `[${type}] ${data.message || ""}`, services }),
      });
      setState(res.ok ? "sent" : "failed");
    } catch { setState("failed"); }
  }

  if (state === "sent") {
    return (
      <div className="success" role="status">
        <span className="done-tick"><CheckIcon size={28} /></span>
        <h3 className="serif h3">Karibu! We have your enquiry.</h3>
        <p className="muted">A Doxa travel host will message you on WhatsApp within 24 hours.</p>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <span className="error" id={`e-${k}`}>{errors[k]}</span>;
  const inv = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="seg" role="radiogroup" aria-label="I am">
        {TYPES.map((t) => (
          <button type="button" key={t} role="radio" aria-checked={type === t} className={type === t ? "on" : ""} onClick={() => setType(t)}>{t}</button>
        ))}
      </div>
      <div className="two">
        <div className="field"><label htmlFor="f-name">Full name</label><input id="f-name" name="name" autoComplete="name" {...inv("name")} />{err("name")}</div>
        <div className="field"><label htmlFor="f-nationality">Nationality</label><input id="f-nationality" name="nationality" {...inv("nationality")} />{err("nationality")}</div>
        <div className="field"><label htmlFor="f-whatsapp">WhatsApp</label><input id="f-whatsapp" name="whatsapp" type="tel" autoComplete="tel" placeholder="+243 …" {...inv("whatsapp")} />{err("whatsapp")}</div>
        <div className="field"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" {...inv("email")} />{err("email")}</div>
        {type === "Student" && <div className="field"><label htmlFor="f-school">School and programme</label><input id="f-school" name="school" placeholder="e.g. USIU-Africa, BBA" /></div>}
        <div className="field"><label htmlFor="f-arrival">Arrival date</label><input id="f-arrival" name="arrival" type="date" /></div>
      </div>
      <fieldset className="field checks" id="f-services" tabIndex={-1} {...inv("services")}>
        <legend>How can we help?</legend>
        <div className="check-grid">
          {SERVICES.map((s) => <label key={s} className="check"><input type="checkbox" name="services" value={s} /> <span>{s}</span></label>)}
        </div>
        {err("services")}
      </fieldset>
      <div className="field"><label htmlFor="f-message">Tell us more (optional)</label><textarea id="f-message" name="message" rows={3} /></div>
      <div className="hp" aria-hidden="true"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="hint">Please do not send passports or ID documents through this form.</p>
      {state === "failed" && <p className="error" role="alert">That did not send. Please try again or message us on WhatsApp.</p>}
      <button className="btn btn-gold btn-block" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"}</button>
    </form>
  );
}
