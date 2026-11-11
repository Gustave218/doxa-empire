import Link from "next/link";
import { shopProducts, videos, ebooks } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { EbookCover } from "@/components/Learn";
import { ArrowIcon, PlayIcon, LockIcon, CapIcon, HomeIcon, SunIcon, StarIcon, CardMarks, MobileMarks } from "@/components/Icons";

const SERVICES = [
  { href: "/shop", n: "01", t: "The Shop", d: "Statement dresses, leather slides and handmade Maasai slippers.", img: "/products/dress-magenta-bow.webp", cta: "Shop the edit" },
  { href: "/coaching", n: "02", t: "Coaching", d: "Video courses on selling online, marketing and importing.", img: null, tone: "c-coach", cta: "Watch a preview" },
  { href: "/ebooks", n: "03", t: "Ebooks", d: "Short, practical guides you can read tonight and use tomorrow.", img: null, tone: "c-books", cta: "Browse the library" },
  { href: "/travel", n: "04", t: "Travel & Settle", d: "Airport pickup, housing and holidays for students and families.", img: null, tone: "c-travel", cta: "Plan your arrival" },
];

const QUOTES = [
  ["I sold my first 20 dresses on WhatsApp the week after the course.", "Grace M., Nairobi"],
  ["They met me at JKIA at 2am and my room was ready. I felt at home from day one.", "Patrick K., student from Goma"],
  ["The beaded slides are even better in person. I get asked about them everywhere.", "Aisha O., Mombasa"],
];

export default function Home() {
  const featured = [shopProducts[1], shopProducts[4], shopProducts[0], shopProducts[6]];
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Nairobi · Est. 2024</p>
            <h1 className="serif display-xxl">Style. Skills.<br /><em>A new home.</em></h1>
            <p className="lede">Doxa Empire is one house with four doors: a fashion boutique, a business academy, a digital library and a travel desk for anyone making Kenya home.</p>
            <div className="cta-row">
              <Link href="/shop" className="btn">Shop the collection</Link>
              <Link href="#services" className="btn btn-outline">Explore our services</Link>
            </div>
            <p className="hero-rating"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /> <span>Loved by 2,400+ customers across East Africa</span></p>
          </div>
          <div className="hero-art">
            <div className="hero-img a">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/products/dress-ivory.webp" alt="Ivory ruffle slip dress" />
            </div>
            <div className="hero-img b">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/products/dress-fuchsia-puff.webp" alt="Fuchsia puff-sleeve midi dress" />
            </div>
            <div className="hero-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/products/slide-olive.webp" alt="" />
              <div><p className="small muted">Bestseller</p><p className="serif">Olive Leather Slide</p></div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden>
        <div>{Array.from({ length: 2 }).map((_, k) => (
          <span key={k}>Dresses ✦ Maasai Slippers ✦ Coaching Videos ✦ Ebooks ✦ Study in Kenya ✦ Safaris ✦ Relocation ✦&nbsp;</span>
        ))}</div>
      </div>

      {/* ---------- Services overview ---------- */}
      <section className="wrap section" id="services">
        <div className="section-head">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="serif h2">Four services. One standard of care.</h2>
          </div>
          <p className="muted head-note">Pick a door. Every one leads somewhere better.</p>
        </div>
        <div className="svc-cards">
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href} className={`svc-card ${s.tone ?? ""}`}>
              {s.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.img} alt="" className="svc-card-img" />
              ) : (
                <span className="svc-card-art" aria-hidden>
                  {s.tone === "c-coach" && <PlayIcon size={56} />}
                  {s.tone === "c-books" && <span className="mini-covers">{ebooks.slice(0, 3).map((e) => <EbookCover key={e.slug} p={e} />)}</span>}
                  {s.tone === "c-travel" && <span className="travel-icons"><CapIcon size={34} /><HomeIcon size={34} /><SunIcon size={34} /></span>}
                </span>
              )}
              <span className="svc-card-body">
                <span className="svc-n">{s.n}</span>
                <span className="serif svc-t">{s.t}</span>
                <span className="svc-d">{s.d}</span>
                <span className="svc-cta">{s.cta} <ArrowIcon size={16} /></span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Shop teaser ---------- */}
      <section className="tint section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">01 · The Shop</p>
              <h2 className="serif h2">New in this season</h2>
            </div>
            <Link href="/shop" className="link-arrow">Shop all {shopProducts.length} pieces</Link>
          </div>
          <div className="grid-products">{featured.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        </div>
      </section>

      {/* ---------- Coaching teaser ---------- */}
      <section className="dark-band section">
        <div className="wrap split">
          <div>
            <p className="eyebrow gold">02 · Coaching</p>
            <h2 className="serif h2">Learn from people who <em>sell every day.</em></h2>
            <p className="lede light">From your first online sale to importing stock from Bangladesh, every course is practical, local and made for your phone.</p>
            <Link href="/coaching" className="btn btn-gold">View all courses</Link>
          </div>
          <ul className="course-list">
            {videos.map((v, i) => (
              <li key={v.slug}>
                <Link href={`/coaching#${v.slug}`}>
                  <span className="cl-n serif">0{i + 1}</span>
                  <span className="cl-t">{v.name}<small>{v.minutes} min · {v.level}</small></span>
                  <LockIcon size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Ebooks + Travel ---------- */}
      <section className="wrap section duo">
        <Link href="/ebooks" className="duo-card books">
          <p className="eyebrow">03 · Ebooks</p>
          <h2 className="serif h2">A library for builders</h2>
          <p className="muted">{ebooks.length} guides on pricing, WhatsApp selling, sourcing and books. Instant download.</p>
          <div className="duo-covers">{ebooks.slice(0, 4).map((e) => <EbookCover key={e.slug} p={e} />)}</div>
          <span className="link-arrow">Browse ebooks</span>
        </Link>
        <Link href="/travel" className="duo-card travel">
          <p className="eyebrow gold">04 · Travel & Settle</p>
          <h2 className="serif h2">Karibu Kenya</h2>
          <p>Students, families relocating and holidaymakers. Airport pickup, housing, SIM, banking and safaris.</p>
          <ul className="duo-tags"><li>Students</li><li>Relocation</li><li>Holidays</li><li>Airport pickup</li><li>Housing</li></ul>
          <span className="link-arrow light">Plan your arrival</span>
        </Link>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="tint section">
        <div className="wrap">
          <div className="section-head center"><p className="eyebrow">Kind words</p><h2 className="serif h2">From our community</h2></div>
          <div className="quotes">
            {QUOTES.map(([q, who]) => (
              <figure key={who} className="quote">
                <p className="stars"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></p>
                <blockquote className="serif">“{q}”</blockquote>
                <figcaption>{who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Pay strip ---------- */}
      <section className="wrap section-sm pay-strip">
        <p className="serif h3">Pay your way</p>
        <div className="pay-strip-marks"><CardMarks height={26} /><MobileMarks height={26} /></div>
      </section>
    </>
  );
}
