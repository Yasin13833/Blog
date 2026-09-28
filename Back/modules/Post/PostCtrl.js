import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Post from "./PostMd.js";
import BlogCategory from "../BlogCategory/BlogCategoryMd.js";
import Product from "../Product/ProductMd.js";
import Brand from "../Brand/BrandMd.js";
import {
  assertFound,
  identifierFilter,
  publicStatusFilter,
  vantaQuery,
  applyDocumentPatch,
} from "../../Utils/controllerHelpers.js";

const searchFields = [
  "translations.fa.title",
  "translations.en.title",
  "translations.ar.title",
  "translations.fa.excerpt",
  "translations.en.excerpt",
  "translations.ar.excerpt",
  "translations.fa.content",
  "translations.en.content",
  "translations.ar.content",
];

const postPopulate = [
  { path: "blogCategoryId", select: "translations slug status" },
  { path: "relatedProducts", select: "translations slug images status" },
  { path: "relatedBrands", select: "translations slug logo status" },
];

const ensureRelationsExist = async (data) => {
  if (data.blogCategoryId) {
    const exists = await BlogCategory.exists({ _id: data.blogCategoryId });
    if (!exists) throw new HandleERROR("Blog category does not exist", 422);
  }

  if (Array.isArray(data.relatedProducts)) {
    const ids = [...new Set(data.relatedProducts.map(String))];
    const count = await Product.countDocuments({ _id: { $in: ids } });
    if (count !== ids.length) throw new HandleERROR("One or more related products do not exist", 422);
  }

  if (Array.isArray(data.relatedBrands)) {
    const ids = [...new Set(data.relatedBrands.map(String))];
    const count = await Brand.countDocuments({ _id: { $in: ids } });
    if (count !== ids.length) throw new HandleERROR("One or more related brands do not exist", 422);
  }
};

export const getAll = catchAsync(async (req, res) => {
  const result = await new ApiFeatures(Post, vantaQuery(req), req.role)
    .addManualFilters(publicStatusFilter(req))
    .filter()
    .populate(postPopulate)
    .search(searchFields)
    .sort()
    .limitFields()
    .paginate()
    .execute();

  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res) => {
  const result = await new ApiFeatures(Post, vantaQuery(req), req.role)
    .addManualFilters({
      $and: [
        publicStatusFilter(req),
        identifierFilter(req.params.identifier, req.query.lang),
      ],
    })
    .filter()
    .populate(postPopulate)
    .limitFields()
    .execute();

  return res.status(200).json({
    success: true,
    data: assertFound(result, "Post not found"),
  });
});

export const create = catchAsync(async (req, res) => {
  await ensureRelationsExist(req.body);
  const post = await Post.create({ ...req.body, createdBy: req.userId });
  return res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new HandleERROR("Post not found", 404));

  await ensureRelationsExist(req.body);
  applyDocumentPatch(post, req.body);
  await post.save();

  return res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: post,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return next(new HandleERROR("Post not found", 404));


  return res.status(200).json({ success: true, message: "Post deleted successfully" });
});
