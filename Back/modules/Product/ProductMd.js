import mongoose from "mongoose";
import {
  addLocalizedSlugIndexes,
  fillLocalizedSlugs,
  localizedSlug,
  localizedString,
  localizedStringArray,
  mediaSchema,
  seoSchema,
} from "../../Utils/localized.js";

const translationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    shortDescription: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const specificationSchema = new mongoose.Schema(
  {
    key: localizedString({ required: true }),
    value: localizedString({ required: true }),
    group: localizedString(),
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    translations: {
      fa: { type: translationSchema, required: true },
      en: { type: translationSchema, required: true },
      ar: { type: translationSchema, required: true },
    },
    slug: localizedSlug(),
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Brand is required"],
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: [true, "Product category is required"],
      index: true,
    },
    sku: { type: String, trim: true, uppercase: true, unique: true, sparse: true },
    images: { type: [mediaSchema], default: [] },
    specifications: { type: [specificationSchema], default: [] },
    features: localizedStringArray(),
    price: { type: Number, min: 0 },
    currency: { type: String, trim: true, uppercase: true, default: "USD" },
    productUrl: { type: String, trim: true },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
    featured: { type: Boolean, default: false, index: true },
    seo: seoSchema,
    publishedAt: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

productSchema.pre("validate", function (next) {
  fillLocalizedSlugs(this, "name");
  if (this.status === "published" && !this.publishedAt) this.publishedAt = new Date();
  next();
});

addLocalizedSlugIndexes(productSchema);
productSchema.index({ status: 1, categoryId: 1, brandId: 1, createdAt: -1 });
productSchema.index({ featured: 1, status: 1, createdAt: -1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
