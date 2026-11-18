from PIL import Image, ImageChops
import os

files = [
    r"E:\projects\New folder\شعار مؤسسة ريم النفوذ للزجاج والألمنيوم.png",
    r"E:\projects\New folder\شعار ريم النفوذ للزجاج والألمنيوم.png",
]
for f in files:
    im = Image.open(f)
    print(os.path.basename(f), im.mode, im.size)
    if "A" in im.getbands():
        print("  alpha extrema:", im.getchannel("A").getextrema())
    rgb = im.convert("RGB")
    print("  corners:", [rgb.getpixel(p) for p in [(0, 0), (im.width - 1, 0), (0, im.height - 1), (im.width - 1, im.height - 1)]])
    bg = Image.new("RGB", im.size, (255, 255, 255))
    diff = ImageChops.difference(rgb, bg)
    bbox = diff.convert("L").point(lambda p: 255 if p > 8 else 0).getbbox()
    print("  non-white bbox:", bbox)
