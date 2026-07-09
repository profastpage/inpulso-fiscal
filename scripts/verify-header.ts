import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const DIR = "/home/z/my-project/download/playwright-screenshots";
const { mkdirSync } = require("fs");
mkdirSync(DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    headless: true,
  });

  // Desktop 1920
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/131 Safari/537.36",
    locale: "es-PE",
  });
  const page = await ctx.newPage();

  // Homepage
  await page.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(1500);

  // Check transparent
  const header = page.locator(".site-header").first();
  const isTransp = await header.evaluate((el) => el.classList.contains("site-header--transparent"));
  const isLight = await header.evaluate((el) => el.classList.contains("site-header--transparent-light"));
  const bgColor = await header.evaluate((el) => window.getComputedStyle(el).background);
  const textColor = await page.locator(".site-brand__copy strong").first().evaluate((el) => window.getComputedStyle(el).color);

  console.log("══ HOMEPAGE DESKTOP 1920 ══");
  console.log(`Transparent class: ${isTransp}`);
  console.log(`Light variant: ${isLight}`);
  console.log(`Background: ${bgColor.slice(0, 80)}`);
  console.log(`Text color: ${textColor}`);

  // Check nav position - measure brand right edge vs nav left edge
  const brandRect = await page.locator(".site-brand").first().boundingBox();
  const navRect = await page.locator(".site-nav").first().boundingBox();
  const actionsRect = await page.locator(".site-header__actions").first().boundingBox();
  const innerRect = await page.locator(".site-header__inner").first().boundingBox();

  console.log(`\nLayout:`);
  console.log(`  Header inner: x=${innerRect?.x} w=${innerRect?.width}`);
  console.log(`  Brand: x=${brandRect?.x} w=${brandRect?.width} right=${(brandRect?.x || 0) + (brandRect?.width || 0)}`);
  console.log(`  Nav: x=${navRect?.x} w=${navRect?.width}`);
  console.log(`  Actions: x=${actionsRect?.x} w=${actionsRect?.width} right=${(actionsRect?.x || 0) + (actionsRect?.width || 0)}`);

  const gap = (navRect?.x || 0) - ((brandRect?.x || 0) + (brandRect?.width || 0));
  console.log(`  Gap brand→nav: ${gap.toFixed(0)}px`);

  await page.screenshot({ path: `${DIR}/v3-desktop-home.png`, fullPage: false });

  // Scroll test
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(500);
  const stillTransp = await header.evaluate((el) => el.classList.contains("site-header--transparent"));
  const scrolledClass = await header.evaluate((el) => el.classList.contains("site-header--scrolled"));
  console.log(`\nAfter scroll 200px:`);
  console.log(`  Transparent: ${stillTransp}`);
  console.log(`  Scrolled: ${scrolledClass}`);
  await page.screenshot({ path: `${DIR}/v3-desktop-home-scrolled.png`, fullPage: false });

  // Subpage test
  await page.goto(`${BASE}/nosotros`, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(1000);
  const subBg = await header.evaluate((el) => window.getComputedStyle(el).background);
  const subText = await page.locator(".site-brand__copy strong").first().evaluate((el) => window.getComputedStyle(el).color);
  console.log(`\n══ SUBPAGE NOSOTROS ══`);
  console.log(`Background: ${subBg.slice(0, 60)}`);
  console.log(`Text color: ${subText}`);
  await page.screenshot({ path: `${DIR}/v3-desktop-nosotros.png`, fullPage: false });

  // Android mobile
  const mCtx = await browser.newContext({
    viewport: { width: 412, height: 915 },
    userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 7) Chrome/131 Mobile Safari/537.36",
    isMobile: true, hasTouch: true, locale: "es-PE",
  });
  const mPage = await mCtx.newPage();

  await mPage.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 20000 });
  await mPage.waitForTimeout(1000);
  const mNavVis = await mPage.locator(".site-nav").isVisible().catch(() => false);
  const mToggleVis = await mPage.locator(".site-header__toggle").isVisible().catch(() => false);
  const mWaDisp = await mPage.locator(".whatsapp-fab").first().evaluate((el) => window.getComputedStyle(el).display).catch(() => "not-found");
  const mBottomNav = await mPage.locator(".mobile-bottom-nav").isVisible().catch(() => false);
  console.log(`\n══ ANDROID MOBILE ══`);
  console.log(`Desktop nav hidden: ${!mNavVis}`);
  console.log(`Hamburger visible: ${mToggleVis}`);
  console.log(`WhatsApp display: ${mWaDisp}`);
  console.log(`Bottom nav: ${mBottomNav}`);
  await mPage.screenshot({ path: `${DIR}/v3-android-home.png`, fullPage: false });

  await mCtx.close();
  await ctx.close();
  await browser.close();

  console.log("\n✅ Done - screenshots saved");
})();