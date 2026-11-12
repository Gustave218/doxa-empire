import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "./EnquiryForm";
import { CapIcon, HomeIcon, SunIcon, PlaneIcon, PhoneIcon, CardIcon, PinIcon, ShieldIcon, ChatIcon, CheckIcon, ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Voyager et s'installer au Kenya",
  description: "Accueil à l'aéroport, logement, carte SIM et banque, inscription scolaire et vacances. Arrivez au Kenya avec un ami local à vos côtés.",
};

const AUDIENCES = [
  {
    id: "students", Icon: CapIcon, title: "Étudiants", tone: "t1",
    lede: "Vous venez étudier à Nairobi, Mombasa ou Eldoret ? Nous gérons les premières semaines pour que vous vous concentriez sur vos cours.",
    items: ["Aide à l'admission et aux documents", "Checklist visa et permis étudiant", "Foyer ou colocation près du campus", "Accueil à l'aéroport et accompagnement la première semaine", "Carte SIM étudiant, M-Pesa et compte bancaire"],
  },
  {
    id: "settle", Icon: HomeIcon, title: "S'installer au Kenya", tone: "t2",
    lede: "Vous déménagez pour le travail, la famille ou les affaires ? Arrivez dans un logement prêt et une ville que vous comprenez.",
    items: ["Recherche de logement et vérification du bail", "Meublé temporaire pendant la recherche", "Aide au permis de travail et de séjour", "Recherche d'école pour les enfants", "Chauffeurs, déménageurs et installation"],
  },
  {
    id: "holidays", Icon: SunIcon, title: "Vacances", tone: "t3",
    lede: "Safari au lever du soleil, plage de Diani à midi. Des voyages choisis avec des partenaires locaux de confiance, sans pièges à touristes.",
    items: ["Safaris au Maasai Mara et à Amboseli", "Séjours plage à Diani, Watamu et Lamu", "Visites de Nairobi et circuits gastronomiques", "Formules lune de miel et famille", "Transferts aéroport et guide local"],
  },
];

const SERVICES = [
  { Icon: PlaneIcon, t: "Accueil à l'aéroport", d: "Accueilli à JKIA ou à l'aéroport Moi avec une pancarte à votre nom, 24 h sur 24." },
  { Icon: HomeIcon, t: "Logement", d: "Foyers, appartements et maisons vérifiés dans des quartiers sûrs." },
  { Icon: PhoneIcon, t: "SIM et M-Pesa", d: "Ligne enregistrée et portefeuille M-Pesa dès le premier jour." },
  { Icon: CardIcon, t: "Banque", d: "Ouvrez un compte kényan et organisez vos virements internationaux." },
  { Icon: ShieldIcon, t: "Visa et permis", d: "Des checklists claires pour l'eTA, le permis étudiant et le permis de travail." },
  { Icon: PinIcon, t: "Découverte de la ville", d: "Matatus, Uber, marchés, centres commerciaux, hôpitaux et conseils de sécurité." },
  { Icon: CapIcon, t: "Inscription scolaire", d: "Conseils sur les universités, instituts et écoles internationales." },
  { Icon: ChatIcon, t: "Un ami sur place", d: "Un hôte sur WhatsApp qui répond à toutes vos questions pendant 30 jours." },
];

const STEPS = [
  ["Parlez nous de votre projet", "Envoyez une courte demande. Aucun document pour l'instant."],
  ["Recevez votre plan et devis", "Un hôte prépare votre plan d'arrivée personnalisé sous 48 heures."],
  ["Confirmez et payez", "Réservez votre formule par carte ou mobile money."],
  ["Atterrissez et vivez", "Nous vous accueillons à l'aéroport et restons à vos côtés la première semaine."],
];

