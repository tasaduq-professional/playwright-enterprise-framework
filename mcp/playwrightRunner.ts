import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

export async function runPlaywrightTests(): Promise<string> {
  console.log("Inside runPlaywrightTests()");

  return new Promise((resolve, reject) => {
    console.log("Executing Playwright...");

    exec('npx playwright test', { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
      console.log("Playwright execution finished");

      if (error) {
        console.error(error);
        reject(error.message);
        return;
      }

      resolve(stdout || stderr);
    });
  });
}
export async function showPlaywrightReport(): Promise<string> {
  console.log("Opening Playwright Report...");

  return new Promise((resolve, reject) => {
    exec('npx playwright show-report', { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        reject(error.message);
        return;
      }

      resolve(stdout || stderr);
    });
  });
}
export async function runSpecificTestSpec(specName: string): Promise<string> {
  console.log("Running specific Playwright spec:", specName);

  return new Promise((resolve, reject) => {
    exec(`npx playwright test ${specName}`, { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        reject(error.message);
        return;
      }

      resolve(stdout || stderr);
    });
  });
}

