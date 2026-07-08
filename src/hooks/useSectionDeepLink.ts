"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * useSectionDeepLink — IntersectionObserver-based scroll spy.
 *
 * What it does:
 * 1. Observes every <section> whose `id` is in `sectionIds`.
 * 2. When a section enters the viewport (rootMargin "-20% 0px -60% 0px"),
 *    it becomes the "active" section.
 * 3. The URL hash is updated silently via `history.replaceState`
 *    (no scroll jump, no pushState noise).
 * 4. On first mount, if the URL already contains a matching hash,
 *    it smooth-scrolls to that section.
 *
 * Works on mobile (touch scroll) and desktop (mouse wheel / trackpad).
 */

interface UseSectionDeepLinkOptions {
  /** Section ids to observe (must match `id` attributes on <section> elements) */
  sectionIds: string[];
  /** IntersectionObserver rootMargin — controls when a section counts as "in view" */
  rootMargin?: string;
}

export function useSectionDeepLink({
  sectionIds,
  rootMargin = "-20% 0px -60% 0px",
}: UseSectionDeepLinkOptions) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasScrolledToHash = useRef(false);

  /* ── Scroll to hash on first mount ───────────────────────────── */
  useEffect(() => {
    if (hasScrolledToHash.current) return;

    const hash = window.location.hash.replace("#", "");
    if (hash && sectionIds.includes(hash)) {
      hasScrolledToHash.current = true;
      // Small delay to let the layout settle (images, fonts, etc.)
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const headerOffset = 80; // header height
          const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [sectionIds]);

  /* ── IntersectionObserver ────────────────────────────────────── */
  useEffect(() => {
    // Disconnect previous observer if any
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find entries that are intersecting
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        // Pick the one with the highest intersection ratio
        const topEntry = visible.reduce((best, curr) =>
          curr.intersectionRatio > best.intersectionRatio ? curr : best
        );

        const id = topEntry.target.id;
        if (id && id !== activeId) {
          setActiveId(id);
          // Silent URL update — no scroll, no history entry
          const url = id ? `${window.location.pathname}#${id}` : window.location.pathname;
          history.replaceState(null, "", url);
        }
      },
      {
        rootMargin,
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      }
    );

    observerRef.current = observer;

    // Observe all registered sections
    const cleanupFns: (() => void)[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      } else {
        // Retry once after a short delay (elements might not be mounted yet)
        const timer = setTimeout(() => {
          const el2 = document.getElementById(id);
          if (el2) observer.observe(el2);
        }, 500);
        cleanupFns.push(() => clearTimeout(timer));
      }
    });

    return () => {
      observer.disconnect();
      cleanupFns.forEach((fn) => fn());
    };
  }, [sectionIds, rootMargin, activeId]);

  /* ── Programmatic scroll helper ──────────────────────────────── */
  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const headerOffset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
      const url = `${window.location.pathname}#${id}`;
      history.replaceState(null, "", url);
    },
    []
  );

  return { activeId, scrollToSection };
}