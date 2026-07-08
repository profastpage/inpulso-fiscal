import type { Metadata } from "next";
import NosotrosPage from "./NosotrosPage";
import { JsonLd, breadcrumbSchema } from "@/components/ipf/JsonLd";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce al Instituto Pulso Fiscal: referencia independiente en investigación económica, política fiscal y gestión pública en Perú. Nuestro equipo de expertos.",
  openGraph: {
    title: "Nosotros | Instituto Pulso Fiscal",
    description:
      "Referente independiente en investigación económica y política fiscal en Perú. Conoce nuestro equipo, misión y valores.",
    url: "/nosotros",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Instituto Pulso Fiscal — Sobre Nosotros" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Instituto Pulso Fiscal",
    description:
      "Referente independiente en investigación económica y política fiscal en Perú.",
    images: ["/og-image.png"],
    creator: "@inpulsofiscal",
  },
  alternates: { canonical: "/nosotros" },
};

export default function Nosotros() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Nosotros", url: "/nosotros" },
        ])}
      />
      <NosotrosPage />
    </>
  );
}