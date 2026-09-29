import swaggerJSDoc from "swagger-jsdoc";

const localizedText = {
  type: "object",
  required: ["fa", "en", "ar"],
  properties: {
    fa: { type: "string" },
    en: { type: "string" },
    ar: { type: "string" },
  },
};

const optionalLocalizedText = {
  type: "object",
  properties: {
    fa: { type: "string" },
    en: { type: "string" },
    ar: { type: "string" },
  },
};

const seo = {
  type: "object",
  properties: {
    title: optionalLocalizedText,
    description: optionalLocalizedText,
    keywords: {
      type: "object",
      properties: {
        fa: { type: "array", maxItems: 30, items: { type: "string" } },
        en: { type: "array", maxItems: 30, items: { type: "string" } },
        ar: { type: "array", maxItems: 30, items: { type: "string" } },
      },
    },
  },
};

const brandProperties = {
  name: localizedText,
  slug: optionalLocalizedText,
  description: localizedText,
  country: optionalLocalizedText,
  logo: { type: "string" },
  coverImage: { type: "string" },
  website: { type: "string", format: "uri" },
  socialLinks: {
    type: "object",
    properties: {
      instagram: { type: "string", format: "uri" },
      linkedin: { type: "string", format: "uri" },
      youtube: { type: "string", format: "uri" },
    },
  },
  isFeatured: { type: "boolean", default: false },
  isPublished: { type: "boolean", default: false },
  sortOrder: { type: "integer", minimum: 0, default: 0 },
  seo,
};

const categoryProperties = {
  name: localizedText,
  slug: optionalLocalizedText,
  description: optionalLocalizedText,
  image: { type: "string" },
  icon: { type: "string" },
  isFeatured: { type: "boolean", default: false },
  isPublished: { type: "boolean", default: true },
  sortOrder: { type: "integer", minimum: 0, default: 0 },
  seo,
};

const productProperties = {
  brandId: { type: "string" },
  categoryId: { type: "string" },
  name: localizedText,
  slug: optionalLocalizedText,
  shortDescription: localizedText,
  description: localizedText,
  model: { type: "string" },
  sku: { type: "string" },
  thumbnail: { type: "string" },
  images: { type: "array", maxItems: 30, items: { type: "string" } },
  features: {
    type: "array",
    maxItems: 50,
    items: {
      type: "object",
      required: ["title"],
      properties: {
        title: localizedText,
        description: optionalLocalizedText,
        icon: { type: "string" },
      },
    },
  },
  specifications: {
    type: "array",
    maxItems: 100,
    items: {
      type: "object",
      required: ["label", "value"],
      properties: { label: localizedText, value: localizedText },
    },
  },
  documents: {
    type: "array",
    maxItems: 20,
    items: {
      type: "object",
      required: ["title", "url"],
      properties: { title: localizedText, url: { type: "string" } },
    },
  },
  videoUrl: { type: "string", format: "uri" },
  relatedProductIds: { type: "array", maxItems: 20, items: { type: "string" } },
  isFeatured: { type: "boolean", default: false },
  isPublished: { type: "boolean", default: false },
  sortOrder: { type: "integer", minimum: 0, default: 0 },
  seo,
};

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Multilingual Product Catalog API",
      version: "3.0.1",
      description:
        "Three-language (fa/en/ar) brand and product showcase API. Public endpoints return only published content. Admin endpoints use JWT authentication and standardized responses/errors.",
    },
    servers: [
      {
        url: process.env.API_BASE_URL || "http://localhost:5000",
        description: "API server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
      parameters: {
        Language: {
          in: "query",
          name: "lang",
          schema: { type: "string", enum: ["fa", "en", "ar"] },
          description: "Response language. Falls back to Accept-Language then DEFAULT_LANGUAGE.",
        },
        Page: {
          in: "query",
          name: "page",
          schema: { type: "integer", minimum: 1, default: 1 },
        },
        Limit: {
          in: "query",
          name: "limit",
          schema: { type: "integer", minimum: 1, maximum: 100, default: 12 },
        },
        Featured: {
          in: "query",
          name: "featured",
          schema: { type: "boolean" },
        },
        Search: {
          in: "query",
          name: "q",
          schema: { type: "string", maxLength: 100 },
        },
        Sort: {
          in: "query",
          name: "sort",
          schema: { type: "string", enum: ["order", "newest", "oldest", "name"] },
        },
        AdminStatus: {
          in: "query",
          name: "status",
          schema: { type: "string", enum: ["all", "draft", "published"], default: "all" },
        },
      },
      schemas: {
        LocalizedText: localizedText,
        OptionalLocalizedText: optionalLocalizedText,
        Seo: seo,
        Pagination: {
          type: "object",
          properties: {
            page: { type: "integer" },
            limit: { type: "integer" },
            total: { type: "integer" },
            totalPages: { type: "integer" },
            hasNextPage: { type: "boolean" },
            hasPrevPage: { type: "boolean" },
          },
        },
        SuccessResponse: {
          type: "object",
          required: ["success", "message", "data"],
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: { nullable: true },
            meta: { type: "object", additionalProperties: true },
          },
        },
        ErrorResponse: {
          type: "object",
          required: ["success", "message", "code"],
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
            code: { type: "string", example: "VALIDATION_ERROR" },
            errors: {
              type: "object",
              additionalProperties: { type: "string" },
              example: { "body.name.fa": "Field is required" },
            },
            meta: { type: "object", additionalProperties: true },
          },
        },
        LoginInput: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: { type: "string", example: "admin" },
            password: { type: "string", format: "password" },
          },
        },
        ChangePasswordInput: {
          type: "object",
          required: ["currentPassword", "newPassword"],
          properties: {
            currentPassword: { type: "string", format: "password" },
            newPassword: { type: "string", format: "password" },
          },
        },
        ReorderInput: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              minItems: 1,
              maxItems: 500,
              items: {
                type: "object",
                required: ["id", "sortOrder"],
                properties: {
                  id: { type: "string" },
                  sortOrder: { type: "integer", minimum: 0 },
                },
              },
            },
          },
        },
        BrandInput: {
          type: "object",
          required: ["name", "description", "logo"],
          properties: brandProperties,
        },
        BrandPatch: {
          type: "object",
          properties: {
            ...brandProperties,
            name: optionalLocalizedText,
            description: optionalLocalizedText,
            country: optionalLocalizedText,
          },
        },
        ProductCategoryInput: {
          type: "object",
          required: ["name"],
          properties: categoryProperties,
        },
        ProductCategoryPatch: {
          type: "object",
          properties: {
            ...categoryProperties,
            name: optionalLocalizedText,
            description: optionalLocalizedText,
          },
        },
        ProductInput: {
          type: "object",
          required: ["brandId", "categoryId", "name", "shortDescription", "description", "thumbnail"],
          properties: productProperties,
        },
        ProductPatch: {
          type: "object",
          properties: {
            ...productProperties,
            name: optionalLocalizedText,
            shortDescription: optionalLocalizedText,
            description: optionalLocalizedText,
          },
        },
      },
      responses: {
        Success: {
          description: "Successful response",
          content: { "application/json": { schema: { $ref: "#/components/schemas/SuccessResponse" } } },
        },
        ValidationError: {
          description: "Request validation failed",
          content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
        },
        Unauthorized: {
          description: "Authentication required or token is invalid",
          content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
        },
        NotFound: {
          description: "Resource not found",
          content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
        },
      },
    },
  },
  apis: ["./Routes/Auth.js", "./Routes/Public/*.js", "./Routes/Admin/*.js"],
};

export default swaggerJSDoc(options);
