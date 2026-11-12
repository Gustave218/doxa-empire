"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { getOrders, type Order } from "@/lib/orders";
import { bySlug } from "@/lib/catalog";
import { PlayIcon, BookIcon, BagIcon } from "@/components/Icons";

export default function CommandesPage() {
  const { ready, user, configured } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (!ready) return;
    if (configured && !user) { router.replace("/connexion?next=/commandes"); return; }
    setOrders(getOrders());
  }, [ready, user, configured, router]);

  if (!orders) return <div className="wrap section-sm" />;

  const owned = Array.from(new Set(orders.flatMap((o) => o.slugs))).map((s) => bySlug(s)).filter((p) => p && p.type !== "physical");
  const date = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="wrap section-sm orders">
      <h1 className="serif h1">Mes commandes et abonnements</h1>

      <section>
        <h2 className="serif h3">Mes cours et ebooks</h2>
        {owned.length ? (
          <ul className="owned">
            {owned.map((p) => p && (
              <li key={p.slug}>
                <span className="owned-ico">{p.type === "video" ? <PlayIcon size={18} /> : <BookIcon size={18} />}</span>
                <span className="owned-name"><strong>{p.name}</strong><small>{p.type === "video" ? "Cours vidéo · accès à vie" : "Ebook · PDF et ePub"}</small></span>
                <Link href={p.type === "video" ? `/coaching#${p.slug}` : `/ebooks/${p.slug}`} className="btn btn-sm">{p.type === "video" ? "Regarder" : "Télécharger"}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">Aucun cours ni ebook pour le moment. <Link href="/coaching" className="link">Voir les cours</Link> ou <Link href="/ebooks" className="link">les ebooks</Link>.</p>
        )}
      </section>

      <section>
        <h2 className="serif h3">Historique des commandes</h2>
        {orders.length ? (
          <ul className="order-list">
            {orders.map((o) => (
              <li key={o.id}>
                <div className="row-between"><strong>Commande {o.id}</strong><span className="order-amount">{o.amount}</span></div>
                <p className="small muted">{date(o.date)} · {o.title}</p>
                <span className={`order-status ${o.status.startsWith("Payé") ? "ok" : ""}`}>{o.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty"><BagIcon size={40} /><p className="muted">Vous n’avez pas encore passé de commande.</p><Link href="/shop" className="btn">Aller à la boutique</Link></div>
        )}
      </section>
    </div>
  );
}
