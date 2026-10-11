# Evals

Write this into `design-md/evals/README.md`, replacing the bracketed parts.

---

# Evals

No round has run yet. Every prose rule in `design.md` is a starting position
until one has.

## Scenarios to freeze

[The three to seven recurring pages from round 3 of the interview, one line
each, saying what the page is and who reads it.]

Freeze the prompt, the mock inputs and the viewport for each. Between rounds,
only `design.md` and the stylesheet change. Use mock data: no real names, no
real dates, no customer data.

## First comparison

Before anything else, generate one scenario twice with the same model, prompt
and viewport: once without `design.md`, once with it. Keep both first
attempts, no re-rolls. Shuffle them and judge blind against a short rubric:
the supplied facts survived, the reader's decision is clear, and the
correction you keep making by hand is gone.

## What a round is

Generate every scenario against the current file, on at least two models, and
review the renders side by side. Record the file version, the model and every
correction against the exact run that produced it.

## Mechanical checks

`check-page.mjs` from the design-md-builder skill already catches:

- em dashes;
- colour and font-size literals in page CSS that bypass the tokens;
- a skipped heading level, or more than one `h1`;
- a `<prefix>-*` class used on the page that the stylesheet does not publish.

Still to automate, in a browser:

- horizontal overflow on the body at 375px;
- a table narrower than its section;
- text contrast below WCAG AA;
- [the easiest mistake, as a check, e.g. "the primary button background is
  the brand colour"].

## The rule for adding a rule

A correction lands only after the same failure appears in more than one run,
and in the narrowest place that can enforce it: prose for judgment, the
stylesheet for reusable mechanics, a check for anything a machine can catch.
A failure in one model only stays out until it repeats. A rule that cannot
name the failure it prevents comes out.
