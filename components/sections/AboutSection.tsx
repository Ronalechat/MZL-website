"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "var(--color-bg-editorial)",
        padding: "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 96px)",
      }}
    >
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "start",
        }}
        className="max-md:grid-cols-1"
      >
        {/* Left — main copy */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--color-brand)",
              marginBottom: 32,
            }}
          >
            About
          </motion.p>

          <div style={{ overflow: "hidden", marginBottom: 32 }}>
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(44px, 7vw, 100px)",
                lineHeight: 0.92,
                letterSpacing: "0.01em",
                color: "var(--color-text-editorial)",
                margin: 0,
              }}
            >
              ENGINEERING MEETS DESIGN.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28 }}
            style={{
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              fontSize: "clamp(16px, 1.4vw, 19px)",
              color: "var(--color-text-body)",
              lineHeight: 1.8,
              maxWidth: 560,
              marginBottom: 20,
            }}
          >
            I build interfaces where data becomes legible — dashboards that handle tens of thousands
            of rows without flinching, chart systems that keep 60fps during brush interactions, and
            design systems that scale across teams.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.42 }}
            style={{
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              fontSize: "clamp(16px, 1.4vw, 19px)",
              color: "var(--color-text-subtle)",
              lineHeight: 1.8,
              maxWidth: 560,
            }}
          >
            Background in fintech, media, and GIS. I care about the performance budget as much as
            the pixel — the best interfaces are the ones where the engineering is invisible.
          </motion.p>
        </div>

        {/* Right — status + focus areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          style={{ paddingTop: "clamp(0px, 2vw, 56px)" }}
        >
          {/* Availability badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid var(--color-brand)",
              padding: "6px 12px",
              marginBottom: 36,
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--color-brand)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-brand)",
              }}
            >
              Available for new opportunities
            </span>
          </div>

          {/* Focus keywords */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["React & TypeScript", "Data Visualisation", "Design Systems", "Sydney, AU"].map(
              (kw, i) => (
                <motion.p
                  key={kw}
                  initial={{ opacity: 0, x: 8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.07 }}
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                    color: "var(--color-text-dim-warm)",
                    margin: 0,
                    letterSpacing: "0.05em",
                  }}
                >
                  {kw}
                </motion.p>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
