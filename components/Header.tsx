"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { BagIcon, CloseIcon, MenuIcon, SearchIcon } from "./Icons";

export const NAV = [
  { href: "/shop", label: "Boutique" },
  { href: "/coaching", label: "Coaching" },
  { href: "/ebooks", label: "Ebooks" },
  { href: "/travel", label: "Voyage" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { count, setOpen, currency, setCurrency, ready } = useCart();
  const path = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => { setMenu(false); setSearch(false); }, [path]);
  useEffect(() => {
    if (!count) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <>
      <header className="header">
        <div className="header-row">
          <button className="icon-btn nav-toggle" onClick={() => setMenu(true)} aria-label="Ouvrir le menu"><MenuIcon /></button>
          <Link href="/" className="logo" aria-label="Accueil Doxa Empire">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/doxa-logo-trimmed.png" alt="" />
            <span className="logo-word">Doxa<em>Empire</em></span>
          </Link>
          <nav className="nav" aria-label="Principal">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={path.startsWith(n.href) ? "on" : ""}>{n.label}</Link>
            ))}
          </nav>
          <div className="header-actions">
            <div className="currency" role="group" aria-label="Devise">
              {(["KES", "USD"] as const).map((c) => (
                <button key={c} className={currency === c ? "on" : ""} onClick={() => setCurrency(c)} aria-pressed={currency === c}>{c}</button>
              ))}
            </div>
            <button className="icon-btn" onClick={() => setSearch((s) => !s)} aria-label="Rechercher des produits"><SearchIcon /></button>
            <button className={`icon-btn bag-btn ${bump ? "bump" : ""}`} onClick={() => setOpen(true)} aria-label={`Panier, ${count} articles`}>
              <BagIcon />
              {ready && count > 0 && <span className="badge">{count}</span>}
            </button>
          </div>
        </div>
        {search && (
          <form className="search-bar" role="search" onSubmit={(e) => {
            e.preventDefault();
            const q = new FormData(e.currentTarget).get("q") as string;
            router.push(`/shop?q=${encodeURIComponent(q)}`);
          }}>
            <SearchIcon size={18} />
            <input name="q" autoFocus placeholder="Rechercher robes, sandales…" aria-label="Rechercher des produits" />
            <button type="button" className="icon-btn" onClick={() => setSearch(false)} aria-label="Fermer la recherche"><CloseIcon size={18} /></button>
          </form>
        )}
      </header>

      <div className={`sheet-scrim ${menu ? "show" : ""}`} onClick={() => setMenu(false)} />
      <aside className={`menu-sheet ${menu ? "show" : ""}`} aria-hidden={!menu}>
        <div className="row-between">
          <span className="logo-word">Doxa<em>Empire</em></span>
          <button className="icon-btn" onClick={() => setMenu(false)} aria-label="Fermer le menu"><CloseIcon /></button>
        </div>
        <nav className="menu-links" aria-label="Mobile">
          <Link href="/">Accueil</Link>
          {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <Link href="/cart">Panier ({ready ? count : 0})</Link>
        </nav>
      </aside>
    </>
  );
}
