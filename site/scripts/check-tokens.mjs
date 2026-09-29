// Build-time guard: literal colours must come from the approved prototype.
import fs from 'node:fs';
import path from 'node:path';
import { gunzipSync } from 'node:zlib';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, '../design/prototype/marketing-site.html'), 'utf8');
const extract = kind => JSON.parse(html.match(new RegExp('<script type="__bundler/' + kind + '">([\\s\\S]*?)</script>'))[1]);
const resources = extract('manifest');
const approved = [extract('template'), fs.readFileSync(path.join(root, '../design/prototype/tokens.css'), 'utf8')];
for (const resource of Object.values(resources)) {
  if (!/javascript|css/.test(resource.mimeType ?? resource.mime)) continue;
  approved.push((resource.compressed ? gunzipSync(Buffer.from(resource.data, 'base64')) : Buffer.from(resource.data, 'base64')).toString());
}
const literals = text => [...text.matchAll(/#[a-f\d]{3,8}\b|rgba?\([^)]*\)/gi)].map(m => m[0].toLowerCase().replace(/\s/g, ''));
const allowed = new Set(approved.flatMap(literals));
const problems = [];
function check(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) check(file);
    else if (/\.(css|[jt]sx?)$/.test(file)) {
      for (const colour of literals(fs.readFileSync(file, 'utf8'))) {
        if (!allowed.has(colour)) problems.push(`${path.relative(root, file)}: ${colour}`);
      }
    }
  }
}
check(path.join(root, 'src'));
if (problems.length) throw new Error('Colours outside the approved prototype:\n' + problems.join('\n'));
console.log('Site colours match the approved prototype.');
