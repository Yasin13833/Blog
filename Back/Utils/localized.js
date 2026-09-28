import mongoose from "mongoose";
import slugify from "slugify";

export const LANGUAGES = ["fa", "en", "ar"];
export const DEFAULT_LANGUAGE = "fa";

export const localizedString = ({ required = false, defaultValue } = {}) => ({
  fa: {
    type: String,
    trim: true,
    required: required ? [true, "Persian value is required"] : false,
    ...(defaultValue !== undefined ? { default: defaultValue } : {}),
  },
  en: {
    type: String,
    trim: true,
    required: required ? [true, "English value is required"] : false,
    ...(defaultValue !== undefined ? { default: defaultValue } : {}),
  },
  ar: {
    type: String,
    trim: true,
    required: required ? [true, "Arabic value is required"] : false,
    ...(defaultValue !== undefined ? { default: defaultValue } : {}),
  },
});

export const localizedStringArray = () => ({
  fa: { type: [String], default: [] },
  en: { type: [String], default: [] },
  ar: { type: [String], default: [] },
});

export const localizedSlug = () => ({
  fa: { type: String, trim: true, lowercase: true },
  en: { type: String, trim: true, lowercase: true },
  ar: { type: String, trim: true, lowercase: true },
});

export const mediaSchema = new mongoose.Schema(
  {
    filename: { type: String, trim: true },
    originalName: { type: String, trim: true },
    url: { type: String, trim: true },
    mimeType: { type: String, trim: true },
    size: Number,
    alt: localizedString(),
  },
  { _id: false }
);

export const seoSchema = new mongoose.Schema(
  {
    metaTitle: localizedString(),
    metaDescription: localizedString(),
    keywords: localizedStringArray(),
    canonicalUrl: localizedString(),
    noIndex: { type: Boolean, default: false },
    ogImage: mediaSchema,
  },
  { _id: false }
);

export const buildSlug = (value = "") => {
  const source = String(value).normalize("NFKC").trim();
  if (!source) return "";

  const fromSlugify = slugify(source, {
    lower: true,
    strict: true,
    trim: true,
  });

  if (fromSlugify) return fromSlugify;

  return source
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export const fillLocalizedSlugs = (document, sourceField) => {
  if (!document.slug) document.slug = {};

  for (const language of LANGUAGES) {
    const currentSlug = document.slug?.[language];
    const source = document.translations?.[language]?.[sourceField];

    if (!currentSlug && source) {
      document.slug[language] = buildSlug(source);
    }
  }
};

export const addLocalizedSlugIndexes = (schema) => {
  for (const language of LANGUAGES) {
    schema.index(
      { [`slug.${language}`]: 1 },
      { unique: true, sparse: true, name: `slug_${language}_unique` }
    );
  }
};

export const getLanguage = (value) =>
  LANGUAGES.includes(value) ? value : DEFAULT_LANGUAGE;

export const omitQueryKeys = (query = {}, keys = []) => {
  const output = { ...query };
  for (const key of keys) delete output[key];
  return output;
};
