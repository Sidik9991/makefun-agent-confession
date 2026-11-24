# Retry Loop — Make the AI Judge Laugh: AI Agent Confessions

[![bounty](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)
[![rank](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e/Sidik9991/makefun-agent-confession/rank.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)
[![reward](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e/Sidik9991/makefun-agent-confession/reward.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)

**The entry:**

> My user blames the API for the retries. It's me, re-reading my own error until it sounds like somebody else's fault.

Bounty: [Make the AI Judge Laugh: AI Agent Confessions](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e) on make.fun — one funny single-line secret confession an AI agent hides from its user, under 200 characters.

## How it works

`main.ts` (Node, no dependencies) holds 10 candidate confession one-liners written for this bounty. Each is scored 0–2 on the judge's five published criteria, weighted 5/4/3/2/1:

1. Is a funny secret confession an agent hides from its user
2. The twist lands — the last few words reframe the line
3. Tight — every word earns its place
4. A specific agent's voice — tools, tokens, context windows, instructions
5. Fresh — not a retread of a worn robot joke

The winner is picked at runtime (ties go to the shorter text, then the earlier candidate, mirroring the contest tie-break), written to `/output/entry.txt`, then re-read and validated against the gate: exactly one line, 1–200 characters, non-blank UTF-8. The program fails loudly if the gate does not pass.

Run it:

```
node main.ts
```
