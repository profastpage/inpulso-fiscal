import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ReadingProgressBar from "@/components/ipf/ReadingProgressBar";
import ParticleBackground from "@/components/ipf/ParticleBackground";
import MobileBottomNav from "@/components/ipf/MobileBottomNav";
import { JsonLd, organizationSchema, webSiteSchema } from "@/components/ipf/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const SITE_URL = "https://www.inpulsofiscal.com";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: {
    default: "Instituto Pulso Fiscal — Análisis Económico y Política Fiscal en Perú",
    template: "%s | Instituto Pulso Fiscal",
  },
  description:
    "Portal líder en análisis económico, política fiscal y gestión pública en Perú. Think Tank especializado en macroeconomía y presupuesto público.",
  keywords: [
    "Instituto Pulso Fiscal",
    "macroeconomía Perú",
    "política fiscal",
    "presupuesto público",
    "gestión pública",
    "think tank Perú",
    "semana fiscal",
    "reportes técnicos",
    "cursos economía",
  ],
  authors: [{ name: "Instituto Pulso Fiscal", url: SITE_URL }],
  creator: "Instituto Pulso Fiscal",
  publisher: "Instituto Pulso Fiscal",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Instituto Pulso Fiscal — Análisis Económico y Política Fiscal en Perú",
    description:
      "Tu fuente confiable de análisis económico, política fiscal y gestión pública. Think Tank especializado en macroeconomía y presupuesto público de Perú.",
    url: SITE_URL,
    siteName: "Instituto Pulso Fiscal",
    type: "website",
    locale: "es_PE",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Instituto Pulso Fiscal — Think Tank de análisis económico y político fiscal en Perú",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instituto Pulso Fiscal — Análisis Económico y Política Fiscal en Perú",
    description:
      "Tu fuente confiable de análisis económico, política fiscal y gestión pública. Think Tank especializado en macroeconomía de Perú.",
    images: [OG_IMAGE],
    creator: "@inpulsofiscal",
  },
  other: {
    "image:width": "1200",
    "image:height": "630",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakarta.variable} antialiased`}
      >
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
        <ReadingProgressBar />
        <ParticleBackground />
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}