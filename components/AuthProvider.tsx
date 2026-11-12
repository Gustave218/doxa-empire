"use client";

// Accounts via Supabase Auth (REST, no SDK). Set these on the host (e.g. Vercel):
//   NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
// Until they are set, `configured` is false and checkout is not gated.

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const STORE = "doxa-session";

export type User = { id: string; email: string; name: string; phone?: string; avatar?: string };
type Session = { access_token: string; refresh_token: string; expires_at: number };

type Ctx = {
  configured: boolean;
  ready: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (name: string, email: string, password: string) => Promise<string | null>;
  google: (next?: string) => void;
  signOut: () => void;
  update: (data: { name?: string; phone?: string }) => Promise<string | null>;
};

const AuthCtx = createContext<Ctx | null>(null);
export const useAuth = () => useContext(AuthCtx)!;

const headers = (token?: string) => ({ apikey: KEY, "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toUser = (u: any): User => ({
  id: u.id, email: u.email,
  name: u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split("@")[0] || "",
  phone: u.user_metadata?.phone, avatar: u.user_metadata?.avatar_url,
});

const fr = (msg: string) => {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return "Email ou mot de passe incorrect.";
  if (m.includes("already registered") || m.includes("already exists")) return "Un compte existe déjà avec cet email. Connectez vous.";
  if (m.includes("password")) return "Le mot de passe doit contenir au moins 6 caractères.";
  if (m.includes("email not confirmed")) return "Confirmez d’abord votre email (vérifiez votre boîte de réception).";
  if (m.includes("email")) return "Adresse email invalide.";
  return "Une erreur est survenue. Réessayez.";
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const configured = !!(URL_ && KEY);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  const save = useCallback(async (s: Session | null) => {
    setSession(s);
    if (!s) { setUser(null); try { localStorage.removeItem(STORE); } catch {} return; }
    try { localStorage.setItem(STORE, JSON.stringify(s)); } catch {}
    const r = await fetch(`${URL_}/auth/v1/user`, { headers: headers(s.access_token) });
    if (r.ok) setUser(toUser(await r.json())); else { setUser(null); try { localStorage.removeItem(STORE); } catch {} }
  }, []);

  const fromToken = (j: { access_token: string; refresh_token: string; expires_in: number }): Session =>
    ({ access_token: j.access_token, refresh_token: j.refresh_token, expires_at: Date.now() / 1000 + Number(j.expires_in || 3600) });

  useEffect(() => {
    if (!configured) { setReady(true); return; }
    (async () => {
      // Returning from Google: tokens arrive in the URL hash.
      const h = new URLSearchParams(window.location.hash.slice(1));
      if (h.get("access_token")) {
        await save(fromToken({ access_token: h.get("access_token")!, refresh_token: h.get("refresh_token") ?? "", expires_in: Number(h.get("expires_in") ?? 3600) }));
        history.replaceState(null, "", window.location.pathname + window.location.search);
        setReady(true); return;
      }
      let s: Session | null = null;
      try { s = JSON.parse(localStorage.getItem(STORE) || "null"); } catch {}
      if (s && s.expires_at < Date.now() / 1000 + 60) {
        const r = await fetch(`${URL_}/auth/v1/token?grant_type=refresh_token`, { method: "POST", headers: headers(), body: JSON.stringify({ refresh_token: s.refresh_token }) });
        s = r.ok ? fromToken(await r.json()) : null;
      }
      await save(s);
      setReady(true);
    })();
  }, [configured, save]);

  const signIn: Ctx["signIn"] = async (email, password) => {
    const r = await fetch(`${URL_}/auth/v1/token?grant_type=password`, { method: "POST", headers: headers(), body: JSON.stringify({ email, password }) });
    const j = await r.json();
    if (!r.ok) return fr(j.error_description || j.msg || j.message || "");
    await save(fromToken(j)); return null;
  };

  const signUp: Ctx["signUp"] = async (name, email, password) => {
    const r = await fetch(`${URL_}/auth/v1/signup`, { method: "POST", headers: headers(), body: JSON.stringify({ email, password, data: { full_name: name } }) });
    const j = await r.json();
    if (!r.ok) return fr(j.error_description || j.msg || j.message || "");
    if (!j.access_token) return "CONFIRM"; // email confirmation is on in Supabase
    await save(fromToken(j)); return null;
  };

  const google: Ctx["google"] = (next = "/") => {
    const back = `${window.location.origin}/connexion?next=${encodeURIComponent(next)}`;
    window.location.href = `${URL_}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(back)}`;
  };

  const signOut = () => {
    if (session) fetch(`${URL_}/auth/v1/logout`, { method: "POST", headers: headers(session.access_token) }).catch(() => {});
    save(null);
  };

  const update: Ctx["update"] = async (data) => {
    if (!session) return "Non connecté.";
    const r = await fetch(`${URL_}/auth/v1/user`, { method: "PUT", headers: headers(session.access_token), body: JSON.stringify({ data: { ...(data.name ? { full_name: data.name } : {}), ...(data.phone ? { phone: data.phone } : {}) } }) });
    if (!r.ok) return "Impossible d’enregistrer.";
    setUser(toUser(await r.json())); return null;
  };

  return <AuthCtx.Provider value={{ configured, ready, user, signIn, signUp, google, signOut, update }}>{children}</AuthCtx.Provider>;
}
