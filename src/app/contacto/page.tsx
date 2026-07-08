import type { Metadata } from "next";
import ContactoPage from "./ContactoPage";

export const metadata: Metadata = {
  title: "Contacto | Instituto Pulso Fiscal",
  description:
    "Ponte en contacto con el Instituto Pulso Fiscal. Envíanos tus consultas, propuestas o solicitudes de información sobre nuestros servicios.",
};

export default function Contacto() {
  return <ContactoPage />;
}