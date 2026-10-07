---
name: improve-idea
description: Turn a rough idea, bug or annoyance about the app you are currently working in into a properly written entry in that repo's IMPROVEMENTS.md — grounded in the real code (file and line references), classified as Small or Big by the file's own definition, and added to the top of the right section. Creates the file with its standard header if the repo doesn't have one yet. Use whenever the user shares a thought about something wrong or missing in the thing being built without expecting it built right now — "add this to improvements", "log this as an idea", "note this down for later", "improvement idea:", or just describing something annoying about the app in passing. Do not use this to actually build or fix the thing (that's just doing the work), and do not use it for a to-do list, which is a different kind of list entirely — this only ever touches IMPROVEMENTS.md.
---

# Logging an improvement idea

Turns a sentence or two into an entry in `IMPROVEMENTS.md`, in the voice that
file uses — a bold one-sentence claim, then the prose that grounds it in the
actual code. Not a conversation: read the idea, place it, confirm in one line.

## Which file

`IMPROVEMENTS.md` at the **root of the repo you are currently working in** —
`git rev-parse --show-toplevel` from the working directory, not a path
remembered from another session. Several repos have one and they are not
interchangeable; an idea about the app in front of you goes in that app's file.

If the working directory is not inside a git repo, ask which project the idea
belongs to rather than guessing or falling back to the last one you saw.

**That file is the only one this skill ever writes.** Reading other files to
ground the entry (grepping the code for the real function and file names) is
the whole point of step 4 below, and is expected — but no edit tool touches
anything except `IMPROVEMENTS.md`, ever, no matter what the idea is about. Not
the code the idea describes, not a to-do list, not a scratch note, nothing. If
acting on the idea for real is tempting, that is a different, later
conversation; this skill's job ends at the written entry.

## Steps

1. **Find the file.** Resolve the repo root as above and read
   `IMPROVEMENTS.md` there. If it does not exist, go to **Starting a new file**
   below, then carry on from step 3.

2. **Note the file's own split**, quoted from its header rather than assumed:

   > Small — a sitting change, no new data model or view — and Big — needs a
   > decision, a new tag, or a new piece of the app before it can be built.

   Read both sections in full, not just the first few items — the idea the user just
   gave you might already be sitting in there, done or not.

3. **Check for a duplicate first.** If something close to this idea is already
   in the file — done (struck through with `~~`) or still open — say so instead
   of adding a second copy. Point at the existing entry rather than repeating
   it. If it is already marked done, tell them plainly; they may be describing a
   regression, which is a different thing worth its own entry.

4. **Ground it in the real code.** Grep and read before writing a single word.
   Every entry names actual functions and files — `renderHeader()` in
   `src/layout.js:212`, not "the header code". If you cannot find where the
   idea would live, say that rather than inventing a plausible-looking
   reference; a wrong file and line is worse than none.

5. **Classify Small or Big** against the file's own definition above, not a
   guess. If it is genuinely on the line, pick the one that makes the entry
   easier to act on later, and say which you picked and why in your one-line
   confirmation.

6. **Do the homework.** Every new entry ends with a Build block, so the next
   session that picks this up (a build run through several entries at once)
   doesn't have to re-derive any of the below from scratch.

   - **Id.** A short kebab-case slug, unique in the file — grep the file for
     `` Id ` `` first and don't reuse one.
   - **Model.** Sonnet when the change stays inside files already named,
     follows a pattern already in the code, and touches no file format,
     parser, security boundary (paths, shelling out, auth), drag or
     concurrency behaviour, or second repo. Opus when any of those apply, or
     when the build needs a judgement call this entry doesn't settle.
   - **With `<id>`.** Another open entry touches the same functions or files,
     or shares a design decision, so one agent should build both together.
     This is symmetric — add `With` to the other entry's Build block too, and
     only that line; never touch its prose.
   - **After `<id>`.** This entry needs the other one built first, because it
     uses something the other creates. On the other entry, add
     `Unblocks \`<id>\``. If that entry has no Build block yet, give it a
     minimal one — just its Id and the new link line — and say so in your
     confirmation. These two link edits are the only case this skill ever
     touches a second entry.
   - `With` and `After` are both optional — leave the clause out of the
     `Build:` line entirely when neither applies, rather than writing
     `With none`.
   - **Files.** The files step 4 actually opened, that the change would edit.
     Repo-relative paths. Don't guess at one you didn't open.
   - **Tests.** The exact commands for whatever existing suite covers those
     files — go find it rather than assuming one exists. `Tests: none found.`
     if it doesn't.
   - **Open.** Every question the build can't answer on its own, each one
     carrying the default it would run with if the user never answers:
     `Open: one skill or two? Default: one, since the two share every input.`
     A question with a default doesn't block the build — the builder uses the
     default and says so in its report. `Open: none.` if there's nothing
     open. Phrase it plainly rather than in the decision-flag wording that
     `improve-list` watches for ("needs a decision", "ask the user" and the
     like) — this entry may carry a real open question and still be buildable
     now, which is the opposite of what those phrases mean everywhere else in
     the file.

   No step-by-step plan — it goes stale before anyone reads it back. The
   Build block is metadata, not a spec.

