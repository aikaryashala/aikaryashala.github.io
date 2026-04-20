"""
fix_rotation.py
---------------
Manually rotates a single photo when EXIF orientation data is already lost
and optimize_images.py could not auto-correct it.

Usage:
    python3 scripts/fix_rotation.py <filename> <degrees>

Arguments:
    filename  — path to the image (e.g. students_photos/AIK078978.jpeg)
    degrees   — rotation angle: 90 (CCW), -90 (CW), or 180

Example:
    python3 scripts/fix_rotation.py students_photos/AIK078978.jpeg 90

Note:
    Use this only when a photo still appears tilted after running
    optimize_images.py. The rotation is applied and the file is overwritten.
"""

import sys
from PIL import Image

if len(sys.argv) != 3:
    print("Usage: python3 scripts/fix_rotation.py <filepath> <degrees>")
    sys.exit(1)

path = sys.argv[1]
degrees = int(sys.argv[2])

img = Image.open(path)
img = img.rotate(degrees, expand=True)
img.save(path, "JPEG", quality=80, optimize=True)

print(f"Rotated {degrees}° — saved: {img.size[0]}x{img.size[1]}  →  {path}")
