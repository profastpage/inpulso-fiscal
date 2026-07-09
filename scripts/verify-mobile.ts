import { chromium, type BrowserContext } from "playwright";

const BASE_URL = "https://inpulso-fiscal.vercel.app";
const SCREENSHOT_DIR = "/home/z/my-project/download/playwright-screenshots";

const results: { name: string; passed: boolean; detail: string; screenshot?: string }[] = [];

async function main() {
  const { mkdirSync } = await import("fs");
  mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await chromium.launch({
    executablePath: "$HOME/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome".replace("$HOME", process.env.HOME || "/root"),
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    headless: true,
  });

  // Mobile context (Android Pixel 7)
  const mobileCtx = await browser.newContext({
    viewport: { width: 412, height: 915 },
    userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
    locale: "es-PE",
    isMobile: true,
    hasTouch: true,
  });

  const page = await mobileCtx.newPage();

  // Test: Mobile Menu Drawer
  console.log("Testing Mobile Menu Drawer...");
  try {
    await page.goto(`${BASE_URL}/nosotros`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1000);

    // Scroll to top, then force click
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    const toggle = page.locator(".site-header__toggle");
    await toggle.click({ force: true });
    await page.waitForTimeout(600);

    const drawer = page.locator(".mobile-drawer");
    const drawerVisible = await drawer.isVisible();
    if (!drawerVisible) throw new Error("Mobile drawer not visible after click");

    const serviceLinks = page.locator(".mobile-drawer .mobile-drawer__link--sub");
    const serviceCount = await serviceLinks.count();
    if (serviceCount < 3) throw new Error(`Expected >= 3 service links, got ${serviceCount}`);

    const navLinks = page.locator(".mobile-drawer .mobile-drawer__link:not(.mobile-drawer__link--sub)");
    const navCount = await navLinks.count();
    if (navCount < 3) throw new Error(`Expected >= 3 nav links, got ${navCount}`);

    const ss = `${SCREENSHOT_DIR}/04-mobile-drawer.png`;
    await page.screenshot({ path: ss, fullPage: false });
    results.push({ name: "Mobile Menu Drawer - Android", passed: true, detail: `Drawer open, ${serviceCount} service links, ${navCount} nav links`, screenshot: ss });
    console.log("✅ Mobile drawer test passed");
  } catch (e: any) {
    const ss = `${SCREENSHOT_DIR}/04-mobile-drawer-FAIL.png`;
    await page.screenshot({ path: ss, fullPage: false });
    results.push({ name: "Mobile Menu Drawer - Android", passed: false, detail: e.message, screenshot: ss });
    console.log("❌ Mobile drawer test failed:", e.message);
  }

  // Test: Mobile OSESA page with services panel
  console.log("Testing Mobile Services Panel...");
  try {
    await page.goto(`${BASE_URL}/osesa`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    // Click "Servicios" in bottom nav
    const servicesBtn = page.locator(".mobile-bottom-nav").getByText("Servicios").first();
    await servicesBtn.click({ force: true });
    await page.waitForTimeout(500);

    const panel = page.locator(".mobile-services-panel");
    const panelVisible = await panel.isVisible().catch(() => false);
    if (!panelVisible) throw new Error("Services panel not visible after clicking Servicios");

    const panelLinks = panel.locator("a");
    const linkCount = await panelLinks.count();
    if (linkCount < 3) throw new Error(`Expected >= 3 links in services panel, got ${linkCount}`);

    const ss = `${SCREENSHOT_DIR}/07-mobile-services-panel.png`;
    await page.screenshot({ path: ss, fullPage: false });
    results.push({ name: "Mobile Services Panel - Android", passed: true, detail: `Panel visible with ${linkCount} links`, screenshot: ss });
    console.log("✅ Services panel test passed");
  } catch (e: any) {
    const ss = `${SCREENSHOT_DIR}/07-mobile-services-panel-FAIL.png`;
    await page.screenshot({ path: ss, fullPage: false });
    results.push({ name: "Mobile Services Panel - Android", passed: false, detail: e.message, screenshot: ss });
    console.log("❌ Services panel test failed:", e.message);
  }

  // Test: Header transparent on mobile subpages
  console.log("Testing Mobile Header Transparency...");
  try {
    await page.goto(`${BASE_URL}/cursos`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1000);

    const header = page.locator(".site-header");
    const hasTransparent = await header.evaluate((el) => el.classList.contains("site-header--transparent"));
    if (!hasTransparent) throw new Error("Header missing transparent class on mobile subpage");

    const headerStrong = page.locator(".site-brand__copy strong").first();
    const headerColor = await headerStrong.evaluate((el) => window.getComputedStyle(el).color);
    const match = headerColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    let luminance = 0;
    if (match) {
      const [, r, g, b] = match.map(Number);
      luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    }
    if (luminance > 180) throw new Error(`Header text too light on mobile (luminance=${luminance.toFixed(0)})`);

    const ss = `${SCREENSHOT_DIR}/08-mobile-header-transparent.png`;
    await page.screenshot({ path: ss, fullPage: false });
    results.push({ name: "Mobile Header Transparency - Android", passed: true, detail: `Transparent class OK, text color dark (luminance=${luminance.toFixed(0)})`, screenshot: ss });
    console.log("✅ Header transparency test passed");
  } catch (e: any) {
    const ss = `${SCREENSHOT_DIR}/08-mobile-header-transparent-FAIL.png`;
    await page.screenshot({ path: ss, fullPage: false });
    results.push({ name: "Mobile Header Transparency - Android", passed: false, detail: e.message, screenshot: ss });
    console.log("❌ Header transparency test failed:", e.message);
  }

  await browser.close();

  console.log("\n" + "═".repeat(50));
  console.log("ADDITIONAL RESULTS");
  console.log("═".repeat(50));
  let p = 0, f = 0;
  for (const r of results) {
    const icon = r.passed ? "✅" : "❌";
    console.log(`  ${icon} ${r.name}: ${r.detail}`);
    if (r.screenshot) console.log(`     📸 ${r.screenshot}`);
    if (r.passed) p++; else f++;
  }
  console.log(`  TOTAL: ${results.length} | PASSED: ${p} | FAILED: ${f}`);
}

main().catch((e) => { console.error(e); process.exit(2); });