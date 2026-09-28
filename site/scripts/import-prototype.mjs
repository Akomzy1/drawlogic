// Import the approved export without modifying design/prototype or examiner files.
// Run deliberately when the approved export changes; generated files remain reviewable.
import fs from 'node:fs';
import path from 'node:path';
import { gunzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import ts from 'typescript';

const root = path.resolve(import.meta.dirname, '..');
const source = fs.readFileSync(path.join(root, '../design/prototype/marketing-site.html'), 'utf8');
const embedded = kind => JSON.parse(source.match(new RegExp('<script type="__bundler/' + kind + '">([\\s\\S]*?)</script>'))[1]);
const manifest = embedded('manifest');
const template = embedded('template');
const decode = resource => resource.compressed ? gunzipSync(Buffer.from(resource.data, 'base64')) : Buffer.from(resource.data, 'base64');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const write = (file, data) => { const target = path.join(root, file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, data); };
const json = (file, data) => write(file, JSON.stringify(data, null, 2) + '\n');
const resourcePaths = {};
const assets = [];
for (const [id, resource] of Object.entries(manifest)) {
  const mime = resource.mimeType ?? resource.mime;
  if (!/^(image|video|font)\//.test(mime)) continue;
  const bytes = decode(resource);
  const extension = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/svg+xml': 'svg', 'video/mp4': 'mp4', 'video/webm': 'webm', 'font/woff2': 'woff2' })[mime];
  if (!extension) throw new Error('Unsupported prototype resource: ' + mime);
  const file = `/media/prototype/${id}.${extension}`;
  write('public' + file, bytes);
  resourcePaths[id] = file;
  if (!mime.startsWith('font/')) assets.push({ path: file, sha256: hash(bytes), source: 'design/prototype/marketing-site.html', source_resource: id, status: 'approved_prototype', caption: 'Illustrative — generated from a Drawlogic drawing' });
}
const resources = Object.fromEntries(embedded('ext_resources').map(({ id, uuid }) => [id, resourcePaths[uuid]]));
json('content/resources.json', resources);
json('public/media/manifest.json', { version: 1, source: 'design/prototype/marketing-site.html', prototype_sha256: hash(source.replaceAll('\r\n', '\n')), caption: 'Illustrative — generated from a Drawlogic drawing', preview_label: 'Generated preview — not a model render', assets });
let styles = [...template.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
for (const [id, file] of Object.entries(resourcePaths)) styles = styles.replaceAll(id, file);
write('src/app/globals.css', styles);

const overrides = value => value.replaceAll('₦9,500', '₦6,000').replaceAll('₦32,000', '₦20,000').replaceAll('₦119,000', '₦75,000').replaceAll('₦729,000', '₦450,000').replaceAll('Up to 25 seats', '5 seats + $149/seat');
const strings = {};
const ref = value => {
  value = overrides(value);
  const key = 's' + hash(value).slice(0, 12);
  strings[key] = value;
  return ts.factory.createElementAccessExpression(ts.factory.createIdentifier('copy'), ts.factory.createStringLiteral(key));
};
function cleanJSX(text) {
  const lines = text.split(/\r\n|\n|\r/);
  let last = 0;
  lines.forEach((l, i) => { if (/[^ \t]/.test(l)) last = i; });
  return lines.map((l, i) => {
    l = l.replace(/\t/g, ' ');
    if (i) l = l.replace(/^ +/, '');
    if (i !== lines.length - 1) l = l.replace(/ +$/, '');
    return l ? l + (i !== last ? ' ' : '') : '';
  }).join('').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, '\u00a0').replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
}
function externalize(code, file) {
  const tree = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);
  const result = ts.transform(tree, [context => {
    const visit = node => {
      if (ts.isJsxText(node)) {
        const text = cleanJSX(node.text);
        return text.trim() ? ts.factory.createJsxExpression(undefined, ref(text)) : node;
      }
      if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && /[A-Z]|[a-z] [a-z]/.test(node.text) && !/^(var\(|https?:|\/|#|[.]{1,2}\/)/.test(node.text)) {
        const parent = node.parent;
        if (ts.isPropertyAssignment(parent) && parent.name === node || ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) return node;
        if (ts.isJsxAttribute(parent)) return ts.factory.createJsxExpression(undefined, ref(node.text));
        return ref(node.text);
      }
      return ts.visitEachChild(node, visit, context);
    };
    return node => ts.visitNode(node, visit);
  }]);
  const printed = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed, removeComments: true }).printFile(result.transformed[0]);
  result.dispose();
  return printed;
}
const systemResource = Object.values(manifest).find(r => /javascript/.test(r.mimeType ?? r.mime) && decode(r).toString().startsWith('/* @ds-bundle:'));
let system = decode(systemResource).toString();
system = system.slice(system.indexOf('(() => {'));
system = system.slice(0, system.indexOf('// ui_kits/app/shell.js')) + system.slice(system.indexOf('__ds_ns.Mark ='));
system = system.replace('const __ds_ns = (window.DrawlogicDesignSystem_60c2c5 = window.DrawlogicDesignSystem_60c2c5 || {});', 'const __ds_ns = DL;');
let code = 'const DL = {};\n' + system;
for (const m of template.matchAll(/<script type="text\/babel" src="([^"]+)"/g)) {
  let part = decode(manifest[m[1]]).toString();
  part = part.replace('const DL = window.DrawlogicDesignSystem_60c2c5;', '');
  part = part.replace(/Object\.assign\(window, \{[^}]+\}\);?/g, '');
  part = part.replaceAll('window.__resources', 'resources').replace('window.PRICING_TIERS =', 'const PRICING_TIERS =').replaceAll('window.PRICING_TIERS', 'PRICING_TIERS');
  part = part.replace('["Drafts per month", ["1",', '["Drafts per month", ["3",').replace('["0", "20", "60", "200", "1 000", "Negotiated"]', '["0", "40", "60", "250", "1 000", "Negotiated"]');
  // Decision 12: let PricingTable manage the selected currency on the Lagos page.
  part = part.replace('currency="NGN" currencies={["NGN", "USD"]}', 'currencies={["NGN", "USD"]}');
  code += '\n' + part;
}
write('src/components/prototype.jsx', '"use client";\nimport * as React from "react";\nimport copy from "../../content/prototype.json";\nimport resources from "../../content/resources.json";\n\n' + externalize(code, 'prototype.jsx') + '\nexport { DL, Home, IdeaMode, ForProfessionals, RenderStudio, Marketplace, FindASigner, Developers, Students, Regulators, Lagos, Pricing, About };\n');
json('content/prototype.json', strings);
console.log(`Imported ${assets.length} approved prototype media assets and ${Object.keys(strings).length} content strings.`);
