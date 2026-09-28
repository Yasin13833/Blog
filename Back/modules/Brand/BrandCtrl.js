import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Brand from "./BrandMd.js";
import Product from "../Product/ProductMd.js";
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
];

export const getAll = catchAsync(async (req, res) => {
  const result = await new ApiFeatures(Brand, vantaQuery(req), req.role)
    .addManualFilters(publicStatusFilter(req))
    .filter()
    .search(searchFields)
    .sort()
    .limitFields()
    .paginate()
    .execute();

  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res) => {
  const manualFilter = {
    $and: [
      publicStatusFilter(req),
      identifierFilter(req.params.identifier, req.query.lang),
    ],
  };

  const result = await new ApiFeatures(Brand, vantaQuery(req), req.role)
    .addManualFilters(manualFilter)
    .filter()
    .limitFields()
    .execute();

  return res.status(200).json({ success: true, data: assertFound(result, "Brand not found") });
});

export const create = catchAsync(async (req, res) => {
  const brand = await Brand.create({ ...req.body, createdBy: req.userId });
  return res.status(201).json({
    success: true,
    message: "Brand created successfully",
    data: brand,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) return next(new HandleERROR("Brand not found", 404));

  applyDocumentPatch(brand, req.body);
  await brand.save();

  return res.status(200).json({
    success: true,
    message: "Brand updated successfully",
    data: brand,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const productExists = await Product.exists({ brandId: req.params.id });
  if (productExists) {
    return next(
      new HandleERROR("Cannot delete a brand that is assigned to products", 409)
    );
  }

  const brand = await Brand.findByIdAndDelete(req.params.id);
  if (!brand) return next(new HandleERROR("Brand not found", 404));

  await Post.updateMany({ relatedBrands: req.params.id }, { $pull: { relatedBrands: req.params.id } });

  return res.status(200).json({ success: true, message: "Brand deleted successfully" });
});
