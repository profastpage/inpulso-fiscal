import { chromium, type Page, type BrowserContext } from "playwright";

const BASE_URL = "https://inpulso-fiscal.vercel.app";
const SCREENSHOT_DIR = "/home/z/my-project/download/playwright-screenshots";

interface TestResult {
  name: string;
  passed: boolean;
  detail: string;
  screenshot?: string;
}

const results: TestResult[] = [];

async function screenshot(page: Page, name: string) {
  const path = `${SCREENSHOT_DIR}/${name}.png`;
  await page.screenshot({ path, fullPage: true });
  return path;
}

// ─── TESTS ────────────────────────────────────────────────

async function testHomepageDesktop(page: Page) {
  const name = "Homepage Desktop (PC)";
  try {
    await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    // Check header exists and is visible
    const header = page.locator(".site-header");
    const headerVisible = await header.isVisible();
    if (!headerVisible) throw new Error("Header not visible");

    // Check nav links
    const navLinks = page.locator(".site-nav .nav-link, .site-nav button.nav-link");
    const linkCount = await navLinks.count();
    if (linkCount < 3) throw new Error(`Expected >= 3 nav links, got ${linkCount}`);

    // Check WhatsApp button visibility on desktop
    const whatsapp = page.locator(".whatsapp-fab");
    const whatsappVisible = await whatsapp.isVisible().catch(() => false);
    if (!whatsappVisible) throw new Error("WhatsApp FAB not visible on desktop");

    // Check hero section
    const hero = page.locator("h1").first();
    const heroText = await hero.textContent();
    if (!heroText || heroText.length < 5) throw new Error("Hero H1 not found or empty");

    // Check logo
    const logo = page.locator(".site-brand__logo");
    const logoVisible = await logo.isVisible();
    if (!logoVisible) throw new Error("Logo not visible");

    // Check no mobile bottom nav on desktop
    const mobileNav = page.locator(".mobile-bottom-nav");
    const mobileNavVisible = await mobileNav.isVisible().catch(() => false);
    if (mobileNavVisible) throw new Error("Mobile bottom nav visible on desktop!");

    const ss = await screenshot(page, "01-homepage-desktop");
    results.push({ name, passed: true, detail: `Header OK, ${linkCount} nav links, WhatsApp visible, Hero: "${heroText?.trim().slice(0, 50)}..."`, screenshot: ss });
  } catch (e: any) {
    const ss = await screenshot(page, "01-homepage-desktop-FAIL");
    results.push({ name, passed: false, detail: e.message, screenshot: ss });
  }
}

async function testSubpageDesktop(page: Page, path: string, title: string) {
  const name = `${title} - Desktop`;
  try {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    // Check header with transparent class
    const header = page.locator(".site-header");
    const headerExists = await header.count();
    if (!headerExists) throw new Error("Header missing");

    // Check PageHero section
    const hero = page.locator("h1").first();
    const heroText = await hero.textContent();
    if (!heroText || heroText.length < 3) throw new Error("No H1 found");

    // Check WhatsApp visible on desktop
    const whatsapp = page.locator(".whatsapp-fab");
    const whatsappVisible = await whatsapp.isVisible().catch(() => false);
    if (!whatsappVisible) throw new Error("WhatsApp FAB not visible on desktop");

    // Check transparent header text is dark (readable on light bg)
    const headerStrong = page.locator(".site-brand__copy strong").first();
    const headerColor = await headerStrong.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    // Dark colors have low RGB values. If it's white/light, fail.
    const match = headerColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
      if (luminance > 180) {
        throw new Error(`Header text too light (rgb(${r},${g},${b}), luminance=${luminance.toFixed(0)}) - should be dark on transparent`);
      }
    }

    const ss = await screenshot(page, `02-${title.toLowerCase().replace(/\s+/g, "-")}-desktop`);
    results.push({ name, passed: true, detail: `H1: "${heroText?.trim().slice(0, 40)}", WhatsApp OK, Header text color: ${headerColor}`, screenshot: ss });
  } catch (e: any) {
    const ss = await screenshot(page, `02-${title.toLowerCase().replace(/\s+/g, "-")}-desktop-FAIL`);
    results.push({ name, passed: false, detail: e.message, screenshot: ss });
  }
}

