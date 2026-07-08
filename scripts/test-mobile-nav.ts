const { chromium } = require("playwright");

const BASE = "http://localhost:3456";
const MOBILE = { width: 390, height: 844 }; // iPhone 14

async function test() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  // ─── TEST 1: Homepage Mobile - Header Transparent ───
  {
    const ctx = await browser.newContext({ ...MOBILE });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });

    const headerBg = await page.$eval(".site-header", (el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    const isTransparent = headerBg === "rgba(0, 0, 0, 0)" || headerBg === "transparent";
    results.push({
      test: "1. Header transparent on mobile (homepage, no scroll)",
      pass: isTransparent,
      detail: `backgroundColor: ${headerBg}`,
    });

    // Check if WhatsApp button overlaps bottom nav
    const fabVisible = await page.isVisible(".whatsapp-fab");
    results.push({
      test: "2. WhatsApp FAB hidden on mobile",
      pass: !fabVisible,
      detail: fabVisible ? "FAB is visible (BAD)" : "FAB hidden (GOOD)",
    });

    // Bottom nav exists
    const navVisible = await page.isVisible(".mobile-bottom-nav");
    results.push({
      test: "3. Mobile bottom nav visible",
      pass: navVisible,
      detail: navVisible ? "Bottom nav visible" : "Bottom nav NOT visible",
    });

    // Bottom nav items
    const navLabels = await page.$$eval(".mobile-bottom-nav__label", (els) =>
      els.map((e) => e.textContent.trim())
    );
    results.push({
      test: "4. Bottom nav has: Inicio, Servicios, Contacto, Planes",
      pass: navLabels.includes("Inicio") && navLabels.includes("Servicios") && navLabels.includes("Contacto") && navLabels.includes("Planes"),
      detail: `Labels: [${navLabels.join(", ")}]`,
    });

    // WhatsApp centered in bottom nav
    const whatsappBtn = await page.$(".mobile-bottom-nav__whatsapp");
    results.push({
      test: "5. WhatsApp button centered in bottom nav",
      pass: !!whatsappBtn,
      detail: whatsappBtn ? "WhatsApp FAB found in bottom nav" : "WhatsApp FAB NOT found",
    });

    await ctx.close();
  }

  // ─── TEST 5: Scroll header becomes solid ───
  {
    const ctx = await browser.newContext({ ...MOBILE });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, 200));

    const headerBg = await page.$eval(".site-header", (el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    const isSolid = headerBg.includes("255") && headerBg.includes("255");
    results.push({
      test: "6. Header becomes solid after scroll (mobile)",
      pass: isSolid,
      detail: `backgroundColor: ${headerBg}`,
    });

    await ctx.close();
  }

  // ─── TEST 6: Services panel opens ───
  {
    const ctx = await browser.newContext({ ...MOBILE });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });

    // Tap "Servicios" button
    const servBtn = await page.$(".mobile-bottom-nav__services-btn");
    if (servBtn) {
      await servBtn.click();
      await page.waitForTimeout(400);

      const panelVisible = await page.isVisible(".mobile-services-panel");
      const panelItems = await page.$$eval(".mobile-services-panel__item-label", (els) =>
        els.map((e) => e.textContent.trim())
      );
      results.push({
        test: "7. Services panel opens with sub-items",
        pass: panelVisible && panelItems.includes("OSESA") && panelItems.includes("Semana Fiscal") && panelItems.includes("Cursos"),
        detail: `Panel visible: ${panelVisible}, Items: [${panelItems.join(", ")}]`,
      });
    } else {
      results.push({
        test: "7. Services panel opens with sub-items",
        pass: false,
        detail: "Services button NOT found",
      });
    }

    await ctx.close();
  }

  // ─── TEST 7: OSESA page exists ───
  {
    const ctx = await browser.newContext({ ...MOBILE });
    const page = await ctx.newPage();
    const resp = await page.goto(`${BASE}/osesa`, { waitUntil: "networkidle" });
    results.push({
      test: "8. /osesa page loads (200)",
      pass: resp && resp.status() === 200,
      detail: `Status: ${resp?.status()}`,
    });

    const headerTransparent = await page.$eval(".site-header", (el) => {
      const bg = window.getComputedStyle(el).backgroundColor;
      return bg === "rgba(0, 0, 0, 0)" || bg === "transparent";
    });
    results.push({
      test: "9. OSESA page header transparent on load",
      pass: headerTransparent,
      detail: headerTransparent ? "Transparent" : "Not transparent",
    });

    await ctx.close();
  }

  // ─── TEST 8: All subpages header transparent ───
  const subpages = ["/", "/nosotros", "/reportes", "/cursos", "/contacto", "/suscripciones", "/osesa"];
  for (const sp of subpages) {
    const ctx = await browser.newContext({ ...MOBILE });
    const page = await ctx.newPage();
    await page.goto(`${BASE}${sp}`, { waitUntil: "networkidle" });
    const headerTransparent = await page.$eval(".site-header", (el) => {
      const bg = window.getComputedStyle(el).backgroundColor;
      return bg === "rgba(0, 0, 0, 0)" || bg === "transparent";
    });
    results.push({
      test: `10. Header transparent on ${sp} (mobile)`,
      pass: headerTransparent,
      detail: headerTransparent ? "OK" : `bg: ${await page.$eval(".site-header", (el) => window.getComputedStyle(el).backgroundColor)}`,
    });
    await ctx.close();
  }

  // ─── TEST 9: Desktop - bottom nav hidden ───
  {
    const ctx = await browser.newContext({ width: 1440, height: 900 });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });

    const navHidden = !(await page.isVisible(".mobile-bottom-nav"));
    results.push({
      test: "11. Bottom nav hidden on desktop",
      pass: navHidden,
      detail: navHidden ? "Hidden (GOOD)" : "Visible (BAD)",
    });

    // WhatsApp FAB visible on desktop (lg+)
    const fabVisible = await page.isVisible(".whatsapp-fab");
    results.push({
      test: "12. WhatsApp FAB visible on desktop (lg+)",
      pass: fabVisible,
      detail: fabVisible ? "Visible (GOOD)" : "Hidden (BAD)",
    });

    // Desktop header transparent at top
    const headerTransparent = await page.$eval(".site-header", (el) => {
      const bg = window.getComputedStyle(el).backgroundColor;
      return bg === "rgba(0, 0, 0, 0)" || bg === "transparent";
    });
    results.push({
      test: "13. Desktop header transparent at top",
      pass: headerTransparent,
      detail: headerTransparent ? "Transparent (GOOD)" : "Not transparent",
    });

    await ctx.close();
  }

  await browser.close();

  // Print results
  console.log("\n╔══════════════════════════════════════════════════════╗");
  console.log("║  PLAYWRIGHT TEST RESULTS                           ║");
  console.log("╠══════════════════════════════════════════════════════╣");
  let passCount = 0;
  let failCount = 0;
  for (const r of results) {
    const icon = r.pass ? "✅" : "❌";
    if (r.pass) passCount++;
    else failCount++;
    console.log(`║ ${icon} ${r.test.padEnd(50)} ║`);
    if (!r.pass) {
      console.log(`║    → ${r.detail.padEnd(46)} ║`);
    }
  }
  console.log("╠══════════════════════════════════════════════════════╣");
  console.log(`║  TOTAL: ${results.length} | PASS: ${passCount} | FAIL: ${failCount}${" ".repeat(Math.max(0, 28 - String(results.length).length - String(passCount).length - String(failCount).length))}║`);
  console.log("╚══════════════════════════════════════════════════════╝\n");

  if (failCount > 0) process.exit(1);
}

test().catch((e) => {
  console.error("Test error:", e);
  process.exit(1);
});