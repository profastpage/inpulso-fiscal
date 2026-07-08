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

/**
 * Organization schema for Instituto Pulso Fiscal.
 */
export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Instituto Pulso Fiscal",
    url: "https://inpulso-fiscal.vercel.app",
    logo: "https://inpulso-fiscal.vercel.app/logo.png",
    description:
      "Think Tank peruano especializado en análisis económico, política fiscal y gestión pública.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jr. Los Crisantemos 110",
      addressLocality: "Santiago de Surco",
      addressRegion: "Lima",
      postalCode: "",
      addressCountry: "PE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51-943279673",
      contactType: "customer service",
      email: "consultas@inpulsofiscal.com",
    },
    sameAs: [],
  };
}

/**
 * WebSite schema with SearchAction potentialAction.
 */
export function webSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Instituto Pulso Fiscal",
    url: "https://inpulso-fiscal.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://inpulso-fiscal.vercel.app/reportes?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * FAQPage schema.
 */
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