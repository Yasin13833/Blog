import Brand from "../Models/BrandMd.js";
import Product from "../Models/ProductMd.js";
import ProductCategory from "../Models/ProductCategoryMd.js";
import { catchAsync } from "vanta-api";
import { sendSuccess } from "../Utils/Api.js";
import { localizeDocuments } from "../Utils/Localization.js";
import { escapeRegExp } from "../Utils/PublicQuery.js";
import { populateProductCards, productCardFields } from "../Utils/CatalogQuery.js";

export const searchCatalog = catchAsync(async (req, res) => {
  const query = String(req.query.q).trim();
  const regex = new RegExp(escapeRegExp(query), "i");
  const limit = Number.parseInt(req.query.limit, 10) || 8;

  const localizedFilter = (descriptionField = "description") => ({
    $or: [
      { "name.fa": regex }, { "name.en": regex }, { "name.ar": regex },
      { [`${descriptionField}.fa`]: regex },
      { [`${descriptionField}.en`]: regex },
      { [`${descriptionField}.ar`]: regex },
    ],
  });

  const [productCategories, brands, products] = await Promise.all([
    ProductCategory.find({ isPublished: true, ...localizedFilter() })
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(limit),
    Brand.find({ isPublished: true, ...localizedFilter() })
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(limit),
    populateProductCards(
      Product.find({
        isPublished: true,
        $or: [
          { "name.fa": regex }, { "name.en": regex }, { "name.ar": regex },
          { "shortDescription.fa": regex },
          { "shortDescription.en": regex },
          { "shortDescription.ar": regex },
          { model: regex }, { sku: regex },
        ],
      })
        .select(productCardFields)
        .sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 })
        .limit(limit)
    ),
  ]);

  const data = {
    productCategories: localizeDocuments(productCategories, req.language),
    brands: localizeDocuments(brands, req.language),
    products: localizeDocuments(products, req.language),
  };
  const total = Object.values(data).reduce((sum, items) => sum + items.length, 0);

  return sendSuccess(res, {
    message: "Catalog search completed successfully",
    data,
    meta: { language: req.language, query, total },
  });
});
