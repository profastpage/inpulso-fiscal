"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  FileText,
  GraduationCap,
  Briefcase,
  ChevronUp,
  X,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const serviceSubItems: NavItem[] = [
  { label: "OSESA", href: "/osesa", icon: Briefcase },
  { label: "Semana Fiscal", href: "/reportes", icon: FileText },
  { label: "Cursos", href: "/cursos", icon: GraduationCap },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  const isServiceActive =
    pathname === "/osesa" || pathname === "/reportes" || pathname === "/cursos";

  return (
    <>
      <motion.nav
        className="mobile-bottom-nav"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        role="navigation"
        aria-label="Navegación principal móvil"
      >
        <div className="mobile-bottom-nav__inner">
          {/* Left: Inicio */}
          <Link
            href="/"
            className={`mobile-bottom-nav__item ${pathname === "/" ? "is-active" : ""}`}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            <Home className="mobile-bottom-nav__icon" strokeWidth={pathname === "/" ? 2.2 : 1.8} />
            <span className="mobile-bottom-nav__label">Inicio</span>
          </Link>

          {/* Servicios (expandable) */}
          <button
            className={`mobile-bottom-nav__item mobile-bottom-nav__services-btn ${isServiceActive ? "is-active" : ""}`}
            onClick={() => setServicesOpen(!servicesOpen)}
            aria-expanded={servicesOpen}
            aria-label="Servicios"
            type="button"
          >
            <LayoutGrid className="mobile-bottom-nav__icon" strokeWidth={isServiceActive ? 2.2 : 1.8} />
            <span className="mobile-bottom-nav__label">Servicios</span>
            <ChevronUp
              className="mobile-bottom-nav__chevron"
              style={{
                transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {/* Center: WhatsApp FAB */}
          <div className="mobile-bottom-nav__center">
            <a
              href="https://wa.me/51943279673"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-bottom-nav__whatsapp"
              aria-label="Contactar por WhatsApp"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>

          {/* Contacto */}
          <Link
            href="/contacto"
            className={`mobile-bottom-nav__item ${pathname === "/contacto" ? "is-active" : ""}`}
            aria-current={pathname === "/contacto" ? "page" : undefined}
          >
            <svg
              className="mobile-bottom-nav__icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={pathname === "/contacto" ? 2.2 : 1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="mobile-bottom-nav__label">Contacto</span>
          </Link>

          {/* Suscribirse */}
          <Link
            href="/suscripciones"
            className={`mobile-bottom-nav__item ${pathname === "/suscripciones" ? "is-active" : ""}`}
            aria-current={pathname === "/suscripciones" ? "page" : undefined}
          >
            <svg
              className="mobile-bottom-nav__icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={pathname === "/suscripciones" ? 2.2 : 1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="mobile-bottom-nav__label">Planes</span>
          </Link>
        </div>
      </motion.nav>

      {/* Services Expandable Panel */}
      <AnimatePresence>
        {servicesOpen && (
          <>
            <motion.div
              className="mobile-services-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setServicesOpen(false)}
            />
            <motion.div
              className="mobile-services-panel"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
            >
              <div className="mobile-services-panel__header">
                <span className="mobile-services-panel__title">Nuestros Servicios</span>
                <button
                  className="mobile-services-panel__close"
                  onClick={() => setServicesOpen(false)}
                  aria-label="Cerrar servicios"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mobile-services-panel__list">
                {serviceSubItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`mobile-services-panel__item ${isActive ? "is-active" : ""}`}
                      onClick={() => setServicesOpen(false)}
                    >
                      <div className={`mobile-services-panel__icon-wrap ${isActive ? "is-active" : ""}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="mobile-services-panel__text">
                        <span className="mobile-services-panel__item-label">{item.label}</span>
                        <span className="mobile-services-panel__item-desc">
                          {item.label === "OSESA" && "Órgano de Supervisión de Servicios de Salud"}
                          {item.label === "Semana Fiscal" && "Publicaciones y análisis técnico"}
                          {item.label === "Cursos" && "Formación especializada"}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}