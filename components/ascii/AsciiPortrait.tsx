"use client";

import { useRef, useEffect } from "react";
import { imageToAscii, generatePlaceholderAscii, type CropRect } from "@/lib/ascii/renderer";
import styles from "./AsciiPortrait.module.css";

// Tiny char cells — at 4px font, characters become texture rather than
// readable text, giving photo-realistic density at 200+ columns.
const CHAR_W = 4;
const CHAR_H = 6;
const FONT_SIZE = 4;

interface AsciiPortraitProps {
  /** Path to the source portrait image */
  src?: string;
  /** Number of character columns — more = more detail */
  cols?: number;
  /**
   * Number of character rows. When omitted, rows are auto-computed from the
   * image's natural aspect ratio corrected for non-square char cells (4×6px),
   * so the output is never distorted regardless of image dimensions.
   */
  rows?: number;
  /** Optional normalised crop rect (0–1) applied before ASCII conversion */
  cropRect?: CropRect;
  className?: string;
}

export default function AsciiPortrait({
  src,
  cols = 220,
  rows,
  cropRect,
  className = "",
}: AsciiPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function drawGrid(grid: string[][], usedCols: number, usedRows: number) {
      if (!ctx || !canvas) return;
      canvas.width  = usedCols * CHAR_W;
      canvas.height = usedRows * CHAR_H;
      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;
      ctx.textBaseline = "top";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 229, 255, 0.75)";
      for (let row = 0; row < usedRows; row++) {
        for (let col = 0; col < usedCols; col++) {
          const char = grid[row]?.[col] ?? " ";
          if (char !== " ") {
            ctx.fillText(char, col * CHAR_W, row * CHAR_H);
          }
        }
      }
    }

    if (src) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // If rows not specified, derive from image aspect ratio + char cell ratio
        // so the canvas always matches the source proportions.
        const usedRows = rows ?? Math.max(
          4,
          Math.round(cols * (CHAR_W / CHAR_H) * (img.naturalHeight / img.naturalWidth))
        );
        drawGrid(imageToAscii(img, cols ?? 220, usedRows, cropRect), cols ?? 220, usedRows);
      };
      img.src = src;
    } else {
      const usedRows = rows ?? 140;
      drawGrid(generatePlaceholderAscii(cols ?? 220, usedRows), cols ?? 220, usedRows);
    }
  }, [src, cols, rows, cropRect]);

  return (
    <div className={`${styles.container} ${className}`}>
      <canvas
        ref={canvasRef}
        width={(cols ?? 220) * CHAR_W}
        height={(rows ?? 140) * CHAR_H}
        className={styles.canvas}
        aria-label="ASCII art portrait"
        role="img"
      />
    </div>
  );
}
