"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import EditorialText from "@/components/ui/EditorialText";
import type { ExperienceItem } from "@/types";

interface ExperienceProps {
  items: ExperienceItem[];
}

export default function Experience({ items }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Ghost background label — same treatment as About's 'ABOUT' ghost */}
      <div
        className="pointer-events-none select-none absolute top-8 right-0 overflow-hidden opacity-[0.03]"
        aria-hidden
      >
        <EditorialText size="hero" color="var(--color-primary)">
          WORK
        </EditorialText>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-8">
            02 — Experience
          </p>
        </ScrollReveal>

        <div className="overflow-hidden mb-16">
          <ScrollReveal direction="none">
            <EditorialText size="lg" as="h2" color="var(--color-text)" bleed>
              WHERE I&apos;VE
              <br />
              <span style={{ color: "var(--color-primary)" }}>WORKED.</span>
            </EditorialText>
          </ScrollReveal>
        </div>
      </div>

      {/*
        Marquee strip — full-bleed so logos feel like an infinite ribbon.
        The mask-image fades edges to transparent, avoiding a hard crop that
        would expose the seam where the doubled list loops back to start.
        We duplicate `items` so the animation seamlessly loops: translateX(-50%)
        moves exactly one copy's width, which is the loop point.
      */}
      <ScrollReveal delay={0.15}>
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div
            className="flex"
            style={{ animation: "marquee 22s linear infinite", width: "max-content" }}
          >
            {[...items, ...items].map((item, i) => (
              <LogoChip key={i} item={item} />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function LogoChip({ item }: { item: ExperienceItem }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 px-10"
      style={{ width: "220px" }}
    >
      <div className="relative w-full" style={{ height: "64px" }}>
        <Image
          src={item.logoSrc}
          alt={item.company}
          fill
          className="object-contain"
          // Normalise all logos to white so they read uniformly on the dark bg.
          // A brand-colour logo would fight the site's cyan palette.
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
      <span
        className="font-mono text-[0.5rem] tracking-[0.25em] uppercase text-center"
        style={{ color: "var(--color-text-muted)" }}
      >
        {item.company}
      </span>
    </div>
  );
}
