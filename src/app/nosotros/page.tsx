import type { Metadata } from "next";
import NosotrosPage from "./NosotrosPage";

export const metadata: Metadata = {
  title: "Quiénes Somos | Instituto Pulso Fiscal",
  description:
    "Conoce la historia, misión, visión y equipo del Instituto Pulso Fiscal. Centro de investigación independiente especializado en macroeconomía y gestión pública en Perú.",
};

export default function Nosotros() {
  return <NosotrosPage />;
}