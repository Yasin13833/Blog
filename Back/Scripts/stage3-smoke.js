import {
  validateAdminListQuery,
  validateLoginBody,
  validateProductDetailQuery,
  validatePublicListQuery,
  validatePublicProductListQuery,
  validateSearchQuery,
} from "../Validators/Request.js";
import {
  validateBrandCreate,
  validateBrandPatch,
  validateProductCreate,
  validateReorder,
} from "../Validators/Catalog.js";
import { localizeDeep } from "../Utils/Localization.js";
import { fillLocalizedSlugs } from "../Utils/Slug.js";

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(
  Object.keys(validatePublicListQuery({ page: "1", limit: "12", featured: "true", sort: "newest" })).length === 0,
  "Valid public list query was rejected"
);
assert(validatePublicListQuery({ limit: "0" })["query.limit"], "Invalid limit was accepted");
assert(
  Object.keys(validatePublicProductListQuery({ brand: "novatech", category: "smart-devices", sort: "order" })).length === 0,
  "Valid product filters were rejected"
);
assert(
  Object.keys(validateAdminListQuery({ status: "draft", sort: "order" })).length === 0,
  "Valid admin query was rejected"
);
assert(validateAdminListQuery({ status: "invalid" })["query.status"], "Invalid admin status was accepted");
assert(
  Object.keys(validateLoginBody({ username: "admin", password: "Test1234" })).length === 0,
  "Valid login payload was rejected"
);
assert(validateSearchQuery({ q: "" })["query.q"], "Empty search query was accepted");
assert(
  Object.keys(validateProductDetailQuery({ relatedLimit: "0", lang: "fa" })).length === 0,
  "relatedLimit=0 was rejected"
);

const localized = { fa: "نام فارسی", en: "English Name", ar: "اسم عربي" };
assert(
  Object.keys(validateBrandCreate({ name: localized, description: localized, logo: "/upload/logo.jpg" })).length === 0,
  "Valid brand create payload was rejected"
);
assert(
  Object.keys(validateBrandPatch({ name: { fa: "نام جدید" } })).length === 0,
  "Partial localized patch was rejected"
);
const productErrors = validateProductCreate({
  brandId: "bad",
  categoryId: "bad",
  name: localized,
  shortDescription: localized,
  description: localized,
  thumbnail: "/upload/product.jpg",
});
assert(productErrors["body.brandId"] && productErrors["body.categoryId"], "Invalid product relation IDs were accepted");
assert(
  Object.keys(validateReorder({ items: [{ id: "507f1f77bcf86cd799439011", sortOrder: 0 }] })).length === 0,
  "Valid reorder payload was rejected"
);

const localizedResult = localizeDeep({ title: localized }, "en");
assert(localizedResult.title === "English Name", "Localization smoke test failed");
const slugs = fillLocalizedSlugs(localized, {});
assert(slugs.fa && slugs.en && slugs.ar, "Localized slug generation failed");

console.log("Stage 3 smoke tests passed.");
