"use client";

import { useEffect, useRef, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let ticking = false;

    function updateProgress() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (scrollHeight > 0) {
        const pct = (scrollTop / scrollHeight) * 100;
        setProgress(pct);
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-brand-500 via-brand-400 to-emerald-400 shadow-[0_0_8px_rgba(14,140,225,0.5)]"
        style={{
          width: `${Math.min(progress, 100)}%`,
          transition: "width 0.1s linear",
          opacity: progress < 1 ? 0 : 1,
          transitionProperty: "width, opacity",
          transitionDuration: "0.1s, 0.2s",
          transitionTimingFunction: "linear, ease",
        }}
      />
    </div>
  );
}