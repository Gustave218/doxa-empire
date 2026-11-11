"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { shopProducts, type Category } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/components/CartProvider";
import { SearchIcon, CloseIcon } from "@/components/Icons";

const CATS: ("All" | Category)[] = ["All", "Dresses", "Slippers"];
type Sort = "featured" | "low" | "high" | "rating";

export function ShopBrowser() {
  const params = useSearchParams();
  const { currency } = useCart();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cat, setCat] = useState<"All" | Category>((params.get("c") as Category) || "All");
  const [sort, setSort] = useState<Sort>("featured");

  useEffect(() => { setQ(params.get("q") ?? ""); const c = params.get("c"); if (c) setCat(c as Category); }, [params]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = shopProducts.filter((p) =>
      (cat === "All" || p.category === cat) &&
      (!needle || [p.name, p.short, p.category, ...(p.colours ?? [])].join(" ").toLowerCase().includes(needle)));
    if (sort === "low") out.sort((a, b) => a.price[currency] - b.price[currency]);
    if (sort === "high") out.sort((a, b) => b.price[currency] - a.price[currency]);
    if (sort === "rating") out.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return out;
  }, [q, cat, sort, currency]);

  return (
    <section className="wrap section-sm">
      <div className="toolbar">
        <div className="chips" role="tablist" aria-label="Category">
          {CATS.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={`chip ${cat === c ? "on" : ""}`} onClick={() => setCat(c)}>
              {c} <span className="chip-n">{c === "All" ? shopProducts.length : shopProducts.filter((p) => p.category === c).length}</span>
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          <label className="search-field">
            <SearchIcon size={18} />
            <span className="sr-only">Search products</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the shop" />
            {q && <button onClick={() => setQ("")} aria-label="Clear search"><CloseIcon size={16} /></button>}
          </label>
          <label className="select">
            <span className="sr-only">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>
      </div>

      <p className="muted small results" aria-live="polite">{list.length} {list.length === 1 ? "piece" : "pieces"}{q && <> for “{q}”</>}</p>

      {list.length ? (
        <div className="grid-products">
          {list.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 4} />)}
        </div>
      ) : (
        <div className="empty">
          <p className="serif">Nothing matches “{q}”.</p>
          <button className="btn btn-outline" onClick={() => { setQ(""); setCat("All"); }}>Clear filters</button>
        </div>
      )}
    </section>
  );
}
