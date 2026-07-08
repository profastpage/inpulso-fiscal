"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  FileText,
  GraduationCap,
  MessageSquare,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  external?: boolean;
  whatsapp?: boolean;
}

const navItems: NavItem[] = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Semana Fiscal", href: "/reportes", icon: FileText },
  { label: "Cursos", href: "/cursos", icon: GraduationCap },
  { label: "Contacto", href: "/contacto", icon: MessageSquare },
  {
    label: "WhatsApp",
    href: "https://wa.me/51943279673",
    icon: MessageCircle,
    external: true,
    whatsapp: true,
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-[90] lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/60 pb-[env(safe-area-inset-bottom)]"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      role="navigation"
      aria-label="Navegación principal móvil"
    >
      <ul className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const isActive = !item.external && pathname === item.href;
          const Icon = item.icon;

          if (item.external) {
            return (
              <li key={item.label} className="flex-1">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-0.5 py-1 group"
                  aria-label={item.label}
                >
                  <span className="transition-transform duration-200 group-hover:scale-110">
                    <Icon
                      className="w-5 h-5 text-emerald-500"
                      strokeWidth={2}
                    />
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 leading-tight">
                    {item.label}
                  </span>
                </a>
              </li>
            );
          }

          return (
            <li key={item.label} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 py-1 group transition-colors duration-200 ${
                  isActive ? "text-brand-700" : "text-slate-400"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="transition-transform duration-200 group-hover:scale-110">
                  <Icon
                    className="w-5 h-5"
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                </span>
                <span className="text-[10px] font-semibold leading-tight">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}