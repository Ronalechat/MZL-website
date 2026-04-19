"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-[var(--z-overlay)] transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5, 13, 20, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
      }}
    >
      <nav
        className="max-w-[1400px] mx-auto px-8 lg:px-16 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Monogram mark */}
        <a
          href="#hero"
          className="font-display text-2xl tracking-wider transition-colors hover:text-[var(--color-primary)]"
          style={{ color: "var(--color-text)" }}
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
              className="font-mono text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[var(--color-primary)]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Terminal shortcut hint */}
        <div className="hidden sm:flex items-center gap-1.5">
          <kbd
            className="font-mono text-[0.6rem] px-1.5 py-0.5 border rounded"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-muted)",
            }}
          >
            ⌃K
          </kbd>
          <span
            className="font-mono text-[0.6rem] tracking-widest uppercase"
            style={{ color: "var(--color-text-muted)" }}
          >
            terminal
          </span>
        </div>
      </nav>
    </motion.header>
  );
}
