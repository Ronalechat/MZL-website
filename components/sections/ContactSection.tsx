"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "@/lib/data/profile";

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
        <div style={{ overflow: "hidden", marginBottom: 32 }}>
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

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
          style={{
            fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.65,
            maxWidth: 460,
            marginBottom: 40,
          }}
        >
          Open to freelance projects, full-time roles, and interesting
          collaborations. The best way to reach me is via LinkedIn.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* Primary — LinkedIn */}
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(24px, 4vw, 52px)",
              letterSpacing: "0.02em",
              color: "#ffffff",
              textDecoration: "none",
              display: "inline-block",
              borderBottom: "2px solid rgba(255,255,255,0.25)",
              paddingBottom: 4,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
            }}
          >
            Connect on LinkedIn →
          </a>

          {/* Secondary — GitHub */}
          <a
            href={profile.githubUrl}
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
            onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
          >
            github.com/ronalechat →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
