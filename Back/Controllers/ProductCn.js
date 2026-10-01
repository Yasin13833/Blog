import mongoose from "mongoose";
import Brand from "../Models/BrandMd.js";
import Product from "../Models/ProductMd.js";
import ProductCategory from "../Models/ProductCategoryMd.js";
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

const relationIdentifierFilter = (identifier) => {
  if (mongoose.isValidObjectId(identifier)) return { _id: identifier };
  return {
    $or: [
      { "slug.fa": identifier },
      { "slug.en": identifier },
      { "slug.ar": identifier },
    ],
  };
};

const resolvePublicRelation = async (Model, identifier) => {
  if (!identifier) return null;
  return Model.findOne({ isPublished: true, ...relationIdentifierFilter(identifier) }).select("_id");
};

const getProductOrFail = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new ApiError("Product not found", 404, "PRODUCT_NOT_FOUND");
  return product;
};

const validateRelations = async ({ brandId, categoryId, mustBePublished }) => {
  const publicationFilter = mustBePublished ? { isPublished: true } : {};
  const [brand, category] = await Promise.all([
    Brand.exists({ _id: brandId, ...publicationFilter }),
    ProductCategory.exists({ _id: categoryId, ...publicationFilter }),
  ]);

  if (!brand) {
    throw new ApiError(
      mustBePublished ? "Published brand not found" : "Brand not found",
      404,
      mustBePublished ? "PUBLISHED_BRAND_NOT_FOUND" : "BRAND_NOT_FOUND"
    );
  }
  if (!category) {
    throw new ApiError(
      mustBePublished ? "Published product category not found" : "Product category not found",
      404,
      mustBePublished ? "PUBLISHED_CATEGORY_NOT_FOUND" : "CATEGORY_NOT_FOUND"
    );
  }
};

const validateRelatedProducts = async (ids, currentProductId = null) => {
  if (ids === undefined) return;
  const uniqueIds = [...new Set(ids.map(String))];
  if (currentProductId && uniqueIds.includes(String(currentProductId))) {
    throw new ApiError(
      "A product cannot be related to itself",
      400,
      "RELATED_PRODUCT_SELF_REFERENCE",
      { "body.relatedProductIds": "A product cannot be related to itself" }
    );
  }
  const count = await Product.countDocuments({ _id: { $in: uniqueIds } });
  if (count !== uniqueIds.length) {
    throw new ApiError(
      "One or more related products were not found",
      404,
      "RELATED_PRODUCT_NOT_FOUND"
    );
  }
};

const normalizeProductInput = (body) => {
  if (typeof body.sku === "string" && !body.sku.trim()) body.sku = undefined;
  if (Array.isArray(body.relatedProductIds)) {
    body.relatedProductIds = [...new Set(body.relatedProductIds.map(String))];
  }
  return body;
};

const fetchRelatedProducts = async (product, limit = 6) => {
  if (limit <= 0) return [];
  const explicitIds = (product.relatedProductIds || []).map(String);
  const explicitProducts = explicitIds.length
    ? await populateProductCards(
        Product.find({ _id: { $in: explicitIds }, isPublished: true }).select(productCardFields)
      )
    : [];

  const explicitMap = new Map(explicitProducts.map((item) => [String(item._id), item]));
  const orderedExplicit = explicitIds
    .map((id) => explicitMap.get(id))
    .filter(Boolean)
    .slice(0, limit);

  const remaining = limit - orderedExplicit.length;
  if (remaining <= 0) return orderedExplicit;

  const excluded = [product._id, ...orderedExplicit.map((item) => item._id)];
  const fallback = await populateProductCards(
    Product.find({
      _id: { $nin: excluded },
      isPublished: true,
      $or: [{ categoryId: product.categoryId }, { brandId: product.brandId }],
    })
      .select(productCardFields)
      .sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 })
      .limit(remaining)
  );

  return [...orderedExplicit, ...fallback];
};

const shapePublicProductDetail = (product, language) => {
  const plain = product.toObject();
  const brand = plain.brandId;
  const category = plain.categoryId;
  delete plain.brandId;
  delete plain.categoryId;
  delete plain.relatedProductIds;
  return {
    product: localizeDocuments(plain, language),
    brand: localizeDocuments(brand, language),
    category: localizeDocuments(category, language),
  };
};

export const getPublicProducts = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = {
    isPublished: true,
    ...buildLocalizedSearchFilter(req.query.q, ["name", "shortDescription"], ["model", "sku"]),
  };
  if (req.query.featured !== undefined) filter.isFeatured = req.query.featured === "true";

  if (req.query.brand) {
    const brand = await resolvePublicRelation(Brand, req.query.brand);
    if (!brand) {
      return sendList(res, {
        message: "Products fetched successfully",
        data: [],
        page,
        limit,
        total: 0,
        meta: { language: req.language },
      });
    }
    filter.brandId = brand._id;
  }

  if (req.query.category) {
    const category = await resolvePublicRelation(ProductCategory, req.query.category);
    if (!category) {
      return sendList(res, {
        message: "Products fetched successfully",
        data: [],
        page,
        limit,
        total: 0,
        meta: { language: req.language },
      });
    }
    filter.categoryId = category._id;
  }

  const [products, total] = await Promise.all([
    populateProductCards(
      Product.find(filter)
        .select(productCardFields)
        .sort(listSort(req.query.sort, req.language))
        .skip(skip)
        .limit(limit)
    ),
    Product.countDocuments(filter),
  ]);

  return sendList(res, {
    message: "Products fetched successfully",
    data: localizeDocuments(products, req.language),
    page,
    limit,
    total,
    meta: { language: req.language },
  });
});

