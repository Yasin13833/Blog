import Brand from "../Models/BrandMd.js";
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

const getBrandOrFail = async (id) => {
  const brand = await Brand.findById(id);
  if (!brand) throw new ApiError("Brand not found", 404, "BRAND_NOT_FOUND");
  return brand;
};

const assertCanUnpublish = async (brandId) => {
  const publishedProducts = await Product.countDocuments({ brandId, isPublished: true });
  if (publishedProducts > 0) {
    throw new ApiError(
      "Unpublish this brand's published products before unpublishing the brand",
      409,
      "BRAND_HAS_PUBLISHED_PRODUCTS",
      null,
      { publishedProducts }
    );
  }
};

export const getPublicBrands = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = {
    isPublished: true,
    ...buildLocalizedSearchFilter(req.query.q),
  };
  if (req.query.featured !== undefined) filter.isFeatured = req.query.featured === "true";

  const [brands, total] = await Promise.all([
    Brand.find(filter)
      .sort(listSort(req.query.sort, req.language))
      .skip(skip)
      .limit(limit),
    Brand.countDocuments(filter),
  ]);

  return sendList(res, {
    message: "Brands fetched successfully",
    data: localizeDocuments(brands, req.language),
    page,
    limit,
    total,
    meta: { language: req.language },
  });
});

export const getPublicBrand = catchAsync(async (req, res) => {
  const productLimit = Number.parseInt(req.query.productLimit, 10) || 12;
  const brand = await Brand.findOne({ isPublished: true, ...identifierFilter(req.params.identifier) });
  if (!brand) throw new ApiError("Brand not found", 404, "BRAND_NOT_FOUND");

  const [products, productCount] = await Promise.all([
    populateProductCards(
      Product.find({ brandId: brand._id, isPublished: true })
        .select(productCardFields)
        .sort({ sortOrder: 1, createdAt: -1 })
        .limit(productLimit)
    ),
    Product.countDocuments({ brandId: brand._id, isPublished: true }),
  ]);

  return sendSuccess(res, {
    message: "Brand detail fetched successfully",
    data: {
      brand: localizeDocuments(brand, req.language),
      products: localizeDocuments(products, req.language),
    },
    meta: { language: req.language, productCount },
  });
});

export const getAdminBrands = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = applyAdminStateFilters(buildLocalizedSearchFilter(req.query.q), req.query);
  const [brands, total] = await Promise.all([
    Brand.find(filter)
      .sort(listSort(req.query.sort, "fa"))
      .skip(skip)
      .limit(limit),
    Brand.countDocuments(filter),
  ]);

  return sendList(res, {
    message: "Admin brands fetched successfully",
    data: brands,
    page,
    limit,
    total,
  });
});

export const getAdminBrand = catchAsync(async (req, res) => {
  const brand = await Brand.findOne(identifierFilter(req.params.id));
  if (!brand) throw new ApiError("Brand not found", 404, "BRAND_NOT_FOUND");
  const productCount = await Product.countDocuments({ brandId: brand._id });
  return sendSuccess(res, {
    message: "Admin brand detail fetched successfully",
    data: brand,
    meta: { productCount },
  });
});

export const createBrand = catchAsync(async (req, res) => {
  const brand = await Brand.create(req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: "Brand created successfully",
    data: brand,
  });
});

export const updateBrand = catchAsync(async (req, res) => {
  const brand = await getBrandOrFail(req.params.id);
  if (brand.isPublished && req.body.isPublished === false) await assertCanUnpublish(brand._id);

  applyPatch(brand, req.body);
  await brand.save();
  return sendSuccess(res, { message: "Brand updated successfully", data: brand });
});

export const publishBrand = catchAsync(async (req, res) => {
  const brand = await getBrandOrFail(req.params.id);
  brand.isPublished = true;
  await brand.save();
  return sendSuccess(res, { message: "Brand published successfully", data: brand });
});

export const unpublishBrand = catchAsync(async (req, res) => {
  const brand = await getBrandOrFail(req.params.id);
  await assertCanUnpublish(brand._id);
  brand.isPublished = false;
  await brand.save();
  return sendSuccess(res, { message: "Brand unpublished successfully", data: brand });
});

export const reorderBrands = catchAsync(async (req, res) => {
  const ids = req.body.items.map((item) => item.id);
  const existing = await Brand.countDocuments({ _id: { $in: ids } });
  if (existing !== ids.length) {
    throw new ApiError("One or more brands were not found", 404, "BRAND_NOT_FOUND");
  }

  await Brand.bulkWrite(
    req.body.items.map((item) => ({
      updateOne: { filter: { _id: item.id }, update: { $set: { sortOrder: item.sortOrder } } },
    }))
  );

  const brands = await Brand.find({ _id: { $in: ids } }).sort({ sortOrder: 1, createdAt: -1 });
  return sendSuccess(res, { message: "Brands reordered successfully", data: brands });
});

export const removeBrand = catchAsync(async (req, res) => {
  const brand = await getBrandOrFail(req.params.id);
  const productCount = await Product.countDocuments({ brandId: brand._id });
  if (productCount > 0) {
    throw new ApiError(
      "Cannot delete a brand that has products",
      409,
      "BRAND_HAS_PRODUCTS",
      null,
      { productCount }
    );
  }

  await brand.deleteOne();
  return sendSuccess(res, { message: "Brand deleted successfully", data: { id: brand._id } });
});
