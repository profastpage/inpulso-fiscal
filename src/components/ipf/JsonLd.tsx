interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * JsonLd — server component that renders a JSON-LD <script> tag.
 * Do NOT add "use client" to this file.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE_URL = "https://www.inpulsofiscal.com";

/* ================================================================ */
/* ORGANIZATION + LOCALBUSINESS                                      */
/* ================================================================ */
export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "Instituto Pulso Fiscal",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.png`,
    description:
      "Think Tank peruano independiente especializado en análisis económico, política fiscal, presupuesto público y gestión pública. Más de 15 años de investigación y formación especializada.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jr. Los Crisantemos 110",
      addressLocality: "Santiago de Surco",
      addressRegion: "Lima",
      postalCode: "15023",
      addressCountry: "PE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -12.1196,
      longitude: -76.9776,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51-943279673",
      contactType: "customer service",
      email: "consultas@inpulsofiscal.com",
      availableLanguage: ["Spanish", "es"],
    },
    sameAs: [
      "https://www.linkedin.com/company/instituto-pulso-fiscal",
      "https://www.facebook.com/InstitutoPulsoFiscal",
      "https://twitter.com/inpulsofiscal",
    ],
    areaServed: {
      "@type": "Country",
      name: "Perú",
    },
    serviceType: [
      "Análisis macroeconómico",
      "Política fiscal",
      "Presupuesto público",
      "Gestión pública",
      "Supervisión sanitaria (OSESA)",
      "Formación especializada",
    ],
    knowsAbout: [
      "Macroeconomía peruana",
      "Política fiscal en Perú",
      "Presupuesto público del Perú",
      "Sistemas administrativos del Estado peruano",
      "Gestión pública en Perú",
      "Órgano de Supervisión de Servicios de Salud (OSESA)",
    ],
  };
}

/* ================================================================ */
/* WEB SITE + SEARCH ACTION                                          */
/* ================================================================ */
export function webSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Instituto Pulso Fiscal",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "es-PE",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/reportes?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ================================================================ */
/* BREADCRUMB LIST                                                   */
/* ================================================================ */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/* ================================================================ */
/* FAQ PAGE — essential for GEO (ChatGPT, Perplexity citations)      */
/* ================================================================ */
export function faqSchema(
  faqs: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/* ================================================================ */
/* ARTICLE — for reportes y publicaciones                            */
/* ================================================================ */
export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`,
    datePublished: opts.datePublished || new Date().toISOString(),
    dateModified: opts.dateModified || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: opts.authorName || "Instituto Pulso Fiscal",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Instituto Pulso Fiscal",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    image: opts.image || `${SITE_URL}/og-image.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`,
    },
    inLanguage: "es-PE",
  };
}

/* ================================================================ */
/* PRODUCT / OFFER — for planes de suscripción                       */
/* ================================================================ */
export function productSchema(opts: {
  name: string;
  description: string;
  url: string;
  price?: string;
  priceCurrency?: string;
  image?: string;
}): Record<string, unknown> {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    url: opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`,
    brand: {
      "@type": "Brand",
      name: "Instituto Pulso Fiscal",
    },
    image: opts.image || `${SITE_URL}/og-image.png`,
    inLanguage: "es-PE",
  };

  if (opts.price) {
    base.offers = {
      "@type": "Offer",
      price: opts.price,
      priceCurrency: opts.priceCurrency || "PEN",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Instituto Pulso Fiscal",
        url: SITE_URL,
      },
    };
  }

  return base;
}

/* ================================================================ */
/* SERVICE — for cada servicio (OSESA, Semana Fiscal, Cursos)         */
/* ================================================================ */
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  category?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`,
    provider: {
      "@type": "Organization",
      name: "Instituto Pulso Fiscal",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Perú",
    },
    serviceType: opts.category || "Análisis económico y político fiscal",
    inLanguage: "es-PE",
  };
}

/* ================================================================ */
/* HOW-TO — para guías y procesos (GEO-friendly)                     */
/* ================================================================ */
export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  image?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
    image: opts.image || `${SITE_URL}/og-image.png`,
    inLanguage: "es-PE",
  };
}