#!/usr/bin/env node
// Cross-checks the class and token names in design.md against the stylesheet,
// both ways. Usage: node check-names.mjs <design.md> <brand.css> <prefix>
// Exits 1 if anything is documented but missing, or published but undocumented.
// Page-owned namespaces (<prefix>-custom-*, <prefix>-viz-*) are ignored.

import { readFileSync } from "node:fs";

const [mdPath, cssPath, prefix] = process.argv.slice(2);
if (!mdPath || !cssPath || !prefix) {
  console.error("Usage: node check-names.mjs <design.md> <brand.css> <prefix>");
  process.exit(2);
}

const md = readFileSync(mdPath, "utf8");
const css = readFileSync(cssPath, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const p = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const isPageOwned = (n) => n.startsWith(`${prefix}-custom-`) || n.startsWith(`${prefix}-viz-`);

// Names the prose documents: backticked class names and tokens, plus any
// class="" attributes inside its HTML examples. A name written straight after
// "such as" is an example of what not to invent, so it is skipped.
const docClasses = new Set();
const docTokens = new Set();
const prose = md.replace(/^```[\s\S]*?^```/gm, "");
for (const m of prose.matchAll(/`([^`\n]+)`/g)) {
  const code = m[1];
  if (/such as\s*$/i.test(prose.slice(Math.max(0, m.index - 20), m.index))) continue;
  for (const [n] of code.matchAll(new RegExp(`--${p}-[a-z0-9-]+`, "g"))) docTokens.add(n);
  const bare = code.trim();
  if (new RegExp(`^${p}-[a-z0-9-]+$`).test(bare)) docClasses.add(bare);
}
for (const [, attr] of md.matchAll(/class="([^"]+)"/g)) {
  for (const c of attr.split(/\s+/)) if (c.startsWith(`${prefix}-`)) docClasses.add(c);
}
for (const [n] of md.matchAll(new RegExp(`var\\((--${p}-[a-z0-9-]+)\\)`, "g"))) docTokens.add(n);

// Names the stylesheet publishes: class selectors and declared custom properties.
const cssClasses = new Set();
const cssTokens = new Set();
for (const [, n] of css.matchAll(new RegExp(`\\.(${p}-[a-zA-Z0-9_-]+)`, "g"))) cssClasses.add(n);
for (const [, n] of css.matchAll(new RegExp(`(--${p}-[a-z0-9-]+)\\s*:`, "g"))) cssTokens.add(n);

// Ranges written as "series-1 through series-6" or "chart-1 to chart-6".
for (const m of md.matchAll(new RegExp(`\`(-{0,2})(${p}-[a-z-]+-)(\\d+)\`\\s+(?:through|to)\\s+\`-{0,2}${p}-[a-z-]+-(\\d+)\``, "g"))) {
  const [, dashes, stem, from, to] = m;
  for (let i = Number(from); i <= Number(to); i++) {
    (dashes ? docTokens : docClasses).add(`${dashes}${stem}${i}`);
  }
}

const diff = (a, b) => [...a].filter((x) => !b.has(x) && !isPageOwned(x)).sort();
const report = [
  ["Classes documented but not in the CSS", diff(docClasses, cssClasses)],
  ["Classes in the CSS but not documented", diff(cssClasses, docClasses)],
  ["Tokens documented but not in the CSS", diff(docTokens, cssTokens)],
  ["Tokens in the CSS but not documented", diff(cssTokens, docTokens)],
];

let failed = false;
for (const [title, names] of report) {
  if (!names.length) continue;
  failed = true;
  console.log(`${title} (${names.length}):`);
  for (const n of names) console.log(`  ${n}`);
}
console.log(
  failed
    ? "\nNames do not match."
    : `Names match: ${docClasses.size} classes and ${docTokens.size} tokens, both ways.`
);
process.exit(failed ? 1 : 0);
