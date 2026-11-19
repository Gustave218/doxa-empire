"use client";

import Link from "next/link";
import { CardMarks, MobileMarks } from "./Icons";

function TikTokIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.7 2c.3 2.5 1.7 4.1 4.3 4.3v3.2a9.2 9.2 0 0 1-4.3-1.2v7.1a6.7 6.7 0 1 1-5.8-6.6v3.4a3.4 3.4 0 1 0 2.4 3.2V2h3.4Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.7 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.6V13h2.7v8h3.4Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="27" height="24" viewBox="0 0 27 24" fill="currentColor" aria-hidden="true">
      <path d="M26.1 5.1a3.2 3.2 0 0 0-2.2-2.3C21.7 2.3 13.5 2.3 13.5 2.3s-8.2 0-10.4.5A3.2 3.2 0 0 0 .9 5.1 33 33 0 0 0 .5 12a33 33 0 0 0 .4 6.9 3.2 3.2 0 0 0 2.2 2.3c2.2.5 10.4.5 10.4.5s8.2 0 10.4-.5a3.2 3.2 0 0 0 2.2-2.3 33 33 0 0 0 .4-6.9 33 33 0 0 0-.4-6.9ZM10.9 16.2V7.8l7 4.2-7 4.2Z" />
    </svg>
  );
}

const socialLinks = [
  { name: "TikTok", href: "https://www.tiktok.com/@doxabusiness?_r=1&_t=ZS-9BL4XT7Lmzc", Icon: TikTokIcon, color: "#111111" },
  { name: "Facebook", href: "https://www.facebook.com/share/1Cb2EvCEi2/", Icon: FacebookIcon, color: "#1877F2" },
  { name: "YouTube", href: "https://youtube.com/@doxaempire-venteengros8149?si=76JBeekFrhKkouue", Icon: YouTubeIcon, color: "#FF0000" },
];

export function Footer() {
  return (
    <>
      <section className="social-section" aria-labelledby="social-heading">
        <div className="wrap social-inner">
          <div>
            <p className="eyebrow">Restons connectés</p>
            <h2 id="social-heading" className="serif h3">Suivez Doxa Empire</h2>
          </div>
          <nav className="social-links" aria-label="Réseaux sociaux">
            {socialLinks.map(({ name, href, Icon, color }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={`Suivre Doxa Empire sur ${name}`}
              >
                <span className="social-icon" style={{ "--social-color": color } as React.CSSProperties}>
                  <Icon />
                </span>
                <span>{name}</span>
                <span className="social-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

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
    </>
  );
}
