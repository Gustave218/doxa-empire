"use client";

import { useState } from "react";

const SERVICES = ["Airport pickup", "A place to stay", "SIM and M-Pesa setup", "Opening a bank account", "Getting around", "First-week support", "Something else"];

type Errors = Partial<Record<string, string>>;

export function EnquiryForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const services = fd.getAll("services") as string[];
    const errs: Errors = {};
    if (!data.name?.trim()) errs.name = "Please enter your name.";
    if (!data.nationality?.trim()) errs.nationality = "Please enter your nationality.";
    if (!/^\+?[0-9 ]{8,16}$/.test(data.whatsapp || "")) errs.whatsapp = "Enter your WhatsApp number with country code, for example +243 812 345 678.";
    if (!/^\S+@\S+\.\S+$/.test(data.email || "")) errs.email = "Enter a valid email address.";
    if (!data.school?.trim()) errs.school = "Tell us your school and programme.";
    if (!services.length) errs.services = "Choose at least one.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, services }) });
      setState(res.ok ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className="success" role="status">
        <h3 className="display h3">Thank you. We have your enquiry.</h3>
        <p>We will message you on WhatsApp soon. You do not need to send any documents now.</p>
      </div>
    );
  }

  const err = (k: string) => errors[k] ? <span className="error" id={`e-${k}`}>{errors[k]}</span> : null;
  const inv = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="two">
        <div className="field"><label htmlFor="f-name">Full name</label><input id="f-name" name="name" autoComplete="name" {...inv("name")} />{err("name")}</div>
        <div className="field"><label htmlFor="f-nationality">Nationality</label><input id="f-nationality" name="nationality" {...inv("nationality")} />{err("nationality")}</div>
        <div className="field"><label htmlFor="f-whatsapp">WhatsApp number</label><input id="f-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="+243 ..." {...inv("whatsapp")} />{err("whatsapp")}</div>
        <div className="field"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" {...inv("email")} />{err("email")}</div>
        <div className="field"><label htmlFor="f-school">School and programme</label><input id="f-school" name="school" placeholder="e.g. University of Nairobi, BCom" {...inv("school")} />{err("school")}</div>
        <div className="field"><label htmlFor="f-arrival">Expected arrival date</label><input id="f-arrival" name="arrival" type="date" /><span className="hint">Leave blank if you do not know yet.</span></div>
      </div>
      <fieldset className="field checks" id="f-services" tabIndex={-1} {...inv("services")}>
        <legend>What do you need help with?</legend>
        {SERVICES.map((s) => <label key={s}><input type="checkbox" name="services" value={s} /> {s}</label>)}
        {err("services")}
      </fieldset>
      <div className="field"><label htmlFor="f-message">Anything else we should know?</label><textarea id="f-message" name="message" /></div>
      {/* Spam trap: humans never see or fill this */}
      <div className="hp" aria-hidden="true"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="notice">Please do not send passports or other identity documents through this form.</p>
      {state === "failed" && <p className="error" role="alert">Sorry, that did not send. Please try again, or message us on WhatsApp.</p>}
      <button className="btn btn-pink" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"}</button>
    </form>
  );
}
