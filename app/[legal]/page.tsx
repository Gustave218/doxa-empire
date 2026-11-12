import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pages: Record<string, { title: string; sections: [string, string][] }> = {
  terms: { title: "Conditions de vente", sections: [
    ["Qui sommes nous", "Doxa Empire. Raison sociale et adresse : [NEEDS CLIENT]."],
    ["Commandes et paiement", "Les prix sont affichés en KES ou en USD. Votre commande est confirmée après vérification du paiement."],
    ["Produits numériques", "Les cours et ebooks sont réservés à un usage personnel. Le partage des liens ou des accès est interdit."],
    ["Coaching", "Les séances sont réservées après paiement. Règles de report et d'annulation : [NEEDS CLIENT]."],
  ]},
  privacy: { title: "Confidentialité", sections: [
    ["Ce que nous collectons", "Votre nom, email, téléphone, adresse de livraison et, pour les étudiants, votre nationalité, école et date d'arrivée."],
    ["Ce que nous ne collectons jamais en ligne", "Passeports ou autres pièces d'identité."],
    ["Pourquoi", "Pour livrer votre commande, vous donner accès à vos achats et répondre à votre demande."],
    ["Vos droits", "Demandez à consulter, corriger ou supprimer vos données à tout moment. Contact : [NEEDS CLIENT]. Conformité au Kenya Data Protection Act à vérifier."],
  ]},
  refunds: { title: "Retours et remboursements", sections: [
    ["Articles de la boutique", "Retournez les articles non portés sous [NEEDS CLIENT] jours. Échange de taille selon le stock."],
    ["Cours et ebooks", "Livrés immédiatement, les produits numériques ne sont pas remboursables une fois ouverts. [NEEDS CLIENT: confirm]"],
    ["Coaching", "[NEEDS CLIENT]"],
  ]},
  delivery: { title: "Livraison", sections: [
    ["Nairobi", "1 à 2 jours ouvrés. Frais affichés au paiement."],
    ["Reste du Kenya", "2 à 4 jours ouvrés par coursier."],
    ["International", "Sur demande. Écrivez nous sur WhatsApp."],
    ["Frais et coursiers", "[NEEDS CLIENT]"],
  ]},
};

export function generateStaticParams() {
  return Object.keys(pages).map((legal) => ({ legal }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ legal: string }> }): Promise<Metadata> {
  const p = pages[(await params).legal];
  return p ? { title: p.title, robots: { index: false } } : {};
}

export default async function Legal({ params }: { params: Promise<{ legal: string }> }) {
  const p = pages[(await params).legal];
  if (!p) notFound();
  return (
    <div className="wrap prose">
      <h1 className="serif h1">{p.title}</h1>
      <p className="notice">Brouillon en attente de validation. Version non définitive.</p>
      {p.sections.map(([h, t]) => (<section key={h}><h2>{h}</h2><p>{t}</p></section>))}
    </div>
  );
}
