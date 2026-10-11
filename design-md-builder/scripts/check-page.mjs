#!/usr/bin/env node
// Mechanical checks on one generated page. Usage:
//   node check-page.mjs <page.html> <brand.css> <prefix>
// Exits 1 on any failure. Checks only what a static read can catch; overflow,
// table width and contrast need a browser.

import { readFileSync } from "node:fs";

const [pagePath, cssPath, prefix] = process.argv.slice(2);
if (!pagePath || !cssPath || !prefix) {
  console.error("Usage: node check-page.mjs <page.html> <brand.css> <prefix>");
  process.exit(2);
}

const html = readFileSync(pagePath, "utf8");
const css = readFileSync(cssPath, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const p = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const failures = [];
const lineOf = (i) => html.slice(0, i).split("\n").length;

// 1. Em dashes in visible text.
const text = html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, "").replace(/<!--[\s\S]*?-->/g, "");
for (const m of text.matchAll(/—|&mdash;|&#8212;/g)) {
  failures.push(`Em dash: "${text.slice(Math.max(0, m.index - 30), m.index + 30).replace(/\s+/g, " ").trim()}"`);
}

// 2. Colour and font-size literals in page-owned CSS, which should use tokens.
const pageCss = [
  ...[...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => [m[1], m.index]),
  ...[...html.matchAll(/style="([^"]*)"/gi)].map((m) => [m[1], m.index]),
];
for (const [block, at] of pageCss) {
  for (const m of block.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch)\(/g)) {
    failures.push(`Colour literal "${m[0]}" near line ${lineOf(at)}; use a --${prefix}-* token`);
  }
  for (const m of block.matchAll(/font-size\s*:\s*([^;}"]+)/g)) {
    if (!m[1].includes(`--${prefix}-`) && !/^(inherit|1em|100%)$/.test(m[1].trim())) {
      failures.push(`Font-size literal "${m[1].trim()}" near line ${lineOf(at)}; use a type role or --${prefix}-type-* token`);
    }
  }
}

// 3. Heading order: one h1, no skipped levels.
const headings = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => [Number(m[1]), m.index]);
const h1s = headings.filter(([l]) => l === 1).length;
if (h1s !== 1) failures.push(`Expected one h1, found ${h1s}`);
let prev = 0;
for (const [level, at] of headings) {
  if (prev && level > prev + 1) failures.push(`Heading skips from h${prev} to h${level} at line ${lineOf(at)}`);
  prev = level;
}

// 4. Prefixed classes the stylesheet does not publish (invented names).
const published = new Set([...css.matchAll(new RegExp(`\\.(${p}-[a-zA-Z0-9_-]+)`, "g"))].map((m) => m[1]));
const invented = new Set();
for (const [, attr] of html.matchAll(/class="([^"]+)"/g)) {
  for (const c of attr.split(/\s+/)) {
    if (!c.startsWith(`${prefix}-`)) continue;
    if (c.startsWith(`${prefix}-custom-`) || c.startsWith(`${prefix}-viz-`)) continue;
    if (!published.has(c)) invented.add(c);
  }
}
for (const c of invented) failures.push(`Class "${c}" is not published by the stylesheet`);

// 5. Tokens the page reads that the stylesheet does not declare.
const declared = new Set([...css.matchAll(new RegExp(`(--${p}-[a-z0-9-]+)\\s*:`, "g"))].map((m) => m[1]));
const used = new Set([...html.matchAll(new RegExp(`var\\((--${p}-[a-z0-9-]+)`, "g"))].map((m) => m[1]));
for (const t of used) if (!declared.has(t)) failures.push(`Token "${t}" is not declared by the stylesheet`);

if (failures.length) {
  console.log(`${failures.length} failure(s) in ${pagePath}:`);
  for (const f of failures) console.log(`  ${f}`);
  process.exit(1);
}
console.log(`No failures in ${pagePath}.`);
