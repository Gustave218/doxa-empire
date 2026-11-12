"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/Icons";

const TYPES = ["Étudiant", "Installation", "Vacances"] as const;
const SERVICES = ["Accueil à l'aéroport", "Logement", "SIM et M-Pesa", "Compte bancaire", "Inscription scolaire", "Aide visa et permis", "Safari ou séjour plage", "Découverte de la ville", "Autre chose"];

export function EnquiryForm() {
  const [type, setType] = useState<(typeof TYPES)[number]>("Étudiant");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const services = fd.getAll("services") as string[];
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Veuillez indiquer votre nom.";
    if (!data.nationality?.trim()) errs.nationality = "Veuillez indiquer votre nationalité.";
    if (!/^\+?[0-9 ]{8,16}$/.test(data.whatsapp || "")) errs.whatsapp = "Ajoutez l'indicatif du pays, par exemple +243 812 345 678.";
    if (!/^\S+@\S+\.\S+$/.test(data.email || "")) errs.email = "Indiquez une adresse email valide.";
    if (!services.length) errs.services = "Choisissez au moins une option.";
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
        <h3 className="serif h3">Karibu ! Nous avons bien reçu votre demande.</h3>
        <p className="muted">Un hôte Doxa vous écrira sur WhatsApp sous 24 heures.</p>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <span className="error" id={`e-${k}`}>{errors[k]}</span>;
  const inv = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="seg" role="radiogroup" aria-label="Je suis">
        {TYPES.map((t) => (
          <button type="button" key={t} role="radio" aria-checked={type === t} className={type === t ? "on" : ""} onClick={() => setType(t)}>{t}</button>
        ))}
      </div>
      <div className="two">
        <div className="field"><label htmlFor="f-name">Nom complet</label><input id="f-name" name="name" autoComplete="name" {...inv("name")} />{err("name")}</div>
        <div className="field"><label htmlFor="f-nationality">Nationalité</label><input id="f-nationality" name="nationality" {...inv("nationality")} />{err("nationality")}</div>
        <div className="field"><label htmlFor="f-whatsapp">WhatsApp</label><input id="f-whatsapp" name="whatsapp" type="tel" autoComplete="tel" placeholder="+243 …" {...inv("whatsapp")} />{err("whatsapp")}</div>
        <div className="field"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" {...inv("email")} />{err("email")}</div>
        {type === "Étudiant" && <div className="field"><label htmlFor="f-school">École et programme</label><input id="f-school" name="school" placeholder="par exemple USIU Africa, BBA" /></div>}
        <div className="field"><label htmlFor="f-arrival">Date d’arrivée</label><input id="f-arrival" name="arrival" type="date" /></div>
      </div>
      <fieldset className="field checks" id="f-services" tabIndex={-1} {...inv("services")}>
        <legend>Comment pouvons nous aider ?</legend>
        <div className="check-grid">
          {SERVICES.map((s) => <label key={s} className="check"><input type="checkbox" name="services" value={s} /> <span>{s}</span></label>)}
        </div>
        {err("services")}
      </fieldset>
      <div className="field"><label htmlFor="f-message">Dites nous en plus (facultatif)</label><textarea id="f-message" name="message" rows={3} /></div>
      <div className="hp" aria-hidden="true"><label>Laisser vide<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="hint">Merci de ne pas envoyer de passeport ni de pièce d’identité via ce formulaire.</p>
      {state === "failed" && <p className="error" role="alert">L’envoi a échoué. Réessayez ou écrivez nous sur WhatsApp.</p>}
      <button className="btn btn-gold btn-block" disabled={state === "sending"}>{state === "sending" ? "Envoi…" : "Envoyer la demande"}</button>
    </form>
  );
}