export const getPublicProduct = catchAsync(async (req, res) => {
  const relatedLimit = req.query.relatedLimit === undefined ? 6 : Number(req.query.relatedLimit);
  const product = await Product.findOne({
    isPublished: true,
    ...identifierFilter(req.params.identifier),
  })
    .populate({ path: "brandId", select: "name slug description logo coverImage website socialLinks seo" })
    .populate({ path: "categoryId", select: "name slug description image icon seo" });

  if (!product) throw new ApiError("Product not found", 404, "PRODUCT_NOT_FOUND");

  const relationSnapshot = {
    _id: product._id,
    brandId: product.brandId?._id || product.brandId,
    categoryId: product.categoryId?._id || product.categoryId,
    relatedProductIds: product.relatedProductIds,
  };
  const relatedProducts = await fetchRelatedProducts(relationSnapshot, relatedLimit);
  const shaped = shapePublicProductDetail(product, req.language);

  return sendSuccess(res, {
    message: "Product detail fetched successfully",
    data: {
      ...shaped,
      relatedProducts: localizeDocuments(relatedProducts, req.language),
    },
    meta: { language: req.language },
  });
});

export const getRelatedProducts = catchAsync(async (req, res) => {
  const limit = Number.parseInt(req.query.limit, 10) || 6;
  const product = await Product.findOne({
    isPublished: true,
    ...identifierFilter(req.params.identifier),
  }).select("brandId categoryId relatedProductIds");
  if (!product) throw new ApiError("Product not found", 404, "PRODUCT_NOT_FOUND");

  const related = await fetchRelatedProducts(product, limit);
  return sendSuccess(res, {
    message: "Related products fetched successfully",
    data: localizeDocuments(related, req.language),
    meta: { language: req.language },
  });
});

export const getAdminProducts = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = applyAdminStateFilters(
    buildLocalizedSearchFilter(req.query.q, ["name", "shortDescription"], ["model", "sku"]),
    req.query
  );
  if (req.query.brandId) filter.brandId = req.query.brandId;
  if (req.query.categoryId) filter.categoryId = req.query.categoryId;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate({ path: "brandId", select: "name slug logo isPublished" })
      .populate({ path: "categoryId", select: "name slug image icon isPublished" })
      .sort(listSort(req.query.sort, "fa"))
      .skip(skip)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  return sendList(res, {
    message: "Admin products fetched successfully",
    data: products,
    page,
    limit,
    total,
  });
});

export const getAdminProduct = catchAsync(async (req, res) => {
  const product = await Product.findOne(identifierFilter(req.params.id))
    .populate({ path: "brandId", select: "name slug logo isPublished" })
    .populate({ path: "categoryId", select: "name slug image icon isPublished" })
    .populate({ path: "relatedProductIds", select: productCardFields });
  if (!product) throw new ApiError("Product not found", 404, "PRODUCT_NOT_FOUND");
  return sendSuccess(res, { message: "Admin product detail fetched successfully", data: product });
});

export const createProduct = catchAsync(async (req, res) => {
  normalizeProductInput(req.body);
  const isPublished = req.body.isPublished === true;
  await validateRelations({
    brandId: req.body.brandId,
    categoryId: req.body.categoryId,
    mustBePublished: isPublished,
  });
  await validateRelatedProducts(req.body.relatedProductIds);

  const product = await Product.create(req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: "Product created successfully",
    data: product,
  });
});

export const updateProduct = catchAsync(async (req, res) => {
  const product = await getProductOrFail(req.params.id);
  normalizeProductInput(req.body);

  const brandId = req.body.brandId ?? product.brandId;
  const categoryId = req.body.categoryId ?? product.categoryId;
  const isPublished = req.body.isPublished ?? product.isPublished;
  await validateRelations({ brandId, categoryId, mustBePublished: isPublished });
  await validateRelatedProducts(req.body.relatedProductIds, product._id);

  applyPatch(product, req.body);
  await product.save();
  return sendSuccess(res, { message: "Product updated successfully", data: product });
});

export const publishProduct = catchAsync(async (req, res) => {
  const product = await getProductOrFail(req.params.id);
  await validateRelations({
    brandId: product.brandId,
    categoryId: product.categoryId,
    mustBePublished: true,
  });
  product.isPublished = true;
  await product.save();
  return sendSuccess(res, { message: "Product published successfully", data: product });
});

export const unpublishProduct = catchAsync(async (req, res) => {
  const product = await getProductOrFail(req.params.id);
  product.isPublished = false;
  await product.save();
  return sendSuccess(res, { message: "Product unpublished successfully", data: product });
});

export const reorderProducts = catchAsync(async (req, res) => {
  const ids = req.body.items.map((item) => item.id);
  const existing = await Product.countDocuments({ _id: { $in: ids } });
  if (existing !== ids.length) {
    throw new ApiError("One or more products were not found", 404, "PRODUCT_NOT_FOUND");
  }

  await Product.bulkWrite(
    req.body.items.map((item) => ({
      updateOne: { filter: { _id: item.id }, update: { $set: { sortOrder: item.sortOrder } } },
    }))
  );

  const products = await Product.find({ _id: { $in: ids } })
    .populate({ path: "brandId", select: "name slug logo" })
    .populate({ path: "categoryId", select: "name slug image icon" })
    .sort({ sortOrder: 1, createdAt: -1 });
  return sendSuccess(res, { message: "Products reordered successfully", data: products });
});

export const removeProduct = catchAsync(async (req, res) => {
  const product = await getProductOrFail(req.params.id);
  await product.deleteOne();
  await Product.updateMany(
    { relatedProductIds: product._id },
    { $pull: { relatedProductIds: product._id } }
  );

  return sendSuccess(res, {
    message: "Product deleted successfully",
    data: { id: product._id },
  });
});
