"use client";
import { useEffect, useRef, useCallback } from "react";

/**
 * useSectionDeepLink — tracks which section is in view via IntersectionObserver
 * and updates the URL hash accordingly. On mount, scrolls to the hash fragment
 * if one is present in the URL.
 */
export function useSectionDeepLink(sectionIds: string[]) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateHash = useCallback((id: string | null) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      const url = new URL(window.location.href);
      if (id) {
        url.hash = id;
      } else {
        url.hash = "";
      }
      window.history.replaceState(null, "", url.toString());
    }, 300);
  }, []);

  useEffect(() => {
    // On mount, scroll to hash if present
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        // Small delay to let layout settle
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }

    // Set up IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) {
              updateHash(id);
            }
          }
        }
      },
      {
        rootMargin: "-80px 0px -50% 0px",
        threshold: 0.2,
      }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    }

    return () => {
      observer.disconnect();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [sectionIds, updateHash]);
}