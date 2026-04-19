"use client";

import { useState, useCallback, useRef } from "react";
import { COMMANDS, resolveCommand } from "@/lib/terminal/commands";

export interface TerminalLine {
  id: string;
  type: "input" | "output" | "error";
  text: string;
}

const WELCOME_LINES: TerminalLine[] = [
  { id: "w0", type: "output", text: "MZL Terminal v1.0.0" },
  { id: "w1", type: "output", text: 'Type "help" for available commands.' },
  { id: "w2", type: "output", text: "" },
];

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME_LINES);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const idRef = useRef(0);

  const uid = () => String(idRef.current++);

  const addLines = useCallback((newLines: TerminalLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const execute = useCallback(
    (input: string, closeTerminal: () => void): void => {
      const trimmed = input.trim();
      if (!trimmed) return;

      // Record in history
      setHistory((prev) => [trimmed, ...prev.filter((h) => h !== trimmed)]);
      setHistoryIdx(-1);

      // Echo the input
      const inputLine: TerminalLine = {
        id: uid(),
        type: "input",
        text: `> ${trimmed}`,
      };

      const result = resolveCommand(trimmed, COMMANDS);

      if (result === "__CLEAR__") {
        setLines([inputLine]);
        return;
      }

      if (result === "__EXIT__") {
        addLines([inputLine, { id: uid(), type: "output", text: "> Goodbye." }]);
        setTimeout(closeTerminal, 400);
        return;
      }

      const outputTexts = Array.isArray(result) ? result : [result];
      const outputLines: TerminalLine[] = outputTexts.map((text) => ({
        id: uid(),
        type: "output" as const,
        text,
      }));

      addLines([inputLine, ...outputLines, { id: uid(), type: "output", text: "" }]);
    },
    [addLines]
  );

  const navigateHistory = useCallback(
    (direction: "up" | "down", currentInput: string): string => {
      if (direction === "up") {
        const nextIdx = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(nextIdx);
        return history[nextIdx] ?? currentInput;
      } else {
        const nextIdx = Math.max(historyIdx - 1, -1);
        setHistoryIdx(nextIdx);
        return nextIdx === -1 ? "" : history[nextIdx];
      }
    },
    [history, historyIdx]
  );

  return { lines, execute, navigateHistory };
}
