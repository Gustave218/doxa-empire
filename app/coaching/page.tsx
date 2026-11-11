import type { Metadata } from "next";
import { videos } from "@/lib/catalog";
import { VideoCard } from "@/components/Learn";
import { Bundle } from "./Bundle";
import { VideoIcon, LockIcon, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Coaching Videos",
  description: "Video coaching on selling online, marketing, starting a business and sourcing from Bangladesh and China.",
};

export default function CoachingPage() {
  const totalMin = videos.reduce((n, v) => n + (v.minutes ?? 0), 0);
  return (
    <>
      <section className="learn-hero">
        <div className="wrap learn-hero-grid">
          <div>
            <p className="eyebrow gold">Doxa Academy · Coaching</p>
            <h1 className="serif display-xl">Build the business<br /><em>you keep talking about.</em></h1>
            <p className="lede">Five practical video courses from people who sell every day in Nairobi. Watch on your phone, at your pace, forever.</p>
            <ul className="hero-stats">
              <li><strong>{videos.length}</strong><span>courses</span></li>
              <li><strong>{Math.round(totalMin / 60)}h+</strong><span>of video</span></li>
              <li><strong>{videos.reduce((n, v) => n + (v.chapters?.length ?? 0), 0)}</strong><span>lessons</span></li>
            </ul>
          </div>
          <ul className="how-list">
            <li><VideoIcon size={22} /><div><strong>Watch a free preview</strong><span>Every course has a short taster.</span></div></li>
            <li><LockIcon size={22} /><div><strong>Unlock with card or mobile money</strong><span>Visa, Mastercard, M-Pesa, Airtel, Orange.</span></div></li>
            <li><CheckIcon size={22} /><div><strong>Lifetime access</strong><span>Rewatch any time, including updates.</span></div></li>
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
