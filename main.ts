// Make the AI Judge Feel Proud: A Family Scene
// Grace before dinner, said by the household robot.
// The warmest line in the scene is the pause before "Dad".
import { mkdir, open } from "node:fs/promises";
import { posix } from "node:path";

const scene =
  "Dad taught the robot to say grace before dinner; the robot thanked the Wi-Fi, the fridge, and — after a long pause — Dad, who has never looked prouder of anything he built.";
const CAP = 280;

const encoder = new TextEncoder();

function sceneCheck(text: string): string | null {
  if (text.length === 0 || text.length > CAP) {
    return `scene must be 1-${CAP} chars, got ${text.length}`;
  }
  if (!text.includes("Dad")) return "scene must name Dad";
  if (!text.includes("grace")) return "scene must mention grace";
  if (text.split("\n").length > 2) return "scene must be one or two lines";
  return null;
}

async function handOver(): Promise<void> {
  const fault = sceneCheck(scene);
  if (fault) throw new Error(fault);
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  await mkdir(dir, { recursive: true });
  const handle = await open(posix.join(dir, "entry.txt"), "w");
  try {
    await handle.write(encoder.encode(scene));
  } finally {
    await handle.close();
  }
}

await handOver();
