import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ReadingProgressBar from "@/components/ipf/ReadingProgressBar";
import ParticleBackground from "@/components/ipf/ParticleBackground";
import MobileBottomNav from "@/components/ipf/MobileBottomNav";

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

export const metadata: Metadata = {
  title: "Inicio | Instituto Pulso Fiscal",
  description:
    "Portal líder en análisis económico, política fiscal y gestión pública en Perú. Think Tank especializado en macroeconomía y presupuesto público.",
  keywords: [
    "Instituto Pulso Fiscal",
    "macroeconomía Perú",
    "política fiscal",
    "presupuesto público",
    "gestión pública",
    "think tank Perú",
  ],
  authors: [{ name: "Instituto Pulso Fiscal" }],
  openGraph: {
    title: "Instituto Pulso Fiscal",
    description:
      "Tu fuente confiable de conocimiento y análisis económico y fiscal",
    url: "https://www.inpulsofiscal.com",
    siteName: "Instituto Pulso Fiscal",
    type: "website",
    locale: "es_PE",
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
        <ReadingProgressBar />
        <ParticleBackground />
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}