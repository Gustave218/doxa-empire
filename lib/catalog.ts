// SAMPLE CATALOGUE for the preview. Names, prices and stock are placeholders
// until the client supplies the real catalogue. Dress and slide photos are free
// Pexels images (see _archive/pexels-originals); beaded slippers are client samples.

export type Currency = "KES" | "USD";
export type ProductType = "physical" | "ebook" | "video";
export type Category = "Robes" | "Sandales";
export type Price = Record<Currency, number>;

export type Product = {
  slug: string;
  type: ProductType;
  name: string;
  price: Price;
  was?: Price;
  short: string;
  description: string;
  details?: string[];
  category?: Category;
  images?: string[];
  colours?: string[];
  sizes?: { size: string; stock: number }[];
  badge?: string;
  rating?: number;
  reviews?: number;
  // ebooks
  cover?: { bg: string; fg: string; accent: string };
  pages?: number;
  // videos
  minutes?: number;
  level?: string;
  chapters?: string[];
  thumb?: string;
};

const shoe = (s: number[]) => ["37", "38", "39", "40", "41", "42"].map((size, i) => ({ size, stock: s[i] ?? 0 }));
const dress = (s: number[]) => ["XS", "S", "M", "L", "XL"].map((size, i) => ({ size, stock: s[i] ?? 0 }));

