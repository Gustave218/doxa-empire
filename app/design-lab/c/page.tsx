import { Gloock, Familjen_Grotesk } from "next/font/google";
import Link from "next/link";
import { Photo, Logo } from "../_shared/Photo";
import s from "./c.module.css";

const display = Gloock({ subsets: ["latin"], weight: "400", variable: "--c-display", display: "swap" });
const text = Familjen_Grotesk({ subsets: ["latin"], weight: ["400", "600"], variable: "--c-text", display: "swap" });

export const metadata = { title: "Direction C: Lookbook · Design lab" };

const courses = [
  { n: "1", lessons: "— lessons", title: "Course title [NEEDS CLIENT]", line: "What you can do by the end: [NEEDS CLIENT]" },
  { n: "2", lessons: "— lessons", title: "Course title [NEEDS CLIENT]", line: "What you can do by the end: [NEEDS CLIENT]" },
  { n: "3", lessons: "— lessons", title: "Course title [NEEDS CLIENT]", line: "What you can do by the end: [NEEDS CLIENT]" },
];

export default function DirectionC() {
  return (
    <div className={`${display.variable} ${text.variable} ${s.page}`}>
      <header className={s.top}>
        <Link href="/design-lab" className={s.back}>← Design lab</Link>
        <span className={s.name}>Doxa Empire</span>
        <Logo height={34} />
      </header>

      {/* HERO: asymmetric. Big photo, small masthead text, headline at the bottom left */}
      <section className={s.hero}>
        <Photo className={s.heroPhoto} shot="founder, seated, three-quarter view, warm window light, wearing her own clothes" ratio="4 / 5" />
        <div className={s.heroText}>
          <p className={s.kicker}>[NEEDS CLIENT] Founder name</p>
          <h1 className={s.h1}>I build businesses, settle students, and sell slippers.</h1>
          <p className={s.lede}>Pick the reason you came. Everything else stays out of your way.</p>
        </div>
      </section>

      {/* DOORS: full-width photographic bands */}
      <nav aria-label="Three doors" className={s.doors}>
        <a href="#academy" className={s.door}>
          <Photo className={s.doorPhoto} shot="founder teaching at a table, notebook and laptop, hands in frame" ratio="auto" tone="dark" />
          <span className={s.doorLabel}><span className={s.doorWord}>Academy</span><span className={s.doorSub}>Coaching, courses, ebooks</span></span>
        </a>
        <a href="#academy" className={s.door}>
          <Photo className={s.doorPhoto} shot="students arriving, luggage at a Nairobi gate or arrivals hall, faces optional" ratio="auto" />
          <span className={s.doorLabel}><span className={s.doorWord}>Study in Kenya</span><span className={s.doorSub}>Arrival and first-week help</span></span>
        </a>
        <a href="#academy" className={s.door}>
          <Photo className={s.doorPhoto} shot="slippers on feet on red-earth street, low angle" ratio="auto" tone="dark" />
          <span className={`${s.doorLabel} ${s.doorLabelPink}`}><span className={s.doorWord}>The Shop</span><span className={s.doorSub}>Maasai slippers</span></span>
        </a>
      </nav>

      {/* ACADEMY: course contents list + a pink coaching block */}
      <section id="academy" className={s.academy}>
        <div className={s.academyHead}>
          <h2 className={s.h2}>Video courses</h2>
          <p className={s.body}>Recorded lessons you watch at your own pace, in a private library. Buy one course at a time.</p>
        </div>
        <ol className={s.courses}>
          {courses.map((c) => (
            <li key={c.n}>
              <a href="#academy" className={s.course}>
                <span className={s.courseNum}>{c.n}</span>
                <span className={s.courseTitle}>{c.title}</span>
                <span className={s.courseLine}>{c.line}</span>
                <span className={s.courseMeta}>{c.lessons} · KES — / USD —</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className={s.coaching}>
        <h2 className={s.coachingTitle}>One-to-one coaching</h2>
        <div className={s.coachingCard}>
          <p>Pay for a session, then pick a time that suits you. Packages and prices: [NEEDS CLIENT].</p>
          <a href="#academy" className={s.button}>See coaching options</a>
        </div>
      </section>
    </div>
  );
}
