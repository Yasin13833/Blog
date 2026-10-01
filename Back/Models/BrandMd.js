import mongoose from "mongoose";
import {
  localizedOptionalSchema,
  localizedRequiredSchema,
  seoSchema,
} from "./SharedMd.js";
import { fillLocalizedSlugs } from "../Utils/Slug.js";

const brandSchema = new mongoose.Schema(
  {
    name: { type: localizedRequiredSchema, required: true },
    slug: { type: localizedOptionalSchema, default: () => ({}) },
    description: { type: localizedRequiredSchema, required: true },
    country: { type: localizedOptionalSchema, default: () => ({}) },
    logo: { type: String, required: true },
    coverImage: { type: String, default: "" },
    website: { type: String, default: "", trim: true },
    socialLinks: {
      instagram: { type: String, default: "", trim: true },
      linkedin: { type: String, default: "", trim: true },
      youtube: { type: String, default: "", trim: true },
    },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0, min: 0 },
    seo: { type: seoSchema, default: () => ({}) },
  },
  { timestamps: true }
);

brandSchema.pre("validate", function () {
  this.slug = fillLocalizedSlugs(this.name, this.slug);
});

brandSchema.index({ "slug.fa": 1 }, { unique: true });
brandSchema.index({ "slug.en": 1 }, { unique: true });
brandSchema.index({ "slug.ar": 1 }, { unique: true });
brandSchema.index({ isPublished: 1, isFeatured: 1, sortOrder: 1 });

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
