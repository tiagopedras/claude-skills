# The section spine

Keep this order and these headings. The order is part of what makes the file
work, and it matches the published original so evals can compare like with
like. Write in the imperative, second person implied, one rule per sentence.

`<Brand>` is the brand name, `<p>` the class prefix.

## Frontmatter

```yaml
---
name: <brand>-brand-guidelines
version: 0.1.0
updated: <today>
description: "Design, build, or substantially improve a <Brand> page so it looks and feels as close to the real thing as possible. Covers <the page kinds chosen, one clause each with examples>. Use whenever a page needs <Brand> information architecture, <font> typography, the token palette, responsive craft, and light and dark themes."
---
```

## `# Design pages like <Brand>`

One paragraph. The agent acts as a designer, editor, information architect,
data storyteller and design engineer, and shapes the argument and the
interface together rather than restyling a data dump.

## `## <Brand> product and brand context`

- Treat the result as an official surface someone could take for the real
  thing.
- One bullet per page kind chosen in round 1, each with its job and its
  target look. Tell the agent to establish which kind it is building and say
  which it assumed.
- One line on what never builds confidence: hype, decoration, false
  certainty, a generic dashboard look in place of the brand's own.
- Start from the reader's job, not the page category.

Evidence says this section does little visually. Keep it short.

## `## Use this priority order`

A numbered list of six: supplied facts first, then the caller's framework,
then the reader's question, then brand authorship (shell, font, tokens, grid),
then a composition specific to the material, then responsive and detail. Then
one paragraph on when to ask a grouped question and when to proceed.

## `## Integrate with the caller's project`

- Preserve the host framework and output form.
- How to resolve and link `design-md/assets/<p>-brand.css`, with the exact `<link>`
  tags including any font requests. Never `file://`, never `@import`, never a
  translated token system. Never read the stylesheet into context.
- **Inside the real codebase, use the real design system instead** and never
  add a parallel `<p>-*` layer. Name the repos.
- Page-owned CSS uses only `<p>-custom-*` and `<p>-viz-*` and never targets a
  published class.
- The network allowlist: the stylesheet, the font requests, user-supplied
  assets. No third-party scripts, chart libraries or icon kits.

## `## Work in four passes`

### `### Frame the reader's job`

The private questions (who opens it, the strongest supported answer, the
evidence, the caveat, what stays for audit). Executive path and audit path.
Plain language with exact terms defined at first use. **Add the team's own
vocabulary from round 3** with "expand at first use". Simplify language,
never the claim. **Add the privacy line from round 3.**

Evidence says this section can make the visual result worse. Keep it to what
protects facts and privacy.

### `### Choose the composition`

The first viewport is the argument. Name the obvious layout and reject it
unless earned. Match the opening to the job (recommendation, comparison,
trend, calculator, brief with no decision). Geometry before components, with
the mapping from data shape to visual variable. One organising move per page.
Squint test. Presence through commitment, not effects.

Keep it short; evidence was slightly negative.

### `### Authoritative <Brand> visual system`

This is where the craft rules live, and they earned their place in testing.
Every subsection names the real tokens and classes.

- `#### Authorship shell`: the wordmark rule (text or logo file, from round
  2), the header metadata rule, and the exact shell HTML with every class.
- `#### Grid and alignment`: the 12-column grid, reading width, tables own
  full width, gutters, open space, and **which spacing tokens carry the
  rhythm, from the usage counts**.
- `#### Typography and rhythm`: the font and where mono is allowed, the real
  weights and line heights stated as numbers, each type role mapped to its
  class, the vertical rhythm list.
- `#### Colour, surfaces, and boundaries`: **the easiest mistake, stated
  plainly**, then surfaces from spacing before borders, how the brand builds
  separation (hairlines, tints or shadow, from the source), radius, the
  contrast surface pair, the hard reject list of effects.
- `#### Data and evidence`: honest encoding, sources named next to figures,
  matched bases, `bar-list` geometry, direct labels, the table rules with
  a `data-numeric` example.
- `#### Calculators and interaction`: one state model, the tool is focal when
  using it is the job, native labelled controls, the exact `field` HTML.
- `#### Motion and delight`: stillness by default. Where the brand's warmth
  belongs and where it does not.
- `#### Media and icons`: evidence only, no stock. **The icon rule from round
  2.** Check screenshots for private content.

### `### Inspect and revise privately`

Render, check light, dark and 375px, then an eight-point review: first read,
language, composition, typography, evidence, restraint (**ending on the
easiest mistake as a yes or no question**), themes and reflow, trust and
access. Fix, re-render, repeat. Deliver the page, not the review.

## `## Reject generated-design reflexes`

A bullet list of named patterns. Start from these, then add **each of the
user's ten corrections that is a recognisable reflex**:

- All-caps or tracked eyebrows and decorative numbered labels.
- Em dashes.
- Decorative gradients, glows, blobs, glass, ornamental shadows.
- Centred hero plus card grid on a page that is not marketing.
- Repeated metric boxes in place of one composed relationship.
- Pills for ordinary metadata.
- Nested cards, borders repairing weak hierarchy.
- **The easiest mistake.**
- Emoji, icon tiles, a reconstructed logo.
- Arbitrary font sizes, misaligned baselines.
- A narrow table in a wide section.
- Decorative or redundant charts, legends replacing direct labels.
- A percentage with no base.
- Identical section shapes across unrelated questions.
- Summary, rationale and conclusion sections that repeat each other.
- Narration of how the page was made.
- Visible theme controls, stock imagery, fake screenshots.

Close with one line: restraint is precise hierarchy and clear evidence, not
white space and thin rules.

## `## Use the published CSS API`

- `<p>-shell` on `<body>`, `<p>-page` on the content owner.
- Every published class, listed in backticks, grouped as shell and layout,
  type and evidence, controls and calculator.
- What owns what (stat strip owns stats, table wrap owns one table, chart
  figure owns header, viewport and caption).
- One HTML example with the exact child names, and the rule against inventing
  synonyms.
- The visualisation classes, and how fill or stroke combines with a series
  number.
- Every public token, grouped by family, in backticks.
- Never invent, alias or redeclare a `--<p>-*` token.

`scripts/check-names.mjs` checks this section against the CSS both ways. Write
any name the agent must not invent straight after "such as", e.g. "synonyms
such as `<p>-stat-note`", so the check skips it.

## `## Accessibility and responsive behaviour`

Landmarks, one `h1`, ordered headings, skip link, native controls, semantic
tables, captions, visible focus, WCAG 2.2 AA, never colour alone. No hidden
overflow, `min-width: 0`, usable from 375px in both themes.

End the file with one line: the target is <Brand> judgment, not <Brand>
decoration.

## Length

Vercel's file and the first one built from this skill both run to about
5,400 words. Aim lower where a section has nothing brand-specific to say.
