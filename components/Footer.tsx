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
            <p className="footer-tag">Style, skills and a softer landing in Kenya. One house, four ways to grow.</p>
            <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="nl" className="sr-only">Email</label>
              <input id="nl" type="email" placeholder="Your email for new drops" />
              <button className="btn btn-gold">Join</button>
            </form>
          </div>
          <div className="footer-cols">
            <div>
              <h2 className="footer-h">Shop</h2>
              <Link href="/shop?c=Dresses">Dresses</Link>
              <Link href="/shop?c=Slippers">Slippers</Link>
              <Link href="/cart">Your bag</Link>
              <Link href="/delivery">Delivery</Link>
              <Link href="/refunds">Returns</Link>
            </div>
            <div>
              <h2 className="footer-h">Learn</h2>
              <Link href="/coaching">Coaching videos</Link>
              <Link href="/ebooks">Ebooks</Link>
              <Link href="/coaching#bundle">All-access bundle</Link>
            </div>
            <div>
              <h2 className="footer-h">Travel</h2>
              <Link href="/travel#students">Students</Link>
              <Link href="/travel#settle">Settling in Kenya</Link>
              <Link href="/travel#holidays">Holidays</Link>
              <Link href="/travel#enquire">Enquire</Link>
            </div>
            <div>
              <h2 className="footer-h">House</h2>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Doxa Empire · Nairobi, Kenya</p>
          <div className="footer-pay"><CardMarks height={18} /><MobileMarks height={18} /></div>
        </div>
      </div>
    </footer>
  );
}
