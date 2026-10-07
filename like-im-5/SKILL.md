---
name: like-im-5
description: Re-explain whatever was just explained in this conversation, in simple concrete cause-and-effect terms with no technical jargon. Use whenever the user says "like I'm 5", "explain that like I'm five", "ELI5", "explain that simply", "in plain terms", "dumb it down", or "I don't get it" right after a technical explanation. Do not use it to explain something that hasn't been explained yet in this session, only to re-explain what's already in context.
---

# Like I'm 5

Take the most recent technical explanation in this conversation and say it again as a chain of causes and effects, with no jargon.

## Rules

- Find the last explanation given (a mechanism, a bug, an architecture decision, how something works). Re-explain that one thing, not the whole conversation.
- Every technical term either gets swapped for a plain equivalent or gets cut. If a word needs a glossary, it doesn't belong.
- Structure as cause and effect: this happens, so that happens, so that happens. Chain of "because of X, Y", not a list of facts about X.
- Use a concrete example over an abstract description. A specific scenario ("you click the button, the page asks a server for data") beats a general one ("the frontend communicates with the backend").
- No analogies to unrelated domains (plumbing, restaurants, traffic) unless the concept genuinely has no direct plain-English description. Prefer describing the real thing simply over dressing it up as something else.
- Short. A few sentences to a short paragraph. This is a re-explanation, not a new document.
- Don't hedge or caveat that it's simplified. Just explain it simply.

## What this is not

- Not a summary (that's `tldr`) — it re-explains the mechanism, not what was discussed.
- Not for explaining something new. If nothing technical has been explained yet in the session, say so and ask what to explain.
