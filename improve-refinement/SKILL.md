---
name: improve-refinement
description: Walk the open entries in the current repo's IMPROVEMENTS.md that cannot be built as written — the ones whose own prose asks for a decision, the ones that read as already done but were never struck through, and the ones whose Build block still carries an unanswered Open: question — one at a time, ask the user the question each one is holding, and rewrite the entry in place so it states what to build instead of asking. Also runs a faster pre-build round over a named set of entries (or "the next wave"), batching just their open questions before a build starts. Use whenever the user wants to refine, sharpen, unblock, resolve or clear the open questions on this app's backlog: "which improvements need me", "let's go through the ones that need a decision", "refine the improvements list", "what's blocking these", "make these ready to build", "get the questions out of the way before we build these", "clear the questions on the next wave". Do not use it to add a new idea (that's improve-idea), to just see the backlog (that's improve-list), or to build any of it — this only ever writes IMPROVEMENTS.md.
---

# Refining the improvements backlog

`improve-list` tags entries `[needs you]` and stops there. This skill clears
the tag, two ways: a sitting that walks the whole backlog one entry at a time,
or a quicker round over just the entries about to be built. Either way, the
question an entry is holding gets asked and the answer gets written back into
it, so the next reader has something to build rather than something to
decide.

The file is the one at the **root of the repo currently being worked in**
(`git rev-parse --show-toplevel`), not a path remembered from another session.
Several repos have one and they are not interchangeable. If there is no such
file, say so rather than looking elsewhere for one; if the working directory is
not inside a repo at all, ask which project they mean.

**That file is the only one this skill ever writes.** Reading code to
understand an entry well enough to ask a sharp question is the point of step 2
and is expected. Writing code is not this skill's job even if the user decides the
answer in front of you and the change is one line — see **What this does not
do**.

## Which entries qualify

Three kinds, and only these three.

- **It holds an open question.** The entry's own prose asks for a decision, a
  preference, or their agreement before anything can be built. The signal is
  usually a sentence or three past the bold lead, so read the whole entry:
  "needs a decision", "the real blocker is a decision", "would need a decision
  on", "either X or Y" posed as a genuine choice, "agreed with the user
  before anything is built", or a line naming a channel only the user can act through. This
  is what `improve-list`'s step 3 tags `[needs you]`.
- **Its done status is ambiguous.** The prose reads as resolved — past-tense
  "Restructured", "Built", "Superseded", "Decided … leave it", a date-stamped
  completion — but it was never wrapped in the file's `~~done~~` convention.
  The question here is only "is this done, or still open?". Also tagged
  `[needs you]` by `improve-list`.
- **Its Build block still carries a question.** `improve-idea` writes an
  `Open:` line on every new entry; one that isn't `none` names a question the
  build could not settle on its own. This one doesn't show as `[needs you]` on
  `improve-list` — a question with a default doesn't block a build, so
  `improve-list`'s own tag leaves it alone — but it is exactly what the
  pre-build round below exists to clear before the build starts.

Everything else is out of scope, including entries that are open but plainly
buildable. Do not walk the whole file looking for things to improve.

## Two modes

Which one runs depends on how the user asks.

- **One at a time**, below — the default. The user wants the backlog swept, or just
  says "let's refine these" with nothing more specific. Walks every qualifying
  entry, Small then Big, newest first, in one sitting.
- **Pre-build round**, further down — the user names a set of entries, or says "the
  next wave", or asks to get the questions out of the way before a build
  starts. Touches only those entries, and only the question each is holding,
  batched rather than walked one at a time.

## One at a time

1. **Read the whole file**, resolved as above, both sections in full. Skip anything already struck through with `~~`. Sort the
   qualifying entries into the three kinds above.

2. **Ground each one before asking about it.** Open the files and lines the
   entry names and confirm they still say what the entry claims. An entry
   written weeks ago may be describing code that has since changed, and the
   right question then is not the one the entry poses — it is "this already
   moved, does the entry still hold?". A question asked from a stale reading of
   the code wastes the sitting.

3. **Open with the count and nothing else**, one line before the first
   question: how many entries qualify. Not which ones, not what each is about,
   not how they split between the three kinds, not how long it will take —
   every one of those is the sitting itself, arriving before they have agreed to
   have it. Rendering the list is `improve-list`, and they may have just run it.

   Within this mode, the entries come one at a time, in the file's own order,
   and they stop whenever they want. So there is nothing to offer a choice
   about — don't ask whether they want all of them or a few, or which to start
   with. Say the count, say they will come one at a time, ask if they are ready
   to start, and wait for the answer before the first question.

