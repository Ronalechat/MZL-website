import ScrollReveal from "@/components/ui/ScrollReveal";
import EditorialText from "@/components/ui/EditorialText";

const LINKS = [
  { label: "GitHub", href: "https://github.com/ronalechat", handle: "@ronalechat" },
  { label: "LinkedIn", href: "https://linkedin.com/in/michael-z-lin", handle: "michael-z-lin" },
  { label: "Email", href: "mailto:dir.michaellin@gmail.com", handle: "dir.michaellin" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,229,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16">

        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-8">
            05 — Contact
          </p>
        </ScrollReveal>

        <div className="overflow-hidden mb-4">
          <ScrollReveal direction="none">
            <EditorialText size="lg" as="h2" color="var(--color-text)" bleed>
              LET&apos;S BUILD
            </EditorialText>
          </ScrollReveal>
        </div>
        <div className="overflow-hidden mb-16">
          <ScrollReveal direction="none" delay={0.05}>
            <EditorialText size="lg" as="p" color="var(--color-primary)" bleed>
              SOMETHING.
            </EditorialText>
          </ScrollReveal>
        </div>

        {/* Links grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-px"
          style={{ background: "var(--color-border)" }}
        >
          {LINKS.map((link, i) => (
            <ScrollReveal key={link.label} delay={i * 0.1}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col gap-3 p-8 lg:p-10 transition-colors duration-200"
                style={{ background: "var(--color-bg)" }}
              >
                <span
                  className="font-mono text-[0.6rem] tracking-[0.3em] uppercase"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")} — {link.label}
                </span>
                <span
                  className="font-display text-2xl lg:text-3xl tracking-wide group-hover:text-[var(--color-primary)] transition-colors duration-200"
                  style={{ color: "var(--color-text)" }}
                >
                  {link.handle}
                </span>
                <span
                  className="font-mono text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: "var(--color-primary)" }}
                >
                  open ↗
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom note */}
        <ScrollReveal delay={0.3}>
          <p
            className="mt-12 text-xs"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
            }}
          >
            // Available for freelance & full-time opportunities
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
