import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "À propos", description: "L'histoire et les valeurs de Doxa Empire." };

const VALUES = [
  ["Fait avec soin", "Des perles d'une sandale à la première nuit dans une nouvelle ville, chaque détail compte."],
  ["Le concret d'abord", "Nos cours et ebooks enseignent ce qui marche vraiment sur les marchés kényans, pas de la théorie."],
  ["Des prix honnêtes", "Des prix clairs en KES et USD. Aucun frais caché au paiement ni à l'arrivée."],
  ["Fiers d'être locaux", "Nous travaillons avec des artisans, hôtes et partenaires kényans que nous connaissons personnellement."],
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="wrap narrow">
          <p className="eyebrow">À propos de Doxa Empire</p>
          <h1 className="serif display-xl">Née à Nairobi pour ceux qui <em>construisent quelque chose.</em></h1>
          <p className="lede">Doxa a commencé avec une valise de sandales perlées et un groupe WhatsApp. Aujourd’hui, c’est une boutique, une académie et un service voyage, avec la même promesse : traiter chaque client comme un membre de la famille.</p>
        </div>
      </section>
      <section className="wrap section about-split">
        <div className="about-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/samples/look1.webp" alt="Sandales perlées faites main sur un marché de Nairobi" />
        </div>
        <div>
          <h2 className="serif h2">Notre histoire</h2>
          <p>Notre fondateur est arrivé au Kenya comme étudiant et a tout appris à ses dépens : trouver une chambre, ouvrir un compte bancaire, savoir comment se faire payer. Vendre des sandales maasaï faites main en ligne a payé le loyer, et les amis demandaient sans cesse comment faire.</p>
          <p>Alors nous avons commencé à enseigner. Puis à aider les nouveaux étudiants à s’installer. Puis à sélectionner des robes pour les femmes qui achetaient nos sandales. Doxa Empire, c’est tout ce que nous aurions aimé trouver à notre arrivée.</p>
          <ul className="hero-stats dark">
            <li><strong>2 400+</strong><span>clients</span></li>
            <li><strong>600+</strong><span>arrivées accompagnées</span></li>
            <li><strong>14</strong><span>pays</span></li>
          </ul>
        </div>
      </section>
      <section className="tint section">
        <div className="wrap">
          <h2 className="serif h2 center">Nos valeurs</h2>
          <div className="values">
            {VALUES.map(([t, d], i) => (
              <div key={t} className="value"><span className="serif step-n">0{i + 1}</span><h3>{t}</h3><p className="muted">{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section center">
        <h2 className="serif h2">Entrez. Faites un tour.</h2>
        <div className="cta-row center">
          <Link href="/shop" className="btn">Visiter la boutique</Link>
          <Link href="/contact" className="btn btn-outline">Nous contacter</Link>
        </div>
      </section>
    </>
  );
}
