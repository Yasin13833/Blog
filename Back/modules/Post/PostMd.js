import mongoose from "mongoose";
import {
  addLocalizedSlugIndexes,
  fillLocalizedSlugs,
  localizedSlug,
  localizedStringArray,
  mediaSchema,
  seoSchema,
} from "../../Utils/localized.js";

const translationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, trim: true, default: "" },
    content: { type: String, required: true },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    translations: {
      fa: { type: translationSchema, required: true },
      en: { type: translationSchema, required: true },
      ar: { type: translationSchema, required: true },
    },
    slug: localizedSlug(),
    blogCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: [true, "Blog category is required"],
      index: true,
    },
    coverImage: mediaSchema,
    images: { type: [mediaSchema], default: [] },
    tags: localizedStringArray(),
    relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    relatedBrands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
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

postSchema.pre("validate", function (next) {
  fillLocalizedSlugs(this, "title");
  if (this.status === "published" && !this.publishedAt) this.publishedAt = new Date();
  next();
});

addLocalizedSlugIndexes(postSchema);
postSchema.index({ status: 1, blogCategoryId: 1, publishedAt: -1 });
postSchema.index({ featured: 1, status: 1, publishedAt: -1 });

const Post = mongoose.model("Post", postSchema);
export default Post;
