import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import Link from "next/link";
import { Photo, Logo } from "../_shared/Photo";
import s from "./a.module.css";

const display = Bodoni_Moda({ subsets: ["latin"], weight: ["500", "700", "900"], style: ["normal"], variable: "--a-display", display: "swap" });
const text = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "600"], variable: "--a-text", display: "swap" });

export const metadata = { title: "Direction A: Masthead · Design lab" };

const shelf = [
  { n: "01", h: 300, w: 46, c: "black" },
  { n: "02", h: 270, w: 38, c: "white" },
  { n: "03", h: 320, w: 58, c: "pink" },
  { n: "04", h: 250, w: 34, c: "grey" },
  { n: "05", h: 290, w: 50, c: "black" },
];

export default function DirectionA() {
  return (
    <div className={`${display.variable} ${text.variable} ${s.page}`}>
      <header className={s.top}>
        <Link href="/design-lab" className={s.back}>← Design lab</Link>
        <Logo height={40} />
        <nav className={s.nav} aria-label="Main">
          <a href="#doors">Academy</a>
          <a href="#doors">Study in Kenya</a>
          <a href="#doors">Shop</a>
        </nav>
      </header>

      {/* HERO: a magazine cover. Masthead across the top, cover lines are the doors. */}
      <section className={s.cover}>
        <h1 className={s.masthead}>Doxa Empire</h1>
        <div className={s.coverBody}>
          <Photo className={s.coverPhoto} shot="founder, full length, standing on a Nairobi street, looking at camera, daylight" ratio="3 / 4" />
          <ol className={s.coverLines}>
            <li>
              <a href="#doors"><span className={s.coverNum}>Academy</span>Start a business, from the first idea to the first sale.</a>
            </li>
            <li>
              <a href="#doors"><span className={s.coverNum}>Study in Kenya</span>Got your place? We help you land and settle in.</a>
            </li>
            <li>
              <a href="#doors"><span className={s.coverNum}>Shop</span>Maasai slippers, sized and ready to post.</a>
            </li>
          </ol>
        </div>
        <p className={s.issue}>[NEEDS CLIENT] Founder name · Nairobi</p>
      </section>

      {/* DOORS: one huge typographic index */}
      <section id="doors" className={s.index} aria-label="Three doors">
        <a className={s.row} href="#shelf">
          <span className={s.rowNum}>01</span>
          <span className={s.rowTitle}>Build a business</span>
          <span className={s.rowNote}>Coaching, video courses and ebooks</span>
        </a>
        <a className={s.row} href="#doors">
          <span className={s.rowNum}>02</span>
          <span className={s.rowTitle}>Study in Kenya</span>
          <span className={s.rowNote}>Arrival, housing and first-week help</span>
        </a>
        <a className={s.row} href="#doors">
          <span className={s.rowNum}>03</span>
          <span className={s.rowTitle}>The Shop</span>
          <span className={s.rowNote}>Maasai slippers in every size we stock</span>
        </a>
      </section>

      {/* ACADEMY: ebooks as a real shelf */}
      <section id="shelf" className={s.shelfSection}>
        <div className={s.shelfHead}>
          <h2 className={s.h2}>The ebook shelf</h2>
          <p className={s.lede}>Short, practical books you can read on your phone. Pay once, download as a PDF.</p>
        </div>
        <div className={s.shelf}>
          <div className={s.faceOut}>
            <div className={s.coverArt}>
              <span className={s.coverArtTitle}>Ebook title</span>
              <span className={s.coverArtMeta}>[NEEDS CLIENT]</span>
            </div>
            <p className={s.bookMeta}><strong>Ebook title [NEEDS CLIENT]</strong><br />Pages [NEEDS CLIENT] · KES — / USD —</p>
          </div>
          <div className={s.spines}>
            {shelf.map((b) => (
              <a key={b.n} href="#shelf" className={`${s.spine} ${s[b.c]}`} style={{ height: b.h, width: b.w }}>
                <span>Ebook {b.n} · title needed</span>
              </a>
            ))}
          </div>
        </div>
        <div className={s.plank} />
      </section>
    </div>
  );
}