async function testMobileView(context: BrowserContext, path: string, title: string) {
  const name = `${title} - Mobile (Android)`;
  const page = await context.newPage();
  try {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    // WhatsApp FAB must NOT be visible on mobile
    const whatsapp = page.locator(".whatsapp-fab");
    const whatsappVisible = await whatsapp.isVisible().catch(() => false);
    if (whatsappVisible) throw new Error("WhatsApp FAB is VISIBLE on mobile - should be hidden!");

    // Check computed display of whatsapp-fab
    const whatsappDisplay = await whatsapp.evaluate((el) => {
      return window.getComputedStyle(el).display;
    }).catch(() => "element-not-found");
    if (whatsappDisplay !== "none") {
      throw new Error(`WhatsApp FAB display is "${whatsappDisplay}" on mobile, should be "none"`);
    }

    // Mobile bottom nav should be visible
    const mobileNav = page.locator(".mobile-bottom-nav");
    const mobileNavVisible = await mobileNav.isVisible().catch(() => false);
    if (!mobileNavVisible) throw new Error("Mobile bottom nav not visible");

    // Hamburger menu button should be visible
    const toggle = page.locator(".site-header__toggle");
    const toggleVisible = await toggle.isVisible();
    if (!toggleVisible) throw new Error("Hamburger toggle not visible on mobile");

    const ss = await screenshot(page, `03-${title.toLowerCase().replace(/\s+/g, "-")}-mobile`);
    results.push({ name, passed: true, detail: `WhatsApp hidden (display: ${whatsappDisplay}), Bottom nav visible, Hamburger OK`, screenshot: ss });
  } catch (e: any) {
    const ss = await screenshot(page, `03-${title.toLowerCase().replace(/\s+/g, "-")}-mobile-FAIL`);
    results.push({ name, passed: false, detail: e.message, screenshot: ss });
  } finally {
    await page.close();
  }
}

async function testMobileMenuDrawer(context: BrowserContext) {
  const name = "Mobile Menu Drawer - Android";
  const page = await context.newPage();
  try {
    await page.goto(`${BASE_URL}/nosotros`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1000);

    // Open mobile menu - scroll to top first, then use force click
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    const toggle = page.locator(".site-header__toggle");
    await toggle.click({ force: true });
    await page.waitForTimeout(600);

    // Check drawer is visible
    const drawer = page.locator(".mobile-drawer");
    const drawerVisible = await drawer.isVisible();
    if (!drawerVisible) throw new Error("Mobile drawer not visible after click");

    // Check service links in drawer
    const serviceLinks = page.locator(".mobile-drawer .mobile-drawer__link--sub");
    const serviceCount = await serviceLinks.count();
    if (serviceCount < 3) throw new Error(`Expected >= 3 service links in drawer, got ${serviceCount}`);

    // Check nav links
    const navLinks = page.locator(".mobile-drawer .mobile-drawer__link:not(.mobile-drawer__link--sub)");
    const navCount = await navLinks.count();
    if (navCount < 3) throw new Error(`Expected >= 3 nav links in drawer, got ${navCount}`);

    const ss = await screenshot(page, "04-mobile-drawer");
    results.push({ name, passed: true, detail: `Drawer open, ${serviceCount} service links, ${navCount} nav links`, screenshot: ss });
  } catch (e: any) {
    const ss = await screenshot(page, "04-mobile-drawer-FAIL");
    results.push({ name, passed: false, detail: e.message, screenshot: ss });
  } finally {
    await page.close();
  }
}

async function testScrollHeaderTransition(page: Page) {
  const name = "Header Scroll Transition - Desktop";
  try {
    await page.goto(`${BASE_URL}/nosotros`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1000);

    // At top: header should have transparent class
    const headerAtTop = page.locator(".site-header");
    const hasTransparentTop = await headerAtTop.evaluate((el) => el.classList.contains("site-header--transparent"));
    if (!hasTransparentTop) throw new Error("Header missing transparent class at page top");

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(500);

    // After scroll: transparent class should be removed
    const hasTransparentAfter = await headerAtTop.evaluate((el) => el.classList.contains("site-header--transparent"));
    if (hasTransparentAfter) throw new Error("Header still has transparent class after scrolling");

    // After scroll: should have scrolled class
    const hasScrolled = await headerAtTop.evaluate((el) => el.classList.contains("site-header--scrolled"));
    if (!hasScrolled) throw new Error("Header missing scrolled class after scrolling");

    const ss = await screenshot(page, "05-header-scroll");
    results.push({ name, passed: true, detail: "Transparent at top -> Scrolled class after 300px scroll", screenshot: ss });
  } catch (e: any) {
    const ss = await screenshot(page, "05-header-scroll-FAIL");
    results.push({ name, passed: false, detail: e.message, screenshot: ss });
  }
}

