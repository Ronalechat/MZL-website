import ScrollReveal from "@/components/ui/ScrollReveal";
import EditorialText from "@/components/ui/EditorialText";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Bleeds oversized heading behind content for depth */}
      <div
        className="pointer-events-none select-none absolute top-8 left-0 whitespace-nowrap overflow-hidden opacity-[0.03]"
        aria-hidden
      >
        <EditorialText size="hero" color="var(--color-primary)">
          ABOUT
        </EditorialText>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16">

        {/* Section label */}
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-8">
            01 — About
          </p>
        </ScrollReveal>

        {/* Main heading — oversized, bleeds right */}
        <div className="overflow-hidden mb-16">
          <ScrollReveal direction="none">
            <EditorialText
              size="lg"
              as="h2"
              bleed
              color="var(--color-text)"
            >
              I BUILD THINGS
              <br />
              <span style={{ color: "var(--color-primary)" }}>PEOPLE FEEL.</span>
            </EditorialText>
          </ScrollReveal>
        </div>

        {/* Two-column grid: bio + values/approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

          {/* Bio */}
          <ScrollReveal delay={0.1}>
            <div
              className="space-y-5 text-lg leading-relaxed"
              style={{
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-body)",
              }}
            >
              <p>
                <span
                  className="float-left font-display leading-none mr-2 select-none"
                  style={{ fontSize: "clamp(4rem, 8vw, 6rem)", color: "var(--color-primary)", lineHeight: "0.85" }}
                  aria-hidden
                >
                  I
                </span>
                'm Michael — a frontend engineer with 8+ years building
                interactive interfaces where the details matter. I specialize in
                React, TypeScript, and design systems — having shipped four
                across product orgs — but I think about performance, motion, and
                accessibility from the first line of code.
              </p>
              <p>
                I care deeply about the craft: the difference between something
                that works and something that{" "}
                <em style={{ color: "var(--color-text)", fontStyle: "normal" }}>feels right</em>{" "}
                is almost always in the details no one asked for.
              </p>
              <p>
                When I'm not pushing pixels, I'm likely down a rabbit hole of
                generative art, typography history, or retro computing aesthetics —
                which you may have already noticed.
              </p>
            </div>
          </ScrollReveal>

          {/* Values / approach */}
          <div className="flex flex-col gap-12">
            <ScrollReveal delay={0.2}>
              <div className="space-y-4">
                {[
                  ["Performance first", "Sub-100ms interactions, not as an afterthought."],
                  ["Design-aware", "I read specs, question assumptions, and push back when needed."],
                  ["Ship it", "Pragmatic about perfection. Perfect is the enemy of shipped."],
                ].map(([title, desc]) => (
                  <div key={title} className="flex gap-4">
                    <span
                      className="font-mono text-xs mt-1 flex-shrink-0"
                      style={{ color: "var(--color-primary)" }}
                    >
                      ▸
                    </span>
                    <div>
                      <p
                        className="font-mono text-xs tracking-widest uppercase mb-1"
                        style={{ color: "var(--color-text)" }}
                      >
                        {title}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
