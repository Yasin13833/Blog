import ProductCategory from "../Models/ProductCategoryMd.js";
import Product from "../Models/ProductMd.js";
import { catchAsync } from "vanta-api";
import { ApiError, sendList, sendSuccess } from "../Utils/Api.js";
import { localizeDocuments } from "../Utils/Localization.js";
import { getPagination } from "../Utils/PublicQuery.js";
import { applyPatch } from "../Utils/PatchDocument.js";
import {
  applyAdminStateFilters,
  buildLocalizedSearchFilter,
  identifierFilter,
  listSort,
  populateProductCards,
  productCardFields,
} from "../Utils/CatalogQuery.js";

const getCategoryOrFail = async (id) => {
  const category = await ProductCategory.findById(id);
  if (!category) throw new ApiError("Product category not found", 404, "CATEGORY_NOT_FOUND");
  return category;
};

const assertCanUnpublish = async (categoryId) => {
  const publishedProducts = await Product.countDocuments({ categoryId, isPublished: true });
  if (publishedProducts > 0) {
    throw new ApiError(
      "Unpublish this category's published products before unpublishing the category",
      409,
      "CATEGORY_HAS_PUBLISHED_PRODUCTS",
      null,
      { publishedProducts }
    );
  }
};

export const getPublicProductCategories = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = { isPublished: true, ...buildLocalizedSearchFilter(req.query.q) };
  if (req.query.featured !== undefined) filter.isFeatured = req.query.featured === "true";

  const [categories, total] = await Promise.all([
    ProductCategory.find(filter)
      .sort(listSort(req.query.sort, req.language))
      .skip(skip)
      .limit(limit),
    ProductCategory.countDocuments(filter),
  ]);

  return sendList(res, {
    message: "Product categories fetched successfully",
    data: localizeDocuments(categories, req.language),
    page,
    limit,
    total,
    meta: { language: req.language },
  });
});

export const getPublicProductCategory = catchAsync(async (req, res) => {
  const productLimit = Number.parseInt(req.query.productLimit, 10) || 12;
  const category = await ProductCategory.findOne({
    isPublished: true,
    ...identifierFilter(req.params.identifier),
  });
  if (!category) throw new ApiError("Product category not found", 404, "CATEGORY_NOT_FOUND");

  const [products, productCount] = await Promise.all([
    populateProductCards(
      Product.find({ categoryId: category._id, isPublished: true })
        .select(productCardFields)
        .sort({ sortOrder: 1, createdAt: -1 })
        .limit(productLimit)
    ),
    Product.countDocuments({ categoryId: category._id, isPublished: true }),
  ]);

  return sendSuccess(res, {
    message: "Product category detail fetched successfully",
    data: {
      category: localizeDocuments(category, req.language),
      products: localizeDocuments(products, req.language),
    },
    meta: { language: req.language, productCount },
  });
});

export const getAdminProductCategories = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = applyAdminStateFilters(buildLocalizedSearchFilter(req.query.q), req.query);
  const [categories, total] = await Promise.all([
    ProductCategory.find(filter)
      .sort(listSort(req.query.sort, "fa"))
      .skip(skip)
      .limit(limit),
    ProductCategory.countDocuments(filter),
  ]);

  return sendList(res, {
    message: "Admin product categories fetched successfully",
    data: categories,
    page,
    limit,
    total,
  });
});

export const getAdminProductCategory = catchAsync(async (req, res) => {
  const category = await ProductCategory.findOne(identifierFilter(req.params.id));
  if (!category) throw new ApiError("Product category not found", 404, "CATEGORY_NOT_FOUND");
  const productCount = await Product.countDocuments({ categoryId: category._id });
  return sendSuccess(res, {
    message: "Admin product category detail fetched successfully",
    data: category,
    meta: { productCount },
  });
});

export const createProductCategory = catchAsync(async (req, res) => {
  const category = await ProductCategory.create(req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: "Product category created successfully",
    data: category,
  });
});

export const updateProductCategory = catchAsync(async (req, res) => {
  const category = await getCategoryOrFail(req.params.id);
  if (category.isPublished && req.body.isPublished === false) await assertCanUnpublish(category._id);

  applyPatch(category, req.body);
  await category.save();
  return sendSuccess(res, { message: "Product category updated successfully", data: category });
});

export const publishProductCategory = catchAsync(async (req, res) => {
  const category = await getCategoryOrFail(req.params.id);
  category.isPublished = true;
  await category.save();
  return sendSuccess(res, { message: "Product category published successfully", data: category });
});

export const unpublishProductCategory = catchAsync(async (req, res) => {
  const category = await getCategoryOrFail(req.params.id);
  await assertCanUnpublish(category._id);
  category.isPublished = false;
  await category.save();
  return sendSuccess(res, { message: "Product category unpublished successfully", data: category });
});

export const reorderProductCategories = catchAsync(async (req, res) => {
  const ids = req.body.items.map((item) => item.id);
  const existing = await ProductCategory.countDocuments({ _id: { $in: ids } });
  if (existing !== ids.length) {
    throw new ApiError("One or more product categories were not found", 404, "CATEGORY_NOT_FOUND");
  }

  await ProductCategory.bulkWrite(
    req.body.items.map((item) => ({
      updateOne: { filter: { _id: item.id }, update: { $set: { sortOrder: item.sortOrder } } },
    }))
  );

  const categories = await ProductCategory.find({ _id: { $in: ids } }).sort({
    sortOrder: 1,
    createdAt: -1,
  });
  return sendSuccess(res, { message: "Product categories reordered successfully", data: categories });
});

export const removeProductCategory = catchAsync(async (req, res) => {
  const category = await getCategoryOrFail(req.params.id);
  const productCount = await Product.countDocuments({ categoryId: category._id });
  if (productCount > 0) {
    throw new ApiError(
      "Cannot delete a category that has products",
      409,
      "CATEGORY_HAS_PRODUCTS",
      null,
      { productCount }
    );
  }

  await category.deleteOne();
  return sendSuccess(res, {
    message: "Product category deleted successfully",
    data: { id: category._id },
  });
});
