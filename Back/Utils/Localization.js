export const SUPPORTED_LANGUAGES = ["fa", "en", "ar"];

export const normalizeLanguage = (lang) =>
  SUPPORTED_LANGUAGES.includes(lang) ? lang : null;

const isLocalizedObject = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return keys.some((key) => SUPPORTED_LANGUAGES.includes(key));
};

export const localizeDeep = (input, lang) => {
  const normalizedLang = normalizeLanguage(lang);
  if (!normalizedLang) return input;

  if (Array.isArray(input)) {
    return input.map((item) => localizeDeep(item, normalizedLang));
  }

  if (!input || typeof input !== "object") return input;

  if (input instanceof Date || Buffer.isBuffer(input) || input?._bsontype) {
    return input;
  }

  if (isLocalizedObject(input)) {
    return input[normalizedLang] ?? input.fa ?? input.en ?? input.ar ?? "";
  }

  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      key,
      localizeDeep(value, normalizedLang),
    ])
  );
};

export const localizeDocuments = (documents, lang) => {
  if (!normalizeLanguage(lang)) return documents;
  const list = Array.isArray(documents) ? documents : [documents];
  const localized = list.map((document) => {
    if (!document) return document;
    const plain = typeof document.toObject === "function" ? document.toObject() : document;
    return localizeDeep(plain, lang);
  });
  return Array.isArray(documents) ? localized : localized[0];
};
