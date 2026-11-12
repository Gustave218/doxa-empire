"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { shopProducts, type Category } from "@/lib/catalog";
import { matchesProduct } from "@/lib/search";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/components/CartProvider";
import { SearchIcon, CloseIcon } from "@/components/Icons";

const CATS: ("All" | Category)[] = ["All", "Robes", "Sandales"];
type Sort = "featured" | "low" | "high" | "rating";

export function ShopBrowser() {
  const params = useSearchParams();
  const { currency } = useCart();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cat, setCat] = useState<"All" | Category>((params.get("c") as Category) || "All");
  const [sort, setSort] = useState<Sort>("featured");

  useEffect(() => { setQ(params.get("q") ?? ""); const c = params.get("c"); if (c) setCat(c as Category); }, [params]);

  const list = useMemo(() => {
    const out = shopProducts.filter((p) => (cat === "All" || p.category === cat) && (!q.trim() || matchesProduct(p, q)));
    if (sort === "low") out.sort((a, b) => a.price[currency] - b.price[currency]);
    if (sort === "high") out.sort((a, b) => b.price[currency] - a.price[currency]);
    if (sort === "rating") out.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return out;
  }, [q, cat, sort, currency]);

  return (
    <section className="wrap section-sm">
      <div className="toolbar">
        <div className="chips" role="tablist" aria-label="Catégorie">
          {CATS.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={`chip ${cat === c ? "on" : ""}`} onClick={() => setCat(c)}>
              {c === "All" ? "Tout" : c} <span className="chip-n">{c === "All" ? shopProducts.length : shopProducts.filter((p) => p.category === c).length}</span>
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          <label className="search-field">
            <SearchIcon size={18} />
            <span className="sr-only">Rechercher des produits</span>
            <input type="search" value={q} onChange={(e) => { setQ(e.target.value); if (e.target.value && cat !== "All") setCat("All"); }} placeholder="Rechercher dans la boutique" enterKeyHint="search" />
            {q && <button onClick={() => setQ("")} aria-label="Effacer la recherche"><CloseIcon size={16} /></button>}
          </label>
          <label className="select">
            <span className="sr-only">Trier par</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="featured">En vedette</option>
              <option value="low">Prix croissant</option>
              <option value="high">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
            </select>
          </label>
        </div>
      </div>

      <p className="muted small results" aria-live="polite">{list.length} {list.length === 1 ? "article" : "articles"}{q && <> pour « {q} »</>}</p>

      {list.length ? (
        <div className="grid-products">
          {list.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 4} />)}
        </div>
      ) : (
        <div className="empty">
          <p className="serif">Aucun résultat pour « {q} ».</p>
          <button className="btn btn-outline" onClick={() => { setQ(""); setCat("All"); }}>Effacer les filtres</button>
        </div>
      )}
    </section>
  );
}
