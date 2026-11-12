"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { searchAll } from "@/lib/search";
import { useCart } from "./CartProvider";
import { BagIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from "./Icons";
import { useAuth } from "./AuthProvider";

export const NAV = [
  { href: "/shop", label: "Boutique" },
  { href: "/coaching", label: "Coaching" },
  { href: "/ebooks", label: "Ebooks" },
  { href: "/travel", label: "Voyage" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { count, setOpen, ready } = useCart();
  const { user } = useAuth();
  const path = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [bump, setBump] = useState(false);
  const [query, setQuery] = useState("");
  const hits = useMemo(() => searchAll(query), [query]);

  useEffect(() => { setMenu(false); setSearch(false); setQuery(""); }, [path]);
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
            <button className="icon-btn" onClick={() => setSearch((s) => !s)} aria-label="Rechercher des produits"><SearchIcon /></button>
            <Link href={user ? "/compte" : "/connexion"} className="icon-btn" aria-label={user ? "Mon compte" : "Se connecter"}>{user?.avatar ? <img src={user.avatar} alt="" className="avatar" referrerPolicy="no-referrer" /> : <UserIcon />}</Link>
            <button className={`icon-btn bag-btn ${bump ? "bump" : ""}`} onClick={() => setOpen(true)} aria-label={`Panier, ${count} articles`}>
              <BagIcon />
              {ready && count > 0 && <span className="badge">{count}</span>}
            </button>
          </div>
        </div>
        {search && (
          <div className="search-wrap">
            <form className="search-bar" role="search" onSubmit={(e) => {
              e.preventDefault();
              const first = hits[0];
              router.push(first ? first.href : `/shop?q=${encodeURIComponent(query)}`);
              setSearch(false);
            }}>
              <SearchIcon size={18} />
              <input name="q" autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher sur le site : robes, cours, ebooks, voyage…" aria-label="Rechercher sur le site" autoComplete="off" enterKeyHint="search" />
              <button type="button" className="icon-btn" onClick={() => setSearch(false)} aria-label="Fermer la recherche"><CloseIcon size={18} /></button>
            </form>
            {query.trim() && (
              <ul className="search-results">
                {hits.length ? hits.map((h) => (
                  <li key={h.href + h.title}>
                    <Link href={h.href} onClick={() => setSearch(false)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {h.img ? <img src={h.img} alt="" /> : <span className="sr-ico"><SearchIcon size={16} /></span>}
                      <span><strong>{h.title}</strong><small>{h.kind}{h.text ? ` · ${h.text}` : ""}</small></span>
                    </Link>
                  </li>
                )) : <li className="sr-empty">Aucun résultat pour « {query} ». Essayez « robe », « ebook », « étudiant »…</li>}
              </ul>
            )}
          </div>
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
          <Link href={user ? "/compte" : "/connexion"}>{user ? "Mon compte" : "Connexion / Inscription"}</Link>
          <Link href="/cart">Panier ({ready ? count : 0})</Link>
        </nav>
      </aside>
    </>
  );
}
