"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Lock,
  Eye,
  Crown,
  BookOpen,
  Calendar,
  Tag,
} from "lucide-react";
import Header from "@/components/ipf/Header";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";
import { getReportById, categoryConfig } from "@/data/publications";
import { useSubscription } from "@/hooks/useSubscription";

export default function PublicacionView({ id }: { id: string }) {
  const report = getReportById(id);
  const { plan, isSubscribed, canDownload, loading: subLoading } = useSubscription();
  const [pdfLoading, setPdfLoading] = useState(true);

  useEffect(() => {
    setPdfLoading(true);
  }, [id]);

  // ---- 404 ----
  if (!report) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-6xl font-black text-slate-200 mb-4">404</h1>
          <p className="text-slate-500 text-lg mb-8">Documento no encontrado</p>
          <Link
            href="/reportes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 text-white rounded-xl font-bold text-sm hover:bg-brand-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Ver todas las publicaciones
          </Link>
        </div>
        </main>
        <Footer />
      </div>
    );
  }

  const catConf = categoryConfig.find((c) => c.name === report.category);
  const isLocked = !isSubscribed;
  const isBasicLocked = isSubscribed && !canDownload;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/reportes"
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-slate-500" />
              </Link>
              <div className="min-w-0">
                <h1 className="text-sm font-bold text-navy-950 truncate">
                  {report.title}
                </h1>
                <p className="text-[11px] text-slate-400">
                  {report.publicationType} · {report.date}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Plan badge */}
              {report.isPremium && isSubscribed && (
                <span className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${plan === "premium" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-600"}`}>
                  {plan === "premium" ? <Crown className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                  Plan {plan === "premium" ? "Premium" : "Basico"}
                </span>
              )}

              {/* Download button - solo para free o premium */}
              {!isLocked && (
                canDownload || !report.isPremium ? (
                  <a
                    href={report.url}
                    download
                    className="flex items-center gap-1.5 px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white rounded-lg font-bold text-xs transition-all active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Descargar PDF</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-400 rounded-lg text-xs font-bold" title="Tu plan Basico solo permite lectura. Actualiza a Premium para descargar.">
                    <Lock className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Solo lectura</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* PDF Viewer + Lock Overlay */}
        <div className="relative w-full" style={{ height: "calc(100vh - 57px)" }}>
          {/* Loading spinner */}
          {pdfLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-slate-500">Cargando documento...</p>
              </div>
            </div>
          )}

          {/* PDF iframe - siempre visible como preview */}
          <iframe
            src={`${report.url}#toolbar=0&navpanes=0`}
            className="w-full h-full border-0"
            title={report.title}
            onLoad={() => setPdfLoading(false)}
          />

          {/* Lock Overlay - solo para docs premium sin suscripcion */}
          {isLocked && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              {/* Blur backdrop */}
              <div className="absolute inset-0 backdrop-blur-lg bg-white/40" />
              
              {/* Lock card */}
              <div className="relative z-30 max-w-sm w-full mx-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                  {/* Lock icon */}
                  <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Lock className="w-10 h-10 text-brand-700" />
                  </div>

                  <h2 className="text-xl font-display font-extrabold text-navy-950 mb-2">
                    Documento bloqueado
                  </h2>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    Este documento es exclusivo para suscriptores.
                    Adquiere un plan para desbloquear el contenido completo.
                  </p>

                  {/* Document info */}
                  <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-left space-y-2">
                    <h3 className="font-bold text-navy-950 text-sm leading-tight">
                      {report.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {report.date}
                      </span>
                      <span className="flex items-center gap-1" style={{ color: report.config.color }}>
                        <Tag className="w-3 h-3" /> {report.category}
                      </span>
                    </div>
                  </div>

                  {/* Plan comparison mini */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="border border-slate-200 rounded-xl p-3 text-left">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Basico</p>
                      <div className="flex items-center gap-1 text-xs text-slate-700">
                        <Eye className="w-3 h-3 text-blue-500" /> Lectura en linea
                      </div>
                      <p className="text-[9px] text-slate-400 mt-1">Sin descarga</p>
                    </div>
                    <div className="border-2 border-amber-300 bg-amber-50 rounded-xl p-3 text-left">
                      <p className="text-[10px] font-black uppercase text-amber-600 tracking-wider mb-1 flex items-center gap-1">
                        <Crown className="w-3 h-3" /> Premium
                      </p>
                      <div className="flex items-center gap-1 text-xs text-slate-700">
                        <Eye className="w-3 h-3 text-blue-500" /> Lectura
                        <Download className="w-3 h-3 text-emerald-500" /> Descarga
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/suscripciones"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-700 hover:bg-brand-800 text-white rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
                  >
                    Comprar suscripcion
                    <Crown className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/reportes"
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 mt-4 transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" /> Volver a publicaciones
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
