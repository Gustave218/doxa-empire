import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "./EnquiryForm";

export const metadata: Metadata = {
  title: "Study in Kenya",
  description: "Help for international students coming to Kenya: arrival, a place to stay, and support in your first weeks.",
};

const services = [
  { t: "Before you fly", d: "A checklist for your documents, what to pack and what things cost here." },
  { t: "Airport pickup", d: "Someone meets you at arrivals and takes you to where you are staying." },
  { t: "A place to stay", d: "Help finding a room or hostel near your campus." },
  { t: "SIM, M-Pesa and bank", d: "Get a local number and mobile money working on your first day." },
  { t: "Getting around", d: "How matatus, boda bodas and ride apps work, and what is safe." },
  { t: "First-week support", d: "A person you can call or WhatsApp while you settle in." },
];

const faq = [
  { q: "Can you get me admission to a university?", a: "No. You apply to the school yourself. We help once you have your place." },
  { q: "Can you get me a visa or student permit?", a: "No. Immigration decides that. We can explain the steps and what documents students usually prepare, but we cannot promise an outcome." },
  { q: "How much do your services cost?", a: "Prices depend on what you need. [NEEDS CLIENT]" },
  { q: "Which cities do you cover?", a: "[NEEDS CLIENT]" },
  { q: "Do I send my passport through this site?", a: "No. Never send identity documents through the website. We will tell you safely what is needed, if anything." },
];

export default function StudyInKenya() {
  return (
    <>
      <section className="section band-ink">
        <div className="wrap split">
          <div>
            <p className="crumbs" style={{ color: "#ccc" }}><Link href="/" style={{ color: "#ccc" }}>Home</Link> / Study in Kenya</p>
            <h1 className="display h1">You got your place. Now let&apos;s get you here.</h1>
          </div>
          <div>
            <p className="lede">We help international students arrive in Kenya and settle in, from the airport to your first week.</p>
            <div className="hero-actions">
              <a href="#enquire" className="btn btn-pink">Send an enquiry</a>
              <Link href="/contact" className="btn btn-white">WhatsApp us</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section band-pink">
        <div className="wrap">
          <h2 className="display h2" style={{ marginBottom: 20 }}>Your journey</h2>
          <ol className="steps">
            <li><span className="num">01</span><h3>You get your place</h3><p>Your school sends your offer letter.</p></li>
            <li><span className="num">02</span><h3>You tell us your plans</h3><p>Send the form below. We reply on WhatsApp.</p></li>
            <li><span className="num">03</span><h3>We plan your arrival</h3><p>Pickup, room and a checklist before you fly.</p></li>
            <li><span className="num">04</span><h3>You land</h3><p>We meet you and take you to your room.</p></li>
            <li><span className="num">05</span><h3>Your first week</h3><p>SIM, M-Pesa, campus, getting around.</p></li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div>
            <h2 className="display h2" style={{ marginBottom: 16 }}>How we help</h2>
            <p className="muted">Exact services and prices: <span className="needs">[NEEDS CLIENT]</span></p>
            <div style={{ position: "relative", aspectRatio: "4 / 3", marginTop: 20 }} className="photo-needed" role="img" aria-label="Photo needed">
              PHOTO NEEDED: students arriving with luggage at Nairobi airport arrivals, with consent
            </div>
          </div>
          <div className="services">
            {services.map((s) => <div key={s.t}><h3>{s.t}</h3><p>{s.d}</p></div>)}
          </div>
        </div>
      </section>

      <section id="faq" className="section band-warm">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <h2 className="display h2" style={{ marginBottom: 16 }}>Questions</h2>
          {faq.map((f) => (
            <details key={f.q} className="acc"><summary>{f.q}</summary><div><p>{f.a}</p></div></details>
          ))}
        </div>
      </section>

      <section id="enquire" className="section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <h2 className="display h2" style={{ marginBottom: 8 }}>Send an enquiry</h2>
          <p className="muted" style={{ marginBottom: 24 }}>We reply on WhatsApp, usually within one working day. <span className="needs">[NEEDS CLIENT: confirm reply time]</span></p>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
