const isPlainObject = (value) =>
  value &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  Object.getPrototypeOf(value) === Object.prototype;

const blockedKeys = new Set([
  "__proto__",
  "prototype",
  "constructor",
  "_id",
  "__v",
  "createdAt",
  "updatedAt",
]);

export const applyPatch = (document, patch = {}, prefix = "") => {
  Object.entries(patch).forEach(([key, value]) => {
    if (blockedKeys.has(key)) return;
    const path = prefix ? `${prefix}.${key}` : key;

    if (isPlainObject(value)) {
      applyPatch(document, value, path);
      return;
    }

    document.set(path, value);
  });

  return document;
};
