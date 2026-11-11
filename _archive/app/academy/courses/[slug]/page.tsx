import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { byType, bySlug } from "@/lib/catalog";
import { BuyBox } from "@/components/BuyBox";

export function generateStaticParams() {
  return byType("course").map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug);
  return p ? { title: p.name, description: p.short } : {};
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug);
  if (!p || p.type !== "course") notFound();
  const total = p.lessons!.reduce((n, l) => n + l.minutes, 0);
  return (
    <>
      <section className="section band-ink" style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <p className="crumbs" style={{ color: "#ccc" }}><Link href="/academy" style={{ color: "#ccc" }}>Academy</Link> / <Link href="/academy/courses" style={{ color: "#ccc" }}>Courses</Link></p>
          <h1 className="display h1">{p.name}</h1>
          <p className="lede">{p.short}</p>
          <p className="small" style={{ color: "#ccc" }}>{p.lessons!.length} lessons · {total} minutes</p>
        </div>
      </section>
      <div className="wrap pdp">
        <div>
          <div className="photo-needed" role="img" aria-label="Video trailer needed" style={{ aspectRatio: "16 / 9" }}>VIDEO NEEDED: 60-second course trailer, founder speaking to camera</div>
          <h2 className="display h3" style={{ margin: "32px 0 12px" }}>What is inside</h2>
          <ol className="lessons">
            {p.lessons!.map((l) => <li key={l.title}><span>{l.title}</span><span className="muted">{l.minutes} min</span></li>)}
          </ol>
          <p className="muted small">{p.description}</p>
        </div>
        <div className="pdp-info panel"><BuyBox p={p} showTitle={false} /></div>
      </div>
    </>
  );
}
