import mongoose from "mongoose";
import {
  addLocalizedSlugIndexes,
  fillLocalizedSlugs,
  localizedSlug,
  mediaSchema,
  seoSchema,
} from "../../Utils/localized.js";

const translationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const productCategorySchema = new mongoose.Schema(
  {
    translations: {
      fa: { type: translationSchema, required: true },
      en: { type: translationSchema, required: true },
      ar: { type: translationSchema, required: true },
    },
    slug: localizedSlug(),
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      default: null,
      index: true,
    },
    icon: mediaSchema,
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
    seo: seoSchema,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

productCategorySchema.pre("validate", function (next) {
  fillLocalizedSlugs(this, "name");
  next();
});

addLocalizedSlugIndexes(productCategorySchema);
productCategorySchema.index({ status: 1, parent: 1, createdAt: -1 });

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);
export default ProductCategory;
