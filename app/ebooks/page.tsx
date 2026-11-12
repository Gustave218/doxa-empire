import type { Metadata } from "next";
import { ebooks } from "@/lib/catalog";
import { EbookCard, EbookCover } from "@/components/Learn";

export const metadata: Metadata = {
  title: "Ebooks",
  description: "Des ebooks courts et pratiques pour lancer, tarifer, promouvoir et approvisionner votre entreprise.",
};

export default function EbooksPage() {
  const [a, b, c] = ebooks;
  return (
    <>
      <section className="ebook-hero">
        <div className="wrap ebook-hero-grid">
          <div>
            <p className="eyebrow">Doxa Académie · Bibliothèque</p>
            <h1 className="serif display-xl">Lisez le ce soir.<br /><em>Appliquez le demain.</em></h1>
            <p className="lede">Six guides courts et sans blabla. Téléchargement immédiat en PDF et ePub après paiement par carte ou mobile money.</p>
          </div>
          <div className="cover-stack" aria-hidden>
            <div className="s1"><EbookCover p={b} size="lg" /></div>
            <div className="s2"><EbookCover p={c} size="lg" /></div>
            <div className="s3"><EbookCover p={a} size="lg" /></div>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <div className="ebook-grid">
          {ebooks.map((e) => <EbookCard key={e.slug} p={e} />)}
        </div>
      </section>
    </>
  );
}
