"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = pastHero ? "var(--color-text-editorial)" : "#ffffff";
  const mutedColor = pastHero ? "var(--color-text-dim-warm)" : "rgba(255,255,255,0.55)";

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-[40] transition-all duration-300"
      style={{
        background: pastHero ? "rgba(250, 250, 247, 0.92)" : "transparent",
        backdropFilter: pastHero ? "blur(12px)" : "none",
        borderBottom: pastHero ? "1px solid var(--color-border-editorial)" : "none",
      }}
    >
      <nav
        className="max-w-[1400px] mx-auto px-8 lg:px-16 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Monogram mark */}
        <a
          href="#hero"
          className="font-display text-2xl tracking-wider transition-colors duration-300"
          style={{ color: textColor }}
          aria-label="MZL — back to top"
        >
          MZL
        </a>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-100"
              style={{ color: mutedColor }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Terminal shortcut hint */}
        <div className="hidden sm:flex items-center gap-1.5">
          <kbd
            className="font-mono text-[0.6rem] px-1.5 py-0.5 border rounded transition-colors duration-300"
            style={{
              borderColor: pastHero ? "var(--color-border-editorial)" : "rgba(255,255,255,0.2)",
              color: mutedColor,
            }}
          >
            ⌃K
          </kbd>
          <span
            className="font-mono text-[0.6rem] tracking-widest uppercase transition-colors duration-300"
            style={{ color: mutedColor }}
          >
            terminal
          </span>
        </div>
      </nav>
    </motion.header>
  );
}
