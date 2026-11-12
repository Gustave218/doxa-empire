"use client";

import Link from "next/link";
import { CardMarks, MobileMarks } from "./Icons";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="logo-word light">Doxa<em>Empire</em></p>
            <p className="footer-tag">Mode, formation et une arrivée en douceur au Kenya. Une maison, quatre façons de grandir.</p>
            <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="nl" className="sr-only">Email</label>
              <input id="nl" type="email" placeholder="Votre email pour les nouveautés" />
              <button className="btn btn-gold">S’inscrire</button>
            </form>
          </div>
          <div className="footer-cols">
            <div>
              <h2 className="footer-h">Boutique</h2>
              <Link href="/shop">Boutique</Link>
              <Link href="/cart">Votre panier</Link>
              <Link href="/delivery">Livraison</Link>
              <Link href="/refunds">Retours</Link>
            </div>
            <div>
              <h2 className="footer-h">Apprendre</h2>
              <Link href="/coaching">Vidéos de coaching</Link>
              <Link href="/ebooks">Ebooks</Link>
              <Link href="/coaching#bundle">Pack accès complet</Link>
            </div>
            <div>
              <h2 className="footer-h">Voyage</h2>
              <Link href="/travel#students">Étudiants</Link>
              <Link href="/travel#settle">S’installer au Kenya</Link>
              <Link href="/travel#holidays">Vacances</Link>
              <Link href="/travel#enquire">Nous écrire</Link>
            </div>
            <div>
              <h2 className="footer-h">La maison</h2>
              <Link href="/about">À propos</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/terms">Conditions</Link>
              <Link href="/privacy">Confidentialité</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Doxa Empire · Nairobi, Kenya</p>
          <div className="footer-pay"><CardMarks height={18} /><MobileMarks height={18} /></div>
        </div>
        <p className="powered-line"><a href="https://web.guzones.com" target="_blank" rel="noopener" className="powered">Powered by Guzones</a></p>
      </div>
    </footer>
  );
}
