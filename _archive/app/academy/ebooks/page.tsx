import type { Metadata } from "next";
import Link from "next/link";
import { byType } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = { title: "Ebooks" };

export default function Ebooks() {
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="crumbs"><Link href="/">Home</Link> / <Link href="/academy">Academy</Link> / Ebooks</p>
        <h1 className="display h1">The ebook shelf</h1>
        <p className="lede">Practical PDFs you can read on your phone. Pay once, download from your library.</p>
      </div>
      <div className="grid" style={{ paddingBottom: 56 }}>{byType("ebook").map((p) => <ProductCard key={p.slug} p={p} />)}</div>
    </div>
  );
}
