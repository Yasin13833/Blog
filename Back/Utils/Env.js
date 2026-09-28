import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(__filename), "..");

dotenv.config({ path: path.join(rootDir, ".env"), override: false });

export { rootDir };
