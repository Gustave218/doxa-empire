// SAMPLE CATALOGUE for the preview. Names, prices and stock are placeholders
// until the client supplies the real catalogue. Dress and slide photos are free
// Pexels images (see _archive/pexels-originals); beaded slippers are client samples.

export type Currency = "KES" | "USD";
export type ProductType = "physical" | "ebook" | "video";
export type Category = "Dresses" | "Slippers";
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
};

const shoe = (s: number[]) => ["37", "38", "39", "40", "41", "42"].map((size, i) => ({ size, stock: s[i] ?? 0 }));
const dress = (s: number[]) => ["XS", "S", "M", "L", "XL"].map((size, i) => ({ size, stock: s[i] ?? 0 }));

export const products: Product[] = [
  // ---------------- Shop: dresses ----------------
  {
    slug: "ivory-ruffle-slip-dress", type: "physical", category: "Dresses",
    name: "Ivory Ruffle Slip Dress",
    price: { KES: 6800, USD: 52 }, was: { KES: 8500, USD: 65 },
    short: "Airy cotton slip dress with a soft ruffled neckline.",
    description: "Cut from breathable cotton voile with a ruffled V-neckline and relaxed column silhouette. Light enough for Mombasa afternoons, elegant enough for a Nairobi dinner.",
    details: ["100% cotton voile", "Ruffled V-neckline", "Midi length, relaxed fit", "Hand wash cold"],
    images: ["/products/dress-ivory.webp", "/products/dress-ivory-2.webp"],
    colours: ["Ivory"], sizes: dress([3, 5, 6, 4, 2]), badge: "-20%", rating: 4.8, reviews: 126,
  },
  {
    slug: "magenta-bow-gown", type: "physical", category: "Dresses",
    name: "Magenta Statement Bow Gown",
    price: { KES: 14500, USD: 112 },
    short: "Sculpted taffeta gown finished with an oversized bow.",
    description: "An evening piece designed to be remembered. Structured taffeta, a crossover halter bodice and a dramatic bow at the waist.",
    details: ["Polyester taffeta, satin lining", "Crossover halter bodice", "Concealed back zip", "Dry clean only"],
    images: ["/products/dress-magenta-bow.webp"],
    colours: ["Magenta"], sizes: dress([1, 2, 3, 2, 0]), badge: "Limited", rating: 4.9, reviews: 48,
  },
  {
    slug: "fuchsia-puff-sleeve-midi", type: "physical", category: "Dresses",
    name: "Fuchsia Puff-Sleeve Midi",
    price: { KES: 7900, USD: 61 },
    short: "Sweetheart neckline, puff sleeves and a button-front skirt.",
    description: "A romantic midi with sweetheart neckline, gathered puff sleeves and a fitted bodice that flows into a button-front skirt.",
    details: ["Stretch crepe", "Sweetheart neckline", "Functional front buttons", "Machine wash gentle"],
    images: ["/products/dress-fuchsia-puff.webp"],
    colours: ["Fuchsia"], sizes: dress([2, 4, 5, 3, 1]), badge: "New", rating: 4.7, reviews: 63,
  },
  {
    slug: "lemon-halter-mini", type: "physical", category: "Dresses",
    name: "Lemon Halter Mini Dress",
    price: { KES: 5900, USD: 45 },
    short: "Pleated chiffon mini with a keyhole halter tie.",
    description: "Sunshine in a dress. Fluid pleated chiffon, a keyhole halter neck that ties at the back and a flattering empire waist.",
    details: ["Pleated chiffon, fully lined", "Keyhole halter, back tie", "Mini length", "Hand wash cold"],
    images: ["/products/dress-lemon-halter.webp"],
    colours: ["Lemon"], sizes: dress([2, 3, 4, 3, 2]), badge: "Trending", rating: 4.6, reviews: 89,
  },

  // ---------------- Shop: slippers ----------------
  {
    slug: "olive-leather-toe-slide", type: "physical", category: "Slippers",
    name: "Olive Leather Toe-Loop Slide",
    price: { KES: 4200, USD: 32 },
    short: "Pebbled olive leather with a crossed cream toe loop.",
    description: "Hand-finished pebbled leather upper with a crossed toe loop, cushioned leather footbed and stitched rubber sole.",
    details: ["Genuine leather upper", "Padded leather footbed", "Stitched rubber sole", "True to size"],
    images: ["/products/slide-olive.webp"],
    colours: ["Olive / Cream"], sizes: shoe([3, 5, 6, 4, 3, 2]), badge: "Bestseller", rating: 4.8, reviews: 211,
  },
  {
    slug: "mint-cloud-flip-flop", type: "physical", category: "Slippers",
    name: "Mint Cloud Flip-Flop",
    price: { KES: 1200, USD: 9 },
    short: "Featherlight foam flip-flop for pool, beach and home.",
    description: "Soft-touch EVA foam sole with a contoured footbed and mint straps. Waterproof, quick-drying and impossibly light.",
    details: ["EVA foam sole", "Waterproof", "Contoured footbed", "Unisex sizing"],
    images: ["/products/flipflop-mint.webp"],
    colours: ["White / Mint"], sizes: shoe([8, 9, 10, 9, 7, 6]), rating: 4.5, reviews: 342,
  },
  {
    slug: "maasai-rainbow-bead-sandal", type: "physical", category: "Slippers",
    name: "Maasai Rainbow Bead Sandal",
    price: { KES: 2800, USD: 22 },
    short: "Black leather sandal with a hand-beaded rainbow motif.",
    description: "Handcrafted by Maasai artisans: black leather straps carrying a swirl of hand-stitched glass beads. Every pair is slightly unique.",
    details: ["Genuine leather", "Hand-stitched glass beads", "Handmade in Kenya", "Tyre-rubber sole"],
    images: ["/samples/p1.webp", "/samples/look3.webp"],
    colours: ["Black / Rainbow"], sizes: shoe([2, 4, 5, 4, 2, 1]), badge: "Handmade", rating: 4.9, reviews: 157,
  },
  {
    slug: "maasai-zigzag-thong", type: "physical", category: "Slippers",
    name: "Maasai Zigzag Thong Sandal",
    price: { KES: 3200, USD: 25 },
    short: "Bold blue, red and yellow beadwork on tan leather.",
    description: "A wide beaded upper in the classic Maasai zigzag. Tan leather sole that softens and moulds to your foot.",
    details: ["Tan leather sole", "Full beaded upper", "Handmade in Kenya", "Fits true to size"],
    images: ["/samples/p2.webp", "/samples/look2.webp"],
    colours: ["Blue / Red"], sizes: shoe([1, 2, 1, 2, 1, 0]), badge: "Few left", rating: 4.7, reviews: 74,
  },
  {
    slug: "maasai-bead-band-slide", type: "physical", category: "Slippers",
    name: "Maasai Bead-Band Slide",
    price: { KES: 2400, USD: 19 },
    short: "Clean black slide with a fine band of beads.",
    description: "Minimal leather slide with a slim band of hand-beaded detail. Easy to wear every day.",
    details: ["Genuine leather", "Slim beaded band", "Handmade in Kenya", "Rubber sole"],
    images: ["/samples/p3.webp", "/samples/p1.webp"],
    colours: ["Black"], sizes: shoe([4, 6, 7, 6, 4, 3]), rating: 4.6, reviews: 98,
  },
  {
    slug: "maasai-market-collection", type: "physical", category: "Slippers",
    name: "Maasai Market Beaded Flip-Flop",
    price: { KES: 1800, USD: 14 },
    short: "Light sole with a statement beaded toe post.",
    description: "Our market favourite. A comfortable sole with a richly beaded toe post in a range of colourways.",
    details: ["Rubber sole", "Beaded toe post", "Handmade in Kenya", "Assorted colourways"],
    images: ["/samples/p4.webp", "/samples/look1.webp"],
    colours: ["Pink", "Purple", "Green"], sizes: shoe([5, 6, 8, 7, 5, 3]), badge: "New", rating: 4.5, reviews: 51,
  },

  // ---------------- Coaching videos ----------------
  {
    slug: "start-selling-online", type: "video",
    name: "How to Start Selling Online",
    price: { KES: 3500, USD: 27 },
    short: "Open your online shop in 7 days with WhatsApp, Instagram and TikTok.",
    description: "Set up your WhatsApp Business catalogue, take product photos with your phone, and close your first sales online.",
    minutes: 48, level: "Beginner",
    chapters: ["Choosing what to sell", "Product photos with your phone", "WhatsApp Business catalogue", "Taking payments with M-Pesa", "Your first 10 orders"],
    badge: "Bestseller",
  },
  {
    slug: "how-to-market", type: "video",
    name: "How to Market Your Products",
    price: { KES: 4000, USD: 31 },
    short: "Content, ads and word of mouth that bring buyers to you.",
    description: "Build a content plan, run your first paid ad for under KES 1,000 and turn customers into your best promoters.",
    minutes: 56, level: "Intermediate",
    chapters: ["Know your buyer", "Content that sells", "Your first paid ad", "Influencers on a budget", "Referrals and reviews"],
  },
  {
    slug: "how-to-start-a-business", type: "video",
    name: "How to Start a Business",
    price: { KES: 4500, USD: 35 },
    short: "From idea to registered, priced and profitable.",
    description: "Test your idea with real buyers, register your business in Kenya, set a profitable price and keep simple books.",
    minutes: 72, level: "Beginner",
    chapters: ["Finding an idea that pays", "Testing demand in one week", "Registering in Kenya", "Pricing for profit", "Simple bookkeeping"],
    badge: "Most complete",
  },
  {
    slug: "how-to-buy-from-bangladesh", type: "video",
    name: "How to Buy from Bangladesh",
    price: { KES: 5500, USD: 42 },
    short: "Source clothing direct from Dhaka factories and ship to Kenya.",
    description: "Find trusted garment suppliers, negotiate MOQs, inspect quality, pay safely and clear goods through Kenyan customs.",
    minutes: 64, level: "Advanced",
    chapters: ["Finding verified suppliers", "Negotiating price and MOQ", "Samples and quality checks", "Paying safely", "Shipping and customs to Kenya"],
    badge: "New",
  },
  {
    slug: "how-to-import-from-china", type: "video",
    name: "How to Import from China",
    price: { KES: 5500, USD: 42 },
    short: "Alibaba, 1688, agents and sea freight explained step by step.",
    description: "Use Alibaba and 1688 with confidence, work with sourcing agents, and choose between air and sea freight to Mombasa.",
    minutes: 58, level: "Intermediate",
    chapters: ["Alibaba vs 1688", "Vetting suppliers", "Working with agents", "Air vs sea freight", "Landed cost calculator"],
  },

  // ---------------- Ebooks ----------------
  {
    slug: "from-idea-to-first-sale", type: "ebook",
    name: "From Idea to First Sale",
    price: { KES: 1500, USD: 12 },
    short: "Test your idea with real buyers before you spend money.",
    description: "A practical guide to checking demand, making a first offer and getting paid.",
    cover: { bg: "#1a1714", fg: "#f6f1ea", accent: "#c9a46a" }, pages: 84, badge: "Bestseller",
  },
  {
    slug: "selling-on-whatsapp", type: "ebook",
    name: "Selling on WhatsApp",
    price: { KES: 1200, USD: 9 },
    short: "Catalogues, status updates and replies that close sales.",
    description: "Turn the app your customers already use into your shop.",
    cover: { bg: "#0f3d2e", fg: "#f6f1ea", accent: "#9fd8b4" }, pages: 62, badge: "New",
  },
  {
    slug: "the-bangladesh-sourcing-guide", type: "ebook",
    name: "The Bangladesh Sourcing Guide",
    price: { KES: 2500, USD: 19 },
    short: "Supplier lists, price benchmarks and shipping checklists.",
    description: "Everything you need to place your first garment order from Dhaka with confidence.",
    cover: { bg: "#7a1f3d", fg: "#fbeef2", accent: "#f2b8c9" }, pages: 112,
  },
  {
    slug: "pricing-without-fear", type: "ebook",
    name: "Pricing Without Fear",
    price: { KES: 1200, USD: 9 },
    short: "Work out a price that covers costs and pays you.",
    description: "Costs, margins and how to say your price out loud.",
    cover: { bg: "#efe7da", fg: "#1a1714", accent: "#a2783f" }, pages: 56,
  },
  {
    slug: "marketing-on-a-shoestring", type: "ebook",
    name: "Marketing on a Shoestring",
    price: { KES: 1500, USD: 12 },
    short: "50 low-cost ways to get your brand seen.",
    description: "Content ideas, collaboration scripts and ad templates for small budgets.",
    cover: { bg: "#1d2b4f", fg: "#eef2fb", accent: "#e4318c" }, pages: 74,
  },
  {
    slug: "simple-books-small-shops", type: "ebook",
    name: "Simple Books for Small Shops",
    price: { KES: 1000, USD: 8 },
    short: "Track every shilling in one notebook or one sheet.",
    description: "Bookkeeping without jargon.",
    cover: { bg: "#c9a46a", fg: "#1a1714", accent: "#1a1714" }, pages: 48,
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
