"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const GREEN = "#4F7B35";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PROJECTS = [
  {
    number: "01",
    title: "P!nga Photography",
    description:
      "A comissioned portfolio and booking website for local Sydney artist and photographer Paul Pinga Matereke. Shows a selection ofphotography, shot on film and digital.",
    href: "https://pinga.photos",
    label: "pinga.photos",
    tags: ["Next.js", "Photography", "Design systems", "CMS"],
  },
  {
    number: "02",
    title: "Financial Visualisation Demo",
    description:
      "Portfolio workbench and graph gallery. Virtualised table with D3 brush charts and six canvas/SVG exhibits — LTTB downsampling, force simulation, crossfilter scatter, and parallel coordinates.",
    href: "https://demos.mzl-au.dev",
    label: "demos.mzl-au.dev",
    tags: ["D3 v7", "TanStack", "React 19", "Canvas 2D"],
  },
  {
    number: "03",
    title: "Component Library",
    description:
      "Storybook component library — reusable UI primitives built in React and TypeScript, covering typography, layout, and data display components.",
    href: "https://storybook.mzl-au.dev",
    label: "storybook.mzl-au.dev",
    tags: ["Storybook", "React", "TypeScript"],
  },
] as const;

export default function LinksSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        background: "#FAFAF7",
        padding: "clamp(64px, 10vw, 120px) clamp(24px, 6vw, 96px)",
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
            marginBottom: 32,
          }}
        >
          Portfolio
        </motion.p>

        <div style={{ overflow: "hidden", marginBottom: 48 }}>
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(44px, 7vw, 100px)",
              lineHeight: 0.92,
              letterSpacing: "0.01em",
              color: "#1A1A1A",
              margin: 0,
            }}
          >
            BUILT.
          </motion.h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.1, ease: EASE }}
            >
              <ProjectRow project={project} />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{
            marginTop: 56,
            paddingTop: 28,
            borderTop: "1px solid #E8E5DC",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#AAA",
            }}
          >
            Michael Lin · Sydney · 2025
          </span>
          <a
            href="mailto:hi@mzl.au"
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: GREEN,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.65";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            hi@mzl.au →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectRow({ project }: { project: (typeof PROJECTS)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: "clamp(16px, 3vw, 40px)",
          alignItems: "start",
          padding: "clamp(20px, 3vw, 28px) 0",
          borderBottom: `1px solid ${hovered ? "#CECAC0" : "#E8E5DC"}`,
          cursor: "pointer",
          transition: "border-color 0.2s",
        }}
      >
        {/* Number */}
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "#BBB",
            paddingTop: 5,
            minWidth: 24,
          }}
        >
          {project.number}
        </span>

        {/* Body */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(22px, 3vw, 34px)",
              letterSpacing: "0.03em",
              color: hovered ? GREEN : "#1A1A1A",
              transition: "color 0.2s",
              margin: "0 0 8px",
              lineHeight: 1,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "#666",
              lineHeight: 1.65,
              maxWidth: 520,
              marginBottom: 12,
            }}
          >
            {project.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.52rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#999",
                  border: "1px solid #DDD",
                  padding: "3px 7px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            paddingTop: 4,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 4,
          }}
        >
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.18 }}
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: 18,
              color: hovered ? GREEN : "#CCC",
              transition: "color 0.2s",
            }}
            aria-hidden
          >
            →
          </motion.span>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
              color: hovered ? GREEN : "#AAA",
              transition: "color 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {project.label}
          </span>
        </div>
      </div>
    </a>
  );
}
