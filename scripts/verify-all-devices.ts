import { chromium, type BrowserContext, type Page } from "playwright";

const BASE_URL = "http://localhost:3000";
const SCREENSHOT_DIR = "/home/z/my-project/download/playwright-screenshots";

interface TestResult {
  device: string;
  page: string;
  checks: { name: string; ok: boolean; detail: string }[];
  screenshot: string;
}

const allResults: TestResult[] = [];

const SUBPAGES = [
  { path: "/", title: "Inicio" },
  { path: "/nosotros", title: "Nosotros" },
  { path: "/osesa", title: "OSESA" },
  { path: "/reportes", title: "Reportes" },
  { path: "/cursos", title: "Cursos" },
  { path: "/contacto", title: "Contacto" },
  { path: "/suscripciones", title: "Suscripciones" },
];

const DEVICES = [
  {
    name: "Android-Pixel7",
    ctx: { viewport: { width: 412, height: 915 }, userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 Chrome/131.0.0.0 Mobile Safari/537.36", isMobile: true, hasTouch: true, locale: "es-PE" },
  },
  {
    name: "Android-Small",
    ctx: { viewport: { width: 360, height: 640 }, userAgent: "Mozilla/5.0 (Linux; Android 13; SM-A015F) AppleWebKit/537.36 Chrome/131.0.0.0 Mobile Safari/537.36", isMobile: true, hasTouch: true, locale: "es-PE" },
  },
  {
    name: "Tablet-768",
    ctx: { viewport: { width: 768, height: 1024 }, userAgent: "Mozilla/5.0 (Linux; Android 14; Tablet) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36", isMobile: true, hasTouch: true, locale: "es-PE" },
  },
  {
    name: "Desktop-1280",
    ctx: { viewport: { width: 1280, height: 720 }, userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36", locale: "es-PE" },
  },
  {
    name: "Desktop-1920",
    ctx: { viewport: { width: 1920, height: 1080 }, userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36", locale: "es-PE" },
  },
];

async function runChecks(page: Page, path: string, deviceName: string): Promise<TestResult> {
  const isMobile = deviceName.includes("Android") || deviceName.includes("Tablet");
  const isDesktop = deviceName.includes("Desktop");
  const isHomepage = path === "/";
  const checks: TestResult["checks"] = [];

  await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle", timeout: 25000 });
  await page.waitForTimeout(1200);

  // 1. Header exists
  const headerCount = await page.locator(".site-header").count();
  checks.push({ name: "Header visible", ok: headerCount > 0, detail: headerCount > 0 ? "OK" : "MISSING" });

  // 2. Transparent class at top
  const hasTransparent = await page.locator(".site-header").first().evaluate((el) => el.classList.contains("site-header--transparent"));
  const expectTransparent = isHomepage || !isHomepage; // all pages should be transparent
  checks.push({ name: "Header transparente al inicio", ok: hasTransparent, detail: hasTransparent ? "OK" : "NO transparent class" });

  // 3. Header text readability
  const headerStrong = page.locator(".site-brand__copy strong").first();
  const headerColor = await headerStrong.evaluate((el) => window.getComputedStyle(el).color).catch(() => "");
  const match = headerColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  let luminance = 0;
  let isLightText = false;
  if (match) {
    const [, r, g, b] = match.map(Number);
    luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    isLightText = luminance > 160;
  }
  if (isHomepage) {
    // Homepage: should have WHITE text (light on dark)
    checks.push({ name: "Texto header blanco (homepage)", ok: isLightText, detail: `rgb → luminance=${luminance.toFixed(0)}` });
  } else {
    // Subpages: should have DARK text (dark on light)
    checks.push({ name: "Texto header oscuro (subpágina)", ok: !isLightText && luminance > 0, detail: `rgb → luminance=${luminance.toFixed(0)}` });
  }

  // 4. Light variant class on homepage
  if (isHomepage) {
    const hasLightVariant = await page.locator(".site-header").first().evaluate((el) => el.classList.contains("site-header--transparent-light"));
    checks.push({ name: "Clase transparent-light en homepage", ok: hasLightVariant, detail: hasLightVariant ? "OK" : "FALTA" });
  }

  // 5. WhatsApp FAB
  const whatsappDisplay = await page.locator(".whatsapp-fab").first().evaluate((el) => window.getComputedStyle(el).display).catch(() => "not-found");
  if (isMobile) {
    checks.push({ name: "WhatsApp oculto en móvil", ok: whatsappDisplay === "none", detail: `display: ${whatsappDisplay}` });
  } else {
    checks.push({ name: "WhatsApp visible en desktop", ok: whatsappDisplay !== "none", detail: `display: ${whatsappDisplay}` });
  }

  // 6. Mobile bottom nav
  if (isMobile) {
    const mobileNavVis = await page.locator(".mobile-bottom-nav").isVisible().catch(() => false);
    checks.push({ name: "Bottom nav visible en móvil", ok: mobileNavVis, detail: mobileNavVis ? "OK" : "NO" });
  }

  // 7. H1 exists
  const h1 = page.locator("h1").first();
  const h1Text = await h1.textContent().catch(() => "");
  checks.push({ name: "H1 presente", ok: !!h1Text && h1Text.length > 3, detail: `"${h1Text?.trim().slice(0, 40)}"` });

  // 8. Scroll test - transparent should go away after scroll
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(400);
  const hasTransparentAfter = await page.locator(".site-header").first().evaluate((el) => el.classList.contains("site-header--transparent"));
  checks.push({ name: "Pierde transparente al scroll", ok: !hasTransparentAfter, detail: hasTransparentAfter ? "AÚN transparente!" : "OK → scrolled" });

  // Scroll back to top for screenshot
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  const safeName = path.replace("/", "root").replace(/^\//, "");
  const screenshot = `${SCREENSHOT_DIR}/v2-${deviceName}-${safeName || "home"}.png`;
  await page.screenshot({ path: screenshot, fullPage: false });

  return { device: deviceName, page: path, checks, screenshot };
}

async function main() {
  const { mkdirSync } = await import("fs");
  mkdirSync(SCREENSHOT_DIR, { recursive: true });

  console.log("═".repeat(60));
  console.log("  VERIFICACIÓN COMPLETA — Todos los dispositivos");
  console.log("═".repeat(60));

  const browser = await chromium.launch({
    executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    headless: true,
  });

  // Start local server
  console.log("\nStarting local server...");
  const { spawn } = await import("child_process");
  const server = spawn("npx", ["next", "start", "-p", "3000"], {
    cwd: "/home/z/my-project",
    stdio: "pipe",
    env: { ...process.env, PORT: "3000" },
  });

  // Wait for server to be ready
  await new Promise<void>((resolve) => {
    const check = () => {
      const http = require("http");
      http.get("http://localhost:3000", (res: any) => {
        if (res.statusCode === 200) resolve();
        else { setTimeout(check, 500); }
      }).on("error", () => setTimeout(check, 500));
    };
    setTimeout(check, 2000);
  });
  console.log("Server ready!\n");

  try {
    for (const device of DEVICES) {
      const ctx = await browser.newContext(device.ctx as any);
      const page = await ctx.newPage();

      console.log(`── ${device.name} ──`);

      for (const sub of SUBPAGES) {
        const result = await runChecks(page, sub.path, device.name);
        allResults.push(result);

        const allOk = result.checks.every((c) => c.ok);
        const icon = allOk ? "✅" : "❌";
        const fails = result.checks.filter((c) => !c.ok).map((c) => c.name).join(", ");

        console.log(`  ${icon} ${sub.title} (${sub.path}) ${fails ? "⚠️ " + fails : ""}`);
        for (const c of result.checks) {
          console.log(`     ${c.ok ? "  ✓" : "  ✗"} ${c.name}: ${c.detail}`);
        }
      }

      await ctx.close();
      console.log("");
    }
  } finally {
    server.kill();
    await browser.close();
  }

  // Summary
  console.log("═".repeat(60));
  console.log("  RESUMEN FINAL");
  console.log("═".repeat(60));
  let totalOk = 0;
  let totalFail = 0;
  const failList: string[] = [];

  for (const r of allResults) {
    for (const c of r.checks) {
      if (c.ok) totalOk++;
      else {
        totalFail++;
        failList.push(`${r.device} | ${r.page} | ${c.name}: ${c.detail}`);
      }
    }
  }

  console.log(`  Total checks: ${totalOk + totalFail}`);
  console.log(`  ✅ Passed: ${totalOk}`);
  console.log(`  ❌ Failed: ${totalFail}`);

  if (failList.length > 0) {
    console.log("\n  Failures:");
    for (const f of failList) {
      console.log(`    ❌ ${f}`);
    }
  }

  console.log("═".repeat(60));
  if (totalFail > 0) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(2); });