import { exec } from "child_process";

export async function runPlaywrightTests(): Promise<string> {
  console.log("Inside runPlaywrightTests()");

  return new Promise((resolve, reject) => {
    console.log("Executing Playwright...");

    exec("npx playwright test", (error, stdout, stderr) => {
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
    exec("npx playwright show-report", (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        reject(error.message);
        return;
      }

      resolve(stdout || stderr);
    });
  });
}