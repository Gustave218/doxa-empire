"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

export function AuthForm() {
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") || "/compte";
  const { configured, ready, user, signIn, signUp, google } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(params.get("mode") === "inscription" ? "signup" : "login");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (ready && user) router.replace(next); }, [ready, user, next, router]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setError(""); setInfo("");
    if (mode === "signup" && !d.name?.trim()) return setError("Indiquez votre nom.");
    if (!/^\S+@\S+\.\S+$/.test(d.email || "")) return setError("Indiquez un email valide.");
    if ((d.password || "").length < 6) return setError("Le mot de passe doit contenir au moins 6 caractères.");
    setBusy(true);
    const err = mode === "login" ? await signIn(d.email, d.password) : await signUp(d.name.trim(), d.email, d.password);
    setBusy(false);
    if (err === "CONFIRM") { setInfo("Compte créé ! Ouvrez l’email que nous venons d’envoyer pour confirmer, puis connectez vous."); setMode("login"); return; }
    if (err) setError(err);
  }

  const signup = mode === "signup";

  return (
    <div className="wrap section-sm auth">
      <div className="auth-card">
        <h1 className="serif h2">{signup ? "Créer un compte" : "Connexion"}</h1>
        <p className="muted">{next === "/checkout" ? "Connectez vous pour finaliser votre commande." : signup ? "Gardez vos commandes, cours et ebooks au même endroit." : "Heureux de vous revoir."}</p>

        {!configured && <p className="notice">Les comptes seront activés très bientôt.</p>}

        <button type="button" className="btn-google" onClick={() => google(next)} disabled={!configured}>
          <GoogleLogo /> Continuer avec Google
        </button>

        <p className="auth-or"><span>ou</span></p>

        <form onSubmit={onSubmit} noValidate className="auth-form">
          {signup && <div className="field"><label htmlFor="a-name">Nom complet</label><input id="a-name" name="name" autoComplete="name" /></div>}
          <div className="field"><label htmlFor="a-email">Email</label><input id="a-email" name="email" type="email" autoComplete="email" /></div>
          <div className="field"><label htmlFor="a-pass">Mot de passe</label><input id="a-pass" name="password" type="password" autoComplete={signup ? "new-password" : "current-password"} placeholder={signup ? "6 caractères minimum" : ""} /></div>
          {error && <p className="error" role="alert">{error}</p>}
          {info && <p className="success-note" role="status">{info}</p>}
          <button className="btn btn-block" disabled={busy || !configured}>{busy ? "Patientez…" : signup ? "Créer mon compte" : "Se connecter"}</button>
        </form>

        <p className="auth-switch">
          {signup ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
          <button type="button" className="link" onClick={() => { setMode(signup ? "login" : "signup"); setError(""); setInfo(""); }}>
            {signup ? "Se connecter" : "Créer un compte"}
          </button>
        </p>
        {next === "/checkout" && <p className="small muted center"><Link href="/cart" className="link">Retour au panier</Link></p>}
      </div>
    </div>
  );
}
