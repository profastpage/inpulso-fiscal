"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface SectionNavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: SectionNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

/**
 * SectionNav — minimal floating side-nav that highlights the active section.
 * Visible on desktop (lg+) as a vertical pill on the right edge.
 * On mobile, it becomes a small horizontal indicator at the bottom.
 */
export default function SectionNav({ items, activeId, onSelect }: SectionNavProps) {
  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop: vertical side nav */}
      <nav
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-1.5 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-2 shadow-lg shadow-slate-900/5"
        aria-label="Navegación de secciones"
      >
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all duration-200 hover:bg-brand-50"
              aria-current={isActive ? "true" : undefined}
            >
              {/* Dot indicator */}
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                  isActive
                    ? "bg-brand-600 scale-125 shadow-[0_0_8px_rgba(14,140,225,0.5)]"
                    : "bg-slate-300 group-hover:bg-brand-400"
                }`}
              />
              {/* Label */}
              <span
                className={`text-[11px] font-semibold whitespace-nowrap transition-colors duration-200 ${
                  isActive ? "text-brand-700" : "text-slate-400 group-hover:text-brand-600"
                }`}
              >
                {item.label}
              </span>

              {/* Tooltip on hover */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    className="absolute right-full mr-2 text-[10px] font-bold text-brand-700 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-lg whitespace-nowrap shadow-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Mobile: horizontal dot indicator at bottom */}
      <div className="lg:hidden fixed bottom-[100px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-full px-3 py-1.5 shadow-md">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-brand-600 w-5 shadow-[0_0_6px_rgba(14,140,225,0.4)]"
                  : "bg-slate-300"
              }`}
              aria-label={`Ir a ${item.label}`}
            />
          );
        })}
      </div>
    </>
  );
}