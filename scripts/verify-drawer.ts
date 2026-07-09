import { chromium } from "playwright";

const BASE_URL = "https://inpulso-fiscal.vercel.app";
const SCREENSHOT_DIR = "/home/z/my-project/download/playwright-screenshots";
const { mkdirSync } = require("fs");
mkdirSync(SCREENSHOT_DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    headless: true,
  });

  const ctx = await browser.newContext({
    viewport: { width: 412, height: 915 },
    userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 Chrome/131.0.0.0 Mobile Safari/537.36",
    locale: "es-PE",
    isMobile: true,
    hasTouch: true,
  });

  const page = await ctx.newPage();

  console.log("Test: Mobile Menu Drawer via JS dispatch...");
  await page.goto(`${BASE_URL}/nosotros`, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1500);

  // Use JS to click the toggle
  const clicked = await page.evaluate(() => {
    const btn = document.querySelector(".site-header__toggle") as HTMLElement;
    if (btn) { btn.click(); return true; }
    return false;
  });
  console.log("Button found and clicked:", clicked);
  await page.waitForTimeout(800);

  // Check drawer
  const drawerExists = await page.locator(".mobile-drawer").count();
  const drawerVisible = await page.locator(".mobile-drawer").isVisible().catch(() => false);
  console.log("Drawer exists:", drawerExists > 0, "| Visible:", drawerVisible);

  if (drawerVisible) {
    const serviceLinks = await page.locator(".mobile-drawer .mobile-drawer__link--sub").count();
    const navLinks = await page.locator(".mobile-drawer .mobile-drawer__link:not(.mobile-drawer__link--sub)").count();
    const ss = `${SCREENSHOT_DIR}/04-mobile-drawer.png`;
    await page.screenshot({ path: ss, fullPage: false });
    console.log(`✅ DRAWER WORKS! Service links: ${serviceLinks}, Nav links: ${navLinks}`);
    console.log(`📸 ${ss}`);
  } else {
    const ss = `${SCREENSHOT_DIR}/04-mobile-drawer-FAIL2.png`;
    await page.screenshot({ path: ss, fullPage: false });
    console.log(`❌ Drawer still not visible after JS click`);
    console.log(`📸 ${ss}`);

    // Debug: check button position
    const debug = await page.evaluate(() => {
      const btn = document.querySelector(".site-header__toggle") as HTMLElement;
      if (!btn) return "no button found";
      const rect = btn.getBoundingClientRect();
      return {
        top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right,
        width: rect.width, height: rect.height,
        viewportH: window.innerHeight, viewportW: window.innerWidth,
        zIndex: getComputedStyle(btn).zIndex,
        display: getComputedStyle(btn).display,
        visibility: getComputedStyle(btn).visibility,
        overflow: getComputedStyle(document.body).overflow,
        bodyPaddingBottom: getComputedStyle(document.body).paddingBottom,
      };
    });
    console.log("Debug info:", JSON.stringify(debug, null, 2));
  }

  await browser.close();
})();