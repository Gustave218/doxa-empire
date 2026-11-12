import type { Metadata } from "next";
import { videos } from "@/lib/catalog";
import { VideoCard } from "@/components/Learn";
import { Bundle } from "./Bundle";
import { VideoIcon, LockIcon, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Vidéos de coaching",
  description: "Coaching vidéo pour vendre en ligne, faire du marketing, créer son entreprise et acheter au Bangladesh et en Chine.",
};

export default function CoachingPage() {
  const totalMin = videos.reduce((n, v) => n + (v.minutes ?? 0), 0);
  return (
    <>
      <section className="learn-hero">
        <div className="wrap learn-hero-grid">
          <div>
            <p className="eyebrow gold">Doxa Académie · Coaching</p>
            <h1 className="serif display-xl">Bâtissez l’entreprise<br /><em>dont vous parlez depuis longtemps.</em></h1>
            <p className="lede">Cinq cours vidéo pratiques par des gens qui vendent chaque jour à Nairobi. Sur votre téléphone, à votre rythme, pour toujours.</p>
            <ul className="hero-stats">
              <li><strong>{videos.length}</strong><span>cours</span></li>
              <li><strong>{Math.round(totalMin / 60)}h+</strong><span>de vidéo</span></li>
              <li><strong>{videos.reduce((n, v) => n + (v.chapters?.length ?? 0), 0)}</strong><span>leçons</span></li>
            </ul>
          </div>
          <ul className="how-list">
            <li><VideoIcon size={22} /><div><strong>Extrait gratuit</strong><span>Chaque cours propose un court aperçu.</span></div></li>
            <li><LockIcon size={22} /><div><strong>Débloquez par carte ou mobile money</strong><span>Visa, Mastercard, M-Pesa, Airtel, Orange.</span></div></li>
            <li><CheckIcon size={22} /><div><strong>Accès à vie</strong><span>Revoyez quand vous voulez, mises à jour incluses.</span></div></li>
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <div className="video-grid">
          {videos.map((v, i) => <VideoCard key={v.slug} p={v} index={i} />)}
        </div>
      </section>

      <Bundle />
    </>
  );
}
