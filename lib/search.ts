import { products, productHref, type Product } from "./catalog";

export type Hit = { href: string; title: string; kind: string; text: string; img?: string };

// Lowercase, strip accents and punctuation so "Été", "ete" and "été" all match.
export const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ");

const PAGES: (Hit & { keys: string })[] = [
  { href: "/shop", title: "Boutique", kind: "Page", text: "Robes et sandales", keys: "boutique shop acheter robe robes sandale sandales tong mode vetement chaussure" },
  { href: "/coaching", title: "Coaching vidéo", kind: "Page", text: "Cours pour vendre, promouvoir et importer", keys: "coaching cours video formation apprendre business marketing importer vendre" },
  { href: "/coaching#bundle", title: "Pack accès complet", kind: "Section", text: "Tous les cours à prix réduit", keys: "pack bundle tous les cours reduction offre" },
  { href: "/ebooks", title: "Ebooks", kind: "Page", text: "Guides pratiques à télécharger", keys: "ebook ebooks livre livres guide pdf lire bibliotheque" },
  { href: "/travel", title: "Voyage et installation", kind: "Page", text: "Accueil, logement, vacances au Kenya", keys: "voyage travel kenya installer installation demenager" },
  { href: "/travel#students", title: "Étudiants", kind: "Section", text: "Études au Kenya, admission, logement étudiant", keys: "etudiant etudiants etudier universite ecole admission campus visa etudiant" },
  { href: "/travel#settle", title: "S’installer au Kenya", kind: "Section", text: "Logement, permis, écoles pour enfants", keys: "installer installation logement maison appartement permis travail sejour famille demenagement" },
  { href: "/travel#holidays", title: "Vacances", kind: "Section", text: "Safaris et plages", keys: "vacances safari plage diani mara amboseli lamu tourisme lune de miel" },
  { href: "/travel#services", title: "Services voyage", kind: "Section", text: "Aéroport, SIM, banque, visa", keys: "aeroport accueil sim m pesa mpesa banque compte visa permis orientation" },
  { href: "/travel#enquire", title: "Faire une demande de voyage", kind: "Section", text: "Réponse sur WhatsApp sous 24 h", keys: "demande devis formulaire contact voyage faq question" },
  { href: "/about", title: "À propos", kind: "Page", text: "Notre histoire et nos valeurs", keys: "a propos about histoire valeurs equipe fondateur gloria" },
  { href: "/contact", title: "Contact", kind: "Page", text: "WhatsApp, email, téléphone", keys: "contact whatsapp email telephone appeler adresse nairobi" },
  { href: "/cart", title: "Panier", kind: "Page", text: "Votre panier", keys: "panier bag cart commande" },
  { href: "/delivery", title: "Livraison", kind: "Page", text: "Délais et frais de livraison", keys: "livraison delivery expedition delai" },
  { href: "/refunds", title: "Retours et remboursements", kind: "Page", text: "Échanges et remboursements", keys: "retour retours remboursement echange" },
  { href: "/terms", title: "Conditions de vente", kind: "Page", text: "", keys: "conditions cgv terms" },
  { href: "/privacy", title: "Confidentialité", kind: "Page", text: "", keys: "confidentialite donnees privacy" },
];

const kindOf = (p: Product) => (p.type === "physical" ? p.category ?? "Boutique" : p.type === "video" ? "Cours vidéo" : "Ebook");
const productText = (p: Product) =>
  [p.name, p.short, p.description, p.category, p.level, kindOf(p), ...(p.colours ?? []), ...(p.chapters ?? []), ...(p.details ?? [])].join(" ");

export function searchAll(q: string, limit = 8): Hit[] {
  const words = norm(q).split(" ").filter(Boolean);
  if (!words.length) return [];
  const scored: { hit: Hit; score: number }[] = [];
  const score = (title: string, body: string) => {
    const t = norm(title), b = norm(body);
    let s = 0;
    for (const w of words) {
      if (t.includes(w)) s += 3;
      else if (b.includes(w)) s += 1;
      else return 0; // every word must match somewhere
    }
    return s;
  };
  for (const p of products) {
    const s = score(p.name, productText(p));
    if (s) scored.push({ score: s + 0.5, hit: { href: productHref(p), title: p.name, kind: kindOf(p), text: p.short, img: p.images?.[0] ?? p.thumb } });
  }
  for (const pg of PAGES) {
    const s = score(pg.title, `${pg.text} ${pg.keys}`);
    if (s) scored.push({ score: s, hit: pg });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((x) => x.hit);
}

export function matchesProduct(p: Product, q: string) {
  const words = norm(q).split(" ").filter(Boolean);
  const hay = norm(productText(p));
  return words.every((w) => hay.includes(w));
}
