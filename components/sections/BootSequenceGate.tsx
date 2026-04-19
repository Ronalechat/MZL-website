"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootSequence from "./BootSequence";

const SESSION_KEY = "mzl_booted";

export default function BootSequenceGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [booted, setBooted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof sessionStorage !== "undefined") {
      const hasBooted = sessionStorage.getItem(SESSION_KEY);
      if (hasBooted) setBooted(true);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setBooted(true);
  };

  if (!mounted) {
    // SSR: render children immediately (no flash)
    return <>{children}</>;
  }

  return (
    <>
      {!booted && <BootSequence onComplete={handleBootComplete} />}
      <AnimatePresence>
        {booted && (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
