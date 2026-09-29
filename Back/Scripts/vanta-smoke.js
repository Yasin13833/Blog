import { catchAsync, catchError, HandleERROR } from "vanta-api";

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(typeof catchAsync === "function", "vanta-api catchAsync export is missing");
assert(typeof catchError === "function", "vanta-api catchError export is missing");
assert(typeof HandleERROR === "function", "vanta-api HandleERROR export is missing");

const error = new HandleERROR("Vanta smoke", 418);
assert(error instanceof Error, "HandleERROR must extend Error");

console.log("vanta-api integration smoke test passed.");
