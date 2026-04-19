"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const GREEN = "#4F7B35";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Text slides up and fades as you scroll out of the hero
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        background: GREEN,
        overflow: "hidden",
      }}
    >
      {/* Portrait — centered, no background treatment, green shows through */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "clamp(680px, 66vw, 888px)",
            height: "100%",
          }}
        >
          <img
            src="/portrait-cropped-no-bg.png"
            alt=""
            style={{ height: "100%", objectFit: "contain", objectPosition: "bottom" }}
          />
        </div>
      </div>

      {/* Text block — pinned to bottom, slides up on scroll */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          y: textY,
          opacity: textOpacity,
          zIndex: 10,
        }}
      >
        <div
          style={{
            padding: "0 clamp(24px, 6vw, 80px) clamp(32px, 5vw, 52px)",
          }}
        >
          {/* Eyebrow */}
          <div style={{ overflow: "hidden", marginBottom: 6 }}>
            <motion.p
              initial={{ y: "130%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.6rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                margin: 0,
              }}
            >
              Frontend Engineer · Sydney
            </motion.p>
          </div>

          {/* Name — single curtain, full width */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(80px, 15vw, 210px)",
                lineHeight: 0.88,
                letterSpacing: "0.01em",
                color: "#FFFFFF",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              MICHAEL LIN
            </motion.h1>
          </div>

          {/* Tagline */}
          <div style={{ overflow: "hidden", marginTop: 14 }}>
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              style={{
                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                fontSize: "clamp(13px, 1.2vw, 16px)",
                backgroundColor: "rgba(60, 60, 60, 0.3)",
                color: "white",
                lineHeight: 1.65,
                maxWidth: 420,
                margin: 0,
              }}
            >
              Interactive data visualisation · React &amp; TypeScript · Performance-first
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
