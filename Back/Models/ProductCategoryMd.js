import mongoose from "mongoose";
import {
  localizedOptionalSchema,
  localizedRequiredSchema,
  seoSchema,
} from "./SharedMd.js";
import { fillLocalizedSlugs } from "../Utils/Slug.js";

const productCategorySchema = new mongoose.Schema(
  {
    name: { type: localizedRequiredSchema, required: true },
    slug: { type: localizedOptionalSchema, default: () => ({}) },
    description: { type: localizedOptionalSchema, default: () => ({}) },
    image: { type: String, default: "" },
    icon: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0, min: 0 },
    seo: { type: seoSchema, default: () => ({}) },
  },
  { timestamps: true }
);

productCategorySchema.pre("validate", function () {
  this.slug = fillLocalizedSlugs(this.name, this.slug);
});

productCategorySchema.index({ "slug.fa": 1 }, { unique: true });
productCategorySchema.index({ "slug.en": 1 }, { unique: true });
productCategorySchema.index({ "slug.ar": 1 }, { unique: true });
productCategorySchema.index({ isPublished: 1, sortOrder: 1 });

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);
export default ProductCategory;
