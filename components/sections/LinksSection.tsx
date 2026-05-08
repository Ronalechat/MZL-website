"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { profile } from "@/lib/data/profile";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PROJECTS = [
  {
    number: "01",
    title: "P!nga Photography",
    description:
      "A commissioned portfolio and booking website for local Sydney artist and photographer Paul Pinga Matereke. Shows a selection of photography, shot on film and digital.",
    href: "https://pinga.photos",
    label: "pinga.photos",
    tags: ["Next.js", "Photography", "Design systems", "CMS"],
    previewSrc: "/previews/pinga-photography.jpg",
  },
  {
    number: "02",
    title: "Financial Visualisation Demo",
    description:
      "Portfolio workbench and graph gallery. Virtualised table with D3 brush charts and six canvas/SVG exhibits — LTTB downsampling, force simulation, crossfilter scatter, and parallel coordinates.",
    href: "https://demos.mzl-au.dev",
    label: "demos.mzl-au.dev",
    tags: ["D3 v7", "TanStack", "React 19", "Canvas 2D"],
    previewSrc: "/previews/finviz-demo.jpg",
  },
  {
    number: "03",
    title: "Component Library",
    description:
      "Storybook component library — reusable UI primitives built in React and TypeScript, covering typography, layout, and data display components.",
    href: "https://storybook.mzl-au.dev",
    label: "storybook.mzl-au.dev",
    tags: ["Storybook", "React", "TypeScript"],
    previewSrc: "/previews/storybook.jpg",
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
        background: "var(--color-bg-editorial)",
        padding: "clamp(64px, 10vw, 120px) clamp(24px, 6vw, 96px)",
        borderTop: "1px solid var(--color-border-editorial)",
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
            color: "var(--color-brand)",
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
              color: "var(--color-text-editorial)",
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

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{
            marginTop: 56,
            paddingTop: 28,
            borderTop: "1px solid var(--color-border-editorial)",
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
              color: "var(--color-text-dim-warm)",
            }}
          >
            Michael Lin · Sydney · 2026
          </span>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-brand)",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.65"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            LinkedIn →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function MagneticArrow({ hovered }: { hovered: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const arrowX = useTransform(x, (v) => v * 0.35);
  const arrowY = useTransform(y, (v) => v * 0.35);

  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      style={{
        x: arrowX,
        y: arrowY,
        color: hovered ? "var(--color-brand)" : "var(--color-text-dim-warm)",
        transition: "color 0.2s",
      }}
      animate={{ x: hovered ? 3 : 0 }}
      transition={{ duration: 0.18 }}
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
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
          position: "relative",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: "clamp(16px, 3vw, 40px)",
          alignItems: "start",
          padding: "clamp(20px, 3vw, 28px) 0",
          borderBottom: `1px solid ${hovered ? "var(--color-text-dim-warm)" : "var(--color-border-editorial)"}`,
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
            color: "var(--color-text-dim-warm)",
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
              color: hovered ? "var(--color-brand)" : "var(--color-text-editorial)",
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
              color: "var(--color-text-subtle)",
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
                  color: "var(--color-text-dim-warm)",
                  border: "1px solid var(--color-border-editorial)",
                  padding: "3px 7px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow + label */}
        <div
          style={{
            paddingTop: 4,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 6,
          }}
        >
          <MagneticArrow hovered={hovered} />
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
              color: hovered ? "var(--color-brand)" : "var(--color-text-dim-warm)",
              transition: "color 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {project.label}
          </span>
        </div>

        {/* Hover preview image */}
        {"previewSrc" in project && project.previewSrc && (
          <motion.div
            initial={false}
            animate={{
              clipPath: hovered
                ? "inset(0% 0% 0% 0%)"
                : "inset(0% 100% 0% 0%)",
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: "clamp(200px, 30vw, 320px)",
              height: 200,
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 20,
            }}
          >
            <Image
              src={project.previewSrc}
              alt={`${project.title} preview`}
              fill
              style={{ objectFit: "cover" }}
              sizes="320px"
            />
          </motion.div>
        )}
      </div>
    </a>
  );
}
