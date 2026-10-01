import "../Config/Environment.js";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import User from "../Models/UserMd.js";
import Brand from "../Models/BrandMd.js";
import ProductCategory from "../Models/ProductCategoryMd.js";
import Product from "../Models/ProductMd.js";

const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

if (!process.env.DATA_BASE) throw new Error("DATA_BASE is required");
await mongoose.connect(process.env.DATA_BASE);

const image = "/upload/2_1757322452800.jpg";

const ensureAdmin = async () => {
  const username = String(process.env.SEED_ADMIN_USERNAME || "").trim().toLowerCase();
  const fullName = String(process.env.SEED_ADMIN_FULL_NAME || "").trim();
  const password = String(process.env.SEED_ADMIN_PASSWORD || "");

  if (!username || !fullName || !password) {
    console.log("Admin seed skipped: set SEED_ADMIN_USERNAME, SEED_ADMIN_FULL_NAME and SEED_ADMIN_PASSWORD.");
    return;
  }
  if (!passwordPattern.test(password)) {
    throw new Error(
      "SEED_ADMIN_PASSWORD must be at least 8 characters and contain uppercase, lowercase and number"
    );
  }

  const hashedPassword = await bcryptjs.hash(password, 12);
  const existing = await User.findOne({ username }).select("+password +tokenVersion");
  if (existing) {
    existing.fullName = fullName;
    existing.password = hashedPassword;
    existing.role = "admin";
    existing.isActive = true;
    existing.tokenVersion = (existing.tokenVersion || 0) + 1;
    await existing.save();
    console.log(`Admin updated: ${username}`);
    return;
  }

  await User.create({
    username,
    fullName,
    password: hashedPassword,
    role: "admin",
    isActive: true,
  });
  console.log(`Admin created: ${username}`);
};

const ensureCatalog = async () => {
  let brand = await Brand.findOne({ "slug.en": "novatech" });
  if (!brand) {
    brand = await Brand.create({
      name: { fa: "نوا تک", en: "NovaTech", ar: "نوفا تك" },
      description: {
        fa: "برند نمونه برای نمایش ساختار سه‌زبانه کاتالوگ.",
        en: "Sample brand for demonstrating the multilingual catalog structure.",
        ar: "علامة تجارية تجريبية لعرض بنية الكتالوج متعدد اللغات.",
      },
      country: { fa: "ایران", en: "Iran", ar: "إيران" },
      logo: image,
      coverImage: image,
      website: "https://example.com",
      isFeatured: true,
      isPublished: true,
      sortOrder: 1,
      seo: {
        title: { fa: "نوا تک", en: "NovaTech", ar: "نوفا تك" },
        description: {
          fa: "معرفی برند نوا تک",
          en: "NovaTech brand profile",
          ar: "ملف علامة نوفا تك",
        },
      },
    });
    console.log("Sample brand created");
  }

  let category = await ProductCategory.findOne({ "slug.en": "smart-devices" });
  if (!category) {
    category = await ProductCategory.create({
      name: { fa: "دستگاه‌های هوشمند", en: "Smart Devices", ar: "الأجهزة الذكية" },
      description: {
        fa: "دسته نمونه محصولات هوشمند.",
        en: "Sample category for smart products.",
        ar: "فئة تجريبية للمنتجات الذكية.",
      },
      image,
      isFeatured: true,
      isPublished: true,
      sortOrder: 1,
    });
    console.log("Sample product category created");
  }

  const existingProduct = await Product.findOne({ sku: "DEMO-X100" });
  if (!existingProduct) {
    await Product.create({
      brandId: brand._id,
      categoryId: category._id,
      name: { fa: "محصول هوشمند X100", en: "Smart Product X100", ar: "المنتج الذكي X100" },
      shortDescription: {
        fa: "یک محصول نمونه برای شروع توسعه فرانت‌اند.",
        en: "A sample product for starting frontend development.",
        ar: "منتج تجريبي لبدء تطوير الواجهة الأمامية.",
      },
      description: {
        fa: "این داده فقط نمونه است و می‌توانید از پنل مدیریت جایگزینش کنید.",
        en: "This is sample data and can be replaced from the admin panel.",
        ar: "هذه بيانات تجريبية ويمكن استبدالها من لوحة الإدارة.",
      },
      model: "X100",
      sku: "DEMO-X100",
      thumbnail: image,
      images: [image],
      features: [
        {
          title: { fa: "طراحی مدرن", en: "Modern Design", ar: "تصميم عصري" },
          description: {
            fa: "ویژگی نمونه برای نمایش ساختار Feature.",
            en: "Sample feature for demonstrating the feature structure.",
            ar: "ميزة تجريبية لعرض بنية الخصائص.",
          },
        },
      ],
      specifications: [
        {
          label: { fa: "مدل", en: "Model", ar: "الموديل" },
          value: { fa: "X100", en: "X100", ar: "X100" },
        },
      ],
      isFeatured: true,
      isPublished: true,
      sortOrder: 1,
      seo: {
        title: {
          fa: "محصول هوشمند X100",
          en: "Smart Product X100",
          ar: "المنتج الذكي X100",
        },
      },
    });
    console.log("Sample product created");
  }
};

try {
  await ensureAdmin();
  await ensureCatalog();
  console.log("Seed completed successfully");
} finally {
  await mongoose.connection.close();
}
