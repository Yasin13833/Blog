export const toSlug = (value = "") =>
  String(value)
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const fillLocalizedSlugs = (name = {}, slug = {}) => ({
  fa: slug?.fa?.trim() || toSlug(name?.fa),
  en: slug?.en?.trim() || toSlug(name?.en),
  ar: slug?.ar?.trim() || toSlug(name?.ar),
});
