import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "./ProductMd.js";
import Brand from "../Brand/BrandMd.js";
import ProductCategory from "../ProductCategory/ProductCategoryMd.js";
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
  "translations.fa.shortDescription",
  "translations.en.shortDescription",
  "translations.ar.shortDescription",
  "translations.fa.description",
  "translations.en.description",
  "translations.ar.description",
  "sku",
];

const productPopulate = [
  { path: "brandId", select: "translations slug logo status" },
  { path: "categoryId", select: "translations slug status" },
];

const ensureRelationsExist = async (data) => {
  const checks = [];
  if (data.brandId) checks.push(Brand.exists({ _id: data.brandId }));
  if (data.categoryId) checks.push(ProductCategory.exists({ _id: data.categoryId }));

  const results = await Promise.all(checks);
  if (results.some((value) => !value)) {
    throw new HandleERROR("Brand or product category does not exist", 422);
  }
};

export const getAll = catchAsync(async (req, res) => {
  const result = await new ApiFeatures(Product, vantaQuery(req), req.role)
    .addManualFilters(publicStatusFilter(req))
    .filter()
    .populate(productPopulate)
    .search(searchFields)
    .sort()
    .limitFields()
    .paginate()
    .execute();

  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res) => {
  const result = await new ApiFeatures(Product, vantaQuery(req), req.role)
    .addManualFilters({
      $and: [
        publicStatusFilter(req),
        identifierFilter(req.params.identifier, req.query.lang),
      ],
    })
    .filter()
    .populate(productPopulate)
    .limitFields()
    .execute();

  return res.status(200).json({
    success: true,
    data: assertFound(result, "Product not found"),
  });
});

export const create = catchAsync(async (req, res) => {
  await ensureRelationsExist(req.body);
  const product = await Product.create({ ...req.body, createdBy: req.userId });
  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new HandleERROR("Product not found", 404));

  await ensureRelationsExist(req.body);
  applyDocumentPatch(product, req.body);
  await product.save();

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return next(new HandleERROR("Product not found", 404));

  await Post.updateMany({ relatedProducts: req.params.id }, { $pull: { relatedProducts: req.params.id } });

  return res.status(200).json({ success: true, message: "Product deleted successfully" });
});
