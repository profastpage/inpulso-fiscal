import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const DIR = "/home/z/my-project/download/playwright-screenshots";
const { mkdirSync } = require("fs");
mkdirSync(DIR, { recursive: true });

const PAGES = [
  { path: "/", title: "Inicio", expectLightHeader: true },
  { path: "/nosotros", title: "Nosotros", expectLightHeader: false },
  { path: "/osesa", title: "OSESA", expectLightHeader: false },
  { path: "/reportes", title: "Reportes", expectLightHeader: false },
  { path: "/cursos", title: "Cursos", expectLightHeader: false },
  { path: "/contacto", title: "Contacto", expectLightHeader: false },
  { path: "/suscripciones", title: "Suscripciones", expectLightHeader: false, noTransparent: true },
];

const DEVICES = [
  { name: "Android-412", w: 412, h: 915, ua: "Mozilla/5.0 (Linux; Android 14; Pixel 7) Chrome/131 Mobile Safari/537.36", mobile: true },
  { name: "Android-360", w: 360, h: 640, ua: "Mozilla/5.0 (Linux; Android 13) Chrome/131 Mobile Safari/537.36", mobile: true },
  { name: "Tablet-768", w: 768, h: 1024, ua: "Mozilla/5.0 (Linux; Android 14; Tablet) Chrome/131 Safari/537.36", mobile: true },
  { name: "Desktop-1280", w: 1280, h: 720, ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/131 Safari/537.36", mobile: false },
  { name: "Desktop-1920", w: 1920, h: 1080, ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/131 Safari/537.36", mobile: false },
];

(async () => {
  const browser = await chromium.launch({
    executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    headless: true,
  });

  let totalOk = 0, totalFail = 0;
  const failures: string[] = [];

  for (const dev of DEVICES) {
    const ctx = await browser.newContext({
      viewport: { width: dev.w, height: dev.h },
      userAgent: dev.ua,
      isMobile: dev.mobile,
      hasTouch: dev.mobile,
      locale: "es-PE",
    });
    const page = await ctx.newPage();

    console.log(`\n══ ${dev.name} (${dev.w}x${dev.h}) ══`);

    for (const p of PAGES) {
      await page.goto(`${BASE}${p.path}`, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(800);

      const header = page.locator(".site-header").first();
      const checks: string[] = [];

      // 1. Transparent at top
      const isTransp = await header.evaluate((el: Element) => el.classList.contains("site-header--transparent"));
      if (p.noTransparent) {
        if (!isTransp) checks.push("✓ No-transparent OK");
        else { checks.push("✗ No debería ser transparente"); totalFail++; failures.push(`${dev.name}|${p.title}|transparent inesperado`); }
      } else {
        if (isTransp) checks.push("✓ Transparente OK");
        else { checks.push("✗ Falta transparente"); totalFail++; failures.push(`${dev.name}|${p.title}|falta transparente`); }
      }

      // 2. Header text color
      const color = await page.locator(".site-brand__copy strong").first().evaluate((el: Element) => window.getComputedStyle(el).color).catch(() => "");
      const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      let lum = 0;
      if (m) { const [r, g, b] = [+m[1], +m[2], +m[3]]; lum = 0.299 * r + 0.587 * g + 0.114 * b; }

      if (p.expectLightHeader) {
        // White text expected (luminance > 160)
        if (lum > 160) { checks.push(`✓ Texto blanco (lum=${lum.toFixed(0)})`); totalOk++; }
        else { checks.push(`✗ Texto NO blanco (lum=${lum.toFixed(0)})`); totalFail++; failures.push(`${dev.name}|${p.title}|texto no blanco lum=${lum.toFixed(0)}`); }
      } else if (!p.noTransparent) {
        // Dark text expected (luminance < 120)
        if (lum < 120 && lum > 0) { checks.push(`✓ Texto oscuro (lum=${lum.toFixed(0)})`); totalOk++; }
        else { checks.push(`✗ Texto NO oscuro (lum=${lum.toFixed(0)})`); totalFail++; failures.push(`${dev.name}|${p.title}|texto no oscuro lum=${lum.toFixed(0)}`); }
      } else {
        checks.push(`✓ Texto OK (lum=${lum.toFixed(0)})`); totalOk++;
      }

      // 3. WhatsApp
      const waDisp = await page.locator(".whatsapp-fab").first().evaluate((el: Element) => window.getComputedStyle(el).display).catch(() => "not-found");
      if (dev.mobile) {
        if (waDisp === "none") { checks.push("✓ WhatsApp oculto"); totalOk++; }
        else { checks.push(`✗ WhatsApp visible! (display=${waDisp})`); totalFail++; failures.push(`${dev.name}|${p.title}|whatsapp visible en mobile`); }
      } else {
        if (waDisp !== "none") { checks.push("✓ WhatsApp visible"); totalOk++; }
        else { checks.push("✗ WhatsApp oculto en desktop!"); totalFail++; failures.push(`${dev.name}|${p.title}|whatsapp oculto en desktop`); }
      }

      // 4. Mobile bottom nav
      if (dev.mobile) {
        const navVis = await page.locator(".mobile-bottom-nav").isVisible().catch(() => false);
        if (navVis) { checks.push("✓ Bottom nav OK"); totalOk++; }
        else { checks.push("✗ Bottom nav NO visible"); totalFail++; failures.push(`${dev.name}|${p.title}|bottom nav faltante`); }
      }

      // 5. Scroll removes transparent
      if (!p.noTransparent) {
        await page.evaluate(() => window.scrollTo(0, 200));
        await page.waitForTimeout(300);
        const stillTransp = await header.evaluate((el: Element) => el.classList.contains("site-header--transparent"));
        if (!stillTransp) { checks.push("✓ Scroll → opaque OK"); totalOk++; }
        else { checks.push("✗ Sigue transparente tras scroll"); totalFail++; failures.push(`${dev.name}|${p.title}|transparent tras scroll`); }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(200);
      }

      // 6. H1 present
      const h1Text = await page.locator("h1").first().textContent().catch(() => "");
      if (h1Text && h1Text.length > 3) { checks.push(`✓ H1: "${h1Text.trim().slice(0, 35)}"`); totalOk++; }
      else { checks.push("✗ Sin H1"); totalFail++; failures.push(`${dev.name}|${p.title}|sin H1`); }

      const allOk = !checks.some(c => c.startsWith("✗"));
      const icon = allOk ? "✅" : "❌";
      console.log(`  ${icon} ${p.title} (${p.path})`);
      for (const c of checks) console.log(`    ${c}`);

      // Screenshot
      const safe = p.path.replace("/", "home");
      await page.screenshot({ path: `${DIR}/v2-${dev.name}-${safe}.png`, fullPage: false });
    }

    await ctx.close();
  }

  await browser.close();

  console.log("\n" + "═".repeat(55));
  console.log(`  TOTAL: ${totalOk + totalFail} checks | ✅ ${totalOk} | ❌ ${totalFail}`);
  if (failures.length) {
    console.log("\n  FAILURES:");
    for (const f of failures) console.log(`    ❌ ${f}`);
  }
  console.log("═".repeat(55));
  if (totalFail > 0) process.exit(1);
})();