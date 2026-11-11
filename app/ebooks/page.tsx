import type { Metadata } from "next";
import { ebooks } from "@/lib/catalog";
import { EbookCard, EbookCover } from "@/components/Learn";

export const metadata: Metadata = {
  title: "Ebooks",
  description: "Short, practical ebooks on starting, pricing, marketing and sourcing for your business.",
};

export default function EbooksPage() {
  const [a, b, c] = ebooks;
  return (
    <>
      <section className="ebook-hero">
        <div className="wrap ebook-hero-grid">
          <div>
            <p className="eyebrow">Doxa Academy · Library</p>
            <h1 className="serif display-xl">Read it tonight.<br /><em>Use it tomorrow.</em></h1>
            <p className="lede">Six short, no-fluff guides. Download instantly as PDF and ePub after you pay with card or mobile money.</p>
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