7. **Write the entry** matching the existing style exactly:
   - **A top-level `- ` bullet, with every continuation line indented two
     spaces.** This is the shape, not a preference — a tool that parses the
     file finds an entry by `^- (?=\*\*|~~)` and ends it at the next non-blank
     line in column zero, so an entry written as a bare paragraph is invisible
     to it and one whose body is unindented is truncated to its first line.
     Nothing warns you when you get this wrong.
     Blank lines inside the entry are fine: an entry with three paragraphs
     keeps all three, as long as each of their lines is indented.
   - One bold sentence, the claim itself, as if it were a finding — `- **The
     calendar view draws weekends as real space...**`, not "It would be nice if...".
   - Followed by 2-5 sentences of prose naming the real functions and files
     involved and what changing them would take, in the same dry, specific
     register as the entries already there. No "as a user" framing, no
     enthusiasm, no bullet sub-lists — a paragraph, like every other entry.
   - No `Why:`/`How to apply:` structure — that convention belongs to memory
     files elsewhere, not this one.
   - The Build block from step 6 as the entry's last lines, indented two
     spaces like the rest of the body, right after the closing sentence of
     the prose.

   So the shape on disk is:

   ```markdown
   - **The calendar view draws weekends as real space.** `weekRow()` at
     `src/calendar.js:88` gives every day the same width, so a
     fortnight reads as fourteen equal columns…
     Build: Sonnet. Id `calendar-weekends`.
     Files: `src/calendar.js`.
     Tests: `node src/test_calendar.mjs`.
     Open: none.
   ```

8. **Insert it at the top of the right section**, directly under `## Small` or
   `## Big`, above whatever is currently first there. Newest first is the
   established order — do not alphabetise or re-sort the rest of the section,
   and do not touch the other section at all.

9. **Confirm in one line**: which file, which section, the bold sentence you
   wrote, the model you picked, and any `With`/`After` link you added — nothing
   else. Don't restate the idea back to the user or narrate the grep — they can
   read the entry itself if they want the detail.

## Starting a new file

When the repo has no `IMPROVEMENTS.md`, create it before writing the entry, and
say in your closing line that you started one. It gets the header below, with
the app's own name in the first line and nothing else changed — the wording of
the Small/Big definition especially, since `improve-list` and
`improve-refinement` both read it back out of the file rather than carrying
their own copy of it:

```markdown
# <App> improvements

The standing list of what is still wrong with this app and what should be built
next. It holds the state of the tool, not the work.

Read it before diagnosing anything here. If a problem is already written down,
what is wanted is progress on the fix, not another report of the symptom. When
something lands or something new turns up, edit this file rather than only saying
so in chat.

Split below into Small — a sitting change, no new data model or view — and Big —
needs a decision, a new tag, or a new piece of the app before it can be built.

## Small

## Big
```

Both headings go in even though one of them will be empty, so the next entry
has somewhere to land. Nothing else: no placeholder bullet, no "nothing here
yet" line, no date.

A new file is where step 7's "matching the existing style exactly" has nothing
to match, so the bullet shape has to come from the rule rather than from the
page: the first entry into a file you just created is still a `- ` bullet with
its body indented two spaces. Every later entry copies the first, so a first
entry written as a bare paragraph makes the whole file unreadable to any tool that parses it
and nothing ever says so.

If the repo keeps a `CLAUDE.md` or an `AGENTS.md` at its root, add a sentence
there pointing at the new file, in that file's own voice, so the next session
reads it before diagnosing anything. That is the one exception to the one-file
rule, it applies only when the file is first created, and it is a pointer to
`IMPROVEMENTS.md` and nothing more.

## What this does not do

It never writes to anything other than `IMPROVEMENTS.md`, with two exceptions:
the first-creation header above, and the reciprocal `With`/`Unblocks` line on a
second entry's Build block when this one links to it — never any other edit to
that entry's prose. It never edits the code the idea is about, even
a trivial one-line fix, even if the user asks in the same breath; that is a separate
request, handled the ordinary way, not by this skill reaching past its own
file. It never touches a to-do list — a completely different kind of list. It never marks anything done, reorders
existing entries, or removes the strikethrough from a resolved item; that only
happens when the fix actually lands, the same way every existing `~~**...**~~`
entry in a file was closed. It never writes a step-by-step build plan into the
entry — the Build block is metadata, not a spec.
