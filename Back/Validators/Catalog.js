const LANGUAGES = ["fa", "en", "ar"];
const isObjectId = (value) => /^[0-9a-fA-F]{24}$/.test(String(value || ""));
const HTTP_URL = /^https?:\/\//i;

const isPlainObject = (value) =>
  value && typeof value === "object" && !Array.isArray(value);

const add = (errors, path, message) => {
  if (!errors[path]) errors[path] = message;
};

const validateAllowedKeys = (value, allowed, errors, prefix = "body") => {
  Object.keys(value || {}).forEach((key) => {
    if (!allowed.includes(key)) add(errors, `${prefix}.${key}`, "Field is not allowed");
  });
};

const validateString = (
  value,
  path,
  errors,
  { required = false, max = 5000, min = 0, allowEmpty = true } = {}
) => {
  if (value === undefined || value === null) {
    if (required) add(errors, path, "Field is required");
    return;
  }
  if (typeof value !== "string") {
    add(errors, path, "Must be a string");
    return;
  }
  const trimmed = value.trim();
  if (!allowEmpty && !trimmed) add(errors, path, "Cannot be empty");
  if (trimmed.length < min) add(errors, path, `Must be at least ${min} characters`);
  if (trimmed.length > max) add(errors, path, `Must be at most ${max} characters`);
};

const validateBoolean = (value, path, errors) => {
  if (value !== undefined && typeof value !== "boolean") {
    add(errors, path, "Must be a boolean");
  }
};

const validateInteger = (value, path, errors, { min = 0, max = Number.MAX_SAFE_INTEGER } = {}) => {
  if (value === undefined) return;
  if (!Number.isInteger(value) || value < min || value > max) {
    add(errors, path, `Must be an integer between ${min} and ${max}`);
  }
};

const validateUrl = (value, path, errors, { allowEmpty = true } = {}) => {
  if (value === undefined || value === null) return;
  if (typeof value !== "string") return add(errors, path, "Must be a string");
  if (!value.trim() && allowEmpty) return;
  if (!HTTP_URL.test(value.trim())) add(errors, path, "Must be an http(s) URL");
};

const validateObjectId = (value, path, errors, required = false) => {
  if (value === undefined || value === null || value === "") {
    if (required) add(errors, path, "Field is required");
    return;
  }
  if (!isObjectId(value)) add(errors, path, "Must be a valid MongoDB ObjectId");
};

const validateLocalized = (
  value,
  path,
  errors,
  { required = false, requireAll = false, max = 10000, allowEmpty = false } = {}
) => {
  if (value === undefined || value === null) {
    if (required) add(errors, path, "Field is required");
    return;
  }
  if (!isPlainObject(value)) {
    add(errors, path, "Must be an object containing fa, en and ar");
    return;
  }
  validateAllowedKeys(value, LANGUAGES, errors, path);
  if (requireAll) {
    LANGUAGES.forEach((lang) =>
      validateString(value[lang], `${path}.${lang}`, errors, {
        required: true,
        max,
        allowEmpty,
      })
    );
  } else {
    LANGUAGES.forEach((lang) => {
      if (value[lang] !== undefined) {
        validateString(value[lang], `${path}.${lang}`, errors, { max, allowEmpty });
      }
    });
  }
};

const validateSeo = (value, errors, prefix = "body.seo") => {
  if (value === undefined) return;
  if (!isPlainObject(value)) return add(errors, prefix, "Must be an object");
  validateAllowedKeys(value, ["title", "description", "keywords"], errors, prefix);
  validateLocalized(value.title, `${prefix}.title`, errors, { max: 180, allowEmpty: true });
  validateLocalized(value.description, `${prefix}.description`, errors, {
    max: 500,
    allowEmpty: true,
  });

  if (value.keywords !== undefined) {
    if (!isPlainObject(value.keywords)) {
      add(errors, `${prefix}.keywords`, "Must be an object");
    } else {
      validateAllowedKeys(value.keywords, LANGUAGES, errors, `${prefix}.keywords`);
      LANGUAGES.forEach((lang) => {
        const keywords = value.keywords[lang];
        if (keywords === undefined) return;
        if (!Array.isArray(keywords)) {
          add(errors, `${prefix}.keywords.${lang}`, "Must be an array");
          return;
        }
        if (keywords.length > 30) add(errors, `${prefix}.keywords.${lang}`, "Maximum 30 keywords");
        keywords.forEach((keyword, index) =>
          validateString(keyword, `${prefix}.keywords.${lang}.${index}`, errors, {
            max: 80,
            allowEmpty: false,
          })
        );
      });
    }
  }
};

