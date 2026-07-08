# Work Log: Full-Bleed Hero Sections for Legal Pages

## Date: 2025-07-12

## Summary
Updated 5 legal pages to have more impactful, full-bleed hero sections with expanded vertical spacing and wider content containers.

## Files Modified

### 1. `/src/app/terminos/page.tsx`
### 2. `/src/app/devoluciones/page.tsx`
### 3. `/src/app/cookies/page.tsx`
### 4. `/src/app/privacidad/page.tsx`

**Changes applied (identical for all 4 pages):**
- **Mini-nav**: `max-w-[1200px]` → `max-w-[1400px]` — wider nav container for more breathing room
- **Hero section**: `pt-12 pb-20` → `pt-16 sm:pt-20 pb-28 sm:pb-36` — significantly more vertical padding, responsive top padding
- **Content area**: `max-w-[820px]` → `max-w-[860px]` — slightly wider content card

### 5. `/src/app/reclamaciones/ReclamacionesPage.tsx`

**Changes applied:**
- **Mini-nav**: `max-w-[1200px]` → `max-w-[1400px]` — consistent with other legal pages
- No hero section changes — this page uses a different layout (form-based with company header card instead of a hero section)

---

# Work Log: Full-Bleed Hero with Transparent Header (Pages 3-4)

## Date: 2025-07-12

## Summary
Updated Cursos and Contacto pages to use the new full-bleed PageHero component with transparent header pattern.

## Files Modified

### 1. `/src/app/cursos/CursosPage.tsx`
- Added `import PageHero from "@/components/ipf/PageHero";`
- Added `transparent` prop to `<Header>` → `<Header transparent />`
- Replaced old header section (badge + h1 + p) with `<PageHero>`:
  - badge: "Excelencia Académica"
  - title: `<>Programas de <span>Alta Especialización</span> en Gestión Pública</>`
  - subtitle, gradient, and pattern as specified
- Removed `pt-24 sm:pt-32` from `<main>` (PageHero handles top spacing)

### 2. `/src/app/contacto/ContactoPage.tsx`
- Added `import PageHero from "@/components/ipf/PageHero";`
- Added `transparent` prop to `<Header>` → `<Header transparent />`
- Replaced old header section (badge + h1 + p inside `<div ref={headerRef}>`) with `<PageHero>`:
  - badge: "Contáctenos"
  - title: `<>Estamos aquí para <span>ayudarle</span></>`
  - subtitle, gradient, and pattern as specified
- Removed `pt-28 sm:pt-36` from `<main>` (PageHero handles top spacing)
- Removed unused `headerRef` ref declaration

## Notes
- Lint passes with 0 errors (only pre-existing warnings)