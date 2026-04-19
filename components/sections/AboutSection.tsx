"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const GREEN = "#4F7B35";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "#FAFAF7",
        padding: "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 96px)",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: GREEN,
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
              color: "#1A1A1A",
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
            color: "#444",
            lineHeight: 1.8,
            maxWidth: 620,
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
            color: "#666",
            lineHeight: 1.8,
            maxWidth: 620,
          }}
        >
          Background in fintech, media, and GIS. I care about the performance budget as much as
          the pixel — the best interfaces are the ones where the engineering is invisible.
        </motion.p>
      </div>
    </section>
  );
}
