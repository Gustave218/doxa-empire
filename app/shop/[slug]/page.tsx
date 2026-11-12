import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { shopProducts, bySlug } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetail } from "./ProductDetail";

export function generateStaticParams() {
  return shopProducts.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug);
  return p ? { title: p.name, description: p.short } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug);
  if (!p || p.type !== "physical") notFound();
  const more = shopProducts.filter((x) => x.slug !== p.slug && x.category === p.category).concat(shopProducts.filter((x) => x.category !== p.category)).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.short, image: p.images,
    offers: { "@type": "Offer", priceCurrency: "KES", price: p.price.KES },
  };

  return (
    <>
      <nav className="wrap crumbs" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span><Link href="/shop">Boutique</Link><span>/</span>
        <Link href={`/shop?c=${p.category}`}>{p.category}</Link><span>/</span><span aria-current="page">{p.name}</span>
      </nav>
      <ProductDetail slug={p.slug} />
      <section className="wrap section">
        <div className="section-head">
          <h2 className="serif h2">Vous aimerez aussi</h2>
          <Link href="/shop" className="link-arrow">Tout voir</Link>
        </div>
        <div className="grid-products">{more.map((m) => <ProductCard key={m.slug} p={m} />)}</div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
