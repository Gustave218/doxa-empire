import type { Metadata } from "next";
import { notFound } from "next/navigation";

const WA = "WhatsApp au +254 707 898 058";
const UPDATED = "Dernière mise à jour : novembre 2026";

const pages: Record<string, { title: string; intro: string; sections: [string, string][] }> = {
  terms: {
    title: "Conditions générales",
    intro: "Ces conditions s’appliquent à tout achat et à toute utilisation du site Doxa Empire : boutique, cours vidéo, ebooks et services de voyage et d’installation. En passant commande, vous les acceptez.",
    sections: [
      ["Qui sommes nous", `Doxa Empire est une entreprise fondée par Gloria, présente à Nairobi (Kenya) et à Kinshasa (RD Congo). Vous pouvez nous joindre sur ${WA}.`],
      ["Votre compte", "Un compte est nécessaire pour finaliser une commande. Vous êtes responsable de l’exactitude des informations fournies et de la confidentialité de votre mot de passe. Vous pouvez vous connecter avec votre email ou avec Google."],
      ["Prix et paiement", "Les prix sont affichés en dollars américains (USD), toutes taxes applicables comprises. Le paiement se fait par carte bancaire (Visa, Mastercard) ou par mobile money (M-Pesa, Airtel Money, Orange Money). La commande est confirmée dès réception du paiement."],
      ["Produits physiques (boutique)", "Robes et sandales sont livrées à l’adresse indiquée lors de la commande, dans le délai convenu avec vous. Les photos sont aussi fidèles que possible ; de légères différences de couleur peuvent exister selon l’écran. Les sandales maasaï sont faites main et chaque paire est unique."],
      ["Produits numériques (cours vidéo et ebooks)", "Les cours vidéo et les ebooks sont livrés immédiatement après paiement. Ils sont réservés à votre usage personnel : il est interdit de les copier, revendre, partager ou diffuser, en tout ou en partie. Tout partage peut entraîner la suspension de l’accès sans remboursement."],
      ["Services de voyage et d’installation", "Nos services (accueil à l’aéroport, recherche de logement, ouverture de compte, aide aux démarches, voyages) font l’objet d’un devis personnalisé envoyé sur WhatsApp. Le service commence après acceptation du devis et paiement. Nous vous accompagnons dans vos démarches, mais l’admission dans une école, l’obtention d’un visa ou d’un permis relèvent des autorités et établissements concernés et ne peuvent pas être garanties."],
      ["Retours et remboursements", "Produits numériques : aucun retour ni remboursement. Produits physiques : remboursement si nous ne livrons pas dans le délai convenu ou si l’article reçu est défectueux ou ne correspond pas à la commande. Le détail figure sur la page Retours et remboursements."],
      ["Propriété intellectuelle", "Les textes, vidéos, ebooks, photos, logos et la marque Doxa Empire nous appartiennent. Toute reproduction sans autorisation écrite est interdite."],
      ["Responsabilité", "Les cours et ebooks partagent notre expérience et des méthodes pratiques ; les résultats dépendent de votre travail et de votre marché et ne sont pas garantis. Notre responsabilité est limitée au montant payé pour le produit ou le service concerné."],
      ["Litiges et droit applicable", `En cas de problème, contactez nous d’abord sur ${WA} : nous cherchons toujours une solution amiable. À défaut, le droit kényan s’applique et les tribunaux de Nairobi sont compétents.`],
      ["Modifications", "Nous pouvons mettre à jour ces conditions. La version applicable est celle en ligne au moment de votre commande."],
    ],
  },
  privacy: {
    title: "Politique de confidentialité",
    intro: "Nous respectons votre vie privée. Cette page explique quelles informations nous collectons, pourquoi, et quels sont vos droits.",
    sections: [
      ["Ce que nous collectons", "Votre nom, email et mot de passe (chiffré) pour votre compte ; votre téléphone ou WhatsApp et votre adresse de livraison pour vos commandes ; et, pour une demande de voyage, votre nationalité, votre école et votre date d’arrivée. Si vous utilisez Google pour vous connecter, nous recevons votre nom, votre email et votre photo de profil."],
      ["Ce que nous ne collectons jamais en ligne", "Passeports, pièces d’identité ou numéros complets de carte bancaire. Les paiements sont traités par nos prestataires de paiement sécurisés."],
      ["Pourquoi", "Pour créer et gérer votre compte, livrer vos commandes, vous donner accès à vos cours et ebooks, répondre à vos demandes et vous informer du suivi de votre commande."],
      ["Partage", "Vos données ne sont jamais vendues. Elles sont partagées uniquement avec les prestataires nécessaires au service : hébergement, authentification, paiement et livraison."],
      ["Conservation et sécurité", "Vos données sont conservées tant que votre compte est actif ou que la loi l’exige, et protégées par des connexions chiffrées."],
      ["Vos droits", `Vous pouvez à tout moment consulter, corriger ou supprimer vos données, et modifier vos informations depuis votre compte. Pour toute demande, écrivez nous sur ${WA}.`],
      ["Cookies et stockage local", "Le site utilise le stockage de votre navigateur pour retenir votre panier et votre session. Aucun cookie publicitaire n’est utilisé."],
    ],
  },
  refunds: {
    title: "Retours et remboursements",
    intro: "Des règles simples et claires, selon le type de produit.",
    sections: [
      ["Cours vidéo et ebooks : ni retour ni remboursement", "Les produits numériques sont livrés immédiatement après paiement. Ils ne peuvent être ni retournés, ni échangés, ni remboursés. Si vous rencontrez un problème technique d’accès ou de téléchargement, contactez nous : nous le réglons rapidement."],
      ["Produits physiques : livraison non respectée", "Si nous ne livrons pas votre commande dans le délai convenu avec vous, vous pouvez demander l’annulation et le remboursement intégral, frais de livraison inclus."],
      ["Produits physiques : article défectueux ou erroné", "Si l’article reçu est abîmé, défectueux ou ne correspond pas à votre commande, signalez le sous 48 heures après réception avec une photo. Nous proposons un échange ou un remboursement."],
      ["Changement de taille", "Un échange de taille est possible sous 7 jours pour un article non porté, avec étiquettes et dans son emballage d’origine, selon le stock disponible. Les frais de retour sont à votre charge."],
      ["Services de voyage et d’installation", "Un service déjà réalisé (accueil, recherche de logement, démarches effectuées) n’est pas remboursable. Les conditions d’annulation d’un voyage ou d’une réservation sont indiquées dans votre devis."],
      ["Comment faire une demande", `Écrivez nous sur ${WA} avec votre nom et votre numéro de commande. Le remboursement est effectué sur le moyen de paiement utilisé, sous 7 jours ouvrés après validation.`],
    ],
  },
  delivery: {
    title: "Livraison",
    intro: "Nous livrons nos robes et sandales au Kenya et en RD Congo. Le délai exact est confirmé avec vous au moment de la commande.",
    sections: [
      ["Nairobi", "Généralement en 1 à 2 jours ouvrés."],
      ["Reste du Kenya", "Généralement en 2 à 4 jours ouvrés par coursier."],
      ["Kinshasa et RD Congo", "Délai communiqué lors de la commande selon le mode d’expédition."],
      ["Autres pays", `Sur demande, écrivez nous sur ${WA}.`],
      ["Frais", "Les frais de livraison sont affichés au moment du paiement."],
      ["Retard", "Si nous ne respectons pas le délai convenu, vous pouvez annuler et être remboursé intégralement. Voir Retours et remboursements."],
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
      <h1 className="serif h1">{p.title}</h1>
      <p className="muted small">{UPDATED}</p>
      <p className="lede">{p.intro}</p>
      {p.sections.map(([h, t]) => (<section key={h}><h2>{h}</h2><p>{t}</p></section>))}
    </div>
  );
}
