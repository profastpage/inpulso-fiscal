"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Menu,
  ChevronDown,
  Sparkles,
  FileText,
  GraduationCap,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Inicio", href: "/", active: true },
  { label: "Nosotros", href: "#", active: false },
];

const serviceLinks = [
  {
    icon: <FileText className="w-4 h-4 text-brand-600" />,
    label: "Semana Fiscal",
    desc: "Publicaciones y análisis técnico",
    href: "#",
  },
  {
    icon: <GraduationCap className="w-4 h-4 text-brand-600" />,
    label: "Cursos",
    desc: "Formación especializada",
    href: "#",
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}
      >
        <div className="site-header__inner">
          {/* Brand */}
          <a href="/" className="site-brand" aria-label="Instituto Pulso Fiscal - Inicio">
            <div className="site-brand__logo bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center rounded-[10px] text-white font-display font-black text-lg">
              IPF
            </div>
            <span className="site-brand__copy">
              <strong>INSTITUTO PULSO FISCAL</strong>
              <small>Especialistas en macroeconomía y gestión pública</small>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="site-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link ${link.active ? "nav-link--active" : ""}`}
              >
                {link.label}
              </a>
            ))}

            {/* Dropdown */}
            <div
              className="nav-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="nav-link" type="button">
                Nuestros Servicios
                <ChevronDown
                  className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="nav-dropdown__menu"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {serviceLinks.map((s) => (
                      <a key={s.label} href={s.href} className="nav-dropdown__item">
                        {s.icon}
                        <div>
                          <span className="nav-dropdown__label">{s.label}</span>
                          <span className="nav-dropdown__desc">{s.desc}</span>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#" className="nav-link">
              Contacto
            </a>
          </nav>

          {/* Actions */}
          <div className="site-header__actions">
            <button
              onClick={() => setAuthOpen(true)}
              className="site-header__login"
            >
              Iniciar sesión
            </button>
            <a href="#" className="site-header__subscribe">
              <Sparkles className="w-4 h-4 text-white" />
              Suscribirse
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="site-header__toggle"
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-overlay mobile-overlay--open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />
            <motion.div
              className="mobile-drawer mobile-drawer--open"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <button
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                onClick={closeMobile}
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>

              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`mobile-drawer__link ${link.active ? "mobile-drawer__link--active" : ""}`}
                  onClick={closeMobile}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#"
                className="mobile-drawer__link"
                onClick={closeMobile}
              >
                Nuestros Servicios
              </a>
              <a
                href="#"
                className="mobile-drawer__link"
                onClick={closeMobile}
              >
                Contacto
              </a>

              <button
                className="mobile-drawer__login"
                onClick={() => {
                  closeMobile();
                  setAuthOpen(true);
                }}
              >
                Iniciar sesión
              </button>
              <a href="#" className="mobile-drawer__subscribe" onClick={closeMobile}>
                <Sparkles className="w-4 h-4 inline mr-1" />
                Suscribirse
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

/* ======================== */
/* AUTH MODAL               */
/* ======================== */
function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <motion.div
      className="auth-modal-shell auth-modal-shell--open fixed inset-0 z-[150] flex items-center justify-center p-4 lg:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-navy-950/90 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        className="auth-modal"
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Hero */}
        <div className="auth-modal__hero">
          <div className="auth-modal__glow" />
          <button
            type="button"
            onClick={onClose}
            className="auth-modal__close"
            aria-label="Cerrar formulario"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="auth-modal__brand">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-display font-black text-lg mx-auto">
              IPF
            </div>
          </div>
          <span className="auth-modal__eyebrow">Instituto Pulso Fiscal</span>
          <h3 className="auth-modal__title">
            {mode === "login" ? "Bienvenido nuevamente" : "Cree su cuenta"}
          </h3>
          <p className="auth-modal__subtitle">
            {mode === "login"
              ? "Acceda a sus publicaciones, cursos y beneficios."
              : "Únase a nuestra comunidad de análisis especializado."}
          </p>
        </div>

        {/* Body */}
        <div className="auth-modal__body">
          <div className="auth-mode-switch" role="tablist" aria-label="Tipo de acceso">
            <button
              type="button"
              role="tab"
              onClick={() => setMode("login")}
              className={mode === "login" ? "is-active" : ""}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              role="tab"
              onClick={() => setMode("register")}
              className={mode === "register" ? "is-active" : ""}
            >
              Registrarse
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="auth-form"
          >
            <div className="auth-form__fields">
              {mode === "register" && (
                <label className="auth-field">
                  <span>Nombre completo</span>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <input type="text" name="nombre" placeholder="Ingrese su nombre" required />
                  </div>
                </label>
              )}
              <label className="auth-field">
                <span>Correo institucional</span>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <input type="email" name="email" placeholder="correo@institucion.pe" required />
                </div>
              </label>
              <label className="auth-field">
                <span>Contraseña</span>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input type="password" name="password" placeholder="Ingrese su contraseña" required />
                </div>
              </label>
            </div>

            {mode === "login" && (
              <div className="auth-form__options">
                <label>
                  <input type="checkbox" /> <span>Recordarme</span>
                </label>
                <button type="button">¿Olvidó su contraseña?</button>
              </div>
            )}

            <button type="submit" className="auth-form__submit">
              <span>{mode === "login" ? "Iniciar Sesión" : "Registrarme"}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>

            <p className="auth-form__toggle">
              <span>
                {mode === "login"
                  ? "¿Aún no tiene cuenta?"
                  : "¿Ya es miembro?"}
              </span>
              <button
                type="button"
                onClick={() =>
                  setMode(mode === "login" ? "register" : "login")
                }
              >
                {mode === "login" ? "Regístrese aquí" : "Inicie sesión"}
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}