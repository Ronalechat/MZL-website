"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const GREEN = "#4F7B35";

const COMPANIES = [
  { id: "thinkmill",  name: "Thinkmill",     logo: "/thinkmill.avif",  w: 130 },
  { id: "edapp",      name: "EdApp",          logo: "/EdApp.png",       w: 100 },
  { id: "lendi",      name: "Lendi",          logo: "/Lendi.png",       w: 90  },
  { id: "nova",       name: "Nova",           logo: "/Nova.webp",       w: 100 },
  { id: "propeller",  name: "Propeller Aero", logo: "/propeller.avif",  w: 130 },
] as const;

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      id="experience"
      style={{
        background: "#FAFAF7",
        padding: "clamp(56px, 8vw, 100px) clamp(24px, 6vw, 96px)",
        borderTop: "1px solid #E8E5DC",
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
            marginBottom: 48,
          }}
        >
          Experience
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(32px, 6vw, 72px)",
            alignItems: "center",
          }}
        >
          {COMPANIES.map((co, i) => (
            <motion.div
              key={co.id}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.12 + i * 0.07 }}
            >
              <Image
                src={co.logo}
                alt={co.name}
                width={co.w}
                height={40}
                style={{
                  objectFit: "contain",
                  filter: "grayscale(1) contrast(0.6)",
                  opacity: 0.55,
                  display: "block",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
