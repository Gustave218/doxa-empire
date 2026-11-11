import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "./EnquiryForm";
import { CapIcon, HomeIcon, SunIcon, PlaneIcon, PhoneIcon, CardIcon, PinIcon, ShieldIcon, ChatIcon, CheckIcon, ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Travel & Settle in Kenya",
  description: "Airport pickup, housing, SIM and bank setup, school support and holidays. Land in Kenya with a local friend on your side.",
};

const AUDIENCES = [
  {
    id: "students", Icon: CapIcon, title: "Students", tone: "t1",
    lede: "Coming to study in Nairobi, Mombasa or Eldoret? We handle the first weeks so you can focus on class.",
    items: ["Admission & document guidance", "Student visa & pass checklist", "Hostel or shared apartment near campus", "Airport pickup & first-week host", "Student SIM, M-Pesa & bank account"],
    from: "From USD 150",
  },
  {
    id: "settle", Icon: HomeIcon, title: "Settling in Kenya", tone: "t2",
    lede: "Relocating for work, family or business? Arrive to a home that is ready and a city that makes sense.",
    items: ["House hunting & lease review", "Furnished short-stay while you search", "Work & residence permit guidance", "School search for children", "Drivers, movers & home setup"],
    from: "From USD 350",
  },
  {
    id: "holidays", Icon: SunIcon, title: "Holidays", tone: "t3",
    lede: "Safari at sunrise, Diani sand by noon. Curated trips with trusted local partners and no tourist traps.",
    items: ["Maasai Mara & Amboseli safaris", "Diani, Watamu & Lamu beach stays", "Nairobi city & food tours", "Honeymoon & family packages", "Airport transfers & local guide"],
    from: "From USD 480",
  },
];

const SERVICES = [
  { Icon: PlaneIcon, t: "Airport pickup", d: "Met at JKIA or Moi Airport with your name on a sign, 24/7." },
  { Icon: HomeIcon, t: "Accommodation", d: "Vetted hostels, apartments and homes in safe neighbourhoods." },
  { Icon: PhoneIcon, t: "SIM & M-Pesa", d: "Registered line and M-Pesa wallet on day one." },
  { Icon: CardIcon, t: "Banking", d: "Open a Kenyan account and set up international transfers." },
  { Icon: ShieldIcon, t: "Visa & permits", d: "Clear checklists for eTA, student pass and work permits." },
  { Icon: PinIcon, t: "City orientation", d: "Matatus, Uber, markets, malls, hospitals and safety tips." },
  { Icon: CapIcon, t: "School admission", d: "Guidance on universities, colleges and international schools." },
  { Icon: ChatIcon, t: "A local friend", d: "A WhatsApp host who answers any question for 30 days." },
];

const STEPS = [
  ["Tell us your plans", "Send a short enquiry. No documents needed yet."],
  ["Get your plan & quote", "A host builds a personal arrival plan within 48 hours."],
  ["Confirm & pay", "Secure your package by card or mobile money."],
  ["Land and live", "We meet you at the airport and stay with you through week one."],
];

const FAQ = [
  ["Which countries do you help?", "Anyone coming to Kenya. Most of our students come from DR Congo, Burundi, Rwanda, South Sudan and Cameroon."],
  ["Do you guarantee admission or visas?", "No one honestly can. We guide you through every requirement and check your paperwork so nothing is missed."],
  ["Can I pay in instalments?", "Yes, for settling and student packages. Ask your host for a payment plan."],
  ["Is it safe?", "We only work with vetted accommodation and drivers, and your host is reachable on WhatsApp at any time."],
];

export default function TravelPage() {
  return (
    <>
      <section className="travel-hero">
        <div className="travel-sun" aria-hidden />
        <div className="wrap travel-hero-inner">
          <p className="eyebrow gold">Doxa Travel · Karibu Kenya</p>
          <h1 className="serif display-xl">Land in Kenya<br /><em>like you already live here.</em></h1>
          <p className="lede">Students, families and holidaymakers: we meet you at the airport, find your home, set up your phone and bank, and show you the country we love.</p>
          <div className="cta-row">
            <Link href="#enquire" className="btn btn-gold">Plan my arrival</Link>
            <Link href="#services" className="btn btn-ghost-light">See all services</Link>
          </div>
          <ul className="travel-proof">
            <li><strong>600+</strong><span>arrivals welcomed</span></li>
            <li><strong>14</strong><span>countries</span></li>
            <li><strong>4.9★</strong><span>average rating</span></li>
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head center">
          <p className="eyebrow">Who we help</p>
          <h2 className="serif h2">Three journeys. One trusted host.</h2>
        </div>
        <div className="aud-grid">
          {AUDIENCES.map(({ id, Icon, title, lede, items, from, tone }) => (
            <article key={id} id={id} className={`aud ${tone}`}>
              <span className="aud-icon"><Icon size={26} /></span>
              <h3 className="serif h3">{title}</h3>
              <p>{lede}</p>
              <ul className="ticks">{items.map((i) => <li key={i}><CheckIcon size={15} /> {i}</li>)}</ul>
              <div className="aud-foot">
                <span className="aud-from">{from}</span>
                <Link href="#enquire" className="link-arrow">Enquire</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-band" id="services">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow gold">Services</p>
              <h2 className="serif h2">Everything for your first month, handled.</h2>
            </div>
          </div>
          <div className="svc-grid">
            {SERVICES.map(({ Icon, t, d }) => (
              <div key={t} className="svc"><Icon size={26} /><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head center">
          <p className="eyebrow">How it works</p>
          <h2 className="serif h2">From enquiry to <em>karibu</em> in four steps</h2>
        </div>
        <ol className="steps">
          {STEPS.map(([t, d], i) => (
            <li key={t}><span className="step-n serif">0{i + 1}</span><h3>{t}</h3><p className="muted">{d}</p></li>
          ))}
        </ol>
      </section>

      <section className="wrap section enquire" id="enquire">
        <div className="enquire-grid">
          <div>
            <p className="eyebrow">Enquire</p>
            <h2 className="serif h2">Tell us where you&apos;re coming from.</h2>
            <p className="lede">We reply on WhatsApp within 24 hours with a personal plan and a clear price.</p>
            <div className="faq">
              {FAQ.map(([q, a]) => (
                <details key={q} className="acc"><summary>{q}</summary><p>{a}</p></details>
              ))}
            </div>
          </div>
          <div className="form-card"><EnquiryForm /></div>
        </div>
      </section>

      <section className="wrap section-sm">
        <Link href="/shop" className="cross-link">
          <span><span className="eyebrow">While you wait</span><span className="serif h3">Pack a pair of handmade Maasai slippers</span></span>
          <ArrowIcon size={24} />
        </Link>
      </section>
    </>
  );
}