async function testDesktopDropdown(context: BrowserContext) {
  const name = "Desktop Dropdown Menu";
  const page = await context.newPage();
  try {
    await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1000);

    // Hover over "Nuestros Servicios"
    const dropdownTrigger = page.locator(".nav-dropdown");
    await dropdownTrigger.hover();
    await page.waitForTimeout(400);

    // Check dropdown menu appears
    const dropdownMenu = page.locator(".nav-dropdown__menu");
    const menuVisible = await dropdownMenu.isVisible();
    if (!menuVisible) throw new Error("Dropdown menu not visible on hover");

    // Check service items
    const items = page.locator(".nav-dropdown__item");
    const itemCount = await items.count();
    if (itemCount < 3) throw new Error(`Expected >= 3 dropdown items, got ${itemCount}`);

    const ss = await screenshot(page, "06-desktop-dropdown");
    results.push({ name, passed: true, detail: `Dropdown visible with ${itemCount} items on hover`, screenshot: ss });
  } catch (e: any) {
    const ss = await screenshot(page, "06-desktop-dropdown-FAIL");
    results.push({ name, passed: false, detail: e.message, screenshot: ss });
  } finally {
    await page.close();
  }
}

// ─── MAIN ─────────────────────────────────────────────────

async function main() {
  console.log("═".repeat(60));
  console.log("  PLAYWRIGHT VERIFICATION - Instituto Pulso Fiscal");
  console.log("═".repeat(60));
  console.log(`URL: ${BASE_URL}`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log("");

  // Create screenshot dir
  const { mkdirSync } = await import("fs");
  mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    headless: true,
  });

  // ── Desktop context (1280x720 - Windows laptop) ──
  const desktopCtx = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    locale: "es-PE",
  });

  // ── Mobile context (Android Pixel 7) ──
  const mobileCtx = await browser.newContext({
    viewport: { width: 412, height: 915 },
    userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
    locale: "es-PE",
    isMobile: true,
    hasTouch: true,
  });

  const desktopPage = await desktopCtx.newPage();

  // Run desktop tests
  console.log("── DESKTOP TESTS (Windows 1280x720) ──");
  await testHomepageDesktop(desktopPage);
  await testScrollHeaderTransition(desktopPage);
  await testSubpageDesktop(desktopPage, "/nosotros", "Nosotros");
  await testSubpageDesktop(desktopPage, "/osesa", "OSESA");
  await testSubpageDesktop(desktopPage, "/reportes", "Reportes");
  await testSubpageDesktop(desktopPage, "/cursos", "Cursos");
  await testSubpageDesktop(desktopPage, "/contacto", "Contacto");
  await testDesktopDropdown(desktopCtx);

  // Run mobile tests
  console.log("── MOBILE TESTS (Android Pixel 7 - 412x915) ──");
  await testMobileView(mobileCtx, "/", "Homepage");
  await testMobileView(mobileCtx, "/nosotros", "Nosotros");
  await testMobileView(mobileCtx, "/osesa", "OSESA");
  await testMobileView(mobileCtx, "/cursos", "Cursos");
  await testMobileView(mobileCtx, "/contacto", "Contacto");
  await testMobileMenuDrawer(mobileCtx);

  await browser.close();

  // ── Report ──
  console.log("\n" + "═".repeat(60));
  console.log("  RESULTS SUMMARY");
  console.log("═".repeat(60));
  let passed = 0;
  let failed = 0;
  for (const r of results) {
    const icon = r.passed ? "✅" : "❌";
    console.log(`  ${icon} ${r.name}`);
    console.log(`     ${r.detail}`);
    if (r.screenshot) console.log(`     📸 ${r.screenshot}`);
    console.log("");
    if (r.passed) passed++; else failed++;
  }
  console.log("─".repeat(60));
  console.log(`  TOTAL: ${results.length} | ✅ PASSED: ${passed} | ❌ FAILED: ${failed}`);
  console.log("═".repeat(60));

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(2);
});