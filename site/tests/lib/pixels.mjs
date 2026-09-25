import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

/**
 * Compare two screenshots. When sizes differ, both are padded to the larger size with transparent pixels,
 * so missing or extra height counts as difference rather than being cropped away.
 */
export function compareImages(expectedBuf, actualBuf) {
  const a = PNG.sync.read(expectedBuf);
  const b = PNG.sync.read(actualBuf);
  const width = Math.max(a.width, b.width);
  const height = Math.max(a.height, b.height);
  const pad = (img) => {
    if (img.width === width && img.height === height) return img;
    const out = new PNG({ width, height });
    out.data.fill(0);
    PNG.bitblt(img, out, 0, 0, img.width, img.height, 0, 0);
    return out;
  };
  const A = pad(a);
  const B = pad(b);
  const diff = new PNG({ width, height });
  const differing = pixelmatch(A.data, B.data, diff.data, width, height, { threshold: 0.1 });
  return {
    ratio: differing / (width * height),
    expectedSize: [a.width, a.height],
    actualSize: [b.width, b.height],
    diffPng: PNG.sync.write(diff),
  };
}
