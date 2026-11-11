import type { Product } from "@/lib/catalog";

/** Typeset ebook cover (stands in until the client's real covers arrive). */
export function BookCover({ p, small = false }: { p: Product; small?: boolean }) {
  const c = p.cover ?? { bg: "#111", fg: "#fff" };
  return (
    <div className={`book-cover ${small ? "book-cover-sm" : ""}`} style={{ background: c.bg, color: c.fg }}>
      <span className="book-cover-brand">Doxa Empire</span>
      <span className="book-cover-title">{p.name}</span>
      <span className="book-cover-meta">{p.pages} pages · Ebook</span>
    </div>
  );
}