const commonCatalogFields = (body, errors) => {
  validateBoolean(body.isFeatured, "body.isFeatured", errors);
  validateBoolean(body.isPublished, "body.isPublished", errors);
  validateInteger(body.sortOrder, "body.sortOrder", errors, { min: 0, max: 1000000 });
  validateSeo(body.seo, errors);
  validateLocalized(body.slug, "body.slug", errors, { max: 160, allowEmpty: true });
};

const brandAllowed = [
  "name",
  "slug",
  "description",
  "country",
  "logo",
  "coverImage",
  "website",
  "socialLinks",
  "isFeatured",
  "isPublished",
  "sortOrder",
  "seo",
];

const validateBrand = (body, create) => {
  const errors = {};
  validateAllowedKeys(body, brandAllowed, errors);
  validateLocalized(body.name, "body.name", errors, {
    required: create,
    requireAll: create,
    max: 200,
  });
  validateLocalized(body.description, "body.description", errors, {
    required: create,
    requireAll: create,
    max: 10000,
  });
  validateLocalized(body.country, "body.country", errors, { max: 150, allowEmpty: true });
  validateString(body.logo, "body.logo", errors, { required: create, max: 500, allowEmpty: false });
  validateString(body.coverImage, "body.coverImage", errors, { max: 500, allowEmpty: true });
  validateUrl(body.website, "body.website", errors);

  if (body.socialLinks !== undefined) {
    if (!isPlainObject(body.socialLinks)) add(errors, "body.socialLinks", "Must be an object");
    else {
      validateAllowedKeys(
        body.socialLinks,
        ["instagram", "linkedin", "youtube"],
        errors,
        "body.socialLinks"
      );
      ["instagram", "linkedin", "youtube"].forEach((key) =>
        validateUrl(body.socialLinks[key], `body.socialLinks.${key}`, errors)
      );
    }
  }
  commonCatalogFields(body, errors);
  return errors;
};

const categoryAllowed = [
  "name",
  "slug",
  "description",
  "image",
  "icon",
  "isFeatured",
  "isPublished",
  "sortOrder",
  "seo",
];

const validateCategory = (body, create) => {
  const errors = {};
  validateAllowedKeys(body, categoryAllowed, errors);
  validateLocalized(body.name, "body.name", errors, {
    required: create,
    requireAll: create,
    max: 200,
  });
  validateLocalized(body.description, "body.description", errors, {
    max: 10000,
    allowEmpty: true,
  });
  validateString(body.image, "body.image", errors, { max: 500, allowEmpty: true });
  validateString(body.icon, "body.icon", errors, { max: 500, allowEmpty: true });
  commonCatalogFields(body, errors);
  return errors;
};

const productAllowed = [
  "brandId",
  "categoryId",
  "name",
  "slug",
  "shortDescription",
  "description",
  "model",
  "sku",
  "thumbnail",
  "images",
  "features",
  "specifications",
  "documents",
  "videoUrl",
  "relatedProductIds",
  "isFeatured",
  "isPublished",
  "sortOrder",
  "seo",
];

