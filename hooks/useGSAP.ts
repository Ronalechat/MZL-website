"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GSAPCallback = (ctx: gsap.Context) => void;

/**
 * Wraps GSAP in a scoped context for proper cleanup.
 * Always use this hook instead of calling gsap directly in components.
 */
export function useGSAP(callback: GSAPCallback, deps: unknown[] = []) {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    contextRef.current = gsap.context((self) => {
      callback(self);
    });

    return () => {
      contextRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return contextRef;
}
