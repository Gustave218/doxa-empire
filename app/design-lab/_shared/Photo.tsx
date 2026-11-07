import type { CSSProperties } from "react";

/**
 * Plain labelled block that stands in for a real photograph.
 * Every label here is mirrored in CONTENT_NEEDED.md.
 */
export function Photo({
  shot,
  ratio = "4 / 5",
  tone = "light",
  className,
  style,
}: {
  shot: string;
  ratio?: string;
  tone?: "light" | "dark";
  className?: string;
  style?: CSSProperties;
}) {
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Photo needed: ${shot}`}
      className={className}
      style={{
        aspectRatio: ratio,
        background: dark ? "#3a3a3c" : "#d9d9db",
        color: dark ? "#ffffff" : "#222222",
        display: "flex",
        alignItems: "flex-end",
        padding: "14px",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        fontSize: "11px",
        lineHeight: 1.4,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        width: "100%",
        ...style,
      }}
    >
      <span>
        <strong>Photo needed:</strong> {shot}
      </span>
    </div>
  );
}

export function Logo({ height = 44 }: { height?: number }) {
  // Supplied file, unaltered except whitespace trim. Original is a low-res screenshot.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/doxa-logo-trimmed.png"
      alt="Doxa Business logo"
      height={height}
      style={{ height, width: "auto", display: "block" }}
    />
  );
}
