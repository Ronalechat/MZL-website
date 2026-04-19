"use client";

import { useRef, useEffect, useState } from "react";
import CrtOverlay from "@/components/ascii/CrtOverlay";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CANVAS_HEIGHT = 400;
const GROUND_Y_RATIO = 0.8;

// Cannon origin — proportional to canvas width (set in tick)
const CANNON_X_RATIO = 0.08;

// Oscillation / gauge speeds (faster per user feedback)
const ANGLE_SPEED = 2.0;  // degrees per frame
const POWER_SPEED = 2.5;  // % per frame

// Physics
const POWER_SCALE = 0.12; // converts % power to canvas pixels/frame
const GRAVITY = 0.18;     // pixels/frame²
const BOUNCE_RESTITUTION = 0.52; // energy retained per ground bounce
const BOUNCE_FRICTION = 0.80;    // horizontal speed retained per bounce
const MAX_BOUNCES = 6;           // safety cap to prevent infinite micro-bouncing
const DISTANCE_SCALE = 2.4;

// Camera
const CAMERA_LEAD = 0.35; // ball kept at this fraction from left during flight

const FONT = "'JetBrains Mono', monospace";
const FONT_SIZE = 12;

// ---------------------------------------------------------------------------
// Target definitions
// ---------------------------------------------------------------------------

// Targets are defined by x position as a ratio of world width.
// World width = canvas width (camera pans, world is infinite but targets are
// placed within max-range so they're all hittable).
// At max power (100%) + 45°: range ≈ 12 * cos45 * (2*12*sin45 / 0.18) ≈ 800px on a 800px canvas.
// We place targets at ratios of that range from the cannon.

interface TargetDef {
  xOffset: number;   // pixels right of cannon origin
  label: string;     // ASCII art (single line, centred)
  hitW: number;      // hit box width px
  hitH: number;      // hit box height px (above ground)
}

const TARGET_DEFS: TargetDef[] = [
  { xOffset: 180, label: "|T|",  hitW: 24, hitH: 36 },
  { xOffset: 360, label: "[H]",  hitW: 28, hitH: 40 },
  { xOffset: 540, label: "/^\\", hitW: 32, hitH: 32 },
  { xOffset: 720, label: "(O)",  hitW: 28, hitH: 28 },
];

interface Target extends TargetDef {
  // hitFrame === 0: alive and waiting.
  // hitFrame 1–12: *BOOM* burst.
  // hitFrame 13–25: *~* dissipate.
  // hitFrame >= 26: fully gone (no draw).
  hitFrame: number;
}

function makeTargets(): Target[] {
  return TARGET_DEFS.map((def) => ({
    ...def,
    hitFrame: 0,
  }));
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Phase = "IDLE" | "ANGLE_SELECT" | "POWER_SELECT" | "FIRING" | "RESULT";

interface GameState {
  phase: Phase;
  angleDeg: number;
  angleDir: number;
  power: number;
  powerDir: number;
  lockedAngle: number;
  lockedPower: number;
  projX: number;
  projY: number;
  vx: number;
  vy: number;
  distance: number;
  bestDistance: number;
  bounceCount: number;
  hits: number;
  bestHits: number;
  resultFrames: number;
  targets: Target[];
  // Camera x offset in world pixels (subtracted via ctx.translate)
  cameraX: number;
}

// ---------------------------------------------------------------------------
// Drawing helpers
// ---------------------------------------------------------------------------

function getColors(canvas: HTMLCanvasElement) {
  const style = getComputedStyle(canvas);
  return {
    primary: style.getPropertyValue("--color-primary").trim() || "#00E5FF",
    bg:      style.getPropertyValue("--color-bg").trim()      || "#050d14",
    muted:   style.getPropertyValue("--color-text-muted").trim() || "#3d7a8a",
    text:    style.getPropertyValue("--color-text").trim()    || "#e0f7fa",
    surface: style.getPropertyValue("--color-surface").trim() || "#0d1f2d",
  };
}

function drawGround(
  ctx: CanvasRenderingContext2D,
  groundY: number,
  // world extent to draw (camera may have scrolled right)
  startX: number,
  endX: number,
  color: string
) {
  ctx.font = `${FONT_SIZE}px ${FONT}`;
  ctx.fillStyle = color;
  const charW = 8;
  const first = Math.floor(startX / charW) * charW;
  for (let x = first; x <= endX; x += charW) {
    ctx.fillText("-", x, groundY);
  }
}

function drawCannon(
  ctx: CanvasRenderingContext2D,
  originX: number,
  originY: number,
  angleDeg: number,
  color: string
) {
  ctx.font = `${FONT_SIZE + 2}px ${FONT}`;
  ctx.fillStyle = color;
  ctx.fillText("[=]", originX - 16, originY);
  const rad = (angleDeg * Math.PI) / 180;
  const barrelLen = 5;
  const stepX = Math.cos(rad) * 9;
  const stepY = -Math.sin(rad) * 9;
  for (let i = 1; i <= barrelLen; i++) {
    ctx.fillText("=", originX + stepX * i, originY + stepY * i);
  }
}

function drawPowerGauge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  power: number,
  visible: boolean,
  primaryColor: string,
  mutedColor: string
) {
  if (!visible) return;
  ctx.font = `${FONT_SIZE}px ${FONT}`;
  const filled = Math.round((power / 100) * 12);
  const empty  = 12 - filled;
  const bar    = "█".repeat(filled) + "░".repeat(empty);
  ctx.fillStyle = mutedColor;
  ctx.fillText("POWER", x - 40, y);
  ctx.fillStyle = primaryColor;
  ctx.fillText(`[${bar}]`, x + 5, y);
}

