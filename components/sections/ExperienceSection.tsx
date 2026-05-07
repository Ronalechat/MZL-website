"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import styles from "./ExperienceSection.module.css";

const COMPANIES = [
  { id: "thinkmill",  name: "Thinkmill",     logo: "/thinkmill.avif",  w: 130 },
  { id: "edapp",      name: "EdApp",          logo: "/EdApp.png",       w: 100 },
  { id: "lendi",      name: "Lendi",          logo: "/Lendi.png",       w: 90  },
  { id: "nova",       name: "Nova",           logo: "/Nova.webp",       w: 100 },
  { id: "propeller",  name: "Propeller Aero", logo: "/propeller.avif",  w: 130 },
] as const;

function LogoItem({ co }: { co: (typeof COMPANIES)[number] }) {
  return (
    <div className={styles.logoItem}>
      <Image
        src={co.logo}
        alt={co.name}
        width={co.w}
        height={40}
        style={{ objectFit: "contain", display: "block" }}
      />
    </div>
  );
}

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      id="experience"
      style={{
        background: "var(--color-bg-editorial)",
        padding: "clamp(56px, 8vw, 100px) 0",
        borderTop: "1px solid var(--color-border-editorial)",
        overflow: "hidden",
      }}
    >
      {/* Section label */}
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
          marginBottom: 48,
          paddingLeft: "clamp(24px, 6vw, 96px)",
        }}
      >
        Experience
      </motion.p>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className={styles.marqueeWrapper}
      >
        <div className={styles.marqueeTrack} role="list">
          {COMPANIES.map((co) => (
            <LogoItem key={co.id} co={co} />
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className={styles.marqueeTrack} aria-hidden>
          {COMPANIES.map((co) => (
            <LogoItem key={`${co.id}-dup`} co={co} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
