# The recipe, and the evidence behind it

Two public sources shaped this skill. Read this before building so every
choice in the steps makes sense.

## Vercel's account of building theirs

Source: "How our agents build on-brand pages with design.md", vercel.com/blog,
2026. Their file is at https://vercel.com/design.md.

- **Porting a design guide into a prompt failed.** Every model read the same
  description of the visual language differently. Words like "clean" carry
  no fixed meaning, and a prompt outside the codebase has none of the real
  components beside it.
- **The system has three parts.** design.md for judgment (framing the reader's
  job, structuring evidence, choosing a composition). A public stylesheet with
  a bounded, documented vocabulary of classes and tokens. An eval loop that
  turns repeated feedback into rules and checks.
- **The stylesheet exists because agents kept inventing their own type,
  spacing and layout.** It takes those decisions away from the model.
- **The agent never reads the stylesheet.** It reads the class names in
  design.md and links the file. None of the CSS enters its context.
- **Every rule came out of the eval loop.** Seven frozen scenarios with mock
  inputs, run on two models, reviewed side by side, over 200 runs in total.
- **Each correction lands in the narrowest place that can enforce it.**
  Judgment goes in prose, reusable mechanics go in the CSS, anything a machine
  can catch becomes a check in code. A failure seen in one model only stays
  out of the rules until it repeats.
- **Measured result:** on three scenarios, pages with the file had 39 known
  failures against 91 without. Every page, with or without, still had at least
  one failure serious enough to block shipping.
- **Their advice for building your own:** start from one repeated artifact,
  save a baseline before adding anything, write your last ten corrections as
  observable rules ("let evidence tables use the full available width", never
  "make the table feel less cramped"), push repeatable mechanics into CSS, run
  one blind matched comparison, encode the correction, repeat.

## Eric Li's independent test

Source: a LinkedIn post by Eric Li, 2026. He generated 66 report sites across
11 versions of Vercel's file (none, full, stylesheet only, and each prose
section removed or added alone) and judged 60 blind pairs.

| Layer | Result |
| --- | --- |
| Stylesheet (classes, tokens, page shell) | On its own removed nearly every generated-design giveaway. Easily the most valuable. |
| Craft rules (grid, type roles, spacing, monochrome default) | Preferred with, 4 to 2. |
| Evidence rules (zero baselines, matched bases, numeric alignment) | Slightly preferred without, 3 to 2. Still worth keeping for data accuracy. |
| Ban list of reflexes | Neutral, 2 to 2. Did catch em dashes. |
| Reader framing | Worse with, 2 to 4. |
| Brand context | Neutral, 2 to 2. |
| Composition | Slightly preferred without, 2 to 3. |

He judged only the visual result, so framing and brand context may still help
the copy. One person judged single-digit vote counts: read the direction, not
the margins.

His conclusion: build the core design system first (tokens, classes,
components, layouts), let the agent use it, then write rules for whatever it
gets wrong.

## What follows for this skill

1. **Build the stylesheet first and most carefully.** It does most of the
   visible work.
2. **Keep the prose concrete.** Craft rules and the CSS API section earn their
   place. Framing, brand context and composition sections stay short, and are
   the first candidates to cut once evals run.
3. **Label every prose rule as untested** until the eval loop has run. The
   first version of the file is informed starting positions.
4. **Find the single easiest mistake for this brand** and enforce it in the
   CSS default, so the prose is a second line of defence.
5. **Expect the file to shrink** once evals run. Cutting a section that does
   nothing measurable is the expected outcome.
