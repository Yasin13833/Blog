import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const roots = ["app.js", "server.js", "Config", "Controllers", "Middleware", "Models", "Routes", "Scripts", "Utils", "Validators"];
const files = [];

const collect = (target) => {
  const stat = fs.statSync(target);
  if (stat.isFile() && target.endsWith(".js")) files.push(target);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(target)) collect(path.join(target, entry));
  }
};

for (const root of roots) if (fs.existsSync(root)) collect(root);

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout);
    process.exit(result.status || 1);
  }
}

console.log(`Syntax check passed for ${files.length} JavaScript files.`);
