export default function Footer() {
  return (
    <footer
      className="py-8 px-8 lg:px-16"
      style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg)" }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="font-mono text-[0.65rem] tracking-[0.2em] uppercase"
          style={{ color: "var(--color-text-muted)" }}
        >
          © 2026 MZL — Built with Next.js & obsession
        </span>
        <span
          className="font-mono text-[0.65rem] tracking-[0.2em] uppercase"
          style={{ color: "var(--color-text-muted)" }}
        >
          <span style={{ color: "var(--color-primary)" }}>⌃K</span> — terminal
        </span>
      </div>
    </footer>
  );
}
