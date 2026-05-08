"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
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

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: pastHero ? "rgba(250,250,247,0.95)" : "transparent",
        backdropFilter: pastHero ? "blur(12px)" : "none",
        borderBottom: pastHero ? "1px solid var(--color-border-editorial)" : "none",
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}
    >
      <nav
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(24px, 6vw, 80px)",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        aria-label="Main navigation"
      >
        {/* Monogram */}
        <a
          href="#hero"
          aria-label="MZL — back to top"
          style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "1.5rem",
            letterSpacing: "0.08em",
            color: pastHero ? "var(--color-text-editorial)" : "#ffffff",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
        >
          MZL
        </a>

        {/* Right side: links + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 3vw, 40px)" }}>
          {/* Nav links — hidden on small screens */}
          <div
            style={{ display: "flex", gap: "clamp(20px, 3vw, 36px)" }}
            className="hidden sm:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: pastHero ? "var(--color-text-subtle)" : "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = pastHero ? "var(--color-brand)" : "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = pastHero
                    ? "var(--color-text-subtle)"
                    : "rgba(255,255,255,0.65)";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "7px 14px",
              border: pastHero
                ? "1px solid var(--color-brand)"
                : "1px solid rgba(255,255,255,0.5)",
              background: pastHero ? "var(--color-brand)" : "transparent",
              color: "#ffffff",
              transition: "background 0.25s ease, border-color 0.25s ease, opacity 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Get in touch →
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
