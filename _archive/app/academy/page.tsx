import type { Metadata } from "next";
import Link from "next/link";
import { byType } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = { title: "Academy", description: "Video courses, ebooks and coaching to start a business from A to Z." };

export default function Academy() {
  return (
    <>
      <section className="section band-pink">
        <div className="wrap split">
          <div>
            <p className="crumbs" style={{ color: "#111" }}><Link href="/">Home</Link> / Academy</p>
            <h1 className="display h1">Build a business from A to Z</h1>
          </div>
          <div>
            <p className="lede">Three ways to learn. Pick the one that fits your time and budget.</p>
          </div>
        </div>
      </section>

      <nav className="doors" aria-label="Ways to learn">
        <Link href="/academy/courses" className="door door-ink" style={{ minHeight: 240 }}>
          <div className="door-body"><h2 className="display">Video courses</h2><p>Recorded lessons. Watch at your own pace.</p><span className="door-cta">See courses</span></div>
        </Link>
        <Link href="/academy/ebooks" className="door" style={{ minHeight: 240, background: "#f4efe8", color: "#111" }}>
          <div className="door-body"><h2 className="display">Ebooks</h2><p>Short practical guides. Read on your phone.</p><span className="door-cta">See ebooks</span></div>
        </Link>
        <Link href="/academy/coaching" className="door door-pink" style={{ minHeight: 240 }}>
          <div className="door-body"><h2 className="display">Coaching</h2><p>One-to-one time on your business.</p><span className="door-cta">Book coaching</span></div>
        </Link>
      </nav>

      <section className="section"><div className="wrap">
        <div className="section-head"><h2 className="display h2">Courses</h2><Link href="/academy/courses">View all</Link></div>
        <div className="grid grid-3">{byType("course").map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </div></section>

      <section className="section band-warm"><div className="wrap">
        <div className="section-head"><h2 className="display h2">Ebooks</h2><Link href="/academy/ebooks">View all</Link></div>
        <div className="grid">{byType("ebook").map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </div></section>
    </>
  );
}
