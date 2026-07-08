import type { Metadata } from "next";
import SuscripcionesPage from "./SuscripcionesPage";

export const metadata: Metadata = {
  title: "Suscripciones | Instituto Pulso Fiscal",
  description:
    "Conoce los planes de suscripción del Instituto Pulso Fiscal y accede a publicaciones exclusivas, cursos y beneficios para profesionales.",
};

export default function Suscripciones() {
  return <SuscripcionesPage />;
}