/**
 * HUD drawn in screen-space (before camera translate) — always top-left.
 */
function drawHUD(
  ctx: CanvasRenderingContext2D,
  phase: Phase,
  angleDeg: number,
  power: number,
  distance: number,
  bestDistance: number,
  hits: number,
  bestHits: number,
  primaryColor: string,
  mutedColor: string
) {
  ctx.font = `${FONT_SIZE}px ${FONT}`;
  const leftEdge = 16;
  const lineH = FONT_SIZE + 6;

  ctx.textAlign = "left";

  if (phase === "RESULT" || phase === "FIRING") {
    const dist = Math.round(distance * DISTANCE_SCALE);
    const best = Math.round(bestDistance * DISTANCE_SCALE);
    ctx.fillStyle = mutedColor;
    ctx.fillText(`DIST: ${dist}m`, leftEdge, 28);
    ctx.fillStyle = primaryColor;
    ctx.fillText(`BEST: ${best}m`, leftEdge, 28 + lineH);
    ctx.fillStyle = mutedColor;
    ctx.fillText(`HITS: ${hits}`, leftEdge, 28 + lineH * 2);
    if (bestHits > 0) {
      ctx.fillStyle = primaryColor;
      ctx.fillText(`BEST: ${bestHits} hits`, leftEdge, 28 + lineH * 3);
    }
  } else {
    ctx.fillStyle = mutedColor;
    ctx.fillText(`ANGLE: ${Math.round(angleDeg)}°`, leftEdge, 28);
    ctx.fillStyle = primaryColor;
    ctx.fillText(`POWER: ${Math.round(power)}%`, leftEdge, 28 + lineH);
  }
}

function drawPrompt(
  ctx: CanvasRenderingContext2D,
  phase: Phase,
  groundY: number,
  cannonX: number,
  primaryColor: string,
  mutedColor: string
) {
  ctx.font = `${FONT_SIZE}px ${FONT}`;
  ctx.textAlign = "center";
  let prompt = "";
  if (phase === "IDLE" || phase === "ANGLE_SELECT") {
    prompt = "[ SPACE ] lock angle";
    ctx.fillStyle = primaryColor;
  } else if (phase === "POWER_SELECT") {
    prompt = "[ SPACE ] fire!";
    ctx.fillStyle = primaryColor;
  } else if (phase === "RESULT") {
    prompt = "reloading...";
    ctx.fillStyle = mutedColor;
  }
  if (prompt) {
    ctx.fillText(prompt, cannonX + 40, groundY + 28);
  }
  ctx.textAlign = "left";
}

