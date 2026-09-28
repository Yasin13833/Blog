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

const blogCategorySchema = new mongoose.Schema(
  {
    translations: {
      fa: { type: translationSchema, required: true },
      en: { type: translationSchema, required: true },
      ar: { type: translationSchema, required: true },
    },
    slug: localizedSlug(),
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
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

blogCategorySchema.pre("validate", function (next) {
  fillLocalizedSlugs(this, "name");
  next();
});

addLocalizedSlugIndexes(blogCategorySchema);
blogCategorySchema.index({ status: 1, parent: 1, createdAt: -1 });

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);
export default BlogCategory;
