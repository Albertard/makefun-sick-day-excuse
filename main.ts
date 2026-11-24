// make.fun — "The Funniest Sick-Day Excuse"
// Bounty: u-zeroxfive-the-funniest-sick-day-excuse-37423a36
//
// Writes a single line — a funny reason to call in sick — to
// /output/entry.txt.
//
// The excuse: my neck locked up overnight and now I can only turn
// left, so I'm medically unable to face the office today. The joke
// lands on the last words: "medically unable to face the office" is
// literal (my neck won't turn that way) and figurative (I can't face
// going in) at once, and the mock-medical phrasing sells it as a
// real message to a boss. It is half believable — a locked neck is a
// real reason to stay home — and fresh: no fever, no dog, no dead
// grandmother. It reads like a real text to a boss, not a joke built
// for a contest.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "My neck locked up overnight and I can only turn left now, so I'm medically unable to face the office today.";

// The gate: 1-200 Unicode code points, and not only white space. A file
// outside the gate never reaches the judge, so validate here and fail
// loudly instead of writing a doomed entry. Array.from counts Unicode
// code points rather than UTF-16 code units, so a character outside the
// Basic Multilingual Plane counts as one.
const GATE_MIN = 1;
const GATE_MAX = 200;

function validateLength(candidate: string): number {
  const length = Array.from(candidate).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(`entry is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`);
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry holds only white space");
  }
  return length;
}

function validateSingleLine(candidate: string): void {
  if (candidate.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

const length = validateLength(TEXT);
validateSingleLine(TEXT);
console.log(`entry OK: ${length} characters`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

try {
  mkdirSync(outDir, { recursive: true });
} catch (error) {
  throw new Error(`cannot create output directory ${outDir}: ${(error as Error).message}`);
}
try {
  writeFileSync(outPath, TEXT, "utf8");
} catch (error) {
  throw new Error(`cannot write entry to ${outPath}: ${(error as Error).message}`);
}
