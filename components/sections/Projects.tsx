"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import EditorialText from "@/components/ui/EditorialText";

const PROJECTS = [
  {
    title: "Financial Visualisation Demo",
    subtitle: "D3 · TanStack · React 19",
    description:
      "Two production-grade tools: a Portfolio Workbench with a virtualised 10k-row table connected bidirectionally to a D3 brush chart, and a Graph Gallery with six exhibits demonstrating D3+SVG techniques against datasets up to 500k points — LTTB downsampling, candlestick overview+focus, density heatmaps, force simulation, crossfilter linked scatter, and parallel coordinates.",
    href: "https://demos.mzl-au.dev",
    tags: ["D3 v7", "TanStack Table", "TanStack Virtual", "React 19", "TypeScript", "Canvas 2D", "Vite"],
    stats: [
      { label: "Positions", value: "10,000" },
      { label: "Max points", value: "500k" },
      { label: "Exhibits", value: "6" },
    ],
  },
] as const;

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Ghost background label */}
      <div
        className="pointer-events-none select-none absolute top-8 right-0 overflow-hidden opacity-[0.025]"
        aria-hidden
      >
        <EditorialText size="hero" color="var(--color-primary)">
          BUILD
        </EditorialText>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-8">
            03 — Projects
          </p>
        </ScrollReveal>

        <div className="overflow-hidden mb-16">
          <ScrollReveal direction="none">
            <EditorialText size="lg" as="h2" color="var(--color-text)" bleed>
              WHAT I&apos;VE
              <br />
              <span style={{ color: "var(--color-primary)" }}>BUILT.</span>
            </EditorialText>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {PROJECTS.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.1}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="block no-underline group"
      style={{ textDecoration: "none" }}
    >
      <div
        className="relative p-8 lg:p-10 transition-colors duration-200"
        style={{
          border: "1px solid var(--color-border)",
          background: hovered
            ? "rgba(0,229,255,0.02)"
            : "var(--color-bg)",
          borderColor: hovered
            ? "rgba(0,229,255,0.3)"
            : "var(--color-border)",
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-6 mb-6">
          <div>
            <h3
              className="font-display text-2xl lg:text-3xl mb-1 tracking-wide"
              style={{ color: "var(--color-text)" }}
            >
              {project.title}
            </h3>
            <p
              className="font-mono text-xs tracking-[0.15em] uppercase"
              style={{ color: "var(--color-primary)" }}
            >
              {project.subtitle}
            </p>
          </div>
          {/* Arrow indicator */}
          <motion.span
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-2xl flex-shrink-0 mt-1"
            style={{ color: "var(--color-primary)" }}
            aria-hidden
          >
            →
          </motion.span>
        </div>

        {/* Description */}
        <p
          className="text-sm lg:text-base leading-relaxed mb-8 max-w-3xl"
          style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}
        >
          {project.description}
        </p>

        {/* Stats row */}
        <div className="flex gap-8 mb-8">
          {project.stats.map((s) => (
            <div key={s.label}>
              <div
                className="font-mono text-lg lg:text-xl font-medium tabular-nums"
                style={{ color: "var(--color-primary)" }}
              >
                {s.value}
              </div>
              <div
                className="font-mono text-[0.6rem] tracking-[0.2em] uppercase"
                style={{ color: "var(--color-text-muted)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[0.6rem] tracking-[0.1em] uppercase px-2.5 py-1"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-text-muted)",
                background: "transparent",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom-right corner accent */}
        <motion.div
          className="absolute bottom-0 right-0 w-8 h-8"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            borderRight: "1px solid var(--color-primary)",
            borderBottom: "1px solid var(--color-primary)",
          }}
        />
      </div>
    </motion.a>
  );
}
