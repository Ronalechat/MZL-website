"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: "var(--color-brand)",
        padding: "clamp(80px, 14vw, 160px) clamp(24px, 6vw, 96px)",
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
            color: "rgba(255,255,255,0.5)",
            marginBottom: 32,
          }}
        >
          Contact
        </motion.p>

        {/* Heading */}
        <div style={{ overflow: "hidden", marginBottom: 48 }}>
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(52px, 10vw, 130px)",
              lineHeight: 0.9,
              letterSpacing: "0.01em",
              color: "#ffffff",
              margin: 0,
            }}
          >
            GET IN TOUCH.
          </motion.h2>
        </div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <a
            href="mailto:hi@mzl.au"
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(24px, 4vw, 52px)",
              letterSpacing: "0.02em",
              color: "#ffffff",
              textDecoration: "none",
              display: "inline-block",
              borderBottom: "2px solid rgba(255,255,255,0.25)",
              paddingBottom: 4,
              transition: "border-color 0.2s, opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
            }}
          >
            hi@mzl.au
          </a>

          <a
            href="https://github.com/ronalechat"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.55)";
            }}
          >
            github.com/ronalechat →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
