import mongoose from "mongoose";
import {
  addLocalizedSlugIndexes,
  fillLocalizedSlugs,
  localizedSlug,
  localizedString,
  mediaSchema,
  seoSchema,
} from "../../Utils/localized.js";

const brandTranslationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    shortDescription: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const brandSchema = new mongoose.Schema(
  {
    translations: {
      fa: { type: brandTranslationSchema, required: true },
      en: { type: brandTranslationSchema, required: true },
      ar: { type: brandTranslationSchema, required: true },
    },
    slug: localizedSlug(),
    logo: mediaSchema,
    coverImage: mediaSchema,
    website: { type: String, trim: true },
    country: localizedString(),
    foundedYear: Number,
    socialLinks: {
      instagram: String,
      linkedin: String,
      youtube: String,
      x: String,
      facebook: String,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
    featured: { type: Boolean, default: false, index: true },
    seo: seoSchema,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

brandSchema.pre("validate", function (next) {
  fillLocalizedSlugs(this, "name");
  next();
});

addLocalizedSlugIndexes(brandSchema);
brandSchema.index({ status: 1, featured: 1, createdAt: -1 });

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
