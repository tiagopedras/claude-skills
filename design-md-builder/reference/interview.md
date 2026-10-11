# The interview

Three rounds. Ask in grouped sets, with multiple choice wherever the answer is
one of a few options, and never ask what a source on disk already answers.

## Round 1. Before reading anything

1. **What is the brand called, as it should appear on a page?**
2. **Which class prefix should the stylesheet use?** Offer two or three short
   options made from the brand name, three letters or fewer, plus their own.
   It must not collide with a prefix already in their codebase.
3. **Where do the tokens live?** Multiple select:
   - a code repo with generated token files (Style Dictionary, Tokens Studio
     output, CSS variables, a Tailwind config);
   - a Figma library with variables and text styles;
   - a brand guidelines deck or PDF;
   - a live site only.
   Then ask for each path, URL or file key. A live site alone is not enough;
   see step 1 of SKILL.md.
4. **Is there a usage scan or component inventory?** Any count of how often
   each component, token or spacing step is used in real code.
5. **What will agents build with this file?** Pages made outside the main
   codebase fall into three kinds, and each needs a different look, so the
   file names the ones it covers and says how each should feel. Ask it in
   these words, multiple select:
   - **Documents.** Reports, proposals, briefs, readouts, calculators. Read
     once, often by someone deciding something. Calm and evidence-led.
   - **App screens.** Dashboards, settings, tools someone works in every day.
     Dense and task-led.
   - **Marketing pages.** Landing pages, campaign pages, a personal or product
     site. Persuasive, and a big opening hero is allowed.
   Default to documents only if the user is unsure; it is the kind the
   original format was built and tested for.
6. **Where should the output go?** Default: `DESIGN.md` at the root of the
   project, with its supporting files (stylesheet, smoke test, evals,
   provenance README) in `design-md/` beside it. Show the default and let the
   user confirm or change it.

## Round 2. After reading the sources

Ground every question in what was found. Quote the conflict or the gap.

1. **Brand colour against action colour.** "Your brand colour is X, but your
   primary button uses Y. Is Y the action colour everywhere?" If they are the
   same colour, ask what the easiest mistake is instead.
2. **Fonts.** "Your type is set in X. Can a page outside your own domains load
   it, and from where?" If not: which fallback, and is the brand font limited
   to the wordmark?
3. **Logo.** "Can a page made outside your properties show the logo file?" If
   not, the wordmark becomes text in the brand font.
4. **Icons.** "Is your icon set published for use outside the codebase?" If
   not, the file tells agents to use text labels and never substitute emoji or
   a downloaded kit.
5. **Themes.** List the theme modes found. "Which of these must the stylesheet
   ship?" Default to the main light and dark pair.
6. **Conflicts.** For each place two sources disagree, show both values and
   ask which is current.
7. **Gaps.** For each role the sources do not cover (a chart palette, a
   warning surface, a focus colour), ask where it lives or whether to leave
   that primitive out.

## Round 3. What the file must fix

1. **What do pages made outside the codebase look like today, and what is
   wrong with them?** Ask for two or three examples if they exist.
2. **What are the last ten corrections you made by hand to a generated or
   off-system page?** Rewrite each one as something observable before using
   it. "Make the table feel less cramped" becomes "tables span the full width
   of their section."
3. **Which three to seven pages does your team make again and again outside
   the codebase?** These become the frozen eval scenarios.
4. **What must never appear on a page that leaves your machine?** Real names,
   internal dates, customer data, raw token dumps, screenshots of internal
   tools. This becomes the privacy line in "Frame the reader's job".
5. **Is there any vocabulary specific to your team that a reader outside it
   will not know?** These get "expand at first use" in the language rules.

Round 3 can run alongside round 2 when the sources were quick to read.
