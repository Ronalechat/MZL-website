"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const LINKS = [
  {
    number: "01",
    title: "Financial Visualisation Demo",
    description:
      "Portfolio workbench + graph gallery. 10k-row virtualised table, D3 brush charts, and six canvas/SVG exhibits demonstrating LTTB downsampling, force simulation, crossfilter scatter, and parallel coordinates — up to 500k data points.",
    href: "https://demos.mzl-au.dev",
    label: "demos.mzl-au.dev",
    tags: ["D3 v7", "TanStack", "React 19", "Canvas 2D"],
    available: true,
  },
  {
    number: "02",
    title: "Photography",
    description:
      "A curated selection of photography. Shot on film and digital across Sydney and abroad.",
    href: "https://pinga.photos",
    label: "pinga.photos",
    tags: ["Next.js", "Photography"],
    available: true,
  },
  {
    number: "03",
    title: "Component Library",
    description:
      "Storybook component library — reusable UI primitives built in React and TypeScript.",
    href: "#",
    label: "Coming soon",
    tags: ["Storybook", "React", "TypeScript"],
    available: false,
  },
] as const;

export default function LinksSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        background: "#080c10",
        padding: "clamp(80px,12vw,160px) clamp(24px,6vw,96px)",
        borderTop: "1px solid rgba(0,229,255,0.08)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#00E5FF",
            marginBottom: 40,
          }}
        >
          02 — Work
        </motion.p>

        <div style={{ overflow: "hidden", marginBottom: 56 }}>
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(40px,6vw,80px)",
              lineHeight: 0.95,
              letterSpacing: "0.02em",
              color: "#e0f7fa",
              margin: 0,
            }}
          >
            WHAT I&apos;VE{" "}
            <span style={{ color: "#00E5FF" }}>SHIPPED.</span>
          </motion.h2>
        </div>

        {/* Link cards */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {LINKS.map((link, i) => (
            <motion.div
              key={link.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <LinkCard link={link} />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: "1px solid rgba(0,229,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#3d7a8a",
          }}>
            Michael Lin · Sydney · 2025
          </span>
          <a
            href="mailto:hi@mzl.au"
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#00E5FF",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            hi@mzl.au →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function LinkCard({ link }: { link: typeof LINKS[number] }) {
  const [hovered, setHovered] = useState(false);
  const isAvailable = link.available;

  const content = (
    <div
      onMouseEnter={() => isAvailable && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: "clamp(16px,3vw,40px)",
        alignItems: "start",
        padding: "clamp(20px,3vw,32px) 0",
        borderBottom: "1px solid rgba(0,229,255,0.08)",
        cursor: isAvailable ? "pointer" : "default",
        transition: "border-color 0.2s",
        borderColor: hovered ? "rgba(0,229,255,0.25)" : "rgba(0,229,255,0.08)",
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "0.65rem",
        letterSpacing: "0.15em",
        color: "#3d7a8a",
        paddingTop: 6,
        minWidth: 28,
      }}>
        {link.number}
      </span>

      {/* Body */}
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
          <h3 style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(22px,3vw,32px)",
            letterSpacing: "0.04em",
            color: hovered ? "#00E5FF" : "#e0f7fa",
            transition: "color 0.2s",
            margin: 0,
            lineHeight: 1,
          }}>
            {link.title}
          </h3>
          {!isAvailable && (
            <span style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#3d7a8a",
              border: "1px solid rgba(61,122,138,0.3)",
              padding: "2px 6px",
            }}>
              soon
            </span>
          )}
        </div>
        <p style={{
          fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
          fontSize: "clamp(13px,1.1vw,15px)",
          color: "#7ecfdc",
          lineHeight: 1.65,
          maxWidth: 560,
          marginBottom: 14,
        }}>
          {link.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {link.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.55rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#3d7a8a",
              border: "1px solid rgba(0,229,255,0.1)",
              padding: "3px 8px",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow + URL */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 6,
        paddingTop: 4,
        flexShrink: 0,
      }}>
        <motion.span
          animate={{ x: hovered ? 4 : 0, opacity: isAvailable ? (hovered ? 1 : 0.4) : 0.2 }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: 20,
            color: "#00E5FF",
          }}
          aria-hidden
        >
          →
        </motion.span>
        <span style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.6rem",
          letterSpacing: "0.1em",
          color: isAvailable ? (hovered ? "#00E5FF" : "#3d7a8a") : "#3d7a8a",
          transition: "color 0.2s",
          whiteSpace: "nowrap",
        }}>
          {link.label}
        </span>
      </div>
    </div>
  );

  if (isAvailable) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}
