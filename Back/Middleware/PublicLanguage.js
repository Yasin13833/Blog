import { normalizeLanguage } from "../Utils/Localization.js";
import { ApiError } from "../Utils/Api.js";

const firstAcceptedLanguage = (header = "") =>
  String(header)
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase().split("-")[0])
    .find((lang) => normalizeLanguage(lang));

const PublicLanguage = (req, res, next) => {
  const queryLanguage = req.query.lang;
  if (queryLanguage && !normalizeLanguage(queryLanguage)) {
    return next(
      new ApiError(
        "Unsupported language. Use fa, en or ar.",
        400,
        "UNSUPPORTED_LANGUAGE",
        { "query.lang": "Use fa, en or ar" }
      )
    );
  }

  const defaultLanguage = normalizeLanguage(process.env.DEFAULT_LANGUAGE) || "fa";
  req.language =
    normalizeLanguage(queryLanguage) ||
    firstAcceptedLanguage(req.headers["accept-language"]) ||
    defaultLanguage;

  next();
};

export default PublicLanguage;
