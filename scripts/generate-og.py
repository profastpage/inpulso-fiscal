"""Generate professional OG image for IPF social sharing."""

from PIL import Image, ImageDraw, ImageFont
import os

# Paths
LOGO_PATH = "/home/z/my-project/public/logo.png"
OUTPUT_PATH = "/home/z/my-project/public/og-image.png"

# Canvas
W, H = 1200, 630
img = Image.new("RGB", (W, H), "#020617")
draw = ImageDraw.Draw(img)

# ── Background gradient effect (subtle radial from center-top) ──
for i in range(100, 0, -1):
    frac = i / 100
    r = int(2 + 18 * (1 - frac))
    g = int(6 + 30 * (1 - frac))
    b = int(23 + 50 * (1 - frac))
    ex = int(W * 0.5 * frac + W * 0.5 * (1 - frac))
    ey_top = int(-200 * frac)
    ey_bot = int(H * 0.5 * frac)
    draw.ellipse(
        [W // 2 - ex, ey_top, W // 2 + ex, ey_bot + (ey_bot - ey_top)],
        fill=(r, g, b),
    )

# ── Load and paste logo ──
logo_raw = Image.open(LOGO_PATH).convert("RGBA")
logo_size = 140
logo = logo_raw.resize((logo_size, logo_size), Image.LANCZOS)

# Create rounded mask
mask = Image.new("L", (logo_size, logo_size), 0)
mask_draw = ImageDraw.Draw(mask)
mask_draw.rounded_rectangle([0, 0, logo_size, logo_size], radius=26, fill=255)

# Place logo
logo_x, logo_y = 100, (H - logo_size) // 2
img.paste(logo, (logo_x, logo_y), mask)

# ── Fonts ──
def get_font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/english/Tinos-Bold.ttf" if bold else "/usr/share/fonts/truetype/english/Tinos-Regular.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

# Title lines
title_font = get_font(48, bold=True)
title_x = logo_x + logo_size + 55
title_y = H // 2 - 85

draw.text((title_x, title_y), "INSTITUTO", fill="#ffffff", font=title_font)
draw.text((title_x, title_y + 58), "PULSO FISCAL", fill="#38aaf7", font=title_font)

# Tagline
tag_font = get_font(21)
draw.text((title_x, title_y + 130), "Portal lider en analisis economico, politica fiscal", fill="#94a3b8", font=tag_font)
draw.text((title_x, title_y + 160), "y gestion publica en Peru.", fill="#94a3b8", font=tag_font)

# ── Decorative bottom gradient bar ──
bar_h = 5
for x in range(W):
    ratio = x / W
    r = int(14 + (124 - 14) * ratio)
    g = int(140 + (200 - 140) * ratio)
    b = int(225 + (251 - 225) * ratio)
    draw.line([(x, H - bar_h), (x, H)], fill=(r, g, b))

# ── Top-right badge ──
badge_font = get_font(13)
bx1, by1, bx2, by2 = W - 340, 30, W - 50, 60
draw.rounded_rectangle([bx1, by1, bx2, by2], radius=999, outline="#38aaf7", width=1)
draw.text((bx1 + 18, by1 + 10), "THINK TANK  ·  MACROECONOMIA  ·  PERU", fill="#38aaf7", font=badge_font)

# ── Save ──
img.save(OUTPUT_PATH, "PNG")
print(f"OG image saved: {OUTPUT_PATH} ({os.path.getsize(OUTPUT_PATH)} bytes)")