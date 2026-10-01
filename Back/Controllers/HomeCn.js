import Brand from "../Models/BrandMd.js";
import Product from "../Models/ProductMd.js";
import ProductCategory from "../Models/ProductCategoryMd.js";
import { catchAsync } from "vanta-api";
import { sendSuccess } from "../Utils/Api.js";
import { localizeDocuments } from "../Utils/Localization.js";
import { populateProductCards, productCardFields } from "../Utils/CatalogQuery.js";

export const getHome = catchAsync(async (req, res) => {
  const limit = Number.parseInt(req.query.limit, 10) || 8;

  const [brands, categories, products] = await Promise.all([
    Brand.find({ isPublished: true, isFeatured: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(limit),
    ProductCategory.find({ isPublished: true, isFeatured: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(limit),
    populateProductCards(
      Product.find({ isPublished: true, isFeatured: true })
        .select(productCardFields)
        .sort({ sortOrder: 1, createdAt: -1 })
        .limit(limit)
    ),
  ]);

  return sendSuccess(res, {
    message: "Homepage catalog fetched successfully",
    data: {
      brands: localizeDocuments(brands, req.language),
      categories: localizeDocuments(categories, req.language),
      products: localizeDocuments(products, req.language),
    },
    meta: { language: req.language },
  });
});
