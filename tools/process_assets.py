"""Optimise the supplied photos and brand assets for the website."""
from __future__ import annotations

import json
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(r"E:\projects\reem-alnufooth-glass")
RAW = ROOT / "tools" / "source-photos"
OUT = ROOT / "assets" / "images"
BRAND = ROOT / "assets" / "brand"
BRAND.mkdir(parents=True, exist_ok=True)
OUT.mkdir(parents=True, exist_ok=True)

# source file -> (slug, category, Arabic alt text, optional crop box)
PHOTOS = {
    "WhatsApp Image 2026-11-11 at 9.47.51 PM.jpeg": (
        "glass-cubicles",
        "partitions",
        "قواطع زجاجية سكريت لأبواب الكبائن بداخل مبنى تجاري",
        None,
    ),
    "WhatsApp Image 2026-11-11 at 9.47.51 PM (1).jpeg": (
        "office-gold",
        "showers",
        "كابينة شاور زجاجية بإكسسوارات ذهبية من تنفيذ مؤسسة ريم النفوذ",
        None,
    ),
    "WhatsApp Image 2026-11-11 at 9.47.51 PM (2).jpeg": (
        "office-black-frame",
        "offices",
        "مكتب زجاجي بإطار أسود وأرضية خشبية من تنفيذ مؤسسة ريم النفوذ",
        None,
    ),
    "WhatsApp Image 2026-11-11 at 9.47.52 PM (1).jpeg": (
        "shower-install",
        "showers",
        "شاور زجاجي سكريت بإكسسوارات سوداء وإغلاق محكم",
        (0, 312, 720, 1285),
    ),
    "WhatsApp Image 2026-11-11 at 9.47.52 PM (2).jpeg": (
        "storefront-install",
        "storefronts",
        "فنيو مؤسسة ريم النفوذ أثناء تركيب واجهة زجاجية لمحل تجاري",
        None,
    ),
    "WhatsApp Image 2026-11-11 at 9.47.52 PM (3).jpeg": (
        "facade-modern",
        "facades",
        "واجهات زجاجية حديثة لمجمع تجاري مع ألمنيوم",
        None,
    ),
    "WhatsApp Image 2026-11-11 at 9.47.52 PM (4).jpeg": (
        "storefront-blue",
        "storefronts",
        "واجهة محل تجاري بزجاج عاكس وألمنيوم أسود",
        None,
    ),
    "WhatsApp Image 2026-11-11 at 9.47.52 PM (5).jpeg": (
        "storefront-glass",
        "storefronts",
        "واجهة زجاجية بزجاج عاكس وألمنيوم أسود لمحل تجاري",
        (0, 250, 1399, 960),
    ),
    "WhatsApp Image 2026-11-11 at 9.47.52 PM.jpeg": (
        "partition-black",
        "offices",
        "قواطع زجاجية داخلية بإطار أسود في مساحة مكتبية",
        None,
    ),
    "WhatsApp Image 2026-11-11 at 9.47.53 PM (1).jpeg": (
        "office-frosted-2",
        "offices",
        "قواطع زجاجية مصنفرة في مكتب مع أبواب زجاجية سوداء",
        None,
    ),
    "WhatsApp Image 2026-11-11 at 9.47.53 PM (2).jpeg": (
        "office-black-2",
        "offices",
        "واجهات زجاجية داخلية للمكاتب بإطار ألمنيوم أسود",
        None,
    ),
    "WhatsApp Image 2026-11-11 at 9.47.53 PM (3).jpeg": (
        "facade-concrete",
        "facades",
        "تركيب واجهات زجاجية لمبنى تجاري حديث",
        None,
    ),
    "WhatsApp Image 2026-11-11 at 9.47.53 PM.jpeg": (
        "office-construction",
        "offices",
        "تنفيذ قواطع زجاجية لمكاتب أثناء أعمال التركيب",
        None,
    ),
}

manifest = {}

