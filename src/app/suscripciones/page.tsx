import type { Metadata } from "next";
import SuscripcionesPage from "./SuscripcionesPage";
import { JsonLd, breadcrumbSchema, faqSchema, productSchema } from "@/components/ipf/JsonLd";

export const metadata: Metadata = {
  title: "Planes de Suscripción",
  description:
    "Accede a planes Básico y Premium con publicaciones exclusivas, descargas ilimitadas y 60% de descuento en cursos del Instituto Pulso Fiscal.",
  openGraph: {
    title: "Planes de Suscripción | Instituto Pulso Fiscal",
    description:
      "Planes Básico y Premium con publicaciones exclusivas, descargas y 60% de descuento en cursos. Precios de lanzamiento.",
    url: "/suscripciones",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Planes de Suscripción — Instituto Pulso Fiscal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planes de Suscripción | Instituto Pulso Fiscal",
    description:
      "Planes Básico y Premium: publicaciones exclusivas, descargas y 60% de descuento en cursos.",
    images: ["/og-image.png"],
    creator: "@inpulsofiscal",
  },
  alternates: { canonical: "/suscripciones" },
};

const pricingFaqs = [
  {
    question: "¿Cuánto cuesta suscribirse al Instituto Pulso Fiscal?",
    answer:
      "El Instituto Pulso Fiscal ofrece planes desde S/ 49.90 mensuales (plan Básico) hasta S/ 149.90 mensuales (plan Premium). Los planes anuales tienen tarifas reducidas. Actualmente hay precios especiales de lanzamiento con hasta 60% de descuento en cursos.",
  },
  {
    question: "¿Qué incluye el plan Premium del Instituto Pulso Fiscal?",
    answer:
      "El plan Premium incluye acceso a todas las publicaciones (Semana Fiscal, reportes OSESA, análisis técnicos), descargas ilimitadas en PDF, 60% de descuento en todos los cursos, acceso anticipado a informes y prioridad en consultorías. Ideal para profesionales que requieren información económica permanente.",
  },
  {
    question: "¿Puedo cancelar mi suscripción en cualquier momento?",
    answer:
      "Sí, puedes cancelar tu suscripción en cualquier momento desde tu cuenta. La cancelación se efectúa al finalizar el período de facturación actual. Consulta nuestra política de devoluciones en inpulsofiscal.com/devoluciones para más detalles.",
  },
];

export default function Suscripciones() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Planes de Suscripción", url: "/suscripciones" },
        ])}
      />
      <JsonLd data={faqSchema(pricingFaqs)} />
      <JsonLd
        data={productSchema({
          name: "Suscripción Premium — Instituto Pulso Fiscal",
          description:
            "Acceso completo a todas las publicaciones técnicas, Semana Fiscal, reportes OSESA, descargas ilimitadas y 60% de descuento en cursos de formación especializada.",
          url: "/suscripciones",
          price: "149.90",
          priceCurrency: "PEN",
        })}
      />
      <SuscripcionesPage />
    </>
  );
}