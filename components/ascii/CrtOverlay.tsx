import styles from "./CrtOverlay.module.css";

interface CrtOverlayProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps content with section-scoped CRT scanlines, film grain, and vignette.
 * Only used around ASCII/terminal sections — never on editorial sections.
 */
export default function CrtOverlay({ children, className = "" }: CrtOverlayProps) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {children}
      <div className={styles.vignette} />
    </div>
  );
}
