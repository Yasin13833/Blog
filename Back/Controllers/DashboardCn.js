import Brand from "../Models/BrandMd.js";
import Product from "../Models/ProductMd.js";
import ProductCategory from "../Models/ProductCategoryMd.js";
import { catchAsync } from "vanta-api";
import { sendSuccess } from "../Utils/Api.js";
import { productCardFields } from "../Utils/CatalogQuery.js";

export const getDashboardStatistics = catchAsync(async (req, res) => {
  const [
    productTotal,
    productPublished,
    productFeatured,
    brandTotal,
    brandPublished,
    brandFeatured,
    categoryTotal,
    categoryPublished,
    categoryFeatured,
    recentProducts,
  ] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ isPublished: true }),
    Product.countDocuments({ isFeatured: true }),
    Brand.countDocuments(),
    Brand.countDocuments({ isPublished: true }),
    Brand.countDocuments({ isFeatured: true }),
    ProductCategory.countDocuments(),
    ProductCategory.countDocuments({ isPublished: true }),
    ProductCategory.countDocuments({ isFeatured: true }),
    Product.find()
      .select(`${productCardFields} isPublished`)
      .populate({ path: "brandId", select: "name slug logo" })
      .populate({ path: "categoryId", select: "name slug image icon" })
      .sort({ createdAt: -1 })
      .limit(8),
  ]);

  return sendSuccess(res, {
    message: "Dashboard statistics fetched successfully",
    data: {
      stats: {
        products: {
          total: productTotal,
          published: productPublished,
          draft: productTotal - productPublished,
          featured: productFeatured,
        },
        brands: {
          total: brandTotal,
          published: brandPublished,
          draft: brandTotal - brandPublished,
          featured: brandFeatured,
        },
        categories: {
          total: categoryTotal,
          published: categoryPublished,
          draft: categoryTotal - categoryPublished,
          featured: categoryFeatured,
        },
      },
      recentProducts,
    },
  });
});
