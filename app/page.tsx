import Link from "next/link";
import { shopProducts, videos, ebooks } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { EbookCover } from "@/components/Learn";
import { ArrowIcon, PlayIcon, LockIcon, CapIcon, HomeIcon, SunIcon, StarIcon, CardMarks, MobileMarks } from "@/components/Icons";

const SERVICES = [
  { href: "/shop", n: "01", t: "Doxa Business", d: "Découvrez nos produits de qualité : robes élégantes, sandales en cuir et sandales maasaï faites main.", img: "/products/dress-magenta-bow.webp", cta: "Découvrir la sélection" },
  { href: "/coaching", n: "02", t: "Coaching", d: "Cours vidéo pour vendre en ligne, faire du marketing et importer.", img: "/thumbs/vendre.jpg", tone: "c-coach", cta: "Voir un extrait" },
  { href: "/ebooks", n: "03", t: "Ebooks", d: "Des guides courts et pratiques à lire ce soir et appliquer demain.", img: null, tone: "c-books", cta: "Parcourir la bibliothèque" },
  { href: "/travel", n: "04", t: "Voyage et installation", d: "Accueil à l'aéroport, logement et vacances pour étudiants et familles.", img: "/travel/kenya.jpg", tone: "c-travel", cta: "Préparer votre arrivée" },
];

const QUOTES = [
  ["Grâce au cours Vendre en ligne, j’ai ouvert ma boutique et fait mes premières ventes en ligne en moins d’un mois.", "Grace M., Nairobi"],
  ["Ils m'ont accueilli à JKIA à 2 h du matin et ma chambre était prête. Je me suis senti chez moi dès le premier jour.", "Patrick K., étudiant venu de Goma"],
  ["Les sandales perlées sont encore plus belles en vrai. On me les complimente partout.", "Aisha O., Mombasa"],
];

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1 className="serif display-xxl">Doxa Empire<br /><em>Mode, formation et voyage.</em></h1>
            <p className="lede">Doxa Empire, c’est une maison avec quatre portes : une boutique de mode, une académie business, une bibliothèque numérique et un service voyage pour tous ceux qui font du Kenya leur nouveau chez eux.</p>
            <div className="cta-row">
              <Link href="/shop" className="btn">Voir la collection</Link>
              <Link href="#services" className="btn btn-outline">Nos services</Link>
            </div>
            <p className="hero-rating"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /> <span>Plus de 2 400 clients satisfaits en Afrique de l’Est</span></p>
          </div>
          <div className="hero-art">
            <div className="hero-img a">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/products/dress-ivory.webp" alt="Robe nuisette ivoire à volants" />
            </div>
            <div className="hero-img b">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/products/dress-fuchsia-puff.webp" alt="Robe midi fuchsia à manches bouffantes" />
            </div>
            <div className="hero-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/products/slide-olive.webp" alt="" />
              <div><p className="small muted">Meilleure vente</p><p className="serif">Sandale en cuir olive</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Services overview ---------- */}
      <section className="wrap section" id="services">
        <div className="section-head">
          <div>
            <p className="eyebrow">Ce que nous faisons</p>
            <h2 className="serif h2">Quatre services. Une même exigence.</h2>
          </div>
          <p className="muted head-note">Choisissez une porte. Chacune mène plus loin.</p>
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
              <p className="eyebrow">01 · Doxa Business</p>
              <h2 className="serif h2">Découvrez nos produits de qualité</h2>
            </div>
            <Link href="/shop" className="link-arrow">Visiter la boutique</Link>
          </div>
          <div className="prod-row" aria-label="Nos produits">
            {shopProducts.map((p) => <div key={p.slug} className="prod-slide"><ProductCard p={p} /></div>)}
          </div>
          <div className="center prod-cta"><Link href="/shop" className="btn">Visiter la boutique</Link></div>
        </div>
      </section>

      {/* ---------- Coaching teaser ---------- */}
      <section className="dark-band section">
        <div className="wrap split">
          <div>
            <p className="eyebrow gold">02 · Coaching</p>
            <h2 className="serif h2">Apprenez avec ceux qui <em>vendent chaque jour.</em></h2>
            <p className="lede light">De votre première vente en ligne à l’importation depuis le Bangladesh, chaque cours est pratique, local et pensé pour votre téléphone.</p>
            <Link href="/coaching" className="btn btn-gold">Voir tous les cours</Link>
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
          <h2 className="serif h2">Une bibliothèque pour bâtisseurs</h2>
          <p className="muted">{ebooks.length} guides sur les prix, la vente sur WhatsApp, l’approvisionnement et la comptabilité. Téléchargement immédiat.</p>
          <div className="duo-covers">{ebooks.slice(0, 4).map((e) => <EbookCover key={e.slug} p={e} />)}</div>
          <span className="link-arrow">Voir les ebooks</span>
        </Link>
        <Link href="/travel" className="duo-card travel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/travel/kenya.jpg" alt="" className="travel-bg" loading="lazy" />
          <div className="boarding">
            <span><small>De</small><strong>FIH</strong><em>Kinshasa</em></span>
            <span className="boarding-mid" aria-hidden>✈</span>
            <span><small>À</small><strong>NBO</strong><em>Nairobi</em></span>
          </div>
          <p className="eyebrow gold">04 · Voyage et installation</p>
          <h2 className="serif h2">Karibu Kenya</h2>
          <p>Étudiants, familles qui s’installent et vacanciers. Accueil à l’aéroport, logement, carte SIM, banque et safaris.</p>
          <ul className="duo-tags"><li>Étudiants</li><li>Installation</li><li>Vacances</li><li>Accueil aéroport</li><li>Logement</li></ul>
          <span className="link-arrow light">Préparer votre arrivée</span>
        </Link>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="tint section">
        <div className="wrap">
          <div className="section-head center"><p className="eyebrow">Témoignages</p><h2 className="serif h2">Notre communauté</h2></div>
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
        <p className="serif h3">Payez comme vous voulez</p>
        <div className="pay-strip-marks"><CardMarks height={26} /><MobileMarks height={26} /></div>
      </section>
    </>
  );
}