const validateProduct = (body, create) => {
  const errors = {};
  validateAllowedKeys(body, productAllowed, errors);
  validateObjectId(body.brandId, "body.brandId", errors, create);
  validateObjectId(body.categoryId, "body.categoryId", errors, create);
  validateLocalized(body.name, "body.name", errors, {
    required: create,
    requireAll: create,
    max: 250,
  });
  validateLocalized(body.shortDescription, "body.shortDescription", errors, {
    required: create,
    requireAll: create,
    max: 1000,
  });
  validateLocalized(body.description, "body.description", errors, {
    required: create,
    requireAll: create,
    max: 30000,
  });
  validateString(body.model, "body.model", errors, { max: 200, allowEmpty: true });
  validateString(body.sku, "body.sku", errors, { max: 200, allowEmpty: true });
  validateString(body.thumbnail, "body.thumbnail", errors, {
    required: create,
    max: 500,
    allowEmpty: false,
  });
  validateUrl(body.videoUrl, "body.videoUrl", errors);
  commonCatalogFields(body, errors);

  if (body.images !== undefined) {
    if (!Array.isArray(body.images)) add(errors, "body.images", "Must be an array");
    else {
      if (body.images.length > 30) add(errors, "body.images", "Maximum 30 images");
      body.images.forEach((item, i) =>
        validateString(item, `body.images.${i}`, errors, { max: 500, allowEmpty: false })
      );
    }
  }

  if (body.relatedProductIds !== undefined) {
    if (!Array.isArray(body.relatedProductIds)) add(errors, "body.relatedProductIds", "Must be an array");
    else {
      if (body.relatedProductIds.length > 20) add(errors, "body.relatedProductIds", "Maximum 20 related products");
      body.relatedProductIds.forEach((id, i) =>
        validateObjectId(id, `body.relatedProductIds.${i}`, errors, true)
      );
    }
  }

  if (body.features !== undefined) {
    if (!Array.isArray(body.features)) add(errors, "body.features", "Must be an array");
    else {
      if (body.features.length > 50) add(errors, "body.features", "Maximum 50 features");
      body.features.forEach((item, i) => {
        if (!isPlainObject(item)) return add(errors, `body.features.${i}`, "Must be an object");
        validateAllowedKeys(item, ["title", "description", "icon"], errors, `body.features.${i}`);
        validateLocalized(item.title, `body.features.${i}.title`, errors, {
          required: true,
          requireAll: true,
          max: 250,
        });
        validateLocalized(item.description, `body.features.${i}.description`, errors, {
          max: 3000,
          allowEmpty: true,
        });
        validateString(item.icon, `body.features.${i}.icon`, errors, { max: 500, allowEmpty: true });
      });
    }
  }

  if (body.specifications !== undefined) {
    if (!Array.isArray(body.specifications)) add(errors, "body.specifications", "Must be an array");
    else {
      if (body.specifications.length > 100) add(errors, "body.specifications", "Maximum 100 specifications");
      body.specifications.forEach((item, i) => {
        if (!isPlainObject(item)) return add(errors, `body.specifications.${i}`, "Must be an object");
        validateAllowedKeys(item, ["label", "value"], errors, `body.specifications.${i}`);
        validateLocalized(item.label, `body.specifications.${i}.label`, errors, {
          required: true,
          requireAll: true,
          max: 250,
        });
        validateLocalized(item.value, `body.specifications.${i}.value`, errors, {
          required: true,
          requireAll: true,
          max: 2000,
        });
      });
    }
  }

  if (body.documents !== undefined) {
    if (!Array.isArray(body.documents)) add(errors, "body.documents", "Must be an array");
    else {
      if (body.documents.length > 20) add(errors, "body.documents", "Maximum 20 documents");
      body.documents.forEach((item, i) => {
        if (!isPlainObject(item)) return add(errors, `body.documents.${i}`, "Must be an object");
        validateAllowedKeys(item, ["title", "url"], errors, `body.documents.${i}`);
        validateLocalized(item.title, `body.documents.${i}.title`, errors, {
          required: true,
          requireAll: true,
          max: 250,
        });
        validateString(item.url, `body.documents.${i}.url`, errors, {
          required: true,
          max: 500,
          allowEmpty: false,
        });
      });
    }
  }

  return errors;
};

export const validateBrandCreate = (body) => validateBrand(body, true);
export const validateBrandPatch = (body) => validateBrand(body, false);
export const validateCategoryCreate = (body) => validateCategory(body, true);
export const validateCategoryPatch = (body) => validateCategory(body, false);
export const validateProductCreate = (body) => validateProduct(body, true);
export const validateProductPatch = (body) => validateProduct(body, false);

export const validateMongoIdParam = (params) => {
  const errors = {};
  validateObjectId(params.id, "params.id", errors, true);
  return errors;
};

export const validateReorder = (body) => {
  const errors = {};
  validateAllowedKeys(body, ["items"], errors);
  if (!Array.isArray(body.items) || body.items.length === 0) {
    add(errors, "body.items", "Must be a non-empty array");
    return errors;
  }
  if (body.items.length > 500) add(errors, "body.items", "Maximum 500 items");
  const ids = new Set();
  body.items.forEach((item, index) => {
    const prefix = `body.items.${index}`;
    if (!isPlainObject(item)) return add(errors, prefix, "Must be an object");
    validateAllowedKeys(item, ["id", "sortOrder"], errors, prefix);
    validateObjectId(item.id, `${prefix}.id`, errors, true);
    validateInteger(item.sortOrder, `${prefix}.sortOrder`, errors, { min: 0, max: 1000000 });
    if (item.id && ids.has(String(item.id))) add(errors, `${prefix}.id`, "Duplicate id");
    ids.add(String(item.id));
  });
  return errors;
};
