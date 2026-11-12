"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { norm } from "@/lib/search";

const CODES = "AF AX AL DZ AS AD AO AI AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BA BW BR IO VG BN BG BF BI KH CM CA CV KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI XK KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF KP MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA KR SS ES LK BL SH KN LC MF PM VC SD SR SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UY UZ VU VA VE VN WF EH YE ZM ZW".split(" ");
// Shown first: where most of our customers are.
const TOP = ["KE", "CD", "CG", "RW", "BI", "UG", "TZ", "CM"];

export type Country = { code: string; name: string };

export function useCountries(): Country[] {
  return useMemo(() => {
    let dn: Intl.DisplayNames | null = null;
    try { dn = new Intl.DisplayNames(["fr"], { type: "region" }); } catch {}
    const all = CODES.map((code) => ({ code, name: (dn?.of(code) as string) || code }));
    const top = TOP.map((c) => all.find((x) => x.code === c)!);
    const rest = all.filter((x) => !TOP.includes(x.code)).sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return [...top, ...rest];
  }, []);
}

const Flag = ({ code }: { code: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`} alt="" width={22} height={16} className="flag" loading="lazy" />
);

export function CountrySelect({ id, name, invalid, defaultCode = "" }: { id: string; name: string; invalid?: boolean; defaultCode?: string }) {
  const countries = useCountries();
  const [code, setCode] = useState(defaultCode);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const chosen = countries.find((c) => c.code === code);
  const shown = useMemo(() => {
    const n = norm(q).trim();
    return n ? countries.filter((c) => norm(c.name).includes(n) || c.code.toLowerCase() === n) : countries;
  }, [q, countries]);

  useEffect(() => {
    const off = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", off);
    return () => document.removeEventListener("mousedown", off);
  }, []);
  useEffect(() => { setActive(0); }, [q]);
  useEffect(() => { list.current?.children[active]?.scrollIntoView({ block: "nearest" }); }, [active]);

  const pick = (c: Country) => { setCode(c.code); setOpen(false); setQ(""); };

  return (
    <div className="country" ref={box}>
      <input type="hidden" name={name} value={chosen ? chosen.name : ""} />
      <button type="button" id={id} className="country-btn" aria-haspopup="listbox" aria-expanded={open} aria-invalid={invalid} onClick={() => setOpen((o) => !o)}>
        {chosen ? <><Flag code={chosen.code} /> <span>{chosen.name}</span></> : <span className="muted">Choisir un pays…</span>}
        <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>
      {open && (
        <div className="country-pop">
          <input autoFocus className="country-search" placeholder="Rechercher un pays…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Rechercher un pays"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, shown.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
              if (e.key === "Enter") { e.preventDefault(); if (shown[active]) pick(shown[active]); }
              if (e.key === "Escape") setOpen(false);
            }} />
          <ul role="listbox" ref={list}>
            {shown.length ? shown.map((c, i) => (
              <li key={c.code} role="option" aria-selected={c.code === code} className={i === active ? "on" : ""} onMouseEnter={() => setActive(i)} onMouseDown={(e) => { e.preventDefault(); pick(c); }}>
                <Flag code={c.code} /> {c.name}
                {!q && i === TOP.length - 1 && <span className="sep" />}
              </li>
            )) : <li className="muted">Aucun pays trouvé</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