export const products: Product[] = [
  // ---------------- Shop: dresses ----------------
  {
    slug: "ivory-ruffle-slip-dress", type: "physical", category: "Robes",
    name: "Robe nuisette ivoire à volants",
    price: { KES: 6800, USD: 52 }, was: { KES: 8500, USD: 65 },
    short: "Robe nuisette légère en coton, encolure à volants.",
    description: "En voile de coton respirant, encolure en V à volants et coupe droite ample. Assez légère pour les après midis à Mombasa, assez élégante pour un dîner à Nairobi.",
    details: ["100 % voile de coton", "Encolure en V à volants", "Longueur midi, coupe ample", "Lavage à la main à froid"],
    images: ["/products/dress-ivory.webp", "/products/dress-ivory-2.webp"],
    colours: ["Ivoire"], sizes: dress([3, 5, 6, 4, 2]), badge: "-20%", rating: 4.8, reviews: 126,
  },
  {
    slug: "magenta-bow-gown", type: "physical", category: "Robes",
    name: "Robe de soirée magenta à grand nœud",
    price: { KES: 14500, USD: 112 },
    short: "Robe sculptée en taffetas, ornée d'un grand nœud.",
    description: "Une pièce du soir qu'on n'oublie pas. Taffetas structuré, bustier croisé dos nu et grand nœud à la taille.",
    details: ["Taffetas polyester, doublure satin", "Bustier croisé dos nu", "Fermeture invisible au dos", "Nettoyage à sec uniquement"],
    images: ["/products/dress-magenta-bow.webp"],
    colours: ["Magenta"], sizes: dress([1, 2, 3, 2, 0]), badge: "Édition limitée", rating: 4.9, reviews: 48,
  },
  {
    slug: "fuchsia-puff-sleeve-midi", type: "physical", category: "Robes",
    name: "Robe midi fuchsia à manches bouffantes",
    price: { KES: 7900, USD: 61 },
    short: "Décolleté cœur, manches bouffantes et jupe boutonnée.",
    description: "Une robe midi romantique : décolleté cœur, manches bouffantes froncées et buste ajusté qui s'ouvre sur une jupe boutonnée.",
    details: ["Crêpe stretch", "Décolleté cœur", "Vrais boutons devant", "Lavage machine délicat"],
    images: ["/products/dress-fuchsia-puff.webp"],
    colours: ["Fuchsia"], sizes: dress([2, 4, 5, 3, 1]), badge: "Nouveau", rating: 4.7, reviews: 63,
  },
  {
    slug: "lemon-halter-mini", type: "physical", category: "Robes",
    name: "Mini robe citron dos nu",
    price: { KES: 5900, USD: 45 },
    short: "Mini robe en mousseline plissée, col noué dos nu.",
    description: "Le soleil en robe. Mousseline plissée fluide, col dos nu noué derrière et taille empire flatteuse.",
    details: ["Mousseline plissée, entièrement doublée", "Col dos nu, noué au dos", "Longueur mini", "Lavage à la main à froid"],
    images: ["/products/dress-lemon-halter.webp"],
    colours: ["Citron"], sizes: dress([2, 3, 4, 3, 2]), badge: "Tendance", rating: 4.6, reviews: 89,
  },

  // ---------------- Shop: slippers ----------------
  {
    slug: "olive-leather-toe-slide", type: "physical", category: "Sandales",
    name: "Sandale en cuir olive à anneau",
    price: { KES: 4200, USD: 32 },
    short: "Cuir grainé olive avec anneau croisé crème.",
    description: "Dessus en cuir grainé fini main avec anneau croisé, semelle intérieure en cuir rembourrée et semelle en caoutchouc cousue.",
    details: ["Dessus en cuir véritable", "Semelle intérieure rembourrée", "Semelle caoutchouc cousue", "Taille normalement"],
    images: ["/products/slide-olive.webp"],
    colours: ["Olive / Crème"], sizes: shoe([3, 5, 6, 4, 3, 2]), badge: "Meilleure vente", rating: 4.8, reviews: 211,
  },
  {
    slug: "mint-cloud-flip-flop", type: "physical", category: "Sandales",
    name: "Tong nuage menthe",
    price: { KES: 1200, USD: 9 },
    short: "Tong en mousse ultra légère pour la piscine, la plage et la maison.",
    description: "Semelle en mousse EVA douce, assise galbée et brides menthe. Imperméable, séchage rapide et incroyablement légère.",
    details: ["Semelle en mousse EVA", "Imperméable", "Assise galbée", "Tailles unisexes"],
    images: ["/products/flipflop-mint.webp"],
    colours: ["Blanc / Menthe"], sizes: shoe([8, 9, 10, 9, 7, 6]), rating: 4.5, reviews: 342,
  },
  {
    slug: "maasai-rainbow-bead-sandal", type: "physical", category: "Sandales",
    name: "Sandale maasaï perles arc en ciel",
    price: { KES: 2800, USD: 22 },
    short: "Sandale en cuir noir, motif arc en ciel perlé à la main.",
    description: "Fabriquée par des artisans maasaï : brides en cuir noir ornées de perles de verre cousues à la main. Chaque paire est unique.",
    details: ["Cuir véritable", "Perles de verre cousues main", "Fait main au Kenya", "Semelle en pneu recyclé"],
    images: ["/samples/p1.webp", "/samples/look3.webp"],
    colours: ["Noir / Arc en ciel"], sizes: shoe([2, 4, 5, 4, 2, 1]), badge: "Fait main", rating: 4.9, reviews: 157,
  },
  {
    slug: "maasai-zigzag-thong", type: "physical", category: "Sandales",
    name: "Tong maasaï zigzag",
    price: { KES: 3200, USD: 25 },
    short: "Perles bleues, rouges et jaunes éclatantes sur cuir fauve.",
    description: "Large dessus perlé au zigzag maasaï classique. Semelle en cuir fauve qui s'assouplit et épouse votre pied.",
    details: ["Semelle en cuir fauve", "Dessus entièrement perlé", "Fait main au Kenya", "Taille normalement"],
    images: ["/samples/p2.webp", "/samples/look2.webp"],
    colours: ["Bleu / Rouge"], sizes: shoe([1, 2, 1, 2, 1, 0]), badge: "Derniers articles", rating: 4.7, reviews: 74,
  },
  {
    slug: "maasai-bead-band-slide", type: "physical", category: "Sandales",
    name: "Sandale maasaï à bande perlée",
    price: { KES: 2400, USD: 19 },
    short: "Sandale noire épurée avec une fine bande de perles.",
    description: "Sandale en cuir minimaliste avec une fine bande perlée à la main. Facile à porter tous les jours.",
    details: ["Cuir véritable", "Fine bande perlée", "Fait main au Kenya", "Semelle caoutchouc"],
    images: ["/samples/p3.webp", "/samples/p1.webp"],
    colours: ["Noir"], sizes: shoe([4, 6, 7, 6, 4, 3]), rating: 4.6, reviews: 98,
  },
  {
    slug: "maasai-market-collection", type: "physical", category: "Sandales",
    name: "Tong perlée du marché maasaï",
    price: { KES: 1800, USD: 14 },
    short: "Semelle légère et entre doigts richement perlé.",
    description: "La préférée du marché. Semelle confortable et entre doigts richement perlé, en plusieurs coloris.",
    details: ["Semelle caoutchouc", "Entre doigts perlé", "Fait main au Kenya", "Coloris variés"],
    images: ["/samples/p4.webp", "/samples/look1.webp"],
    colours: ["Rose", "Violet", "Vert"], sizes: shoe([5, 6, 8, 7, 5, 3]), badge: "Nouveau", rating: 4.5, reviews: 51,
  },

  // ---------------- Coaching videos ----------------
  {
    slug: "start-selling-online", type: "video", thumb: "/thumbs/vendre.jpg",
    name: "Commencer à vendre en ligne",
    price: { KES: 3500, USD: 27 },
    short: "Ouvrez votre boutique en ligne en 7 jours avec WhatsApp, Instagram et TikTok.",
    description: "Créez votre catalogue WhatsApp Business, photographiez vos produits avec votre téléphone et concluez vos premières ventes en ligne.",
    minutes: 48, level: "Débutant",
    chapters: ["Choisir quoi vendre", "Photos produits au téléphone", "Catalogue WhatsApp Business", "Encaisser avec M-Pesa", "Vos 10 premières commandes"],
    badge: "Meilleure vente",
  },
  {
    slug: "how-to-market", type: "video", thumb: "/thumbs/marketing.jpg",
    name: "Promouvoir vos produits",
    price: { KES: 4000, USD: 31 },
    short: "Contenu, publicité et bouche à oreille qui vous amènent des acheteurs.",
    description: "Construisez un plan de contenu, lancez votre première pub pour moins de 1 000 KES et transformez vos clients en ambassadeurs.",
    minutes: 56, level: "Intermédiaire",
    chapters: ["Connaître votre acheteur", "Du contenu qui vend", "Votre première pub payante", "Influenceurs à petit budget", "Parrainage et avis"],
  },
  {
    slug: "how-to-start-a-business", type: "video", thumb: "/thumbs/business.jpg",
    name: "Créer votre entreprise",
    price: { KES: 4500, USD: 35 },
    short: "De l'idée à une entreprise enregistrée, bien tarifée et rentable.",
    description: "Testez votre idée auprès de vrais acheteurs, enregistrez votre entreprise au Kenya, fixez un prix rentable et tenez une comptabilité simple.",
    minutes: 72, level: "Débutant",
    chapters: ["Trouver une idée rentable", "Tester la demande en une semaine", "S'enregistrer au Kenya", "Fixer un prix rentable", "Comptabilité simple"],
    badge: "Le plus complet",
  },
  {
    slug: "how-to-buy-from-bangladesh", type: "video", thumb: "/thumbs/payer.jpg",
    name: "Acheter au Bangladesh",
    price: { KES: 5500, USD: 42 },
    short: "Achetez vos vêtements directement aux usines de Dacca et expédiez au Kenya.",
    description: "Trouvez des fournisseurs fiables, négociez les quantités minimales, contrôlez la qualité, payez en sécurité et dédouanez au Kenya.",
    minutes: 64, level: "Avancé",
    chapters: ["Trouver des fournisseurs vérifiés", "Négocier prix et quantités", "Échantillons et contrôle qualité", "Payer en sécurité", "Expédition et douane au Kenya"],
    badge: "Nouveau",
  },
  {
    slug: "how-to-import-from-china", type: "video", thumb: "/thumbs/chine.jpg",
    name: "Importer de Chine",
    price: { KES: 5500, USD: 42 },
    short: "Alibaba, 1688, agents et fret maritime expliqués pas à pas.",
    description: "Utilisez Alibaba et 1688 en confiance, travaillez avec des agents et choisissez entre fret aérien et maritime vers Mombasa.",
    minutes: 58, level: "Intermédiaire",
    chapters: ["Alibaba ou 1688", "Vérifier les fournisseurs", "Travailler avec des agents", "Fret aérien ou maritime", "Calculer le coût de revient"],
  },

  // ---------------- Ebooks ----------------
  {
    slug: "from-idea-to-first-sale", type: "ebook",
    name: "De l'idée à la première vente",
    price: { KES: 1500, USD: 12 },
    short: "Testez votre idée auprès de vrais acheteurs avant de dépenser.",
    description: "Un guide pratique pour vérifier la demande, faire une première offre et être payé.",
    cover: { bg: "#111111", fg: "#ffffff", accent: "#e4318c" }, pages: 84, badge: "Meilleure vente",
  },
  {
    slug: "selling-on-whatsapp", type: "ebook",
    name: "Vendre sur WhatsApp",
    price: { KES: 1200, USD: 9 },
    short: "Catalogues, statuts et réponses qui concluent des ventes.",
    description: "Faites de l'appli que vos clients utilisent déjà votre boutique.",
    cover: { bg: "#e4318c", fg: "#ffffff", accent: "#111111" }, pages: 62, badge: "Nouveau",
  },
  {
    slug: "the-bangladesh-sourcing-guide", type: "ebook",
    name: "Le guide d'achat au Bangladesh",
    price: { KES: 2500, USD: 19 },
    short: "Listes de fournisseurs, prix de référence et checklists d'expédition.",
    description: "Tout pour passer votre première commande de vêtements à Dacca en confiance.",
    cover: { bg: "#f6f6f7", fg: "#111111", accent: "#e4318c" }, pages: 112,
  },
  {
    slug: "pricing-without-fear", type: "ebook",
    name: "Fixer ses prix sans peur",
    price: { KES: 1200, USD: 9 },
    short: "Trouvez un prix qui couvre vos coûts et vous rémunère.",
    description: "Coûts, marges et comment annoncer votre prix avec assurance.",
    cover: { bg: "#2b2b2b", fg: "#ffffff", accent: "#ff4fa3" }, pages: 56,
  },
  {
    slug: "marketing-on-a-shoestring", type: "ebook",
    name: "Le marketing à petit budget",
    price: { KES: 1500, USD: 12 },
    short: "50 façons peu coûteuses de faire connaître votre marque.",
    description: "Idées de contenu, scripts de collaboration et modèles de pubs pour petits budgets.",
    cover: { bg: "#ffd6ea", fg: "#111111", accent: "#b0145f" }, pages: 74,
  },
  {
    slug: "simple-books-small-shops", type: "ebook",
    name: "La comptabilité simple des petites boutiques",
    price: { KES: 1000, USD: 8 },
    short: "Suivez chaque shilling dans un carnet ou une feuille.",
    description: "La comptabilité sans jargon.",
    cover: { bg: "#b0145f", fg: "#ffffff", accent: "#ffd6ea" }, pages: 48,
  },
];

export const shopProducts = products.filter((p) => p.type === "physical");
export const videos = products.filter((p) => p.type === "video");
export const ebooks = products.filter((p) => p.type === "ebook");
export const bySlug = (slug: string) => products.find((p) => p.slug === slug);
export const totalStock = (p: Product) => (p.sizes ? p.sizes.reduce((n, s) => n + s.stock, 0) : Infinity);

export const productHref = (p: Product) =>
  p.type === "physical" ? `/shop/${p.slug}` : p.type === "ebook" ? `/ebooks#${p.slug}` : `/coaching#${p.slug}`;

export function money(v: number, currency: Currency) {
  return currency === "KES" ? `KES ${v.toLocaleString("en-KE")}` : `$${v.toLocaleString("en-US")}`;
}
export const formatPrice = (price: Price, currency: Currency) => money(price[currency], currency);

export const DELIVERY: Record<Currency, number> = { KES: 350, USD: 3 };
export const FREE_DELIVERY_FROM: Record<Currency, number> = { KES: 10000, USD: 80 };
