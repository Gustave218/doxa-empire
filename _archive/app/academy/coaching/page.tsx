import type { Metadata } from "next";
import Link from "next/link";
import { byType } from "@/lib/catalog";
import { BuyBox } from "@/components/BuyBox";

export const metadata: Metadata = { title: "Coaching" };

export default function Coaching() {
  return (
    <>
      <section className="section band-pink">
        <div className="wrap split">
          <div>
            <p className="crumbs" style={{ color: "#111" }}><Link href="/academy">Academy</Link> / Coaching</p>
            <h1 className="display h1">One-to-one coaching</h1>
          </div>
          <ol className="lede" style={{ paddingLeft: 20 }}>
            <li>Choose a session or package and pay.</li>
            <li>We confirm your payment.</li>
            <li>You get a link to pick your time.</li>
            <li>Meet on video call.</li>
          </ol>
        </div>
      </section>
      <div className="wrap section">
        <div className="two">
          {byType("coaching").map((p) => (
            <div key={p.slug} id={p.slug} className="panel">
              <p className="eyebrow">{p.duration}</p>
              <h2 className="display h2" style={{ marginBottom: 8 }}>{p.name}</h2>
              <p>{p.short}</p>
              <p className="muted small">{p.description}</p>
              <BuyBox p={p} showTitle={false} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
