"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Header from "@/components/ipf/Header";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";
import PageHero from "@/components/ipf/PageHero";

/* ─── Inline SVG Icons ─────────────────────────────────────────────── */

const IconMapPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconSend = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const IconCheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.216l-.256-.16-3.034.716.716-3.034-.16-.256A8 8 0 1 1 12 20z" />
  </svg>
);

/* ─── Asunto Options ────────────────────────────────────────────────── */

const ASUNTO_OPTIONS = [
  "Consulta general",
  "Información sobre cursos",
  "Suscripciones",
  "Publicaciones",
  "Alianzas institucionales",
  "Soporte técnico",
  "Otro",
] as const;

/* ─── Form State Type ───────────────────────────────────────────────── */

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

const INITIAL_FORM: FormData = {
  nombre: "",
  email: "",
  telefono: "",
  asunto: "",
  mensaje: "",
};

/* ─── Component ─────────────────────────────────────────────────────── */

export default function ContactoPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  /* ── GSAP Entrance Animations ─────────────────────────────────── */

  useEffect(() => {
    if (!formRef.current || !sidebarRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(formRef.current!, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(sidebarRef.current!, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.15,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  /* ── Form Submission (simulated) ───────────────────────────────── */

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);

    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
      setFormData(INITIAL_FORM);
    }, 1500);
  };

  const handleReset = () => {
    setEnviado(false);
  };

  /* ── Render ────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent />

      <main className="flex-1 pb-20 sm:pb-24">
        <PageHero
          badge="Contáctenos"
          title={<>Estamos aquí para <span>ayudarle</span></>}
          subtitle="¿Tiene alguna consulta sobre nuestros servicios, publicaciones o cursos? Complete el formulario o contáctenos directamente."
          gradient="linear-gradient(135deg, #0f172a 0%, #072848 50%, #03589c 100%)"
          pattern="radial-gradient(circle at 50% 50%, rgba(14,140,225,0.15) 0%, transparent 60%)"
        />

        <div className="container mx-auto px-6">

          {/* ── Two-column Layout ────────────────────────────────── */}
          <div className="grid lg:grid-cols-5 gap-10">
            {/* ── Left Column: Contact Form ──────────────────────── */}
            <div ref={formRef} className="lg:col-span-3">
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 sm:p-10">
                <h2 className="text-xl font-extrabold text-navy-950 mb-8">
                  Envíenos un mensaje
                </h2>

                {/* ── Success State ─────────────────────────────── */}
                <AnimatePresence mode="wait">
                  {enviado && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center"
                    >
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconCheckCircle />
                      </div>
                      <h3 className="text-lg font-bold text-emerald-800 mb-2">
                        Mensaje enviado
                      </h3>
                      <p className="text-sm text-emerald-600 mb-4">
                        Gracias por contactarnos. Le responderemos a la
                        brevedad posible.
                      </p>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-sm font-bold text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors"
                      >
                        Enviar otro mensaje
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Form ───────────────────────────────────────── */}
                {!enviado && (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Row 1: Nombre + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Su nombre"
                          value={formData.nombre}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              nombre: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm text-navy-950 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Correo electrónico *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="correo@ejemplo.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm text-navy-950 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Row 2: Teléfono + Asunto */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          placeholder="+51 999 999 999"
                          value={formData.telefono}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              telefono: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm text-navy-950 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Asunto *
                        </label>
                        <select
                          required
                          value={formData.asunto}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              asunto: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm text-navy-950 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-all"
                        >
                          <option value="">Seleccione un asunto</option>
                          {ASUNTO_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Mensaje */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Mensaje *
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Escriba su consulta aquí..."
                        value={formData.mensaje}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            mensaje: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm text-navy-950 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-all resize-none placeholder:text-slate-400"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={enviando}
                        className="w-full sm:w-auto bg-gradient-to-b from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-extrabold py-3.5 px-10 rounded-xl shadow-lg shadow-brand-700/15 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                      >
                        {enviando ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Enviando...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Enviar mensaje <IconSend />
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* ── Right Column: Sidebar ─────────────────────────── */}
            <div ref={sidebarRef} className="lg:col-span-2 space-y-6">
              {/* ── Contact Data Card ──────────────────────────── */}
              <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm p-8">
                <h3 className="text-sm font-extrabold text-navy-950 uppercase tracking-wider mb-6">
                  DATOS DE CONTACTO
                </h3>
                <div className="space-y-5">
                  {/* Dirección */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconMapPin />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Dirección
                      </p>
                      <p className="text-sm text-navy-950 font-medium leading-relaxed">
                        Jr. Los Crisantemos 110, Santiago de Surco, Lima, Perú
                      </p>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconPhone />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Teléfono
                      </p>
                      <a
                        href="tel:+51943279673"
                        className="text-sm text-brand-700 font-bold hover:underline"
                      >
                        943 279 673
                      </a>
                    </div>
                  </div>

                  {/* Correo */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconMail />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Correo
                      </p>
                      <a
                        href="mailto:consultas@inpulsofiscal.com"
                        className="text-sm text-brand-700 font-bold hover:underline block"
                      >
                        consultas@inpulsofiscal.com
                      </a>
                      <a
                        href="mailto:cursosipf@inpulsofiscal.com"
                        className="text-sm text-brand-700 font-bold hover:underline block mt-1"
                      >
                        cursosipf@inpulsofiscal.com
                      </a>
                      <a
                        href="mailto:suscripcionesipf@inpulsofiscal.com"
                        className="text-sm text-brand-700 font-bold hover:underline block mt-1"
                      >
                        suscripcionesipf@inpulsofiscal.com
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <WhatsAppIcon />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        WhatsApp
                      </p>
                      <a
                        href="https://wa.me/51943279673"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-emerald-600 font-bold hover:underline"
                      >
                        Escribir por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Hours Card ──────────────────────────────────── */}
              <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm p-8">
                <h3 className="text-sm font-extrabold text-navy-950 uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="text-brand-600">
                    <IconClock />
                  </span>
                  HORARIOS DE ATENCIÓN
                </h3>
                <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {"Lunes a Viernes: 9:00 AM - 6:00 PM\nSábados: 9:00 AM - 1:00 PM"}
                </div>
              </div>

              {/* ── WhatsApp CTA Card ──────────────────────────── */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-[28px] p-8 text-white">
                <h3 className="text-lg font-extrabold mb-3">
                  ¿Necesita atención inmediata?
                </h3>
                <p className="text-emerald-100 text-sm mb-6 leading-relaxed">
                  Escríbanos por WhatsApp y un asesor le atenderá en tiempo
                  real.
                </p>
                <a
                  href="https://wa.me/51943279673?text=Hola%2C%20tengo%20una%20consulta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-emerald-700 font-extrabold py-3 px-6 rounded-xl hover:bg-emerald-50 transition-all shadow-lg"
                >
                  <WhatsAppIcon size={18} />
                  Chatear por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}