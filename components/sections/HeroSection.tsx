"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./HeroSection.module.css";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const LINE_REVEAL = {
  hidden: { y: "115%" },
  visible: { y: 0 },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imageReady, setImageReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fallback = window.setTimeout(() => {
      if (!cancelled) {
        setImageReady(true);
        setFontsReady(true);
      }
    }, 1800);

    if ("fonts" in document) {
      document.fonts.ready
        .then(() => {
          if (!cancelled) setFontsReady(true);
        })
        .catch(() => {
          if (!cancelled) setFontsReady(true);
        });
    } else {
      setFontsReady(true);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroReady = imageReady && fontsReady;

  // Text slides up and fades as you scroll out
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-77%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Portrait drifts upward slightly and scales in — opposite to text
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  // Scroll indicator fades out early
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        background: "var(--color-brand)",
        overflow: "hidden",
      }}
    >
      <motion.div
        aria-hidden
        className={styles.heroLoader}
        initial={false}
        animate={{
          opacity: heroReady ? 0 : 1,
          y: heroReady ? -8 : 0,
          pointerEvents: heroReady ? "none" : "auto",
        }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <span className={styles.loaderMark}>MZL</span>
        <motion.span
          className={styles.loaderRule}
          animate={{ scaleX: heroReady ? 1 : [0.18, 1, 0.18] }}
          transition={{
            duration: 1.3,
            repeat: heroReady ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Portrait — parallax scale + drift */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{
          opacity: heroReady ? 1 : 0,
          filter: heroReady ? "blur(0px)" : "blur(8px)",
        }}
        transition={{ duration: 0.65, ease: EASE }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          y: portraitY,
          scale: portraitScale,
          transformOrigin: "center bottom",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "clamp(680px, 66vw, 888px)",
            height: "100%",
          }}
        >
          <Image
            src="/portrait-cropped-no-bg.png"
            alt=""
            fill
            style={{
              objectFit: "contain",
              objectPosition: "bottom",
            }}
            preload
            onLoad={() => setImageReady(true)}
            onError={() => setImageReady(true)}
          />
        </div>
      </motion.div>

      {/* Text block — pinned to bottom, slides up on scroll */}
      <motion.div
        className={styles.heroText}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          y: textY,
          opacity: heroReady ? textOpacity : 0,
          zIndex: 10,
        }}
      >
        <div
          className={styles.heroTextInner}
          style={{
            padding: "0 clamp(24px, 6vw, 80px) clamp(32px, 5vw, 52px)",
          }}
        >
          {/* Eyebrow */}
          <div
            className={styles.heroEyebrow}
            style={{ overflow: "hidden", marginBottom: 6 }}
          >
            <motion.p
              variants={LINE_REVEAL}
              initial="hidden"
              animate={heroReady ? "visible" : "hidden"}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.6rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                margin: 0,
              }}
            >
              Frontend Engineer · Sydney
            </motion.p>
          </div>

          {/* Name */}
          <div className={styles.heroName} style={{ overflow: "hidden" }}>
            <motion.h1
              variants={LINE_REVEAL}
              initial="hidden"
              animate={heroReady ? "visible" : "hidden"}
              transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(80px, 15vw, 210px)",
                lineHeight: 0.88,
                letterSpacing: "0.01em",
                color: "#ffffff",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              MICHAEL LIN
            </motion.h1>
          </div>

          {/* Tagline */}
          <div
            className={styles.heroTagline}
            style={{ overflow: "hidden", marginTop: 14 }}
          >
            <motion.p
              variants={LINE_REVEAL}
              initial="hidden"
              animate={heroReady ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
              style={{
                fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                fontSize: "clamp(13px, 1.2vw, 16px)",
                backgroundColor: "rgba(0,0,0,0.18)",
                color: "white",
                lineHeight: 1.65,
                maxWidth: 420,
                margin: 0,
                padding: "6px 14px",
                borderRadius: "2px",
                display: "inline-block",
              }}
            >
              Design systems · Interactive data visualisation · React &amp;
              TypeScript
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "clamp(24px, 6vw, 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: indicatorOpacity,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.52rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 40,
            background: "rgba(255,255,255,0.3)",
            transformOrigin: "top",
          }}
        />
      </motion.div>

    </section>
  );
}
