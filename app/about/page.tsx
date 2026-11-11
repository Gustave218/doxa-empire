import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About", description: "The story and values behind Doxa Empire." };

const VALUES = [
  ["Made with care", "From the beadwork on a sandal to the first night in a new city, details are everything."],
  ["Practical first", "Our courses and ebooks teach what actually works in Kenyan markets, not theory."],
  ["Honest pricing", "Clear prices in KES and USD. No hidden fees at checkout or on arrival."],
  ["Local and proud", "We work with Kenyan artisans, hosts and partners we know by name."],
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="wrap narrow">
          <p className="eyebrow">About Doxa Empire</p>
          <h1 className="serif display-xl">Built in Nairobi for people <em>building something.</em></h1>
          <p className="lede">Doxa started with a suitcase of beaded slippers and a WhatsApp group. Today it is a boutique, an academy and a travel desk, all with the same promise: we treat every customer like family.</p>
        </div>
      </section>
      <section className="wrap section about-split">
        <div className="about-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/samples/look1.webp" alt="Handmade beaded slippers at a Nairobi market" />
        </div>
        <div>
          <h2 className="serif h2">Our story</h2>
          <p>Our founder came to Kenya as a student and learned the hard way: finding a room, opening a bank account, working out how to get paid. Selling handmade Maasai slippers online paid the rent, and friends kept asking how.</p>
          <p>So we started teaching. Then helping new students settle. Then curating dresses for the women who bought our slippers. Doxa Empire is everything we wished existed when we arrived.</p>
          <ul className="hero-stats dark">
            <li><strong>2,400+</strong><span>customers</span></li>
            <li><strong>600+</strong><span>arrivals hosted</span></li>
            <li><strong>14</strong><span>countries</span></li>
          </ul>
        </div>
      </section>
      <section className="tint section">
        <div className="wrap">
          <h2 className="serif h2 center">What we stand for</h2>
          <div className="values">
            {VALUES.map(([t, d], i) => (
              <div key={t} className="value"><span className="serif step-n">0{i + 1}</span><h3>{t}</h3><p className="muted">{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section center">
        <h2 className="serif h2">Come in. Look around.</h2>
        <div className="cta-row center">
          <Link href="/shop" className="btn">Visit the shop</Link>
          <Link href="/contact" className="btn btn-outline">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
