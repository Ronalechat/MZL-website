"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTerminal } from "@/hooks/useTerminal";
import styles from "./Terminal.module.css";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const { lines, execute, navigateHistory } = useTerminal();
  const [input, setInput] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
      execute(input, onClose);
      setInput("");
    },
    [input, execute, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setInput(navigateHistory("up", input));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setInput(navigateHistory("down", input));
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [input, navigateHistory, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="terminal-overlay"
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className={styles.window}
            initial={{ scale: 0.97, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97, y: 8, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="MZL Terminal"
            aria-modal="true"
          >
            {/* Title bar */}
            <div className={styles.titleBar}>
              <div className={styles.dots}>
                <div className={styles.dot} style={{ background: "#ff5f57" }} />
                <div className={styles.dot} style={{ background: "#ffbd2e" }} />
                <div className={styles.dot} style={{ background: "#28c840" }} />
              </div>
              <span className={styles.titleText}>mzl — terminal</span>
              <button
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close terminal"
              >
                esc
              </button>
            </div>

            {/* Output */}
            <div ref={outputRef} className={styles.output}>
              {lines.map((line) => (
                <div
                  key={line.id}
                  className={`${styles.line} ${
                    line.type === "input" ? styles.lineInput : styles.lineOutput
                  }`}
                >
                  {line.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className={styles.inputRow}>
              <span className={styles.prompt}>❯</span>
              <input
                ref={inputRef}
                type="text"
                className={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command..."
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
