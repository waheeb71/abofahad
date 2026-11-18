"""Prepare the two supplied brand files (wide lockup + circular emblem)."""
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(r"E:\projects\reem-alnufooth-glass")
BRAND = ROOT / "assets" / "brand"
OUT = ROOT / "assets" / "images"
BRAND.mkdir(parents=True, exist_ok=True)

sources = list(Path(r"E:\projects\New folder").glob("*.png"))
wide_src = next(p for p in sources if Image.open(p).size == (1774, 887))
square_src = next(p for p in sources if Image.open(p).size == (1254, 1254))

with Image.open(wide_src) as img:
    wide = img.convert("RGBA")
    wide = wide.resize((1200, round(wide.height * 1200 / wide.width)), Image.Resampling.LANCZOS)
    wide.save(BRAND / "logo-wide.png", optimize=True)
    wide.save(BRAND / "logo-wide.webp", "WEBP", quality=92, method=6)

with Image.open(square_src) as img:
    square = img.convert("RGBA")
    square = square.resize((700, 700), Image.Resampling.LANCZOS)
    square.save(BRAND / "logo-square.png", optimize=True)
    square.save(BRAND / "logo-square.webp", "WEBP", quality=92, method=6)
    for size in (512, 192, 180, 64, 32):
        square.resize((size, size), Image.Resampling.LANCZOS).save(
            BRAND / f"icon-{size}.png" if size not in (180, 32) else BRAND / ("apple-touch-icon.png" if size == 180 else "favicon-32.png"),
            optimize=True,
        )
    square.resize((48, 48), Image.Resampling.LANCZOS).save(
        BRAND / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)]
    )

# Social card: photo + navy overlay + transparent wide lockup.
with Image.open(OUT / "office-construction.jpg") as img:
    img = img.convert("RGB")
    scale = max(1200 / img.width, 630 / img.height)
    resized = img.resize((round(img.width * scale), round(img.height * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - 1200) // 2
    top = (resized.height - 630) // 2
    cover = resized.crop((left, top, left + 1200, top + 630)).convert("RGBA")
    cover = Image.alpha_composite(cover, Image.new("RGBA", cover.size, (6, 18, 30, 225)))

with Image.open(BRAND / "logo-wide.png") as logo:
    logo = logo.convert("RGBA")
    target_w = 800
    logo = logo.resize((target_w, round(logo.height * target_w / logo.width)), Image.Resampling.LANCZOS)
    x = (1200 - target_w) // 2
    y = (630 - logo.height) // 2
    cover.alpha_composite(logo, (x, y))

draw = ImageDraw.Draw(cover)
draw.rectangle([(x + 40, y + logo.height + 14), (x + target_w - 40, y + logo.height + 17)], fill=(198, 161, 91, 255))
cover.convert("RGB").save(OUT / "og-cover.jpg", quality=88, optimize=True)

print("wide", wide.size, "square", square.size)
print("files:")
for p in sorted(BRAND.iterdir()):
    print(" ", p.name, f"{p.stat().st_size/1024:.0f} KB")
