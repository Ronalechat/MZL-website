import ScrollReveal from "@/components/ui/ScrollReveal";
import EditorialText from "@/components/ui/EditorialText";
import type { SkillCategory } from "@/types";

interface SkillsProps {
  categories: SkillCategory[];
}

export default function Skills({ categories }: SkillsProps) {
  return (
    <section
      id="skills"
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Background label */}
      <div
        className="pointer-events-none select-none absolute -bottom-4 left-0 overflow-hidden opacity-[0.03]"
        aria-hidden
      >
        <EditorialText size="hero" color="var(--color-primary)">
          SKILLS
        </EditorialText>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16">

        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-8">
            04 — Skills
          </p>
        </ScrollReveal>

        <div className="overflow-hidden mb-16">
          <ScrollReveal direction="none">
            <EditorialText size="lg" as="h2" color="var(--color-text)">
              THE
              <br />
              <span style={{ color: "var(--color-primary)" }}>STACK.</span>
            </EditorialText>
          </ScrollReveal>
        </div>

        {/* Skill grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "var(--color-border)" }}
        >
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 0.08}>
              <div
                className="flex flex-col gap-5 p-8 lg:p-10"
                style={{ background: "var(--color-surface)" }}
              >
                {/* Category name — ASCII textured */}
                <div
                  className="font-mono text-[0.6rem] tracking-[0.3em] uppercase pb-3"
                  style={{
                    color: "var(--color-primary)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")} — {cat.name}
                </div>

                {/* Skills list */}
                <ul className="space-y-3">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 group"
                    >
                      <span
                        className="font-mono text-[0.55rem] flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                        style={{ color: "var(--color-primary)" }}
                      >
                        ▸
                      </span>
                      <span
                        className="text-sm tracking-wide transition-colors group-hover:text-[var(--color-text)]"
                        style={{
                          color: "var(--color-text-secondary)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom tagline */}
        <ScrollReveal delay={0.3}>
          <div
            className="mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <p
              className="text-sm"
              style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}
            >
              Always learning. Currently exploring: WebGPU, RSC patterns, and generative systems.
            </p>
            <span
              className="font-mono text-[0.6rem] tracking-[0.3em] uppercase flex-shrink-0"
              style={{ color: "var(--color-text-muted)" }}
            >
              v2026
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
