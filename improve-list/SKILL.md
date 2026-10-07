---
name: improve-list
description: Show the current repo's IMPROVEMENTS.md backlog as one numbered list, grouped into Small and Big the way the file itself is, one line per open item, done ones left out. Use whenever the user asks to see the improvements list, what's on this app's backlog, what ideas are queued up, "show me the improvements", "what's on improve-list", or wants a scan of open items before picking one to work on. Do not use this to work through a to-do list, a completely different kind of list, and do not use it to add a new idea, which is improve-idea.
---

# Listing the improvements backlog

Reads `IMPROVEMENTS.md` and renders it as one numbered list under Small and
Big headings — a scan, not the full detail. An entry `improve-idea` has done
the homework on carries its Build block's model and Id on the same line, and
one still holding a question is flagged rather than left looking ready.

The file is the one at the **root of the repo currently being worked in**
(`git rev-parse --show-toplevel`), not a path remembered from another session.
Several repos have one and they are not interchangeable. If there is no such
file, say so and offer `improve-idea`, which starts one; if the working
directory is not inside a repo at all, ask which project they mean.

**Read-only until the user says otherwise.** Running this skill never writes
anything, on its own, no matter what the list shows. Show the numbered list
first, every time, and stop there. Only touch the file afterwards if the user
explicitly asks for a change to something already on the list they just saw —
"mark 3 done", "drop that one", "reword 7" — and even then, edit only the one
entry named, nothing else on the page. A request to add a brand-new idea is
not this skill's job at all; that's `improve-idea`, run separately.

## Steps

1. **Read the file and build the list yourself.** An entry is a top-level
   `- ` bullet that starts with `**` or `~~`, and it runs until the next
   non-blank line in column zero. Under `## Small` then `## Big`, number the
   entries in one running sequence (Big carries on from where Small ends), use
   each entry's bold lead sentence as its one-line summary, leave out struck
   through (`~~`) entries and count them on the last line. Tag an entry
   `[needs you]` and add a `why:` line under it when either of these holds:
   - Its prose asks for a decision before anything can be built: phrases such as
     "needs a decision", "would need a decision on", "the open question",
     "to be decided", "still open:", "agreed with the user before".
   - It reads as finished (a bold "Done", "Built", "Dropped", "Superseded",
     "Decided") but was never struck through.

   `[agent: skip]` inside an entry forces the tag on and `[agent: ok]` forces
   it off. The numbers and the tag are for this conversation only and are never
   written back to the file.

2. **Read each entry's Build block**, straight from the file: the
   `Build:`/`Files:`/`Tests:`/`Open:` lines at the end of the entry. An entry
   without a Build block (nothing has done the homework on it yet) shows
   exactly as step 1 built it.

3. **Decorate each line that has one**, still one line per entry:
   - Append the model and Id: `— Sonnet attach-search`.
   - Append `, open: N` when the Build block's `Open:` line isn't `none` —
     count the questions it's holding. This is a different flag from
     `[needs you]`: a question with a stated default doesn't stop the entry
     being built, so plenty of `open: N` rows will have no `[needs you]` tag
     at all.
   - When the Build block names `With`, append `, with <id>` and move that
     entry's line next to the one it's linked to — keeping each entry's own
     number from step 1, just reordering the printed rows so a With cluster
     reads together rather than scattered down the list.

4. **Show that as the list.** Keep the `why:` lines from step 1 where they
   apply. Don't reword a lead sentence. If a `[needs you]` tag looks wrong, say
   so after the list and suggest the fix in the file: `[agent: ok]` clears it,
   `[agent: skip]` adds it.

5. **If the user asks for one by number**, read that entry back in full — the whole
   paragraph and the Build block if it has one, not just the bold sentence.
   Still no write.

## Updating an entry — only once the user asks, after seeing the list

The list above is the whole of this skill's normal job. If, after seeing it,
the user asks to change one — mark it done, drop it, reword it, move it to the other
section — that's the one and only case this skill edits `IMPROVEMENTS.md`:

- Change only the entry named, by its number from the list you just showed.
  Never touch any other bullet while you're in the file.
- Marking something done follows the file's own convention: wrap the bold
  lead sentence in `~~...~~` and add `**Done, <date>.**` (or the exact wording
  the user gives you) right after it, same as every other resolved entry — don't
  invent a different marker.
- Confirm the specific change in one line once it's made. Don't re-render the
  whole numbered list again unless the user asks to see it fresh.

Anything short of that explicit follow-up — including the user just reacting to
an item in conversation ("oh that one's annoying") — is not a request to edit
the file. When in doubt about whether they actually asked for a change, ask,
rather than writing.

## What this does not do

It doesn't touch any file but the one `IMPROVEMENTS.md`, doesn't re-sort or
renumber anything in the file itself (the numbers shown are for this
conversation only, never written back) — grouping a With cluster reorders the
printed rows, never the number attached to an entry — and never adds a new
idea — that's `improve-idea`. Outside the one explicit follow-up case above, it
makes no edits at all.
