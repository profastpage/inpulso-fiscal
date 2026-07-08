import type { Metadata } from "next";
import CursosPage from "./CursosPage";

export const metadata: Metadata = {
  title: "Cursos | Instituto Pulso Fiscal",
  description:
    "Formación especializada en macroeconomía, política fiscal, presupuestos públicos y sistemas administrativos del sector público en Perú.",
};

export default function Cursos() {
  return <CursosPage />;
}