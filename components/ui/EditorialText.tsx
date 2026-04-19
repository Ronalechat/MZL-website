import type { ReactNode, ElementType } from "react";

type Size = "sm" | "md" | "lg" | "hero";

interface EditorialTextProps {
  children: ReactNode;
  size?: Size;
  /** Clips the text so it bleeds past the right viewport edge */
  bleed?: boolean;
  className?: string;
  as?: ElementType;
  color?: string;
}

const SIZE_CLASSES: Record<Size, string> = {
  sm:   "font-display text-4xl lg:text-6xl",
  md:   "font-display text-5xl lg:text-8xl",
  lg:   "type-section",
  hero: "type-hero",
};

export default function EditorialText({
  children,
  size = "lg",
  bleed = false,
  className = "",
  as: Tag = "span",
  color,
}: EditorialTextProps) {
  return (
    <Tag
      className={`
        ${SIZE_CLASSES[size]}
        ${bleed ? "whitespace-nowrap overflow-visible" : ""}
        ${className}
      `}
      style={color ? { color } : undefined}
    >
      {children}
    </Tag>
  );
}
