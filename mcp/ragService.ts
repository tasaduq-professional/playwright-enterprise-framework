import fs from "fs";
import path from "path";

const REQUIREMENTS_PATH = path.join(
  process.cwd(),
  "requirements"
);

export async function getRequirementDetails(
  epicName: string
): Promise<string> {

  const filePath = path.join(
    REQUIREMENTS_PATH,
    `${epicName}.md`
  );

  if (!fs.existsSync(filePath)) {
    return `Epic '${epicName}' not found`;
  }

  return fs.readFileSync(filePath, "utf8");
}