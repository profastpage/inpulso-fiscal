"use client";

import { forwardRef } from "react";

export interface SectionProps {
  /** Unique id used for deep linking (URL hash) and scroll spy */
  id: string;
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label for screen readers */
  ariaLabel?: string;
  /** HTML element to render — defaults to "section" */
  as?: "section" | "div" | "article" | "aside";
}

/**
 * Section — SEO-friendly, deep-linkable page section wrapper.
 *
 * - Sets `id` for URL hash deep linking
 * - Adds `data-section-id` for scroll-spy detection
 * - Provides `aria-label` for accessibility
 * - Supports `forwardRef` for animation libraries (Framer, GSAP)
 */
const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className = "", ariaLabel, as: Tag = "section" }, ref) => {
    return (
      <Tag
        id={id}
        ref={ref}
        aria-label={ariaLabel || id.replace(/-/g, " ")}
        className={className}
        data-section-id={id}
      >
        {children}
      </Tag>
    );
  }
);

Section.displayName = "Section";
export default Section;