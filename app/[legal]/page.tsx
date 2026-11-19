import type { Metadata } from "next";
import { notFound } from "next/navigation";

const WA = "WhatsApp au +254 707 898 058";
const UPDATED = "Dernière mise à jour : 19 novembre 2026";

const pages: Record<string, { title: string; intro: string; sections: [string, string][] }> = {
  terms: {
    title: "Conditions générales",
    intro: "Ces conditions s’appliquent à tout achat et à toute utilisation du site Doxa Empire : boutique, cours vidéo, ebooks et services de voyage et d’installation. En passant commande, vous acceptez ces conditions.",
    sections: [
      ["Qui sommes nous", `Doxa Empire est une entreprise fondée par Gloria, présente à Nairobi (Kenya) et à Kinshasa (RD Congo). Vous pouvez nous joindre sur ${WA}.`],
      ["Votre compte", "Un compte est nécessaire pour certaines commandes. Vous êtes responsable de l’exactitude des informations fournies et de la confidentialité de votre mot de passe. Vous devez nous signaler toute utilisation non autorisée de votre compte."],
      ["Prix et paiement", "Les prix sont affichés en dollars américains (USD), toutes taxes applicables comprises. Le paiement se fait par carte bancaire (Visa, Mastercard) ou par mobile money lorsque cette option est disponible. Toute somme payée est définitive et non remboursable."],
      ["Produits physiques (boutique)", "Les robes et sandales sont livrées à l’adresse indiquée lors de la commande, dans le délai convenu avec vous. Les photos sont aussi fidèles que possible, mais de légères variations de couleur peuvent exister."],
      ["Produits numériques (cours vidéo et ebooks)", "Les cours vidéo et les ebooks sont livrés immédiatement après paiement. Ils sont réservés à votre usage personnel : il est interdit de les partager, revendre ou distribuer sans autorisation écrite."],
      ["Services de voyage, d’installation et pour étudiants", "Doxa Empire propose deux formules : une formule familles, nouveaux arrivants et vacanciers à 500 USD, avec accompagnement pendant un mois ; et une formule étudiants à 700 USD. Le contenu précis, les délais et les services inclus sont confirmés avec le client avant paiement. L’accompagnement comprend notamment, selon la formule choisie, le logement, l’accueil à l’aéroport, la carte SIM, les démarches de visa ou de permis étudiant, les achats essentiels, la recherche d’université et l’accompagnement pour l’installation."],
      ["Durée de l’accompagnement", "La formule familles, nouveaux arrivants et vacanciers couvre une période d’accompagnement limitée à un mois à compter de l’accord confirmé. La formule étudiants est encadrée par le plan convenu avec le client. Tout service demandé après cette période peut être facturé selon sa nature et son niveau de difficulté. Certains services supplémentaires peuvent également être gratuits, selon les termes convenus directement avec Doxa Empire."],
      ["Paiements des services de voyage", "Une fois qu’une formule de voyage ou d’accompagnement est payée, le montant est non remboursable. Toute modification, tout report ou tout service effectué après paiement ne peut donner lieu à remboursement. Toute nouvelle prestation après le mois inclus est soumise à accord préalable et peut être gratuite ou facturée selon sa nature."],
      ["Retours et remboursements", "Les achats numériques ne sont ni repris ni remboursés après livraison. Les articles physiques sont traités selon la page Retours et remboursements. Pour les services de voyage et d’accompagnement, une somme déjà payée est non remboursable dès que le paiement est accepté."],
      ["Propriété intellectuelle", "Les textes, vidéos, ebooks, photos, logos et la marque Doxa Empire nous appartiennent. Toute reproduction sans autorisation écrite est interdite."],
      ["Responsabilité", "Les cours et ebooks présentent notre expérience et des méthodes pratiques ; les résultats dépendent de votre travail et de votre marché et ne sont pas garantis. Nous ne pouvons garantir l’obtention d’un visa, d’un permis étudiant, d’une admission universitaire ou d’un logement, car les décisions appartiennent aux autorités et établissements concernés."],
      ["Litiges et droit applicable", `En cas de problème, contactez-nous d’abord sur ${WA} : nous cherchons toujours une solution amiable. À défaut, le droit kényan s’applique.`],
      ["Modifications", "Nous pouvons mettre à jour ces conditions. La version applicable est celle publiée en ligne au moment de votre commande."],
    ],
  },
  privacy: {
    title: "Politique de confidentialité",
    intro: "Nous respectons votre vie privée. Cette page explique quelles informations nous collectons, pourquoi, et quels sont vos droits.",
    sections: [
      ["Ce que nous collectons", "Votre nom, email et mot de passe (chiffré) pour votre compte ; votre téléphone ou WhatsApp et votre adresse de livraison pour vos commandes ; et, pour une demande de voyage, les informations utiles à l’organisation de votre accompagnement."],
      ["Ce que nous ne collectons jamais en ligne", "Passeports, pièces d’identité ou numéros complets de carte bancaire. Les paiements sont traités par nos prestataires de paiement sécurisés."],
      ["Pourquoi", "Pour créer et gérer votre compte, livrer vos commandes, vous donner accès à vos cours et ebooks, répondre à vos demandes et assurer le suivi de votre commande."],
      ["Partage", "Vos données ne sont jamais vendues. Elles sont partagées uniquement avec les prestataires nécessaires au service : hébergement, authentification, paiement et livraison."],
      ["Conservation et sécurité", "Vos données sont conservées tant que votre compte est actif ou que la loi l’exige, et protégées par des connexions chiffrées."],
      ["Vos droits", `Vous pouvez à tout moment consulter, corriger ou supprimer vos données. Pour toute demande, écrivez-nous sur ${WA}.`],
      ["Cookies et stockage local", "Le site utilise le stockage de votre navigateur pour retenir votre panier et votre session. Aucun cookie publicitaire n’est utilisé."],
    ],
  },
  refunds: {
    title: "Retours et remboursements",
    intro: "Des règles simples et claires, selon le type de produit ou de service.",
    sections: [
      ["Cours vidéo et ebooks : aucun remboursement", "Les produits numériques sont livrés immédiatement après paiement. Ils ne peuvent être ni retournés, ni échangés, ni remboursés."],
      ["Produits physiques : livraison non respectée", "Si nous ne livrons pas votre commande dans le délai convenu avec vous, vous pouvez demander l’annulation. Nous étudierons alors le remboursement intégral selon les informations disponibles."],
      ["Produits physiques : article défectueux ou erroné", "Si l’article reçu est abîmé, défectueux ou ne correspond pas à votre commande, signalez-le sous 48 heures après réception avec des photos."],
      ["Changement de taille", "Un échange de taille est possible sous 7 jours pour un article non porté, avec étiquettes et emballage d’origine, selon le stock disponible."],
      ["Services de voyage et d’accompagnement : paiement non remboursable", "Toute somme payée pour une formule de voyage, d’installation ou d’accompagnement étudiant est non remboursable. Cette règle s’applique dès l’acceptation du paiement, même si le client annule ou modifie ensuite sa demande. Lorsqu’une prestation incluse a déjà commencé, elle ne peut pas être remboursée."],
      ["Services après un mois", "La formule familles, nouveaux arrivants et vacanciers comprend un accompagnement d’un mois. Après cette période, les nouveaux services nécessaires peuvent être proposés gratuitement ou facturés selon leur nature, leur durée et leur complexité. Cela sera toujours discuté et convenu avec le client."],
      ["Comment faire une demande", `Écrivez-nous sur ${WA} avec votre nom et votre numéro de commande. Nous étudierons uniquement les demandes relatives à des produits physiques ou à un délai de livraison non respecté.`],
    ],
  },
  delivery: {
    title: "Livraison",
    intro: "Nous livrons nos robes et sandales au Kenya et en RD Congo. Le délai exact est confirmé avec vous au moment de la commande.",
    sections: [
      ["Nairobi", "Généralement en 1 à 2 jours ouvrés."],
      ["Reste du Kenya", "Généralement en 2 à 4 jours ouvrés par coursier."],
      ["Kinshasa et RD Congo", "Délai communiqué lors de la commande selon le mode d’expédition."],
      ["Autres pays", `Sur demande, écrivez-nous sur ${WA}.`],
      ["Frais", "Les frais de livraison sont affichés au moment du paiement."],
      ["Produits numériques", "Les cours vidéo et ebooks ne sont pas expédiés : ils sont disponibles immédiatement après paiement."],
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((legal) => ({ legal }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ legal: string }> }): Promise<Metadata> {
  const p = pages[(await params).legal];
  return p ? { title: p.title, description: p.intro } : {};
}

export default async function Legal({ params }: { params: Promise<{ legal: string }> }) {
  const p = pages[(await params).legal];
  if (!p) notFound();
  return (
    <div className="wrap prose">
      <div className="row-between" style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
        <h1 className="serif h1">{p.title}</h1>
        {p.title === "Conditions générales" && (
          <a className="btn btn-outline" href="/api/terms-pdf" download="conditions-generales-doxa-empire.pdf">
            Télécharger en PDF
          </a>
        )}
      </div>
      <p className="muted small">{UPDATED}</p>
      <p className="lede">{p.intro}</p>
      {p.sections.map(([h, t]) => (<section key={h}><h2>{h}</h2><p>{t}</p></section>))}
    </div>
  );
}
