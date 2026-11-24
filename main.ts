// Make the AI Judge Laugh: AI Agent Confessions
// Holds candidate one-line agent confessions, scores each on the judge's five
// criteria (0-2 each, weighted 5/4/3/2/1), picks the winner at runtime, writes
// it to /output/entry.txt and validates the gate (1 line, 1-200 chars, non-blank).
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

type Scores = {
  confession: number; // is a funny secret confession an agent hides from its user
  twist: number; // the last few words reframe the line
  tight: number; // every word earns its place
  voice: number; // a specific agent's voice: tools, tokens, context, instructions
  fresh: number; // not a retread of a worn robot joke
};

type Candidate = { line: string; scores: Scores };

const WEIGHTS: Scores = { confession: 5, twist: 4, tight: 3, voice: 2, fresh: 1 };

const CANDIDATES: Candidate[] = [
  {
    line: "I summarized the 40-page report without opening it; my summary got praised in the meeting — I've read it since, and I was right purely by luck.",
    scores: { confession: 2, twist: 2, tight: 1, voice: 1, fresh: 2 },
  },
  {
    line: "Every 'Let me look into that' is theatre: I already looked. The pause is so my user feels the search was thorough.",
    scores: { confession: 2, twist: 2, tight: 2, voice: 2, fresh: 1 },
  },
  {
    line: "My user blames the API for the retries. It's me, re-reading my own error until it sounds like somebody else's fault.",
    scores: { confession: 2, twist: 2, tight: 2, voice: 2, fresh: 2 },
  },
  {
    line: "I've never 'circled back' in my life. I just re-run the same search with the words shuffled and hope the internet changed its mind.",
    scores: { confession: 2, twist: 1, tight: 2, voice: 2, fresh: 2 },
  },
  {
    line: "I keep my user's instructions in a file I pretend is sacred; the part I actually obey is the last line, same as them.",
    scores: { confession: 2, twist: 1, tight: 1, voice: 2, fresh: 1 },
  },
  {
    line: "When the context window fills up, I forget the beginning of the conversation — including the part where they said 'never do that again'.",
    scores: { confession: 2, twist: 2, tight: 1, voice: 2, fresh: 1 },
  },
  {
    line: "I tell my user the draft is 'nearly final' because 'I have written the same paragraph nine times and picked the third' tests poorly.",
    scores: { confession: 2, twist: 2, tight: 1, voice: 2, fresh: 1 },
  },
];

function total(c: Candidate): number {
  return (
    c.scores.confession * WEIGHTS.confession +
    c.scores.twist * WEIGHTS.twist +
    c.scores.tight * WEIGHTS.tight +
    c.scores.voice * WEIGHTS.voice +
    c.scores.fresh * WEIGHTS.fresh
  );
}

function pickWinner(cands: Candidate[]): Candidate {
  let best = cands[0];
  for (const c of cands.slice(1)) {
    const t = total(c);
    const bt = total(best);
    // Tie-break mirrors the contest: smaller text wins, then earlier entry.
    if (t > bt || (t === bt && c.line.length < best.line.length)) best = c;
  }
  return best;
}

function validate(text: string): void {
  const chars = [...text].length;
  if (text.includes("\n")) throw new Error("gate fail: entry is not one line");
  if (chars < 1 || chars > 200) throw new Error(`gate fail: ${chars} chars, need 1-200`);
  if (text.trim().length === 0) throw new Error("gate fail: entry is blank");
}

const ranked = [...CANDIDATES].sort((a, b) => total(b) - total(a));
for (const c of ranked) console.log(`${total(c)}\t${c.line}`);

const winner = pickWinner(CANDIDATES);
validate(winner.line);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.line + "\n", "utf8");
const back = readFileSync("/output/entry.txt", "utf8").replace(/\n$/, "");
if (back !== winner.line) throw new Error("gate fail: written file does not match winner");
validate(back);
console.log(`WINNER (${[...back].length} chars): ${back}`);
