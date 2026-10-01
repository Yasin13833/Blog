import path from "path";
import { fileURLToPath } from "url";

const utilsDir = path.dirname(fileURLToPath(import.meta.url));
export const ROOT_DIR = path.resolve(utilsDir, "..");
export const PUBLIC_DIR = path.join(ROOT_DIR, "Public");
