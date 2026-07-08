"use client";

import { useRef, useState } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/ipf/Header";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";

const contactInfo = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Jr. Los Crisantemos 110, Santiago de Surco, Lima, Perú",
    href: undefined,
  },
  {
    icon: Mail,
    label: "Consultas",
    value: "consultas@inpulsofiscal.com",
    href: "mailto:consultas@inpulsofiscal.com",
  },
  {
    icon: Mail,
    label: "Cursos",
    value: "cursosipf@inpulsofiscal.com",
    href: "mailto:cursosipf@inpulsofiscal.com",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+51 943 279 673",
    href: "tel:+51943279673",
  },
];

export default function ContactoPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-[76px]">
        {/* Hero */}
        <section className="bg-[#EFF6FF] py-24 lg:py-32">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <span className="home-kicker">Contáctanos</span>
            <h1 className="text-[clamp(1.8rem,4vw,2.75rem)] font-display font-extrabold text-navy-950 mt-6 mb-4 leading-[1.15]">
              Contacto
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Estamos aquí para atender tus consultas, propuestas o solicitudes de información.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="bg-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div ref={sectionRef} className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-navy-950 mb-4">
                  Información de Contacto
                </h2>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                  Puedes comunicarte con nosotros a través de los siguientes canales. Responderemos a la brevedad.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item) => {
                    const Icon = item.icon;
                    const Wrapper = item.href ? "a" : "div";
                    const wrapperProps = item.href
                      ? {
                          href: item.href,
                          target: item.href.startsWith("mailto") ? undefined : "_blank",
                          rel: item.href.startsWith("mailto") ? undefined : "noopener noreferrer",
                          className:
                            "flex items-start gap-4 p-5 rounded-[20px] border border-slate-100 bg-slate-50/50 hover:border-brand-200 hover:bg-brand-50/50 transition-all duration-300 group",
                        }
                      : {
                          className:
                            "flex items-start gap-4 p-5 rounded-[20px] border border-slate-100 bg-slate-50/50",
                        };

                    return (
                      <Wrapper key={item.label} {...(wrapperProps as Record<string, unknown>)}>
                        <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100 transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">
                            {item.label}
                          </p>
                          <p className="text-sm font-semibold text-navy-950 leading-relaxed">
                            {item.value}
                          </p>
                        </div>
                      </Wrapper>
                    );
                  })}
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="rounded-[24px] border border-slate-100 bg-white p-8 shadow-sm">
                  <h2 className="text-2xl font-display font-extrabold text-navy-950 mb-2">
                    Envíanos un Mensaje
                  </h2>
                  <p className="text-slate-500 text-sm mb-8">
                    Completa el formulario y nos pondremos en contacto contigo.
                  </p>

                  {submitted && (
                    <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium">
                      Tu mensaje ha sido enviado correctamente. Te responderemos pronto.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-semibold text-navy-950 mb-2"
                      >
                        Nombre completo
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ingresa tu nombre"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-navy-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-semibold text-navy-950 mb-2"
                      >
                        Correo electrónico
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="correo@ejemplo.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-navy-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-semibold text-navy-950 mb-2"
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Escribe tu mensaje aquí..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-navy-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:shadow-md hover:from-brand-700 hover:to-brand-800 transition-all duration-300"
                    >
                      <Send className="w-4 h-4" />
                      Enviar mensaje
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}