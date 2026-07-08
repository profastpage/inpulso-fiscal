"use client";

import { useState } from "react";
import { BookOpen, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReclamacionesPage() {
  const [tipo, setTipo] = useState<"Reclamo" | "Queja">("Reclamo");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Nav */}
      <nav className="bg-navy-950 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Logo IPF" className="w-9 h-9 rounded-[8px] object-cover" />
          <a href="/" className="text-white/70 hover:text-white text-sm font-semibold transition-colors">
            Volver al inicio
          </a>
        </div>
      </nav>

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Company Header (INDECOPI requirement) */}
          <div className="bg-navy-950 text-white p-8 rounded-t-[32px] border-b border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-lg font-bold">INSTITUTO PULSO FISCAL</h2>
                <p className="text-brand-300 text-sm font-medium">RUC: 20612345678 (Demo)</p>
                <p className="text-white/60 text-xs mt-1">Jr. Los Crisantemos 110, Santiago de Surco, Lima - Perú</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Logo IPF"
                className="w-16 h-16 rounded-xl object-cover border border-white/20"
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-b-[32px] p-8 md:p-12 lg:p-16 border border-slate-100 shadow-sm">
            {/* Title Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-2 block">
                  Atención al consumidor
                </span>
                <h1 className="text-3xl md:text-4xl font-display font-extrabold text-navy-950 leading-tight">
                  Libro de Reclamaciones
                </h1>
                <p className="text-slate-500 text-sm mt-2">
                  Conforme al Código de Protección y Defensa del Consumidor
                </p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex-shrink-0">
                <BookOpen className="w-8 h-8 text-brand-600" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Hoja de Reclamación
                  </p>
                  <p className="text-sm font-bold text-navy-950">N° 2026-0001</p>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* 1. Identificación del Consumidor */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-bold text-navy-900 border-b border-slate-100 pb-2">
                      1. Identificación del Consumidor
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">
                          Nombre completo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          required
                          className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-sm"
                          placeholder="Ej. Juan Pérez"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">
                          DNI / RUC <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="documento"
                          required
                          className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-sm"
                          placeholder="Número de documento"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">
                          Correo electrónico <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-sm"
                          placeholder="usuario@correo.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Teléfono <span className="text-slate-400 font-normal">(opcional)</span></label>
                        <input
                          type="tel"
                          name="telefono"
                          className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-sm"
                          placeholder="999 999 999"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Identificación del Bien Contratado */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-bold text-navy-900 border-b border-slate-100 pb-2">
                      2. Identificación del Bien Contratado
                    </h2>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Descripción del bien o servicio contratado <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="descripcion_bien"
                        required
                        rows={3}
                        className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-sm resize-none"
                        placeholder="Detalle el plan o curso contratado"
                      />
                    </div>
                  </div>

                  {/* 3. Detalle de la Reclamación */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-bold text-navy-900 border-b border-slate-100 pb-2">
                      3. Detalle de la Reclamación
                    </h2>

                    {/* Radio buttons */}
                    <div className="flex gap-8 py-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="tipo"
                          value="Reclamo"
                          checked={tipo === "Reclamo"}
                          onChange={() => setTipo("Reclamo")}
                          className="w-5 h-5 text-brand-600 focus:ring-brand-500 accent-brand-600"
                        />
                        <span className="font-bold text-slate-700 group-hover:text-navy-900 transition-colors">
                          Reclamo
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="tipo"
                          value="Queja"
                          checked={tipo === "Queja"}
                          onChange={() => setTipo("Queja")}
                          className="w-5 h-5 text-brand-600 focus:ring-brand-500 accent-brand-600"
                        />
                        <span className="font-bold text-slate-700 group-hover:text-navy-900 transition-colors">
                          Queja
                        </span>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Detalle de la queja o reclamo <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="detalle"
                        required
                        rows={4}
                        className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-sm resize-none"
                        placeholder="Explique lo sucedido de forma detallada"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Pedido o solicitud del consumidor <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="pedido"
                        required
                        rows={3}
                        className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all text-sm resize-none"
                        placeholder="¿Qué solución espera recibir?"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-5 bg-brand-700 hover:bg-brand-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand-900/10 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    <Send className="w-5 h-5" />
                    Enviar reclamación
                  </button>

                  <p className="text-center text-xs text-slate-400 font-medium">
                    * El proveedor debe dar respuesta al reclamo en un plazo no mayor a 30 días calendario.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="py-16 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-display font-extrabold text-navy-950 mb-3">
                    ¡Reclamación enviada!
                  </h2>
                  <p className="text-slate-500 text-[15px] max-w-md mx-auto leading-relaxed mb-8">
                    Su {tipo.toLowerCase()} ha sido registrado correctamente. Recibirá una respuesta en un plazo no mayor a 30 días calendario al correo electrónico proporcionado.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-950 text-white rounded-xl font-bold text-sm hover:bg-brand-950 transition-all active:scale-95"
                  >
                    Volver al inicio
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Mini footer */}
      <footer className="bg-navy-950 py-6 text-center">
        <p className="text-white/25 text-xs font-medium">
          © 2026 Instituto Pulso Fiscal. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}