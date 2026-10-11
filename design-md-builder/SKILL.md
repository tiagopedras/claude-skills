---
name: design-md-builder
description: Build an agent-facing design.md for any brand or design system, the two-layer kind Vercel published at vercel.com/design.md. Interviews the user for where their design system lives (a code repo with tokens, a Figma library, a brand deck, a live site), reads those sources, then produces a bounded stylesheet of prefixed tokens and classes that every value traces back to, a design.md on Vercel's section order that names those classes and teaches the judgment CSS cannot hold, a smoke-test page, name and page checks, and an eval plan. Use whenever someone wants agents or AI tools to build pages that look like their brand, asks for "a design.md like Vercel's", "brand guidelines for agents", "a design system file Claude can load", "make AI-built pages look like us", or wants to package their tokens for pages made outside their main codebase. Also use to refresh an existing agent-facing design.md against newer sources. Do not use for a person-facing design analysis or DESIGN-<name>.md write-up of a product's visual system, which is ds-design-md, or for building components inside the real codebase.
---

# design.md builder

Build the three-part system that makes an agent produce pages that look like a
given brand when it works outside that brand's codebase:

1. **A stylesheet** of prefixed tokens and classes. The load-bearing part.
2. **design.md**, which names those classes and teaches the judgment CSS
   cannot carry.
3. **An eval loop**, which is the only way a prose rule earns its place.

Read `reference/recipe.md` before starting. It holds the evidence for why the
stylesheet comes first and the prose stays short, and every decision below
follows from it.

## The rule that governs everything

Every value in the stylesheet traces to a source the user pointed at. Never
fill a gap from what a design system "usually" has, and never from memory of
the brand's public site. If a source does not hold a value, ask, or leave the
primitive out and say so in the README.

## Step 1. Interview for sources

Run round 1 of `reference/interview.md`. Ask with multiple choice wherever the
answer is one of a few options. It establishes the brand name, the class
prefix, where every source lives, which kinds of page the file must cover, and
where the output goes.

Stop if there is no source of tokens at all. A design.md written from
screenshots alone is the failure this whole format exists to prevent. Say so,
and offer the person-facing analysis route instead.

## Step 2. Read the sources

Read each source the user named, in this order of authority: generated token
files in code, then theme files, then component source, then Figma variables
and styles, then brand decks. When two disagree, code wins and the
disagreement goes in the README.

Pull:

- Colour: every semantic role (surface, text, border, brand, action, focus,
  status, link, chart series), in every theme the system ships.
- Type: families, the size scale, weights, line heights, letter spacing.
- Space, radius, shadow, breakpoints, containers.
- Components: which exist, their variants and sizes. Read button, text,
  field, table and tag at minimum.
- Usage counts, if any scan or inventory exists. These decide which
  primitives get the most care and which spacing steps carry the rhythm.

**Check whether the design system already publishes linkable CSS.** If its
tokens and component classes ship as public CSS files that work on plain HTML
(served from a CDN or a package at a tag), link those instead of copying
values. The stylesheet you build then shrinks to a page layer that adds only
what the system lacks (shell, layout, sections, tables) and reads only the
system's own tokens. It cannot drift. Ask the user in round 2 which route they
want; the copied route exists for systems an agent cannot reach.

Two traps from building the first one of these:

- A codebase that styles through utility classes (Tailwind and the like)
  reports zero usage for its CSS variables. That zero means "used through
  utilities", not "unused".
- A licensed brand font is usually unavailable off the brand's own
  properties. Find out before the CSS depends on it.

## Step 3. Confirm what you found

Run round 2 of `reference/interview.md`. It is grounded in what step 2 found,
so it asks about real conflicts and gaps, never generic preferences. It
covers the brand colour against the action colour, the font and logo
licensing, icons, themes, privacy, and the corrections the user keeps making
by hand.

Then show the user, before writing any CSS:

- the prefix and the full list of primitive class names, grouped as in
  `reference/stylesheet-spec.md`;
- the single easiest mistake for a model to make with this brand, as you
  understand it.

Wait for an OK. Class names become the public API the moment design.md names
them, so renaming later costs a pass over both files.

## Step 4. Build the stylesheet

Follow `reference/stylesheet-spec.md`. Write `design-md/assets/<prefix>-brand.css`.

Encode the easiest mistake in the CSS default, so a page that ignores the
prose still gets it right. If the action colour is not the brand colour, the
default button uses the action colour.

## Step 5. Build the smoke test and render it

Write `design-md/examples/smoke-test.html` with invented data that uses every published
primitive once, in a plausible page rather than a specimen sheet. Render it in
light and dark, at 1440px and 375px, and look at the screenshots. Rendering
catches bugs that reading never does; see the list in
`reference/stylesheet-spec.md`.

Headless Chrome on macOS will not lay out below 500px, so a 375px screenshot
taken directly is a 500px page cropped. Load the page inside a 375px-wide
`<iframe>` in a wider window instead.

If nothing can render, say so plainly in the README under "not checked".

## Step 6. Write DESIGN.md

Follow `reference/section-spine.md`: Vercel's section order, the same
imperative register, the brand's own content. Fetch
`https://vercel.com/design.md` once to see the register if it is reachable,
and never copy its brand-specific lines across.

State the easiest mistake in four places: the colour section, the reflex
list, the private review, and the CSS default from step 4.

## Step 7. Run the checks

```sh
node scripts/check-names.mjs DESIGN.md design-md/assets/<prefix>-brand.css <prefix>
node scripts/check-page.mjs design-md/examples/smoke-test.html design-md/assets/<prefix>-brand.css <prefix>
```

`check-names` must come back clean both ways: nothing documented that does not
exist, nothing published that is not documented. `check-page` must find no
failures on the smoke test. Fix and re-run until both pass.

## Step 8. Write the README and the eval plan

Write `design-md/README.md` with:

- what problem the file solves for this brand;
- where every value came from, source by source, with dates;
- what was checked and what was not, stating that the prose is untested;
- known gaps (themes not covered, no icons, font fallbacks).

Write `design-md/evals/README.md` from `reference/evals-template.md`, with the user's own
recurring artifacts from round 3 of the interview as the frozen scenarios.

## Step 9. Hand over

Report in a few lines: where the files are, what the user should look at
first (the smoke-test renders), which values were missing from the sources,
and that the next step is one real page generated with no other steering. Do
not recap the interview.

## Output layout

```
<project>/
  DESIGN.md
  design-md/
    assets/<prefix>-brand.css
    examples/smoke-test.html
    evals/README.md
    README.md
```

This is the default; the user confirms or changes it in round 1. DESIGN.md
links the stylesheet as `design-md/assets/<prefix>-brand.css`.
