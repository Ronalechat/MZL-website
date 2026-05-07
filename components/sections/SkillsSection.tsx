"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data/skills";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        background: "var(--color-bg-editorial)",
        padding: "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 96px)",
        borderTop: "1px solid var(--color-border-editorial)",
      }}
    >
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "start",
        }}
        className="max-md:grid-cols-1"
      >
        {/* Left — heading */}
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
            Skills
          </motion.p>

          <div style={{ overflow: "hidden" }}>
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
              WHAT I WORK WITH.
            </motion.h2>
          </div>
        </div>

        {/* Right — skill category grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(24px, 4vw, 40px)",
            paddingTop: "clamp(0px, 2vw, 16px)",
          }}
        >
          {skills.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: EASE }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--color-brand)",
                  marginBottom: 10,
                }}
              >
                {category.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                  fontSize: "clamp(13px, 1.1vw, 15px)",
                  color: "var(--color-text-body)",
                  lineHeight: 1.75,
                }}
              >
                {category.skills.join(", ")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
