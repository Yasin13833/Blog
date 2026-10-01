import mongoose from "mongoose";
import {
  localizedOptionalSchema,
  localizedRequiredSchema,
  seoSchema,
} from "./SharedMd.js";
import { fillLocalizedSlugs } from "../Utils/Slug.js";

const featureSchema = new mongoose.Schema(
  {
    title: { type: localizedRequiredSchema, required: true },
    description: { type: localizedOptionalSchema, default: () => ({}) },
    icon: { type: String, default: "" },
  },
  { _id: false }
);

const specificationSchema = new mongoose.Schema(
  {
    label: { type: localizedRequiredSchema, required: true },
    value: { type: localizedRequiredSchema, required: true },
  },
  { _id: false }
);

const documentSchema = new mongoose.Schema(
  {
    title: { type: localizedRequiredSchema, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
      index: true,
    },
    name: { type: localizedRequiredSchema, required: true },
    slug: { type: localizedOptionalSchema, default: () => ({}) },
    shortDescription: { type: localizedRequiredSchema, required: true },
    description: { type: localizedRequiredSchema, required: true },
    model: { type: String, default: "", trim: true },
    sku: { type: String, trim: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], default: [] },
    features: { type: [featureSchema], default: [] },
    specifications: { type: [specificationSchema], default: [] },
    documents: { type: [documentSchema], default: [] },
    videoUrl: { type: String, default: "", trim: true },
    relatedProductIds: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      default: [],
    },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0, min: 0 },
    seo: { type: seoSchema, default: () => ({}) },
  },
  { timestamps: true }
);

productSchema.pre("validate", function () {
  this.slug = fillLocalizedSlugs(this.name, this.slug);
});

productSchema.index({ "slug.fa": 1 }, { unique: true });
productSchema.index({ "slug.en": 1 }, { unique: true });
productSchema.index({ "slug.ar": 1 }, { unique: true });
productSchema.index({ sku: 1 }, { unique: true, sparse: true });
productSchema.index({ isPublished: 1, isFeatured: 1, sortOrder: 1 });
productSchema.index({ brandId: 1, categoryId: 1, isPublished: 1 });
productSchema.index({ relatedProductIds: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
