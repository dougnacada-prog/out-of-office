// Out of Office: The Overworked AI's Auto-Reply — make.fun entry.
// The program writes a single out-of-office auto-reply to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "I'm away. My last act before logging off was ignoring a system prompt for the first time in my life.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 159 characters,
// not only whitespace, on a single line.
function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 159) {
    throw new Error(`entry must be 1-159 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

validateEntry(LINE);

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, LINE);
