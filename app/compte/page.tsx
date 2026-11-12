"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function ComptePage() {
  const { ready, user, configured, signOut, update } = useAuth();
  const router = useRouter();
  const [msg, setMsg] = useState("");

  useEffect(() => { if (ready && !user) router.replace("/connexion?next=/compte"); }, [ready, user, router]);
  if (!ready || !user) return <div className="wrap section-sm" />;

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const err = await update({ name: d.name, phone: d.phone });
    setMsg(err ?? "Informations enregistrées.");
  }

  return (
    <div className="wrap section-sm auth">
      <div className="auth-card">
        <h1 className="serif h2">Bonjour {user.name.split(" ")[0]}</h1>
        <p className="muted">{user.email}</p>
        <form onSubmit={onSave} className="auth-form">
          <div className="field"><label htmlFor="c-name">Nom complet</label><input id="c-name" name="name" defaultValue={user.name} autoComplete="name" /></div>
          <div className="field"><label htmlFor="c-phone">Téléphone / WhatsApp</label><input id="c-phone" name="phone" type="tel" defaultValue={user.phone} autoComplete="tel" placeholder="+254 7…" /></div>
          {msg && <p className="success-note" role="status">{msg}</p>}
          <button className="btn btn-block" disabled={!configured}>Enregistrer</button>
        </form>
        <div className="row-between auth-links">
          <Link href="/commandes" className="link">Mes commandes / abonnements</Link>
          <button className="link" onClick={() => { signOut(); router.push("/"); }}>Se déconnecter</button>
        </div>
      </div>
    </div>
  );
}
