import "../Config/Environment.js";
import mongoose from "mongoose";
import Brand from "../Models/BrandMd.js";
import ProductCategory from "../Models/ProductCategoryMd.js";
import Product from "../Models/ProductMd.js";
import User from "../Models/UserMd.js";

if (!process.env.DATA_BASE) throw new Error("DATA_BASE is required");
await mongoose.connect(process.env.DATA_BASE);

try {
  const [unpublishedBrandIds, unpublishedCategoryIds] = await Promise.all([
    Brand.find({ isPublished: false }).distinct("_id"),
    ProductCategory.find({ isPublished: false }).distinct("_id"),
  ]);

  const adminMigration = await User.updateMany(
    { role: "admin", $or: [{ isActive: { $exists: false } }, { tokenVersion: { $exists: false } }] },
    { $set: { isActive: true, tokenVersion: 0 } }
  );

  const result = await Product.updateMany(
    {
      isPublished: true,
      $or: [
        { brandId: { $in: unpublishedBrandIds } },
        { categoryId: { $in: unpublishedCategoryIds } },
      ],
    },
    { $set: { isPublished: false } }
  );

  console.log(`Stage 2 migration complete. Admins normalized: ${adminMigration.modifiedCount}; products unpublished: ${result.modifiedCount}`);
} finally {
  await mongoose.connection.close();
}
