import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ebooks, bySlug } from "@/lib/catalog";
import { EbookCover } from "@/components/Learn";
import { EbookBuy } from "./EbookBuy";

export function generateStaticParams() {
  return ebooks.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug);
  return p ? { title: p.name, description: p.short, openGraph: { images: p.thumb ? [p.thumb] : [] } } : {};
}

export default async function EbookPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug);
  if (!p || p.type !== "ebook") notFound();
  const more = ebooks.filter((e) => e.slug !== p.slug).slice(0, 3);

  return (
    <>
      <nav className="wrap crumbs" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link><span>/</span><Link href="/ebooks">Ebooks</Link><span>/</span><span aria-current="page">{p.name}</span>
      </nav>

      <section className="wrap ebook-detail">
        <div className="ebook-detail-visual">
          <EbookCover p={p} size="lg" />
          {p.badge && <span className="tag">{p.badge}</span>}
        </div>

        <div className="ebook-detail-info">
          <p className="eyebrow">Ebook · Guide pratique</p>
          <h1 className="serif pdp-title">{p.name}</h1>
          <p className="muted">Par Gloria, fondatrice de Doxa Empire</p>
          <p className="pdp-short">{p.short} {p.description}</p>

          <ul className="ebook-facts">
            <li><strong>{p.pages}</strong><span>pages</span></li>
            <li><strong>PDF + ePub</strong><span>format</span></li>
            <li><strong>Immédiat</strong><span>téléchargement</span></li>
          </ul>

          <EbookBuy slug={p.slug} />

          {p.chapters && (
            <details className="acc" open>
              <summary>Ce que vous allez apprendre</summary>
              <ol className="chapters">
                {p.chapters.map((c, i) => <li key={c}><span className="ch-n">{String(i + 1).padStart(2, "0")}</span>{c}</li>)}
              </ol>
            </details>
          )}
          <details className="acc">
            <summary>Comment ça marche</summary>
            <p>Payez par carte ou mobile money. Votre ebook est disponible tout de suite en PDF et ePub, à lire sur téléphone, tablette ou ordinateur.</p>
          </details>
          <details className="acc">
            <summary>Remboursement</summary>
            <p>Les produits numériques sont livrés immédiatement et ne sont ni repris ni remboursés. <Link href="/refunds" className="link">En savoir plus</Link></p>
          </details>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2 className="serif h2">Autres ebooks</h2>
          <Link href="/ebooks" className="link-arrow">Tout voir</Link>
        </div>
        <div className="ebook-more">
          {more.map((e) => (
            <Link key={e.slug} href={`/ebooks/${e.slug}`} className="ebook-more-card">
              <EbookCover p={e} />
              <span className="serif">{e.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
