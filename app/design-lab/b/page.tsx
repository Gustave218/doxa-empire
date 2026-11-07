import { Archivo } from "next/font/google";
import Link from "next/link";
import { Photo, Logo } from "../_shared/Photo";
import s from "./b.module.css";

// One family, pushed to its extremes: condensed for signage, normal width for reading.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--b-font", display: "swap" });

export const metadata = { title: "Direction B: Signboard · Design lab" };

const products = [
  { name: "Slipper, style name [NEEDS CLIENT]", colours: 3, state: "in" },
  { name: "Slipper, style name [NEEDS CLIENT]", colours: 2, state: "low" },
  { name: "Slipper, style name [NEEDS CLIENT]", colours: 4, state: "in" },
  { name: "Slipper, style name [NEEDS CLIENT]", colours: 1, state: "out" },
];

export default function DirectionB() {
  return (
    <div className={`${archivo.variable} ${s.page}`}>
      <header className={s.top}>
        <Link href="/design-lab" className={s.back}>← Lab</Link>
        <Logo height={36} />
        <a href="#shop" className={s.cart}>Cart (0)</a>
      </header>

      {/* HERO: a pink signboard with the founder breaking out of it */}
      <section className={s.hero}>
        <div className={s.board}>
          <h1 className={s.mega}>
            <span>Doxa</span>
            <span>Empire</span>
          </h1>
          <p className={s.strap}>Business lessons, help for students coming to Kenya, and Maasai slippers. One founder, three doors.</p>
        </div>
        <Photo className={s.heroPhoto} shot="founder, waist up, natural light, looking at camera, against a plain wall" ratio="4 / 5" />
      </section>

      {/* DOORS: three full-width bands, one colour each */}
      <nav aria-label="Three doors" className={s.doors}>
        <a href="#shop" className={`${s.band} ${s.bandBlack}`}>
          <span className={s.bandWord}>Academy</span>
          <span className={s.bandSub}>Coaching · courses · ebooks</span>
          <span className={s.arrow} aria-hidden>→</span>
        </a>
        <a href="#shop" className={`${s.band} ${s.bandWhite}`}>
          <span className={s.bandWord}>Study in Kenya</span>
          <span className={s.bandSub}>From your offer letter to your first week</span>
          <span className={s.arrow} aria-hidden>→</span>
        </a>
        <a href="#shop" className={`${s.band} ${s.bandPink}`}>
          <span className={s.bandWord}>Shop</span>
          <span className={s.arrow} aria-hidden>→</span>
        </a>
      </nav>

      {/* SHOP: lookbook strip, then a plain fast grid */}
      <section id="shop" className={s.shop}>
        <h2 className={s.h2}>Slippers</h2>
        <div className={s.lookbook}>
          <Photo shot="slippers on feet, walking on a Nairobi pavement, close crop" ratio="3 / 4" tone="dark" />
          <Photo shot="slippers on feet, sitting on a matatu step, side view" ratio="3 / 4" />
          <Photo shot="pair of slippers held in hands, detail of beadwork, daylight" ratio="3 / 4" tone="dark" />
        </div>

        <div className={s.filters} role="group" aria-label="Filter by size">
          <span className={s.filterLabel}>Size</span>
          {["36", "37", "38", "39", "40", "41", "42"].map((z) => (
            <button key={z} type="button" className={s.size}>{z}</button>
          ))}
        </div>

        <ul className={s.grid}>
          {products.map((p, i) => (
            <li key={i} className={s.item}>
              <a href="#shop" className={s.itemLink}>
                <Photo shot={`product ${i + 1}, pair on plain white, top-down`} ratio="1 / 1" />
                <span className={s.itemName}>{p.name}</span>
                <span className={s.itemPrice}>KES — · USD —</span>
                <span className={s.itemMeta}>
                  {p.colours} colour{p.colours > 1 ? "s" : ""}
                  {p.state === "low" && <> · <strong>Few left</strong></>}
                  {p.state === "out" && <> · <strong>Sold out</strong></>}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className={s.note}>Maker and sourcing details: [NEEDS CLIENT]. Prices and stock above are placeholders.</p>
      </section>
    </div>
  );
}
