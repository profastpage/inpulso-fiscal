import type { Metadata } from "next";
import NosotrosPage from "./NosotrosPage";

export const metadata: Metadata = {
  title: "Nosotros | Instituto Pulso Fiscal",
  description:
    "Conoce al Instituto Pulso Fiscal: referencia independiente en investigación económica, política fiscal y gestión pública en Perú. Nuestro equipo de expertos.",
  openGraph: {
    title: "Nosotros | Instituto Pulso Fiscal",
    description:
      "Referente independiente en investigación económica y política fiscal en Perú.",
    url: "https://inpulso-fiscal.vercel.app/nosotros",
    siteName: "Instituto Pulso Fiscal",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Instituto Pulso Fiscal",
    description:
      "Referente independiente en investigación económica y política fiscal en Perú.",
  },
};

export default function Nosotros() {
  return <NosotrosPage />;
}