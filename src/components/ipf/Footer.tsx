"use client";

export default function Footer() {
  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/inpulsofiscal/?viewAsMember=true",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61570780708496",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.028 1.792-4.702 4.533-4.702 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.49 0-1.953.93-1.953 1.887v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/inpulsofiscal/?hl=es",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10.75 1.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@InstitutoPulsoFiscal",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.121 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
        </svg>
      ),
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@inpulsofiscal",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 7.5a6.73 6.73 0 0 1-3.86-1.2A6.5 6.5 0 0 1 14.5 2h-3v13.2a2.7 2.7 0 1 1-2.1-2.63V9.5a5.7 5.7 0 1 0 5.1 5.66V9.38A9.74 9.74 0 0 0 21 11.4V7.5Z" />
        </svg>
      ),
    },
    {
      label: "X (Twitter)",
      href: "https://x.com/inpulsofiscal",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2H21l-6.52 7.455L22.5 22h-6.19l-4.85-6.39L5.87 22H3l6.98-7.98L1.5 2h6.35l4.38 5.78L18.244 2Zm-1.086 18h1.53L7.02 3.9H5.38l11.778 16.1Z" />
        </svg>
      ),
    },
  ];

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Nuestros Servicios", href: "/reportes" },
    { label: "Reportes Técnicos", href: "/reportes" },
    { label: "Cursos y Formación", href: "/cursos" },
    { label: "Sobre el Instituto", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ];

  const bottomLinks = [
    { label: "Privacidad", href: "/privacidad" },
    { label: "Términos y Condiciones", href: "/terminos" },
    { label: "Libro de Reclamaciones", href: "/reclamaciones" },
    { label: "Devoluciones y Reembolsos", href: "/devoluciones" },
    { label: "Cookies", href: "/cookies" },
  ];

  return (
    <footer
      id="contacto"
      style={{
        background: "#020617",
        color: "rgba(255,255,255,0.7)",
        padding: "72px 24px 32px",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="footer-grid">
          {/* Col 1: Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Logo IPF" style={{ width: 42, height: 42, borderRadius: 10, objectFit: 'cover' }} />
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 14,
                  color: "#fff",
                  letterSpacing: "0.05em",
                }}
              >
                INSTITUTO PULSO FISCAL
              </div>
            </div>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.55)",
                maxWidth: 320,
                fontWeight: 500,
              }}
            >
              Investigación independiente, análisis riguroso y formación de alto
              nivel para el fortalecimiento de la política económica del Perú.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Links */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 20,
              }}
            >
              Navegación
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Contact */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 20,
              }}
            >
              Contacto
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.6,
                }}
              >
                Jr. Los Crisantemos 110,
                <br />
                Santiago de Surco, Lima, Perú
              </div>
              <a
                href="mailto:consultas@inpulsofiscal.com"
                style={{
                  fontSize: 13,
                  color: "rgba(124,200,251,0.9)",
                  textDecoration: "none",
                }}
              >
                consultas@inpulsofiscal.com
              </a>
              <a
                href="mailto:cursosipf@inpulsofiscal.com"
                style={{
                  fontSize: 13,
                  color: "rgba(124,200,251,0.9)",
                  textDecoration: "none",
                }}
              >
                cursosipf@inpulsofiscal.com
              </a>
              <a
                href="tel:+51943279673"
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                }}
              >
                +51 943 279 673
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              fontWeight: 600,
            }}
          >
            © 2026 Instituto Pulso Fiscal. Todos los derechos reservados.
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px 24px",
            }}
          >
            {bottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}