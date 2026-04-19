"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BOOT_LINES = [
  { text: "> BIOS v2.4.1 — MZL SYSTEMS", delay: 0 },
  { text: "> Initializing memory...                    [ OK ]", delay: 120 },
  { text: "> Loading display drivers...                [ OK ]", delay: 240 },
  { text: "> Mounting portfolio filesystem...          [ OK ]", delay: 380 },
  { text: "> Checking component integrity...          [ OK ]", delay: 520 },
  { text: "> Starting interface engine...             [ OK ]", delay: 680 },
  { text: "  ", delay: 820 },
  { text: "  ███╗   ███╗███████╗██╗     ", delay: 900 },
  { text: "  ████╗ ████║╚══███╔╝██║     ", delay: 960 },
  { text: "  ██╔████╔██║  ███╔╝ ██║     ", delay: 1020 },
  { text: "  ██║╚██╔╝██║ ███╔╝  ██║     ", delay: 1080 },
  { text: "  ██║ ╚═╝ ██║███████╗███████╗", delay: 1140 },
  { text: "  ╚═╝     ╚═╝╚══════╝╚══════╝", delay: 1200 },
  { text: "  ", delay: 1280 },
  { text: "> READY.  Press any key or wait...", delay: 1360 },
];

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => setVisibleLines((prev) => Math.max(prev, i + 1)), line.delay)
      );
    });

    // Auto-advance after all lines
    const lastDelay = BOOT_LINES[BOOT_LINES.length - 1].delay;
    timers.push(setTimeout(() => setDone(true), lastDelay + 700));

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(onComplete, 400);
    return () => clearTimeout(t);
  }, [done, onComplete]);

  // Skip on any key / click
  useEffect(() => {
    const skip = () => setDone(true);
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[var(--z-boot)] flex items-center justify-center"
          style={{ background: "var(--color-bg)" }}
        >
          {/* Scanline overlay on boot screen */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
            }}
          />

          <div className="relative w-full max-w-2xl px-8 py-12 font-mono text-sm leading-6">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={
                  line.text.trim().startsWith("███") || line.text.trim() === ""
                    ? "text-[var(--color-primary)] phosphor-glow whitespace-pre"
                    : "text-[var(--color-text-secondary)]"
                }
              >
                {line.text}
              </motion.div>
            ))}

            {/* Blinking cursor */}
            {visibleLines > 0 && !done && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.7, repeatType: "reverse" }}
                className="inline-block w-2 h-4 bg-[var(--color-primary)] ml-1 align-middle"
              />
            )}

            <p className="mt-8 text-[var(--color-text-muted)] text-xs">
              Press any key to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
