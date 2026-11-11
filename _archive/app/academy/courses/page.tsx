import type { Metadata } from "next";
import Link from "next/link";
import { byType } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = { title: "Video courses" };

export default function Courses() {
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="crumbs"><Link href="/">Home</Link> / <Link href="/academy">Academy</Link> / Courses</p>
        <h1 className="display h1">Video courses</h1>
        <p className="lede">Buy once, keep forever. Lessons play in your private library on any phone or laptop.</p>
      </div>
      <div className="grid grid-3" style={{ paddingBottom: 56 }}>{byType("course").map((p) => <ProductCard key={p.slug} p={p} />)}</div>
    </div>
  );
}
