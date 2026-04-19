"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import CrtOverlay from "@/components/ascii/CrtOverlay";
import AsciiPortrait from "@/components/ascii/AsciiPortrait";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-dvh flex items-center overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Subtle radial glow behind portrait */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 35% 55%, rgba(0,229,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-24 lg:py-0">

        {/* Left — ASCII portrait in CRT zone */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center lg:justify-start"
        >
          <CrtOverlay className="rounded-sm">
            <AsciiPortrait
              src="/portrait-cropped-no-bg.png"
              cols={220}
              rows={140}
            />
          </CrtOverlay>
        </motion.div>

        {/* Right — editorial type zone */}
        <div className="flex flex-col gap-6 lg:pl-8">

          {/* Overline tag */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-mono text-xs tracking-[0.25em] uppercase text-[var(--color-text-secondary)]"
          >
            Frontend Engineer
          </motion.p>

          {/* Massive editorial name */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="type-hero text-[var(--color-text)] leading-none"
            >
              MZL
            </motion.h1>
          </div>

          {/* Full name with stagger */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl lg:text-5xl text-[var(--color-text-secondary)] tracking-wider"
            >
              MICHAEL
            </motion.p>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-24"
            style={{ background: "var(--color-primary)" }}
          />

          {/* Bio line */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Building interactive, performance-first interfaces with React & TypeScript.
            Shipped 4 design systems. Obsessed with the space where engineering meets design.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            className="flex items-center gap-6 pt-2"
          >
            <a
              href="#experience"
              className="font-mono text-xs tracking-[0.2em] uppercase px-5 py-3 border transition-colors duration-200 hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] hover:border-[var(--color-primary)]"
              style={{
                borderColor: "var(--color-border-emphasis)",
                color: "var(--color-primary)",
              }}
            >
              View Work
            </a>
            <a
              href="#contact"
              className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              Get in touch →
            </a>
          </motion.div>

          {/* Terminal hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="font-mono text-[0.65rem] tracking-widest uppercase text-[var(--color-text-muted)] mt-4"
          >
            Press{" "}
            <kbd className="px-1.5 py-0.5 border border-[var(--color-border)] rounded text-[var(--color-text-secondary)]">
              Ctrl+K
            </kbd>{" "}
            to open terminal
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-12"
          style={{ background: "linear-gradient(to bottom, var(--color-primary), transparent)" }}
        />
        <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)]">
          scroll
        </span>
      </motion.div>
    </section>
  );
}
