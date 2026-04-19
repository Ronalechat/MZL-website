"use client";

import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import CrtOverlay from "@/components/ascii/CrtOverlay";
import AsciiPortrait from "@/components/ascii/AsciiPortrait";

/**
 * ShrekPeek — interstitial section between Experience and Skills.
 *
 * Design intent: the section starts at height 0 so adjacent sections
 * appear to physically touch. GSAP scrubs height 0 → 35vh → 0 as the user
 * scrolls through the trigger, creating a literal crack in the page that
 * opens, reveals Shrek, then seals shut.
 *
 * Design-world: ASCII/CRT (monospace, scanlines, phosphor glow). Never mix
 * editorial treatment into this section.
 */
export default function ShrekPeek() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    // Two-stage timeline: crack open then seal shut.
    // Duration values are relative within the timeline — ScrollTrigger scrubs them.
    const tl = gsap.timeline();
    tl.to(section, { height: "35vh", ease: "power2.out", duration: 0.45 })
      .to(section, { height: 0, ease: "power2.in", duration: 0.45 });

    ScrollTrigger.create({
      trigger: section,
      // Start when the section's top reaches 85% down the viewport — gives
      // enough lead time for the opening to feel intentional on slow scrolls.
      start: "top 85%",
      // End when the section's top reaches 15% — the crack is fully sealed
      // before the section scrolls off screen, so there's no height pop.
      end: "top 15%",
      scrub: 0.8,
      animation: tl,
      invalidateOnRefresh: true,
    });
  }, []);

  return (
    <section
      id="shrek"
      ref={sectionRef}
      className="relative flex items-end justify-center"
      style={{
        height: 0,
        overflow: "hidden",
        background: "var(--color-bg)",
        // willChange: height tells the compositor to promote this layer,
        // avoiding repaints on neighbouring sections during the scrub.
        willChange: "height",
      }}
    >
      <CrtOverlay className="w-full h-full flex items-end justify-center">
        <div className="flex flex-col items-center pb-2">
          <AsciiPortrait src="/shrek-no-bg.png" cols={220} />
          <p
            className="font-mono text-sm tracking-widest mt-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            // uninvited guest
          </p>
        </div>
      </CrtOverlay>
    </section>
  );
}
