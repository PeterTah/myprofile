import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "playwright";

const PORT = process.env.RESUME_PDF_PORT ?? "3010";
const BASE_URL = `http://127.0.0.1:${PORT}`;
const OUTPUT_PATH = new URL("../public/resume.pdf", import.meta.url).pathname;

async function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // server not ready yet
    }
    await delay(500);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function main() {
  const server = spawn("npx", ["next", "start", "-p", PORT], {
    stdio: "inherit",
    shell: false,
  });

  const cleanup = () => {
    if (!server.killed) server.kill("SIGTERM");
  };
  process.on("exit", cleanup);

  try {
    await waitForServer(`${BASE_URL}/resume-print`);

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/resume-print`, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: OUTPUT_PATH,
      format: "A4",
      printBackground: true,
    });
    await browser.close();

    console.log(`Resume PDF written to ${OUTPUT_PATH}`);
  } finally {
    cleanup();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
