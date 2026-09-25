// Serves the site's static export (SITE_OUT, default site/out) for the tests. Read-only; supports byte ranges for video.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { SITE_OUT, SITE_PORT } from "../lib/common.mjs";

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".gif": "image/gif", ".ico": "image/x-icon", ".mp4": "video/mp4", ".webm": "video/webm", ".woff2": "font/woff2", ".woff": "font/woff", ".xml": "application/xml" };

function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^[\\/]+/, "");
  const base = path.join(SITE_OUT, clean);
  if (!base.startsWith(SITE_OUT)) return null;
  for (const f of [base, `${base}.html`, path.join(base, "index.html")]) if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  return null;
}

if (!fs.existsSync(SITE_OUT)) { console.error(`No static export at ${SITE_OUT}. Build the site (next build) or set SITE_OUT.`); process.exit(1); }
http.createServer((req, res) => {
  const file = resolve(req.url);
  if (!file) {
    const nf = path.join(SITE_OUT, "404.html");
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    return res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : "Not found");
  }
  const size = fs.statSync(file).size;
  const type = TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream";
  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range ?? "");
  if (range) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Number(range[2]) : size - 1;
    res.writeHead(206, { "content-type": type, "content-range": `bytes ${start}-${end}/${size}`, "accept-ranges": "bytes", "content-length": end - start + 1 });
    return fs.createReadStream(file, { start, end }).pipe(res);
  }
  res.writeHead(200, { "content-type": type, "content-length": size, "accept-ranges": "bytes" });
  fs.createReadStream(file).pipe(res);
}).listen(SITE_PORT, "127.0.0.1", () => console.log(`Serving ${SITE_OUT} at http://127.0.0.1:${SITE_PORT}`));
