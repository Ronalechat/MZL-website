"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const HIGHLIGHTS = [
  { label: "Years exp.", value: "7+" },
  { label: "Design systems", value: "4" },
  { label: "Stack", value: "React · TS · D3" },
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "#0d1f2d",
        padding: "clamp(80px,12vw,160px) clamp(24px,6vw,96px)",
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
          01 — About
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(32px,6vw,80px)", alignItems: "start" }}>

          {/* Body text */}
          <div>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                  fontSize: "clamp(40px,6vw,80px)",
                  lineHeight: 0.95,
                  letterSpacing: "0.02em",
                  color: "#e0f7fa",
                  marginBottom: 28,
                }}
              >
                THE ENGINEER
                <br />
                <span style={{ color: "#00E5FF" }}>BEHIND THE SCREEN.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                fontSize: "clamp(15px,1.3vw,17px)",
                color: "#7ecfdc",
                lineHeight: 1.75,
                maxWidth: 580,
                marginBottom: 20,
              }}
            >
              I build interfaces where data becomes legible — dashboards that handle 10k+ rows
              without flinching, chart systems that keep 60fps during brush interactions, and design
              systems that scale across teams.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.42 }}
              style={{
                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                fontSize: "clamp(15px,1.3vw,17px)",
                color: "#7ecfdc",
                lineHeight: 1.75,
                maxWidth: 580,
              }}
            >
              Background in fintech, media, and GIS. I care about the performance budget as much as
              the pixel — and I think the best interfaces are the ones where the engineering is invisible.
            </motion.p>
          </div>

          {/* Stats column */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 28,
              paddingTop: 8,
              flexShrink: 0,
            }}
          >
            {HIGHLIGHTS.map(({ label, value }) => (
              <div key={label}>
                <div style={{
                  fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                  fontSize: "clamp(32px,4vw,48px)",
                  lineHeight: 1,
                  letterSpacing: "0.04em",
                  color: "#00E5FF",
                }}>
                  {value}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#3d7a8a",
                  marginTop: 4,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
