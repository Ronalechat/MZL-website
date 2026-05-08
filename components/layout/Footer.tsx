"use client";

import { profile } from "@/lib/data/profile";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-bg-editorial)",
        borderTop: "1px solid var(--color-border-editorial)",
        padding: "28px clamp(24px, 6vw, 80px)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-text-dim-warm)",
          }}
        >
          Michael Lin · Frontend Engineer · Sydney · © 2026
        </span>

        <a
          href={profile.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-brand)",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.65"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          LinkedIn →
        </a>
      </div>
    </footer>
  );
}
