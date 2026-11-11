import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { byType, bySlug } from "@/lib/catalog";
import { BuyBox } from "@/components/BuyBox";
import { BookCover } from "@/components/BookCover";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return byType("ebook").map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug);
  return p ? { title: p.name, description: p.short } : {};
}

export default async function EbookPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug);
  if (!p || p.type !== "ebook") notFound();
  return (
    <div className="wrap">
      <p className="crumbs" style={{ paddingTop: 16 }}><Link href="/academy">Academy</Link> / <Link href="/academy/ebooks">Ebooks</Link> / {p.name}</p>
      <div className="pdp">
        <div className="band-warm" style={{ display: "grid", placeItems: "center", padding: "40px 22%" }}><BookCover p={p} /></div>
        <div className="pdp-info">
          <BuyBox p={p} />
          <details className="acc" open><summary>About this book</summary><div><p>{p.short}</p><p>{p.description}</p></div></details>
          <details className="acc"><summary>How you get it</summary><div><p>Once payment is confirmed, the PDF appears in My library. Download links are private to you and expire after a short time; you can make a new one any time.</p></div></details>
        </div>
      </div>
      <section className="section">
        <h2 className="display h2" style={{ marginBottom: 20 }}>More ebooks</h2>
        <div className="grid">{byType("ebook").filter((x) => x.slug !== p.slug).map((m) => <ProductCard key={m.slug} p={m} />)}</div>
      </section>
    </div>
  );
}
