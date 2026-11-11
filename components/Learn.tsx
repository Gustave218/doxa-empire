"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { money, type Product } from "@/lib/catalog";
import { PayButtons } from "./Pay";
import { LockIcon, PlayIcon, CloseIcon, CheckIcon, BagIcon, BookIcon } from "./Icons";

const TONES = [
  ["#111111", "#2b2b2b"], ["#b0145f", "#e4318c"], ["#1f1f1f", "#3a3a3a"], ["#e4318c", "#ff5aa8"], ["#0d0d0d", "#b0145f"],
];

export function VideoCard({ p, index }: { p: Product; index: number }) {
  const { currency, add } = useCart();
  const [owned, setOwned] = useState(false);
  const [watch, setWatch] = useState<"preview" | "full" | null>(null);
  const [a, b] = TONES[index % TONES.length];

  return (
    <article className="video-card" id={p.slug}>
      <div className="video-thumb" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
        <span className="video-num">0{index + 1}</span>
        <p className="video-thumb-title serif">{p.name}</p>
        <div className="video-thumb-meta"><span>{p.minutes} min</span><span>{p.chapters?.length} lessons</span><span>{p.level}</span></div>
        {owned ? (
          <button className="play-big" onClick={() => setWatch("full")} aria-label={`Play ${p.name}`}><PlayIcon size={26} /></button>
        ) : (
          <div className="locked">
            <span className="lock-chip"><LockIcon size={14} /> Locked</span>
            <button className="preview-btn" onClick={() => setWatch("preview")}><PlayIcon size={14} /> Watch free preview</button>
          </div>
        )}
        {p.badge && <span className="tag light">{p.badge}</span>}
      </div>
      <div className="video-body">
        <h3 className="serif h3">{p.name}</h3>
        <p className="muted">{p.description}</p>
        <ol className="chapters">
          {p.chapters?.map((c, i) => (
            <li key={c}>
              <span className="ch-n">{String(i + 1).padStart(2, "0")}</span>{c}
              {owned ? <CheckIcon size={14} className="ch-ok" /> : <LockIcon size={14} className="ch-lock" />}
            </li>
          ))}
        </ol>
        {owned ? (
          <button className="btn btn-block" onClick={() => setWatch("full")}><PlayIcon size={16} /> Start watching</button>
        ) : (
          <>
            <div className="row-between price-row">
              <p className="price-lg">{money(p.price[currency], currency)}</p>
              <button className="link small add-link" onClick={() => add({ slug: p.slug, qty: 1 })}><BagIcon size={14} /> Add to bag</button>
            </div>
            <PayButtons amount={money(p.price[currency], currency)} title={p.name} onPaid={() => setOwned(true)} />
          </>
        )}
      </div>
      {watch && <VideoModal title={p.name} preview={watch === "preview"} onClose={() => setWatch(null)} />}
    </article>
  );
}

function VideoModal({ title, preview, onClose }: { title: string; preview: boolean; onClose: () => void }) {
  return (
    <div className="modal-scrim dark" onClick={onClose}>
      <div className="video-modal" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="row-between">
          <p className="serif video-modal-title">{title}{preview && <span className="lock-chip">Preview</span>}</p>
          <button className="icon-btn light" onClick={onClose} aria-label="Close video"><CloseIcon /></button>
        </div>
        <video src="/samples/preview.mp4" controls autoPlay playsInline />
        <p className="small muted-light">Sample video for the showcase. Your real lessons will play here.</p>
      </div>
    </div>
  );
}

export function EbookCover({ p, size = "md" }: { p: Product; size?: "md" | "lg" }) {
  const c = p.cover!;
  return (
    <div className={`cover cover-${size}`} style={{ background: c.bg, color: c.fg }}>
      <span className="cover-brand" style={{ color: c.accent }}>Doxa Empire</span>
      <span className="cover-rule" style={{ background: c.accent }} />
      <span className="cover-title serif">{p.name}</span>
      <span className="cover-foot">{p.pages} pages</span>
    </div>
  );
}

export function EbookCard({ p }: { p: Product }) {
  const { currency, add } = useCart();
  const [owned, setOwned] = useState(false);
  return (
    <article className="ebook" id={p.slug}>
      <div className="ebook-visual">
        <EbookCover p={p} />
        {p.badge && <span className="tag">{p.badge}</span>}
      </div>
      <div className="ebook-body">
        <h3 className="serif h3">{p.name}</h3>
        <p className="muted">{p.short} {p.description}</p>
        <p className="ebook-meta"><BookIcon size={16} /> PDF + ePub · {p.pages} pages · Instant download</p>
        {owned ? (
          <a className="btn btn-block" href="#" onClick={(e) => e.preventDefault()}><CheckIcon size={16} /> Download your copy</a>
        ) : (
          <>
            <div className="row-between price-row">
              <p className="price-lg">{money(p.price[currency], currency)}</p>
              <button className="link small add-link" onClick={() => add({ slug: p.slug, qty: 1 })}><BagIcon size={14} /> Add to bag</button>
            </div>
            <PayButtons amount={money(p.price[currency], currency)} title={`${p.name} (ebook)`} onPaid={() => setOwned(true)} />
          </>
        )}
      </div>
    </article>
  );
}
