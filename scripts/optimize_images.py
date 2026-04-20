"""
optimize_images.py
------------------
Resizes and compresses all JPEG photos in a folder for web use.

Usage:
    python3 scripts/optimize_images.py

What it does:
    - Applies EXIF orientation (so photos don't appear tilted after re-save)
    - Resizes to max 400px on the longest side (aspect ratio preserved)
    - Re-saves at 80% JPEG quality with optimization enabled

Use this script whenever new student photos are added to students_photos/
before committing them to the repo.
"""

from PIL import Image, ImageOps
import os

FOLDER = "students_photos/"
MAX_SIZE = 400
QUALITY = 80

total_before = 0
total_after = 0

for f in sorted(os.listdir(FOLDER)):
    if not (f.endswith(".jpeg") or f.endswith(".jpg")):
        continue

    path = FOLDER + f
    before = os.path.getsize(path)
    total_before += before

    img = Image.open(path)
    img = ImageOps.exif_transpose(img)  # apply EXIF rotation before saving
    img.thumbnail((MAX_SIZE, MAX_SIZE), Image.LANCZOS)
    img.save(path, "JPEG", quality=QUALITY, optimize=True)

    after = os.path.getsize(path)
    total_after += after
    print(f"{f}: {before // 1024}KB → {after // 1024}KB  ({img.size[0]}x{img.size[1]})")

print()
print(f"TOTAL: {total_before // 1024}KB → {total_after // 1024}KB")
