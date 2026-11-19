import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "./EnquiryForm";
import { CapIcon, HomeIcon, PlaneIcon, PhoneIcon, CardIcon, PinIcon, ShieldIcon, ChatIcon, CheckIcon, ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Voyager et s'installer au Kenya",
  description: "Deux formules d'accompagnement au Kenya : installation des familles pendant un mois et accompagnement des étudiants, de l'université au logement.",
};

const AUDIENCES = [
  {
    id: "families", Icon: HomeIcon, title: "Familles, nouveaux arrivants et vacanciers", tone: "t2",
    lede: "Vous venez au Kenya en famille pour vous installer ou profiter de vacances ? Nous vous accompagnons dans toutes les démarches et les premières étapes de votre arrivée, pendant un mois.",
    price: "500 USD",
    items: ["Réservation d'un logement adapté", "Accueil et transfert depuis l'aéroport", "Aide pour obtenir une carte SIM locale", "Accompagnement dans les démarches de visa", "Achats essentiels pour la maison et courses au supermarché", "Conseils pratiques pour prendre vos repères au Kenya pendant un mois"],
  },
  {
    id: "students", Icon: CapIcon, title: "Étudiants", tone: "t1",
    lede: "Vous venez étudier à Nairobi, Mombasa ou ailleurs au Kenya ? Nous vous accompagnons de la recherche d'université jusqu'à votre installation sur place.",
    price: "700 USD",
    items: ["Recherche d'universités et de programmes adaptés", "Accompagnement pour l'admission et les documents", "Aide à la demande de Student Pass (permis étudiant)", "Recherche et réservation d'un logement étudiant", "Accueil à l'aéroport et aide pour la carte SIM", "Conseils pratiques pour bien démarrer la vie étudiante au Kenya"],
  },
];

const SERVICES = [
  { Icon: PlaneIcon, t: "Accueil à l'aéroport", d: "Accueil à JKIA ou à l'aéroport Moi et transfert vers votre logement." },
  { Icon: HomeIcon, t: "Logement", d: "Recherche et réservation de foyers, appartements et maisons adaptés." },
  { Icon: PhoneIcon, t: "SIM et M-Pesa", d: "Aide pour obtenir une ligne locale et accéder aux services mobiles." },
  { Icon: CardIcon, t: "Achats du quotidien", d: "Accompagnement pour les achats essentiels de la maison et les courses." },
  { Icon: ShieldIcon, t: "Visa et permis", d: "Conseils et accompagnement dans les démarches de visa et de permis étudiant." },
  { Icon: PinIcon, t: "Découverte de la ville", d: "Repères utiles : transports, marchés, commerces, services et conseils pratiques." },
  { Icon: CapIcon, t: "Études", d: "Recherche d'universités, de programmes et accompagnement à l'admission." },
  { Icon: ChatIcon, t: "Un contact sur place", d: "Un hôte local à votre écoute pour vous guider pendant votre installation." },
];

const STEPS = [
  ["Parlez-nous de votre projet", "Envoyez une courte demande et indiquez la formule qui vous intéresse."],
  ["Recevez votre plan", "Un hôte prépare un plan d'arrivée adapté à votre situation."],
  ["Confirmez votre formule", "Nous échangeons avec vous sur les prochaines étapes et l'organisation."],
  ["Arrivez au Kenya", "Nous vous accueillons et vous accompagnons selon la formule choisie."],
];

const FAQ = [
  ["À qui s'adressent ces formules ?", "La formule Familles, nouveaux arrivants et vacanciers s'adresse aux personnes qui viennent au Kenya pour s'installer ou passer des vacances. La formule Étudiants accompagne celles et ceux qui viennent y poursuivre leurs études."],
  ["Le visa ou le permis étudiant est-il garanti ?", "Non. La décision appartient aux autorités compétentes. Nous vous accompagnons dans les démarches et vous aidons à préparer vos documents."],
  ["Que comprend la formule à 500 USD ?", "Elle comprend un accompagnement d'un mois pour les démarches d'installation, notamment le logement, l'accueil à l'aéroport, la carte SIM et les achats essentiels pour la maison."],
  ["Que comprend la formule à 700 USD ?", "Elle comprend l'accompagnement pour rechercher une université, préparer l'admission et la demande de Student Pass, ainsi que trouver un logement étudiant et organiser l'arrivée."],
];

export default function TravelPage() {
  return (
    <>
      <section className="travel-hero">
        <div className="travel-sun" aria-hidden />
        <div className="wrap travel-hero-inner">
          <p className="eyebrow gold">Doxa Voyage · Karibu Kenya</p>
          <h1 className="serif display-xl">Arrivez au Kenya<br /><em>avec un accompagnement local.</em></h1>
          <p className="lede">Que vous veniez en famille pour vous installer ou comme étudiant, nous vous aidons à organiser votre arrivée, vos démarches et votre logement.</p>
          <div className="cta-row">
            <Link href="#enquire" className="btn btn-gold">Préparer mon arrivée</Link>
            <Link href="#services" className="btn btn-ghost-light">Tous les services</Link>
          </div>
          <ul className="travel-proof">
            <li><strong>2</strong><span>formules d&apos;accompagnement</span></li>
            <li><strong>1 mois</strong><span>d&apos;accompagnement famille</span></li>
            <li><strong>Kenya</strong><span>un hôte local à vos côtés</span></li>
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head center">
          <p className="eyebrow">Nos formules</p>
          <h2 className="serif h2">Un accompagnement adapté à votre projet.</h2>
        </div>
        <div className="aud-grid">
          {AUDIENCES.map(({ id, Icon, title, lede, items, tone, price }) => (
            <article key={id} id={id} className={`aud ${tone}`}>
              <span className="aud-icon"><Icon size={26} /></span>
              <h3 className="serif h3">{title}</h3>
              <p>{lede}</p>
              <ul className="ticks">{items.map((item) => <li key={item}><CheckIcon size={15} /> {item}</li>)}</ul>
              <div className="aud-foot">
                <strong className="aud-from">{price}</strong>
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
              <h2 className="serif h2">Les essentiels pour bien commencer au Kenya.</h2>
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
          <h2 className="serif h2">De votre demande à votre arrivée en quatre étapes</h2>
        </div>
        <ol className="steps">
          {STEPS.map(([title, description], i) => (
            <li key={title}><span className="step-n serif">0{i + 1}</span><h3>{title}</h3><p className="muted">{description}</p></li>
          ))}
        </ol>
      </section>

      <section className="wrap section enquire" id="enquire">
        <div className="enquire-grid">
          <div>
            <p className="eyebrow">Demande</p>
            <h2 className="serif h2">Parlez-nous de votre projet.</h2>
            <p className="lede">Envoyez-nous votre demande : nous vous recontacterons pour discuter de la formule qui vous convient.</p>
            <div className="faq">
              {FAQ.map(([question, answer]) => (
                <details key={question} className="acc"><summary>{question}</summary><p>{answer}</p></details>
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
