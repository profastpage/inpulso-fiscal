"use client";

import { useState } from "react";
import {
  Check,
  Gift,
  FileText,
  Calendar,
  Zap,
  Crown,
  ArrowRight,
  ShieldCheck,
  Lock,
  Loader2,
  CheckCircle2,
  LayoutDashboard,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/ipf/Header";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";

/* ======================== */
/* PLAN DATA                 */
/* ======================== */
const plans = [
  {
    id: 1,
    slug: "basico_mensual",
    kicker: "Plan Básico",
    name: "Mensual",
    description: "Acceso esencial para profesionales del sector.",
    amount: "19",
    decimal: ".90",
    period: "por mes",
    icon: FileText,
    category: "basic" as const,
    features: [
      { icon: Check, text: "Acceso a publicaciones exclusivas (lectura solo en PDF)" },
      { icon: Check, text: "No se permite la descarga" },
      { icon: Check, text: "Sin descuento en cursos" },
    ],
    badge: "Precio de lanzamiento",
    badgeType: "promo" as const,
    recommended: false,
    culqiPlanId: "pln_live_hJ6zTYPuK2ZHOnKO",
  },
  {
    id: 2,
    slug: "basico_anual",
    kicker: "Plan Básico",
    name: "Anual",
    description: "Ahorro institucional con pago único anual.",
    amount: "238",
    decimal: ".80",
    period: "por año",
    icon: Calendar,
    category: "basic" as const,
    features: [
      { icon: Check, text: "Todo lo del plan mensual" },
      { icon: Gift, text: "Equivale a 1 mes gratis al pagar anualmente" },
    ],
    badge: "Precio de lanzamiento",
    badgeType: "promo" as const,
    recommended: false,
    culqiPlanId: "pln_live_eIFOnbr7ejLYVrrF",
  },
  {
    id: 3,
    slug: "premium_mensual",
    kicker: "Plan Premium",
    name: "Mensual",
    description: "Herramientas avanzadas de análisis y descarga.",
    amount: "29",
    decimal: ".90",
    period: "por mes",
    icon: Zap,
    category: "premium" as const,
    features: [
      { icon: Check, text: "Acceso a publicaciones exclusivas" },
      { icon: Check, text: "Descarga de todas las publicaciones" },
      { icon: Check, text: "60% de descuento en todos los cursos" },
    ],
    badge: "Precio de lanzamiento",
    badgeType: "promo" as const,
    recommended: false,
    culqiPlanId: "pln_live_mcIdivluLCVKgaWa",
  },
  {
    id: 4,
    slug: "premium_anual",
    kicker: "Plan Premium",
    name: "Anual",
    description: "La experiencia analítica completa definitiva.",
    amount: "358",
    decimal: ".80",
    period: "por año",
    icon: Crown,
    category: "premium" as const,
    features: [
      { icon: Check, text: "Todo lo del plan Premium mensual" },
      { icon: Gift, text: "Equivale a 1 mes gratis al pagar anualmente" },
    ],
    badge: "Recomendado",
    badgeType: "recommended" as const,
    recommended: true,
    culqiPlanId: "pln_live_Hq7E8xBJXW95sppv",
  },
];

/* ======================== */
/* ICON HELPER               */
/* ======================== */
function PlanIcon({ icon: Icon, category }: { icon: React.ElementType; category: "basic" | "premium" }) {
  const iconClass =
    category === "premium"
      ? "bg-amber-100 text-amber-700"
      : "bg-blue-100 text-blue-600";
  return (
    <div className={`plan-card-v4__icon ${iconClass}`}>
      <Icon className="w-5 h-5" />
    </div>
  );
}

/* ======================== */
/* MAIN PAGE COMPONENT       */
/* ======================== */
export default function SuscripcionesPage() {
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[number] | null>(null);
  const [paymentResult, setPaymentResult] = useState({
    plan_name: "",
    fecha_inicio: "",
    fecha_vencimiento: "",
  });

  const handleSubscribe = (plan: (typeof plans)[number]) => {
    setSelectedPlan(plan);
    setPaymentStep(1);
    setPaymentModal(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would open Culqi checkout
    // For now, simulate processing
    setPaymentStep(2);
    setTimeout(() => {
      setPaymentResult({
        plan_name: `${plan?.kicker} ${plan?.name}`,
        fecha_inicio: new Date().toLocaleDateString("es-PE"),
        fecha_vencimiento: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toLocaleDateString("es-PE"),
      });
      setPaymentStep(3);
    }, 2000);
  };

  const plan = selectedPlan;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="pricing-premium pricing-premium--page flex-1">
        <div className="pricing-premium__bg pricing-premium__bg--radials" />
        <div className="pricing-premium__bg pricing-premium__bg--glow-tl" />
        <div className="pricing-premium__bg pricing-premium__bg--glow-br" />
        <div className="pricing-premium__container">
          <header className="pricing-premium__header">
            {/* Banner de Oferta */}
            <div className="mb-10 p-4 bg-amber-100 border border-amber-200 rounded-2xl text-center shadow-sm">
              <span className="text-sm font-bold text-amber-900 flex items-center justify-center gap-2">
                Precios de oferta especial por lanzamiento de la página
              </span>
            </div>

            <span className="pricing-premium__pill">
              Niveles de Acceso Técnico
            </span>
            <h1 className="pricing-premium__title">
              Invierta en su{" "}
              <span className="pricing-premium__title-accent">
                Visión Estratégica
              </span>
            </h1>
            <div className="mb-10" />
          </header>

          {/* Plan Grid */}
          <div className="plan-grid-v4 mb-16">
            {plans.map((p, i) => {
              const IconComp = p.icon;
              return (
                <motion.article
                  key={p.id}
                  className={`plan-card-v4 ${
                    p.recommended ? "plan-card-v4--recommended" : ""
                  } ${p.category === "premium" ? "plan-card-v4--premium" : ""}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {p.badge && (
                    <span
                      className={`plan-card-v4__badge ${
                        p.badgeType === "recommended"
                          ? "plan-card-v4__badge--recommended"
                          : "plan-card-v4__badge--promo"
                      }`}
                    >
                      {p.badge}
                    </span>
                  )}

                  <PlanIcon icon={IconComp} category={p.category} />

                  <div className="plan-card-v4__content">
                    <p
                      className={`plan-card-v4__category ${
                        p.category === "premium"
                          ? "plan-card-v4__category--premium"
                          : "plan-card-v4__category--basic"
                      }`}
                    >
                      {p.kicker}
                    </p>
                    <h3 className="plan-card-v4__name">{p.name}</h3>
                    <p className="plan-card-v4__description">
                      {p.description}
                    </p>
                  </div>

                  <div className="plan-card-v4__price">
                    <div className="plan-card-v4__price-main">
                      <span className="plan-card-v4__price-symbol">S/</span>
                      <span className="plan-card-v4__price-amount">
                        {p.amount}
                      </span>
                      <span className="plan-card-v4__price-decimal">
                        {p.decimal}
                      </span>
                      <span className="text-lg font-bold ml-1 opacity-50">
                        /{p.period.includes("año") ? "año" : "mes"}
                      </span>
                    </div>
                  </div>

                  <div className="plan-card-v4__features">
                    {p.features.map((f, fi) => {
                      const FIcon = f.icon;
                      return (
                        <div key={fi} className="plan-card-v4__feature">
                          <FIcon className="w-4 h-4 text-emerald-500" />
                          <span>{f.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handleSubscribe(p)}
                    className={`plan-card-v4__cta ${
                      p.category === "premium"
                        ? "plan-card-v4__cta--premium"
                        : "plan-card-v4__cta--primary"
                    }`}
                  >
                    Suscribirse
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.article>
              );
            })}
          </div>

          {/* Planes Corporativos */}
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-base">
              ¿Tienes un equipo de 5 personas o más? Consulta por{" "}
              <a
                href="mailto:consultas@inpulsofiscal.com"
                className="text-brand-600 font-bold hover:underline"
              >
                planes corporativos
              </a>{" "}
              escribiendo a{" "}
              <a
                href="mailto:consultas@inpulsofiscal.com"
                className="text-brand-600 font-bold hover:underline"
              >
                consultas@inpulsofiscal.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />

      {/* ======================== */}
      {/* PAYMENT MODAL            */}
      {/* ======================== */}
      <AnimatePresence>
        {paymentModal && plan && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-navy-950/60 backdrop-blur-md"
              onClick={() => setPaymentModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setPaymentModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors z-10"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              {/* Step 1: Form */}
              {paymentStep === 1 && (
                <div className="flex flex-col overflow-hidden">
                  <div className="px-6 pt-5 pb-3 border-b border-slate-100 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-display font-extrabold text-navy-950">
                          Finalizar suscripción
                        </h2>
                        <p className="text-slate-400 text-[11px]">
                          {plan.kicker} {plan.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-brand-700">
                          S/ {plan.amount}
                          {plan.decimal}
                        </p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">
                          {plan.period}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-y-auto flex-1 px-6 py-4">
                    <form
                      id="payment-form"
                      onSubmit={handlePaymentSubmit}
                      className="space-y-2"
                    >
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
                        Correo de facturación
                      </p>

                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Correo electrónico"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-xs text-navy-950"
                      />

                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 mt-2">
                        Datos adicionales{" "}
                        <span className="text-slate-200 normal-case">
                          (opcional)
                        </span>
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        <select
                          name="pais"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-xs text-navy-950"
                        >
                          <option value="Perú" selected>
                            Perú
                          </option>
                        </select>
                        <input
                          type="text"
                          name="departamento"
                          placeholder="Departamento"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-xs text-navy-950"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          name="provincia"
                          placeholder="Provincia"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-xs text-navy-950"
                        />
                        <input
                          type="text"
                          name="distrito"
                          placeholder="Distrito"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-xs text-navy-950"
                        />
                      </div>

                      <input
                        type="tel"
                        name="celular"
                        placeholder="N° de celular"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-xs text-navy-950"
                      />

                      {/* Checkboxes */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            required
                            className="w-3.5 h-3.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 flex-shrink-0"
                          />
                          <span className="text-[11px] text-slate-500">
                            Acepto los{" "}
                            <a
                              href="/terminos"
                              target="_blank"
                              className="text-brand-700 font-bold underline"
                            >
                              Términos y Condiciones
                            </a>
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            required
                            className="w-3.5 h-3.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 flex-shrink-0"
                          />
                          <span className="text-[11px] text-slate-500">
                            Acepto la{" "}
                            <a
                              href="/devoluciones"
                              target="_blank"
                              className="text-brand-700 font-bold underline"
                            >
                              Política de Devoluciones y Reembolsos
                            </a>
                          </span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-brand-700 hover:bg-brand-800 text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-900/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-1"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Proceder al pago
                      </button>

                      <p className="text-center text-[9px] text-slate-400 flex items-center justify-center gap-1 pb-1">
                        <Lock className="w-2.5 h-2.5" />
                        Pagos seguros procesados por Culqi
                      </p>
                    </form>
                  </div>
                </div>
              )}

              {/* Step 2: Loading */}
              {paymentStep === 2 && (
                <div className="p-14 text-center">
                  <div className="relative w-14 h-14 mx-auto mb-5">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
                    <div className="absolute inset-0 border-4 border-brand-600 rounded-full border-t-transparent animate-spin" />
                  </div>
                  <h3 className="text-lg font-display font-extrabold text-navy-950 mb-1">
                    Procesando pago
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Validando la transacción...
                  </p>
                </div>
              )}

              {/* Step 3: Success */}
              {paymentStep === 3 && (
                <div className="p-10 text-center">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-navy-950 mb-3">
                    ¡Suscripción activada!
                  </h3>

                  <div className="bg-slate-50 rounded-2xl p-4 mb-5 text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold uppercase text-[9px]">
                        Plan
                      </span>
                      <span className="text-navy-950 font-bold text-xs">
                        {paymentResult.plan_name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold uppercase text-[9px]">
                        Inicio
                      </span>
                      <span className="text-navy-950 font-bold text-xs">
                        {paymentResult.fecha_inicio}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold uppercase text-[9px]">
                        Vencimiento
                      </span>
                      <span className="text-navy-950 font-bold text-xs">
                        {paymentResult.fecha_vencimiento}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-500 text-xs mb-6">
                    Plan activado exitosamente.
                  </p>

                  <a
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-950 text-white rounded-xl font-bold text-sm hover:bg-brand-950 transition-all active:scale-95"
                  >
                    Ir al panel
                    <LayoutDashboard className="w-4 h-4" />
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}