for source, (slug, category, alt, crop) in PHOTOS.items():
    path = RAW / source
    with Image.open(path) as img:
        img = img.convert("RGB")
        if crop:
            img = img.crop(crop)
        # Correct mobile orientation just in case.
        for max_width, suffix in ((1600, ""), (900, "-sm")):
            copy = img.copy()
            if copy.width > max_width:
                height = round(copy.height * max_width / copy.width)
                copy = copy.resize((max_width, height), Image.Resampling.LANCZOS)
            base = OUT / f"{slug}{suffix}"
            copy.save(base.with_suffix(".webp"), "WEBP", quality=82, method=6)
            copy.save(base.with_suffix(".jpg"), "JPEG", quality=80, optimize=True, progressive=True)
            if not suffix:
                manifest[slug] = {
                    "width": copy.width,
                    "height": copy.height,
                    "category": category,
                    "alt": alt,
                }

# Compress the source-of-truth brand files and create derived icons.
square_src = Path(r"E:\projects\New folder\شعار مؤسسة ريم النفوذ للزجاج والألمنيوم.png")
wide_src = Path(r"E:\projects\New folder\شعار ريم النفوذ للزجاج والألمنيوم.png")

with Image.open(square_src) as img:
    square = img.convert("RGBA")
    if square.width > 800:
        h = round(square.height * 800 / square.width)
        square = square.resize((800, h), Image.Resampling.LANCZOS)
    square.save(BRAND / "logo-square.png", optimize=True)
    # Square logo used in structured data (Google prefers 1:1, max 512px).
    with Image.open(BRAND / "logo-square.webp") as sq:
        sq.convert("RGBA").resize((512, 512), Image.Resampling.LANCZOS).save(
            BRAND / "logo-schema.webp", "WEBP", quality=88, method=6
        )
    square.resize((512, 512), Image.Resampling.LANCZOS).save(BRAND / "icon-512.png", optimize=True)
    square.resize((192, 192), Image.Resampling.LANCZOS).save(BRAND / "icon-192.png", optimize=True)
    square.resize((180, 180), Image.Resampling.LANCZOS).save(BRAND / "apple-touch-icon.png", optimize=True)
    square.resize((64, 64), Image.Resampling.LANCZOS).save(BRAND / "favicon-64.png", optimize=True)
    square.resize((32, 32), Image.Resampling.LANCZOS).save(BRAND / "favicon-32.png", optimize=True)
    square.resize((48, 48), Image.Resampling.LANCZOS).save(BRAND / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

with Image.open(wide_src) as img:
    wide = img.convert("RGBA")
    if wide.width > 1400:
        h = round(wide.height * 1400 / wide.width)
        wide = wide.resize((1400, h), Image.Resampling.LANCZOS)
    wide.save(BRAND / "logo-wide.png", optimize=True)

# Open Graph / social sharing image (1200x630).
with Image.open(OUT / "office-construction.jpg") as img:
    img = img.convert("RGB")
    scale = max(1200 / img.width, 630 / img.height)
    resized = img.resize((round(img.width * scale), round(img.height * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - 1200) // 2
    top = (resized.height - 630) // 2
    cover = resized.crop((left, top, left + 1200, top + 630))
    overlay = Image.new("RGBA", cover.size, (7, 20, 32, 205))
    cover = Image.alpha_composite(cover.convert("RGBA"), overlay)
    with Image.open(BRAND / "logo-wide.png") as logo:
        logo = logo.convert("RGBA")
        target_w = 760
        logo_h = round(logo.height * target_w / logo.width)
        logo = logo.resize((target_w, logo_h), Image.Resampling.LANCZOS)
        x = (1200 - target_w) // 2
        y = (630 - logo_h) // 2
        cover.alpha_composite(logo, (x, y))
    draw = ImageDraw.Draw(cover)
    draw.rectangle([(x, y + logo_h + 18), (x + target_w, y + logo_h + 21)], fill=(198, 161, 91, 255))
    cover.convert("RGB").save(OUT / "og-cover.jpg", quality=88, optimize=True)

with open(OUT / "manifest.json", "w", encoding="utf-8") as fh:
    json.dump(manifest, fh, ensure_ascii=False, indent=2)

print(json.dumps(manifest, ensure_ascii=False, indent=2))
print("Done:", len(manifest), "photos")
