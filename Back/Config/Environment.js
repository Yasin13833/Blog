import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(configDir, "..");
const candidates = [path.join(rootDir, "config.env"), path.join(rootDir, ".env")];

for (const file of candidates) {
  if (fs.existsSync(file)) {
    dotenv.config({ path: file });
    break;
  }
}