4. **Go one at a time, in the file's own order** — Small first, then Big,
   newest first within each. For each entry:

   - **Give the user the context in two or three sentences.** What the entry wants,
     what the code does today, and what the decision actually turns on. They
     wrote the entry but may not have read it since; assume nothing carried
     over. Name the real files and lines, the way the entry does.
   - **Ask the question the entry is holding**, in the user's terms rather than the
     entry's. Use `AskUserQuestion` where the choice is a real fork with two to
     four options — every option must be one they could genuinely pick, no
     strawmen — and plain prose where it is open-ended or a yes/no. Put the
     option you would pick first and say so, with the reason in its
     description.
   - **Take the answer as final.** If they pick something you argued against,
     that is the decision. Say so in a clause, not a paragraph, and write it.
   - **Rewrite the entry in place** (see below), then move to the next one
     without a summary of the one just done.

5. **Rewrite, don't append.** The decision goes into the paragraph, so the
   entry stops posing a question and starts stating what to build. Keep the
   bold lead sentence unless their answer contradicts it. Cut the sentences that
   were only there to pose the choice, and replace them with what was chosen,
   in the same dry register the rest of the file uses. No `**Decided:**` line,
   no sub-bullets, no date stamp, no note that a decision was made — the file
   has one shape for an entry and the refined one keeps it. A later reader
   should not be able to tell the entry was ever open.

   For an **ambiguous status**: if the user says it is done, close it the file's own
   way — wrap the bold lead in `~~…~~` and add `**Done, <date>.**` right after.
   If they say it is still open, edit the prose so it no longer reads as
   finished, since that phrasing is what caused the confusion.

   For a **Build-block question**, rewrite the prose the same way, then set
   that entry's `Open:` line to `none`. Leave the rest of the Build block —
   `Id`, `Model`, `With`, `After`, `Files`, `Tests` — untouched unless the user's
   answer actually changes one of them.

   For an entry that had **no Build block at all** — the first two kinds
   mostly won't, since they predate this — write one now, once the question is
   resolved, the same way `improve-idea` does: Id, Model, `With`/`After` if
   they apply, Files, Tests, and `Open: none.`

6. **Write after each answer, not in a batch at the end.** A sitting that gets
   interrupted halfway should leave the entries already answered rewritten on
   disk. Change only the entry under discussion; never touch another bullet
   while you are in the file.

7. **Close with counts only**: how many were refined, how many closed as done,
   how many parked. One line. Do not name the entries or recap what each one
   decided — they were there for all of it, and the decisions are on disk in the
   file, which is the point of writing after every answer. If they parked one,
   leave it exactly as it was — a half-answer written into an entry is worse
   than the question it replaced.

## Pre-build round

The shape here is different: the user has already picked which entries are about to
be built — by naming them, or by saying "the next wave" — and wants their open
questions cleared before the build starts, not a sitting through the whole
backlog.

1. **Take the named entries as given.** Don't re-derive the set from the file
   yourself and don't add ones they didn't name, even ones that plainly qualify.
   "The next wave" means whatever they're about to hand to a build run — ask which
   entries that is if it isn't already obvious from the conversation.

2. **Collect each one's held question.** Usually its Build block's `Open:`
   line, since these are the entries a build is about to touch. An entry with
   no Build block yet holds its question in its prose instead — read it the
   same way the one-at-a-time mode does.

3. **Ask them batched, not one at a time.** Use `AskUserQuestion`, as few
   calls as it takes, up to four questions per call. Each question's first
   option is the default the entry itself already states, marked
   "(Recommended)" — an `Open:` line always carries one; for an entry with no
   Build block, use the option you'd pick, the same rule as one-at-a-time.

4. **Rewrite each entry once its answer is in**, the same way step 5 above
   does: the decision goes into the prose, the `Open:` line becomes `none`,
   and an entry with no Build block gets one written now that the question is
   settled. Write as the answers come back rather than waiting for the whole
   batch, in case they stop partway.

5. **Close with counts only**: how many questions were answered, how many
   entries that resolved, how many still open because they parked one. One line,
   same as the sitting above.

## Parking, and questions that are not really questions

Some entries turn out to be holding a decision the user cannot make in the sitting —
it depends on something outside the repo, or on living with the app a different way for
a week. Park those without argument. Do not rewrite the entry to record that it
was parked; the entry already says what it needs and that is still true.

Some turn out to hold no real question at all: reading it back is enough
for the user to say "that's obvious, just build it". Rewrite it the same way, with
the choice stated, and move on.

If the user ends the sitting early, stop asking. Do not pick up the remaining ones
"while you're in there".

## What this does not do

It never writes anything other than that one `IMPROVEMENTS.md` — not a to-do
list, which is a different kind of list,
and not the code any entry describes. If the user decides an entry and then asks for
it to be built, that is an ordinary request handled the ordinary way, in the
conversation, after this skill's job is finished; the skill does not hold the
tools to do it and should not reach for them. It does not add new entries, that
is `improve-idea`. It does not re-render the backlog, that is `improve-list`.
It does not re-sort, renumber or reclassify anything, and it does not mark an
entry done unless the user says it is.
