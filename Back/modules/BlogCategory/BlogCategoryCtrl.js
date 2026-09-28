import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import BlogCategory from "./BlogCategoryMd.js";
import Post from "../Post/PostMd.js";
import {
  assertFound,
  identifierFilter,
  publicStatusFilter,
  vantaQuery,
  applyDocumentPatch,
} from "../../Utils/controllerHelpers.js";

const searchFields = [
  "translations.fa.name",
  "translations.en.name",
  "translations.ar.name",
  "translations.fa.description",
  "translations.en.description",
  "translations.ar.description",
];

const ensureParentExists = async (parent) => {
  if (!parent) return;
  const exists = await BlogCategory.exists({ _id: parent });
  if (!exists) throw new HandleERROR("Parent blog category does not exist", 422);
};

export const getAll = catchAsync(async (req, res) => {
  const result = await new ApiFeatures(BlogCategory, vantaQuery(req), req.role)
    .addManualFilters(publicStatusFilter(req))
    .filter()
    .populate({ path: "parent", select: "translations slug status" })
    .search(searchFields)
    .sort()
    .limitFields()
    .paginate()
    .execute();

  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res) => {
  const result = await new ApiFeatures(BlogCategory, vantaQuery(req), req.role)
    .addManualFilters({
      $and: [
        publicStatusFilter(req),
        identifierFilter(req.params.identifier, req.query.lang),
      ],
    })
    .filter()
    .populate({ path: "parent", select: "translations slug status" })
    .limitFields()
    .execute();

  return res.status(200).json({
    success: true,
    data: assertFound(result, "Blog category not found"),
  });
});

export const create = catchAsync(async (req, res) => {
  await ensureParentExists(req.body.parent);
  const category = await BlogCategory.create({ ...req.body, createdBy: req.userId });
  return res.status(201).json({
    success: true,
    message: "Blog category created successfully",
    data: category,
  });
});

export const update = catchAsync(async (req, res, next) => {
  if (req.body.parent === req.params.id) {
    return next(new HandleERROR("A category cannot be its own parent", 422));
  }

  const category = await BlogCategory.findById(req.params.id);
  if (!category) return next(new HandleERROR("Blog category not found", 404));

  await ensureParentExists(req.body.parent);
  applyDocumentPatch(category, req.body);
  await category.save();

  return res.status(200).json({
    success: true,
    message: "Blog category updated successfully",
    data: category,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const [postExists, childExists] = await Promise.all([
    Post.exists({ blogCategoryId: req.params.id }),
    BlogCategory.exists({ parent: req.params.id }),
  ]);

  if (postExists || childExists) {
    return next(
      new HandleERROR(
        "Cannot delete a category that has posts or child categories",
        409
      )
    );
  }

  const category = await BlogCategory.findByIdAndDelete(req.params.id);
  if (!category) return next(new HandleERROR("Blog category not found", 404));

  return res.status(200).json({
    success: true,
    message: "Blog category deleted successfully",
  });
});
