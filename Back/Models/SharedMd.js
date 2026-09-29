import mongoose from "mongoose";

export const localizedRequiredSchema = new mongoose.Schema(
  {
    fa: { type: String, required: true, trim: true },
    en: { type: String, required: true, trim: true },
    ar: { type: String, required: true, trim: true },
  },
  { _id: false }
);

export const localizedOptionalSchema = new mongoose.Schema(
  {
    fa: { type: String, default: "", trim: true },
    en: { type: String, default: "", trim: true },
    ar: { type: String, default: "", trim: true },
  },
  { _id: false }
);

export const seoSchema = new mongoose.Schema(
  {
    title: { type: localizedOptionalSchema, default: () => ({}) },
    description: { type: localizedOptionalSchema, default: () => ({}) },
    keywords: {
      fa: { type: [String], default: [] },
      en: { type: [String], default: [] },
      ar: { type: [String], default: [] },
    },
  },
  { _id: false }
);
