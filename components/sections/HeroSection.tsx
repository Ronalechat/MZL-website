"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven: as hero scrolls out, text slides up and fades
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY      = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        background: "#080c10",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Faint grid texture */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* Photo — right side, bleeds off screen */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "clamp(280px, 45vw, 680px)",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <Image
          src="/portrait-cropped-no-bg.png"
          alt="Michael Lin"
          fill
          priority
          style={{ objectFit: "contain", objectPosition: "right bottom" }}
        />
        {/* Left-edge fade so photo blends into background */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, #080c10 0%, #080c10 8%, transparent 40%)",
          }}
        />
      </motion.div>

      {/* Text block — curtain reveal + scroll fade */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10"
        css-max-w="640px"
        css-px="clamp(24px,6vw,96px)"
        css-py="64px"
      >
        {/* Curtain reveal wrapper — overflow hidden acts as the curtain */}
        <div style={{ maxWidth: 640, padding: "64px clamp(24px,6vw,96px)" }}>

          {/* Overline */}
          <div style={{ overflow: "hidden", marginBottom: 16 }}>
            <motion.p
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#00E5FF",
                margin: 0,
              }}
            >
              Frontend Engineer · Sydney
            </motion.p>
          </div>

          {/* Name — two lines, staggered */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(72px, 12vw, 160px)",
                lineHeight: 0.9,
                letterSpacing: "0.02em",
                color: "#e0f7fa",
                margin: "0 0 4px",
              }}
            >
              MICHAEL
            </motion.h1>
          </div>
          <div style={{ overflow: "hidden", marginBottom: 28 }}>
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(72px, 12vw, 160px)",
                lineHeight: 0.9,
                letterSpacing: "0.02em",
                color: "#00E5FF",
                margin: 0,
              }}
            >
              LIN
            </motion.h1>
          </div>

          {/* Tagline */}
          <div style={{ overflow: "hidden", marginBottom: 40 }}>
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                fontSize: "clamp(14px, 1.4vw, 18px)",
                color: "#7ecfdc",
                lineHeight: 1.65,
                maxWidth: 420,
                margin: 0,
              }}
            >
              Building interactive, performance-first interfaces with React &amp; TypeScript.
              Obsessed with the space where engineering meets design.
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            style={{ display: "flex", alignItems: "center", gap: 24 }}
          >
            <a
              href="#projects"
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#00E5FF",
                border: "1px solid rgba(0,229,255,0.4)",
                padding: "12px 24px",
                textDecoration: "none",
                transition: "background 0.2s, border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "#00E5FF";
                el.style.color = "#080c10";
                el.style.borderColor = "#00E5FF";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "transparent";
                el.style.color = "#00E5FF";
                el.style.borderColor = "rgba(0,229,255,0.4)";
              }}
            >
              View Work
            </a>
            <a
              href="#about"
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7ecfdc",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#00E5FF"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#7ecfdc"; }}
            >
              About me →
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, #00E5FF, transparent)",
          }}
        />
        <span style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.55rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#3d7a8a",
        }}>
          scroll
        </span>
      </motion.div>
    </section>
  );
}
