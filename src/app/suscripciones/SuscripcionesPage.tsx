"use client";

import { useState, useEffect, useCallback, useRef, FormEvent } from "react";
import Script from "next/script";
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
  Eye,
  CheckCircle2,
  LayoutDashboard,
  X,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/ipf/Header";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";
import Section from "@/components/ipf/Section";
import SectionNav from "@/components/ipf/SectionNav";
import { useSectionDeepLink } from "@/hooks/useSectionDeepLink";
import { reports } from "@/data/publications";

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
    amountCents: 1990,
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
    amountCents: 23880,
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
    amountCents: 2990,
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
    amountCents: 35880,
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

const SECTIONS = [
  { id: "planes", label: "Planes" },
];
const sectionIds = SECTIONS.map((s) => s.id);

const CULQI_PUBLIC_KEY = "pk_live_O3HVawHs1fTessM1";
const CULQI_JS_URL = "https://checkout.culqi.com/js/v4";

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
  const [previewDoc, setPreviewDoc] = useState<(typeof reports)[number] | null>(null);
  const [paymentStep, setPaymentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[number] | null>(null);
  const [paymentError, setPaymentError] = useState("");
  const [paymentResult, setPaymentResult] = useState({
    plan_name: "",
    fecha_inicio: "",
    fecha_vencimiento: "",
    subscription_id: "",
  });

  // Ref para guardar datos del formulario antes de abrir Culqi
  const formEmailRef = useRef("");
  const formMetadataRef = useRef<Record<string, string>>({});

  const { activeId, scrollToSection } = useSectionDeepLink({ sectionIds });

  const isAnual = selectedPlan?.period.includes("año");

  const handleSubscribe = (plan: (typeof plans)[number]) => {
    setSelectedPlan(plan);
    setPaymentStep(1);
    setPaymentError("");
    setPaymentModal(true);
  };

  const closeModal = () => {
    setPaymentModal(false);
    setPaymentStep(1);
    setPaymentError("");
    setSelectedPlan(null);
  };

  /* ------------------------------------------ */
  /* Enviar token a nuestro servidor para crear  */
  /* la suscripción con el plan de Culqi         */
  /* ------------------------------------------ */
  const processSubscription = useCallback(
    async (culqiTokenId: string) => {
      if (!selectedPlan) return;

      setPaymentStep(2); // Loading

      try {
        const res = await fetch("/api/culqi/charge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token_id: culqiTokenId,
            plan_id: selectedPlan.culqiPlanId,
            email: formEmailRef.current,
            first_name: formMetadataRef.current.departamento || "Suscriptor",
            last_name: "IPF",
            phone: formMetadataRef.current.celular || undefined,
            metadata: {
              plan_slug: selectedPlan.slug,
              plan_name: `${selectedPlan.kicker} ${selectedPlan.name}`,
              ...formMetadataRef.current,
            },
          }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          setPaymentError(data.error || "Error al procesar el pago");
          setPaymentStep(4); // Error step
          return;
        }

        // Exito
        const now = new Date();
        const endDate = new Date(
          now.getTime() + (isAnual ? 365 : 30) * 24 * 60 * 60 * 1000
        );

        setPaymentResult({
          plan_name: `${selectedPlan.kicker} ${selectedPlan.name}`,
          fecha_inicio: now.toLocaleDateString("es-PE"),
          fecha_vencimiento: endDate.toLocaleDateString("es-PE"),
          subscription_id: data.subscription_id || "",
        });

        // Guardar plan en localStorage para control de acceso a documentos
        try {
          const planType = selectedPlan.category === "premium" ? "premium" : "basico";
          localStorage.setItem(
            "ipf_subscription",
            JSON.stringify({
              plan: planType,
              planName: `${selectedPlan.kicker} ${selectedPlan.name}`,
              subscriptionId: data.subscription_id || "",
              activatedAt: now.toISOString(),
              expiresAt: endDate.toISOString(),
            })
          );
        } catch {}

        setPaymentStep(3); // Success
      } catch {
        setPaymentError("Error de conexion. Intenta de nuevo.");
        setPaymentStep(4);
      }
    },
    [selectedPlan, isAnual]
  );

  /* ------------------------------------------ */
  /* Callback global que Culqi.js llama al crear */
  /* el token de la tarjeta                      */
  /* ------------------------------------------ */
  useEffect(() => {
    // Definir la funcion global que Culqi.js invoca
    (window as unknown as Record<string, unknown>).Culqi_token = (token: { id: string }) => {
      console.log("[Culqi] Token recibido:", token.id);
      // Cerrar el checkout de Culqi
      const Culqi = (window as unknown as Record<string, unknown>).Culqi as {
        close?: () => void } | undefined;
      if (Culqi?.close) Culqi.close();
      // Procesar la suscripcion con nuestro servidor
      processSubscription(token.id);
    };

    // Callback de error de Culqi
    (window as unknown as Record<string, unknown>).Culqi_error = (error: { user_message?: string; message?: string }) => {
      console.error("[Culqi] Error:", error);
      setPaymentError(error.user_message || error.message || "Error en el procesamiento del pago");
      setPaymentStep(4);
    };

    // Callback cuando el usuario cierra el checkout sin pagar
    (window as unknown as Record<string, unknown>).Culqi_close = () => {
      console.log("[Culqi] Checkout cerrado por el usuario");
      // No cambiamos de step, el modal sigue en step 1
    };
  }, [processSubscription]);

  /* ------------------------------------------ */
  /* Abrir el Checkout de Culqi                  */
  /* ------------------------------------------ */
  const openCulqiCheckout = () => {
    if (!selectedPlan) return;

    const Culqi = (window as unknown as Record<string, unknown>).Culqi as
      | {
          publicKey?: string;
          settings?: (opts: Record<string, unknown>) => void;
          open?: () => void;
        }
      | undefined;

    if (!Culqi) {
      setPaymentError("Culqi no está disponible. Recarga la página.");
      setPaymentStep(4);
      return;
    }

    // Configurar llave publica
    Culqi.publicKey = CULQI_PUBLIC_KEY;

    // Configurar checkout
    Culqi.settings?.({
      title: `Suscripción - ${selectedPlan.kicker} ${selectedPlan.name}`,
      currency: "PEN",
      description: `${selectedPlan.kicker} ${selectedPlan.name} - Instituto Pulso Fiscal`,
      amount: selectedPlan.amountCents,
    });

    // Abrir el formulario de pago de Culqi
    Culqi.open?.();
  };

  /* ------------------------------------------ */
  /* Submit del formulario nuestro               */
  /* ------------------------------------------ */
  const handlePaymentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const celular = (form.elements.namedItem("celular") as HTMLInputElement)?.value || "";
    const departamento = (form.elements.namedItem("departamento") as HTMLInputElement)?.value || "";
    const provincia = (form.elements.namedItem("provincia") as HTMLInputElement)?.value || "";
    const distrito = (form.elements.namedItem("distrito") as HTMLInputElement)?.value || "";

    formEmailRef.current = email;
    formMetadataRef.current = { celular, departamento, provincia, distrito };

    // Abrir el checkout de Culqi
    openCulqiCheckout();
  };

  const handleRetry = () => {
    setPaymentStep(1);
    setPaymentError("");
  };

  const plan = selectedPlan;

  return (
    <>
      {/* Cargar Culqi.js v4 */}
      <Script
        src={CULQI_JS_URL}
        strategy="lazyOnload"
        onLoad={() => console.log("[Culqi] SDK cargado correctamente")}
        onError={() => console.error("[Culqi] Error cargando SDK")}
      />

      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />

        <main className="pricing-premium pricing-premium--page flex-1">
          <div className="pricing-premium__bg pricing-premium__bg--radials" />
          <div className="pricing-premium__bg pricing-premium__bg--glow-tl" />
          <div className="pricing-premium__bg pricing-premium__bg--glow-br" />
          <div className="pricing-premium__container">
            <header className="pricing-premium__header">
              <div className="mb-8 p-4 bg-amber-100 border border-amber-200 rounded-2xl text-center shadow-sm">
                <span className="text-sm font-bold text-amber-900 flex items-center justify-center gap-2">
                  Precios de oferta especial por lanzamiento de la página
                </span>
              </div>
            </header>

            {/* ========== CONTENIDO EXCLUSIVO ========== */}
            <div className="mb-20">
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-100 rounded-full text-xs font-bold text-brand-700 uppercase tracking-wider mb-4">
                  <Lock className="w-3.5 h-3.5" />
                  Contenido exclusivo
                </span>
                <h2 className="text-3xl font-display font-extrabold text-white mt-4">
                  Documentos incluidos en tu suscripción
                </h2>
                <p className="text-slate-400 text-sm mt-3 max-w-lg mx-auto">
                  Las primeras 2 páginas son visibles. Suscríbete para acceder al documento completo.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {reports.slice(0, 8).map((doc, i) => {
                  const totalPages = doc.id === 30 ? 26 : doc.id === 31 ? 8 : null;
                  return (
                    <motion.div
                      key={doc.id}
                      className="relative group rounded-2xl overflow-hidden bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      onClick={() => setPreviewDoc(doc)}
                    >
                      <div className="px-4 py-3 bg-navy-950 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: doc.config.color }} />
                        <h3 className="text-[11px] font-bold text-white truncate flex-1">{doc.title}</h3>
                      </div>

                      <div className="relative bg-slate-100">
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <img src={`/previews/${doc.id}/page-1.jpg`} alt={doc.title} className="w-full h-full object-cover object-top" loading="lazy" />
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                            <span className="text-[9px] font-bold text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">2 de {totalPages || "?"} páginas visibles</span>
                            <span className="text-[9px] font-bold text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">{doc.publicationType}</span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/30 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-xl shadow-xl px-4 py-2.5 flex items-center gap-2">
                            <Eye className="w-4 h-4 text-brand-700" />
                            <span className="text-xs font-bold text-navy-950">Visualizar</span>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">{doc.date}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: doc.config.color, background: `${doc.config.color}15` }}>{doc.category}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center mt-8">
                <a href="/reportes" className="inline-flex items-center gap-2 text-sm font-bold text-brand-400 hover:text-brand-300 transition-colors">
                  Ver todas las publicaciones <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* ========== PLANES DE SUSCRIPCION ========== */}
            <span className="pricing-premium__pill">Niveles de Acceso Técnico</span>
            <h2 className="text-3xl font-display font-extrabold text-white mt-4 text-center">
              Invierta en su <span className="pricing-premium__title-accent">Visión Estratégica</span>
            </h2>
            <div className="mb-10" />

            <Section id="planes" className="mb-16" ariaLabel="Planes de suscripción">
            <div className="plan-grid-v4">
              {plans.map((p, i) => {
                const IconComp = p.icon;
                return (
                  <motion.article key={p.id} className={`plan-card-v4 \${p.recommended ? "plan-card-v4--recommended" : ""} \${p.category === "premium" ? "plan-card-v4--premium" : ""}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                    {p.badge && <span className={`plan-card-v4__badge \${p.badgeType === "recommended" ? "plan-card-v4__badge--recommended" : "plan-card-v4__badge--promo"}`}>{p.badge}</span>}
                    <PlanIcon icon={IconComp} category={p.category} />
                    <div className="plan-card-v4__content">
                      <p className={`plan-card-v4__category \${p.category === "premium" ? "plan-card-v4__category--premium" : "plan-card-v4__category--basic"}`}>{p.kicker}</p>
                      <h3 className="plan-card-v4__name">{p.name}</h3>
                      <p className="plan-card-v4__description">{p.description}</p>
                    </div>
                    <div className="plan-card-v4__price"><div className="plan-card-v4__price-main">
                      <span className="plan-card-v4__price-symbol">S/</span>
                      <span className="plan-card-v4__price-amount">{p.amount}</span>
                      <span className="plan-card-v4__price-decimal">{p.decimal}</span>
                      <span className="text-lg font-bold ml-1 opacity-50">/{p.period.includes("año") ? "año" : "mes"}</span>
                    </div></div>
                    <div className="plan-card-v4__features">{p.features.map((f, fi) => { const FIcon = f.icon; return (<div key={fi} className="plan-card-v4__feature"><FIcon className="w-4 h-4 text-emerald-500" /><span>{f.text}</span></div>); })}</div>
                    <button onClick={() => handleSubscribe(p)} className={`plan-card-v4__cta \${p.category === "premium" ? "plan-card-v4__cta--premium" : "plan-card-v4__cta--primary"}`}>Suscribirse <ArrowRight className="w-4 h-4" /></button>
                  </motion.article>
                );
              })}
            </div>
            </Section>

            <div className="mt-12 text-center">
              <p className="text-slate-500 text-base">
                ¿Tienes un equipo de 5 personas o más? Consulta por{" "}
                <a href="mailto:consultas@inpulsofiscal.com" className="text-brand-600 font-bold hover:underline">planes corporativos</a>{" "}
                escribiendo a{" "}
                <a href="mailto:consultas@inpulsofiscal.com" className="text-brand-600 font-bold hover:underline">consultas@inpulsofiscal.com</a>
              </p>
            </div>
</main>

        <SectionNav items={SECTIONS} activeId={activeId} onSelect={scrollToSection} />
        <Footer />
        <WhatsAppButton />

        {/* ======================== */}
        {/* DOCUMENT PREVIEW MODAL   */}
        {/* ======================== */}
        <AnimatePresence>
          {previewDoc && (
            <motion.div
              className="fixed inset-0 z-[120] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setPreviewDoc(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal header */}
                <div className="px-5 py-4 bg-navy-950 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: previewDoc.config.color }} />
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white truncate">{previewDoc.title}</h3>
                      <p className="text-[10px] text-slate-400">{previewDoc.publicationType} · {previewDoc.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreviewDoc(null)}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* Scrollable pages */}
                <div className="overflow-y-auto flex-1 bg-slate-100">
                  {/* Page 1 - fully visible */}
                  <div className="p-4 pb-2">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                      <img
                        src={`/previews/${previewDoc.id}/page-1.jpg`}
                        alt="Página 1"
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="text-center text-[10px] font-bold text-slate-400 mt-2">Página 1</p>
                  </div>

                  {/* Page 2 - fully visible */}
                  <div className="p-4 pb-2">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                      <img
                        src={`/previews/${previewDoc.id}/page-2.jpg`}
                        alt="Página 2"
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="text-center text-[10px] font-bold text-slate-400 mt-2">Página 2</p>
                  </div>

                  {/* Pages 3+ - LOCKED */}
                  <div className="px-4 pb-6">
                    <div className="relative bg-navy-950 rounded-xl overflow-hidden py-16 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                        <Lock className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-white font-bold text-base mb-1">Documento bloqueado</h4>
                      <p className="text-white/50 text-sm mb-6 text-center px-8">
                        Las páginas restantes están disponibles con una suscripción activa.
                      </p>
                      <a
                        href="#planes"
                        onClick={() => { setPreviewDoc(null); }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 hover:bg-brand-800 text-white rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
                      >
                        Ver planes de suscripción
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                onClick={closeModal}
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
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors z-10"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>

                {/* Step 1: Form (datos del suscriptor) */}
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
                          placeholder="correo@ejemplo.com"
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
                          Proceder al pago con Culqi
                        </button>

                        <div className="flex items-center justify-center gap-3 pb-1">
                          <p className="text-[9px] text-slate-400 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            Pago seguro
                          </p>
                          <span className="text-[9px] text-slate-300">|</span>
                          <p className="text-[9px] text-slate-400">
                            Visa, Mastercard, Yape, PagoEfectivo
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Step 2: Loading (procesando con nuestro servidor) */}
                {paymentStep === 2 && (
                  <div className="p-14 text-center">
                    <div className="relative w-14 h-14 mx-auto mb-5">
                      <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
                      <div className="absolute inset-0 border-4 border-brand-600 rounded-full border-t-transparent animate-spin" />
                    </div>
                    <h3 className="text-lg font-display font-extrabold text-navy-950 mb-1">
                      Procesando suscripción
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Creando tu suscripción en Culqi...
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
                      {paymentResult.subscription_id && (
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-bold uppercase text-[9px]">
                            ID Suscripción
                          </span>
                          <span className="text-navy-950 font-bold text-xs font-mono">
                            {paymentResult.subscription_id.slice(0, 16)}...
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-slate-500 text-xs mb-6">
                      Recibirás un correo de confirmación con los detalles.
                    </p>

                    <a
                      href="/"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-950 text-white rounded-xl font-bold text-sm hover:bg-brand-950 transition-all active:scale-95"
                    >
                      Ir al inicio
                      <LayoutDashboard className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {/* Step 4: Error */}
                {paymentStep === 4 && (
                  <div className="p-10 text-center">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5">
                      <AlertCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-display font-extrabold text-navy-950 mb-2">
                      Pago no completado
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
                      {paymentError || "Ocurrió un error al procesar tu pago. Intenta nuevamente."}
                    </p>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handleRetry}
                        className="w-full py-3 bg-brand-700 hover:bg-brand-800 text-white rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
                      >
                        Reintentar pago
                      </button>
                      <button
                        onClick={closeModal}
                        className="w-full py-2.5 text-slate-500 hover:text-navy-950 text-xs font-bold transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}