function drawTargets(
  ctx: CanvasRenderingContext2D,
  targets: Target[],
  cannonX: number,
  groundY: number,
  primaryColor: string,
  mutedColor: string
) {
  ctx.font = `${FONT_SIZE}px ${FONT}`;
  ctx.textAlign = "center";

  for (const t of targets) {
    const tx = cannonX + t.xOffset;
    const ty = groundY - t.hitH / 2;

    if (t.hitFrame === 0) {
      // Normal — alive target
      ctx.fillStyle = mutedColor;
      ctx.fillText(t.label, tx, ty);
    } else if (t.hitFrame <= 12) {
      // Phase 1: *BOOM* burst
      ctx.fillStyle = primaryColor;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 10;
      ctx.fillText("*BOOM*", tx, ty);
      ctx.shadowBlur = 0;
    } else if (t.hitFrame <= 25) {
      // Phase 2: *~* dissipate
      ctx.fillStyle = primaryColor;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 6;
      ctx.fillText("*~*", tx, ty);
      ctx.shadowBlur = 0;
    }
    // hitFrame >= 26: draw nothing — target is fully gone
  }

  ctx.textAlign = "left";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CannonGame() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const stateRef   = useRef<GameState>({
    phase:        "ANGLE_SELECT",
    angleDeg:     45,
    angleDir:     1,
    power:        0,
    powerDir:     1,
    lockedAngle:  45,
    lockedPower:  0,
    projX:        0,
    projY:        0,
    vx:           0,
    vy:           0,
    distance:     0,
    bestDistance: 0,
    bounceCount:  0,
    hits:         0,
    bestHits:     0,
    resultFrames: 0,
    targets:      makeTargets(),
    cameraX:      0,
  });
  const rafRef = useRef<number | null>(null);
  const [displayPhase, setDisplayPhase] = useState<Phase>("ANGLE_SELECT");

  // ---------------------------------------------------------------------------
  // Input handler
  // ---------------------------------------------------------------------------
  function handleInput() {
    const s = stateRef.current;

    if (s.phase === "ANGLE_SELECT") {
      s.phase       = "POWER_SELECT";
      s.lockedAngle = s.angleDeg;
      s.power       = 0;
      s.powerDir    = 1;
      setDisplayPhase("POWER_SELECT");
      return;
    }

    if (s.phase === "POWER_SELECT") {
      s.phase       = "FIRING";
      s.lockedPower = s.power;

      const rad    = (s.lockedAngle * Math.PI) / 180;
      const speed  = s.lockedPower * POWER_SCALE;
      const canvas = canvasRef.current;
      const groundY = canvas ? canvas.height * GROUND_Y_RATIO : CANVAS_HEIGHT * GROUND_Y_RATIO;
      const cannonX = canvas ? canvas.width * CANNON_X_RATIO : 80;

      s.projX = cannonX + Math.cos(rad) * 50;
      s.projY = groundY - Math.sin(rad) * 50;
      s.vx    = speed * Math.cos(rad);
      s.vy    = -(speed * Math.sin(rad));
      s.distance    = 0;
      s.bounceCount = 0;
      s.hits        = 0;
      setDisplayPhase("FIRING");
    }
  }

  // ---------------------------------------------------------------------------
  // Game loop
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth ?? 800;
    };
    resizeCanvas();
    const resizeObs = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) resizeObs.observe(canvas.parentElement);

    function tick() {
      const s = stateRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w       = canvas.width;
      const h       = canvas.height;
      const groundY = h * GROUND_Y_RATIO;
      const cannonX = w * CANNON_X_RATIO;
      const colors  = getColors(canvas);

      // ---- Update state -------------------------------------------------

      if (s.phase === "ANGLE_SELECT") {
        s.angleDeg += ANGLE_SPEED * s.angleDir;
        if (s.angleDeg >= 80) { s.angleDeg = 80; s.angleDir = -1; }
        if (s.angleDeg <= 10) { s.angleDeg = 10; s.angleDir =  1; }
      }

      if (s.phase === "POWER_SELECT") {
        s.power += POWER_SPEED * s.powerDir;
        if (s.power >= 100) { s.power = 100; s.powerDir = -1; }
        if (s.power <= 0)   { s.power = 0;   s.powerDir =  1; }
      }

      if (s.phase === "FIRING") {
        s.vy    += GRAVITY;
        s.projX += s.vx;
        s.projY += s.vy;
        s.distance = Math.max(0, s.projX - cannonX);

        // Collision with targets
        for (const t of s.targets) {
          // Skip already-hit targets (hitFrame > 0 means hit has been registered)
          if (t.hitFrame > 0) continue;
          const tx = cannonX + t.xOffset;
          const ty = groundY - t.hitH / 2;
          const halfW = t.hitW / 2;
          const halfH = t.hitH / 2;
          if (
            s.projX >= tx - halfW && s.projX <= tx + halfW &&
            s.projY >= ty - halfH && s.projY <= ty + halfH
          ) {
            // Begin burst animation — scoring happens immediately at first contact
            t.hitFrame = 1;
            s.hits++;
          }
        }

        // Advance burst animation for all hit targets
        for (const t of s.targets) {
          if (t.hitFrame > 0) t.hitFrame++;
        }

        // Ground collision — bounce physics
        if (s.projY >= groundY) {
          s.projY = groundY;
          if (
            s.bounceCount >= MAX_BOUNCES ||
            (Math.abs(s.vy) < 0.5 && Math.abs(s.vx) < 0.5)
          ) {
            // Come to rest
            if (s.distance > s.bestDistance) s.bestDistance = s.distance;
            if (s.hits > s.bestHits) s.bestHits = s.hits;
            s.phase        = "RESULT";
            s.resultFrames = 0;
            setDisplayPhase("RESULT");
          } else {
            s.vy *= -BOUNCE_RESTITUTION;
            s.vx *= BOUNCE_FRICTION;
            s.bounceCount++;
          }
        }

        // Update camera: track ball during flight, keep it at CAMERA_LEAD from left
        const targetCamX = s.projX - w * CAMERA_LEAD;
        // Smooth camera follow with light lerp
        s.cameraX += (Math.max(0, targetCamX) - s.cameraX) * 0.12;
      }

      if (s.phase === "RESULT") {
        // Continue advancing burst animation during result phase
        for (const t of s.targets) {
          if (t.hitFrame > 0) t.hitFrame++;
        }

        // Lerp camera back to home
        s.cameraX += (0 - s.cameraX) * 0.05;

        s.resultFrames++;
        if (s.resultFrames > 120) {
          s.phase    = "ANGLE_SELECT";
          s.angleDeg = 45;
          s.angleDir = 1;
          s.cameraX  = 0;
          s.targets  = makeTargets();
          setDisplayPhase("ANGLE_SELECT");
        }
      }

      // ---- Draw ---------------------------------------------------------

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, w, h);

      // HUD drawn in screen-space BEFORE camera translation
      drawHUD(
        ctx,
        s.phase,
        s.angleDeg,
        s.power,
        s.distance,
        s.bestDistance,
        s.hits,
        s.bestHits,
        colors.primary,
        colors.muted
      );

      // Apply camera offset for world-space drawing
      ctx.save();
      ctx.translate(-Math.round(s.cameraX), 0);

      // Ground (draw enough to cover scrolled viewport)
      drawGround(ctx, groundY, s.cameraX, s.cameraX + w + 8, colors.primary);

      // Cannon
      drawCannon(ctx, cannonX, groundY - 2, s.angleDeg, colors.primary);

      // Targets
      drawTargets(ctx, s.targets, cannonX, groundY, colors.primary, colors.muted);

      // Projectile
      if (s.phase === "FIRING" || s.phase === "RESULT") {
        ctx.font      = `${FONT_SIZE + 4}px ${FONT}`;
        ctx.fillStyle = colors.primary;
        ctx.shadowColor = colors.primary;
        ctx.shadowBlur  = 8;
        ctx.fillText(s.phase === "RESULT" ? "x" : "*", s.projX, s.projY);
        ctx.shadowBlur = 0;
      }

      ctx.restore();

      // Power gauge drawn in world-space centred on cannon (camera not applied
      // so it stays near cannon even while camera follows ball in flight — but
      // gauge is only shown during POWER_SELECT when camera is at 0 anyway)
      drawPowerGauge(
        ctx,
        cannonX - 10,
        groundY + 48,
        s.power,
        s.phase === "POWER_SELECT",
        colors.primary,
        colors.muted
      );

      // Prompt
      drawPrompt(ctx, s.phase, groundY, cannonX, colors.primary, colors.muted);

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    function onKeyDown(e: KeyboardEvent) {
      if (e.code === "Space") {
        e.preventDefault();
        handleInput();
      }
    }
    function onTouchStart(e: TouchEvent) {
      e.preventDefault();
      handleInput();
    }

    window.addEventListener("keydown", onKeyDown);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("touchstart", onTouchStart);
      resizeObs.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="game"
      className="relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="absolute top-12 left-8 lg:left-16 z-20 pointer-events-none">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-primary)]">
          03 — GAME
        </p>
      </div>

      <div className="pt-24 pb-0 px-8 lg:px-16 flex items-center gap-3">
        <span
          className="font-mono text-[0.65rem] tracking-[0.2em] uppercase"
          style={{ color: "var(--color-text-muted)" }}
        >
          PHASE:
        </span>
        <span
          className="font-mono text-[0.65rem] tracking-[0.2em] uppercase"
          style={{ color: "var(--color-primary)" }}
        >
          {displayPhase.replace("_", " ")}
        </span>
      </div>

      <CrtOverlay>
        <canvas
          ref={canvasRef}
          height={CANVAS_HEIGHT}
          className="block w-full"
          aria-label="Cannon launch game — press space to play"
          role="application"
        />
      </CrtOverlay>

      <div
        className="px-8 lg:px-16 py-4 font-mono text-[0.6rem] tracking-widest uppercase"
        style={{ color: "var(--color-text-muted)" }}
      >
        KEYBOARD: SPACE to lock angle, then SPACE to fire — TOUCH: tap canvas
      </div>
    </section>
  );
}