const FAQ = [
  ["Quels pays accompagnez vous ?", "Tous les pays. Où que vous viviez, nous accompagnons toute personne qui vient au Kenya."],
  ["Garantissez vous l'admission ou le visa ?", "Personne ne peut honnêtement le garantir. Nous vous guidons à chaque étape et vérifions vos documents pour que rien ne manque."],
  ["Puis je payer en plusieurs fois ?", "Oui, pour les formules installation et étudiant. Demandez un échéancier à votre hôte."],
  ["Est ce sûr ?", "Nous travaillons uniquement avec des logements et chauffeurs vérifiés, et votre hôte est joignable sur WhatsApp à tout moment."],
];

export default function TravelPage() {
  return (
    <>
      <section className="travel-hero">
        <div className="travel-sun" aria-hidden />
        <div className="wrap travel-hero-inner">
          <p className="eyebrow gold">Doxa Voyage · Karibu Kenya</p>
          <h1 className="serif display-xl">Arrivez au Kenya<br /><em>comme si vous y viviez déjà.</em></h1>
          <p className="lede">Étudiants, familles et vacanciers : nous vous accueillons à l’aéroport, trouvons votre logement, configurons votre téléphone et votre banque, et vous faisons découvrir le pays que nous aimons.</p>
          <div className="cta-row">
            <Link href="#enquire" className="btn btn-gold">Préparer mon arrivée</Link>
            <Link href="#services" className="btn btn-ghost-light">Tous les services</Link>
          </div>
          <ul className="travel-proof">
            <li><strong>600+</strong><span>arrivées accueillies</span></li>
            <li><strong>14</strong><span>pays</span></li>
            <li><strong>4.9★</strong><span>note moyenne</span></li>
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head center">
          <p className="eyebrow">Pour qui</p>
          <h2 className="serif h2">Trois parcours. Un hôte de confiance.</h2>
        </div>
        <div className="aud-grid">
          {AUDIENCES.map(({ id, Icon, title, lede, items, tone }) => (
            <article key={id} id={id} className={`aud ${tone}`}>
              <span className="aud-icon"><Icon size={26} /></span>
              <h3 className="serif h3">{title}</h3>
              <p>{lede}</p>
              <ul className="ticks">{items.map((i) => <li key={i}><CheckIcon size={15} /> {i}</li>)}</ul>
              <div className="aud-foot">
                                <Link href="#enquire" className="link-arrow">Nous écrire</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-band" id="services">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow gold">Services</p>
              <h2 className="serif h2">Tout votre premier mois, pris en charge.</h2>
            </div>
          </div>
          <div className="svc-grid">
            {SERVICES.map(({ Icon, t, d }) => (
              <div key={t} className="svc"><Icon size={26} /><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head center">
          <p className="eyebrow">Comment ça marche</p>
          <h2 className="serif h2">De la demande au <em>karibu</em> en quatre étapes</h2>
        </div>
        <ol className="steps">
          {STEPS.map(([t, d], i) => (
            <li key={t}><span className="step-n serif">0{i + 1}</span><h3>{t}</h3><p className="muted">{d}</p></li>
          ))}
        </ol>
      </section>

      <section className="wrap section enquire" id="enquire">
        <div className="enquire-grid">
          <div>
            <p className="eyebrow">Demande</p>
            <h2 className="serif h2">Dites nous d’où vous venez.</h2>
            <p className="lede">Nous répondons sur WhatsApp sous 24 heures avec un plan personnalisé et un prix clair.</p>
            <div className="faq">
              {FAQ.map(([q, a]) => (
                <details key={q} className="acc"><summary>{q}</summary><p>{a}</p></details>
              ))}
            </div>
          </div>
          <div className="form-card"><EnquiryForm /></div>
        </div>
      </section>

      <section className="wrap section-sm">
        <Link href="/shop" className="cross-link">
          <span><span className="eyebrow">En attendant</span><span className="serif h3">Glissez une paire de sandales maasaï dans votre valise</span></span>
          <ArrowIcon size={24} />
        </Link>
      </section>
    </>
  );
}
