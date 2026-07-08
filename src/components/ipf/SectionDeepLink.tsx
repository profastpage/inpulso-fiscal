"use client";
import { forwardRef, useEffect, useRef } from "react";

interface SectionDeepLinkProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * SectionDeepLink — a wrapper that assigns an `id` to a <section> element
 * for use with the useSectionDeepLink hook. On mount, scrolls to this section
 * if the current URL hash matches the provided `id`.
 */
const SectionDeepLink = forwardRef<HTMLElement, SectionDeepLinkProps>(
  ({ id, className, children }, ref) => {
    const internalRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const hash = window.location.hash.replace("#", "");
      if (hash === id) {
        setTimeout(() => {
          internalRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }, [id]);

    return (
      <section
        ref={(node) => {
          // Support both forwarded ref and internal ref
          (internalRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLElement | null>).current = node;
          }
        }}
        id={id}
        data-section-id={id}
        className={className}
      >
        {children}
      </section>
    );
  }
);

SectionDeepLink.displayName = "SectionDeepLink";

export default SectionDeepLink;