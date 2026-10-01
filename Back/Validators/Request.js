const isObjectId = (value) => /^[0-9a-fA-F]{24}$/.test(String(value || ""));

const add = (errors, path, message) => {
  if (!errors[path]) errors[path] = message;
};

const integerQuery = (value, path, errors, min, max) => {
  if (value === undefined) return;
  if (!/^\d+$/.test(String(value))) return add(errors, path, "Must be an integer");
  const number = Number(value);
  if (number < min || number > max) add(errors, path, `Must be between ${min} and ${max}`);
};

const booleanQuery = (value, path, errors) => {
  if (value === undefined) return;
  if (!["true", "false"].includes(String(value))) add(errors, path, "Must be true or false");
};

const stringQuery = (value, path, errors, max = 100) => {
  if (value === undefined) return;
  if (typeof value !== "string") return add(errors, path, "Must be a string");
  if (value.trim().length > max) add(errors, path, `Must be at most ${max} characters`);
};

const enumQuery = (value, path, errors, values) => {
  if (value === undefined) return;
  if (!values.includes(String(value))) add(errors, path, `Must be one of: ${values.join(", ")}`);
};

const allowedQuery = (query, allowed, errors) => {
  Object.keys(query || {}).forEach((key) => {
    if (!allowed.includes(key)) add(errors, `query.${key}`, "Query parameter is not allowed");
  });
};

export const validatePublicListQuery = (query) => {
  const errors = {};
  allowedQuery(query, ["page", "limit", "featured", "q", "sort", "lang"], errors);
  integerQuery(query.page, "query.page", errors, 1, 1000000);
  integerQuery(query.limit, "query.limit", errors, 1, 100);
  booleanQuery(query.featured, "query.featured", errors);
  stringQuery(query.q, "query.q", errors, 100);
  enumQuery(query.sort, "query.sort", errors, ["order", "newest", "oldest", "name"]);
  return errors;
};

export const validatePublicProductListQuery = (query) => {
  const errors = validatePublicListQuery(query);
  const extraAllowed = ["page", "limit", "featured", "q", "sort", "lang", "brand", "category"];
  Object.keys(query || {}).forEach((key) => {
    if (!extraAllowed.includes(key)) errors[`query.${key}`] = "Query parameter is not allowed";
  });
  delete errors["query.brand"];
  delete errors["query.category"];
  stringQuery(query.brand, "query.brand", errors, 200);
  stringQuery(query.category, "query.category", errors, 200);
  return errors;
};

export const validateAdminListQuery = (query) => {
  const errors = {};
  allowedQuery(
    query,
    ["page", "limit", "featured", "published", "status", "q", "sort", "brandId", "categoryId"],
    errors
  );
  integerQuery(query.page, "query.page", errors, 1, 1000000);
  integerQuery(query.limit, "query.limit", errors, 1, 100);
  booleanQuery(query.featured, "query.featured", errors);
  booleanQuery(query.published, "query.published", errors);
  enumQuery(query.status, "query.status", errors, ["all", "draft", "published"]);
  enumQuery(query.sort, "query.sort", errors, ["order", "newest", "oldest", "name"]);
  stringQuery(query.q, "query.q", errors, 100);
  ["brandId", "categoryId"].forEach((field) => {
    if (query[field] !== undefined && !isObjectId(query[field])) {
      add(errors, `query.${field}`, "Must be a valid MongoDB ObjectId");
    }
  });
  return errors;
};

export const validateProductDetailQuery = (query) => {
  const errors = {};
  allowedQuery(query, ["lang", "relatedLimit"], errors);
  integerQuery(query.relatedLimit, "query.relatedLimit", errors, 0, 20);
  return errors;
};

export const validateRelationDetailQuery = (query) => {
  const errors = {};
  allowedQuery(query, ["lang", "productLimit"], errors);
  integerQuery(query.productLimit, "query.productLimit", errors, 1, 50);
  return errors;
};

export const validateSearchQuery = (query) => {
  const errors = {};
  allowedQuery(query, ["q", "limit", "lang"], errors);
  if (!String(query.q || "").trim()) add(errors, "query.q", "Search query is required");
  stringQuery(query.q, "query.q", errors, 100);
  integerQuery(query.limit, "query.limit", errors, 1, 20);
  return errors;
};

export const validateHomeQuery = (query) => {
  const errors = {};
  allowedQuery(query, ["limit", "lang"], errors);
  integerQuery(query.limit, "query.limit", errors, 1, 20);
  return errors;
};

export const validateRelatedQuery = (query) => {
  const errors = {};
  allowedQuery(query, ["limit", "lang"], errors);
  integerQuery(query.limit, "query.limit", errors, 1, 20);
  return errors;
};

export const validateLoginBody = (body) => {
  const errors = {};
  const allowed = ["username", "password"];
  Object.keys(body || {}).forEach((key) => {
    if (!allowed.includes(key)) add(errors, `body.${key}`, "Field is not allowed");
  });
  if (!String(body.username || "").trim()) add(errors, "body.username", "Username is required");
  if (!String(body.password || "")) add(errors, "body.password", "Password is required");
  if (String(body.username || "").length > 100) add(errors, "body.username", "Maximum 100 characters");
  if (String(body.password || "").length > 200) add(errors, "body.password", "Maximum 200 characters");
  return errors;
};

export const validateChangePasswordBody = (body) => {
  const errors = {};
  const allowed = ["currentPassword", "newPassword"];
  Object.keys(body || {}).forEach((key) => {
    if (!allowed.includes(key)) add(errors, `body.${key}`, "Field is not allowed");
  });
  if (!String(body.currentPassword || "")) add(errors, "body.currentPassword", "Current password is required");
  const next = String(body.newPassword || "");
  if (!next) add(errors, "body.newPassword", "New password is required");
  else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(next)) {
    add(errors, "body.newPassword", "Must be at least 8 characters and include uppercase, lowercase and number");
  }
  return errors;
};
