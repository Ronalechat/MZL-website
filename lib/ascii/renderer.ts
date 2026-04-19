// ASCII character ramp ordered from densest → lightest (25 levels)
const CHAR_RAMP = "@#$%&WMB80OQLCIi*+=~-:,. ";

export interface CropRect {
  /** Normalised left edge (0–1) */
  x: number;
  /** Normalised top edge (0–1) */
  y: number;
  /** Normalised width (0–1) */
  w: number;
  /** Normalised height (0–1) */
  h: number;
}

/**
 * Converts an HTMLImageElement (drawn to an offscreen canvas) into a 2D
 * array of ASCII characters based on pixel brightness.
 *
 * @param cropRect Optional normalised source rect (0–1). Defaults to full image.
 */
export function imageToAscii(
  image: HTMLImageElement,
  cols: number,
  rows: number,
  cropRect?: CropRect
): string[][] {
  const offscreen = document.createElement("canvas");
  offscreen.width = cols;
  offscreen.height = rows;
  const ctx = offscreen.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  // When a cropRect is provided we use the 9-argument form of drawImage to
  // sample only the specified portion of the source image, scaled to fill the
  // full offscreen canvas. This lets callers focus on e.g. the face area of a
  // portrait without resizing the original asset.
  // Fill with white first so transparent areas (PNG/AVIF alpha) map to space
  // chars rather than dense '@' chars (black canvas → brightness 0 → '@').
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cols, rows);

  if (cropRect) {
    const sx = cropRect.x * image.naturalWidth;
    const sy = cropRect.y * image.naturalHeight;
    const sw = cropRect.w * image.naturalWidth;
    const sh = cropRect.h * image.naturalHeight;
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, cols, rows);
  } else {
    ctx.drawImage(image, 0, 0, cols, rows);
  }
  const { data } = ctx.getImageData(0, 0, cols, rows);
  const total = cols * rows;

  // Pass 1 — collect raw brightness values and find the actual range present
  // in this image. Many logos/portraits don't use the full 0–1 range, so a
  // direct mapping wastes most of the char ramp on unused brightness levels.
  const raw = new Float32Array(total);
  let minB = 1.0;
  let maxB = 0.0;
  for (let i = 0; i < total; i++) {
    const idx = i * 4;
    const b = (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) / 255;
    raw[i] = b;
    if (b < minB) minB = b;
    if (b > maxB) maxB = b;
  }

  // Pass 2 — histogram stretch: remap [minB, maxB] → [0, 1] so the full
  // char ramp is always used regardless of the source image's brightness range.
  const range = maxB - minB;
  const result: string[][] = [];
  for (let row = 0; row < rows; row++) {
    const line: string[] = [];
    for (let col = 0; col < cols; col++) {
      const b = raw[row * cols + col];
      const normalised = range > 0.01 ? (b - minB) / range : b;
      const charIdx = Math.floor(normalised * (CHAR_RAMP.length - 1));
      line.push(CHAR_RAMP[charIdx]);
    }
    result.push(line);
  }
  return result;
}

/**
 * Placeholder ASCII grid used before the real portrait loads.
 * Returns a cols × rows array of random ramp characters.
 */
export function generatePlaceholderAscii(cols: number, rows: number): string[][] {
  const ramp = "@#%*+;:,. ";
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ramp[Math.floor(Math.random() * ramp.length)])
  );
}
