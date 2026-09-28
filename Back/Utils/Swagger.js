const localizedString = {
  type: "object",
  properties: {
    fa: { type: "string" },
    en: { type: "string" },
    ar: { type: "string" },
  },
};

const localizedStringArray = {
  type: "object",
  properties: {
    fa: { type: "array", items: { type: "string" } },
    en: { type: "array", items: { type: "string" } },
    ar: { type: "array", items: { type: "string" } },
  },
};

const media = {
  type: "object",
  properties: {
    filename: { type: "string", example: "product-1730000000000-uuid.webp" },
    originalName: { type: "string", example: "product.webp" },
    url: { type: "string", example: "/uploads/product-1730000000000-uuid.webp" },
    mimeType: { type: "string", example: "image/webp" },
    size: { type: "integer", description: "File size in bytes" },
    alt: localizedString,
  },
};

const seo = {
  type: "object",
  properties: {
    metaTitle: localizedString,
    metaDescription: localizedString,
    keywords: localizedStringArray,
    canonicalUrl: localizedString,
    noIndex: { type: "boolean", default: false },
    ogImage: media,
  },
};

const status = {
  type: "string",
  enum: ["draft", "published", "archived"],
  default: "draft",
};

const translationName = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" },
    shortDescription: { type: "string" },
    description: { type: "string" },
  },
};

const categoryTranslation = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" },
    description: { type: "string" },
  },
};

const postTranslation = {
  type: "object",
  required: ["title", "content"],
  properties: {
    title: { type: "string" },
    excerpt: { type: "string" },
    content: { type: "string" },
  },
};

const triTranslations = (schema) => ({
  type: "object",
  required: ["fa", "en", "ar"],
  properties: {
    fa: schema,
    en: schema,
    ar: schema,
  },
});

const listParameters = [
  { name: "lang", in: "query", schema: { type: "string", enum: ["fa", "en", "ar"] } },
  { name: "q", in: "query", description: "vanta-api full text/regex search input", schema: { type: "string" } },
  { name: "page", in: "query", schema: { type: "integer", minimum: 1, default: 1 } },
  { name: "limit", in: "query", schema: { type: "integer", minimum: 1 } },
  { name: "sort", in: "query", description: "vanta-api sort expression, e.g. -createdAt", schema: { type: "string" } },
  { name: "fields", in: "query", description: "vanta-api projection/field limiting", schema: { type: "string" } },
];

const bearer = [{ bearerAuth: [] }];

const jsonBody = (schemaRef) => ({
  required: true,
  content: {
    "application/json": {
      schema: { $ref: `#/components/schemas/${schemaRef}` },
    },
  },
});

const basicResponses = {
  400: { $ref: "#/components/responses/BadRequest" },
  401: { $ref: "#/components/responses/Unauthorized" },
  403: { $ref: "#/components/responses/Forbidden" },
  404: { $ref: "#/components/responses/NotFound" },
  429: { $ref: "#/components/responses/TooManyRequests" },
};

const crudPaths = ({ base, tag, schema, identifierDescription = "MongoDB id or localized slug" }) => ({
  [base]: {
    get: {
      tags: [tag],
      summary: `List ${tag.toLowerCase()}`,
      parameters: listParameters,
      responses: { 200: { description: "Paginated result from vanta-api" }, ...basicResponses },
    },
    post: {
      tags: [tag],
      summary: `Create ${tag.replace(/s$/, "")}`,
      security: bearer,
      requestBody: jsonBody(schema),
      responses: { 201: { description: "Created" }, ...basicResponses },
    },
  },
  [`${base}/{identifier}`]: {
    get: {
      tags: [tag],
      summary: `Get one ${tag.replace(/s$/, "").toLowerCase()}`,
      parameters: [
        { name: "identifier", in: "path", required: true, description: identifierDescription, schema: { type: "string" } },
        { name: "lang", in: "query", schema: { type: "string", enum: ["fa", "en", "ar"] } },
      ],
      responses: { 200: { description: "Resource" }, ...basicResponses },
    },
    patch: {
      tags: [tag],
      summary: `Update ${tag.replace(/s$/, "").toLowerCase()}`,
      description: "For PATCH/DELETE, identifier must be a MongoDB ObjectId.",
      security: bearer,
      parameters: [{ name: "identifier", in: "path", required: true, schema: { type: "string" } }],
      requestBody: jsonBody(schema),
      responses: { 200: { description: "Updated" }, ...basicResponses },
    },
    delete: {
      tags: [tag],
      summary: `Delete ${tag.replace(/s$/, "").toLowerCase()}`,
      description: "identifier must be a MongoDB ObjectId.",
      security: bearer,
      parameters: [{ name: "identifier", in: "path", required: true, schema: { type: "string" } }],
      responses: { 200: { description: "Deleted" }, 409: { description: "Resource is still referenced" }, ...basicResponses },
    },
  },
});

export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Multilingual Brand & Blog API",
    version: "3.1.0",
    description:
      "Modular Monolith REST API for a Persian/English/Arabic brand, product and blog website. Query features are powered by vanta-api and images are stored locally under Public/uploads.",
  },
  servers: [{ url: "/api", description: "API" }],
  tags: [
    { name: "Auth" },
    { name: "Brands" },
    { name: "Products" },
    { name: "Product Categories" },
    { name: "Posts" },
    { name: "Blog Categories" },
    { name: "Upload" },
    { name: "Search" },
    { name: "Dashboard" },
    { name: "Settings" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    responses: {
      BadRequest: { description: "Validation or malformed request" },
      Unauthorized: { description: "Authentication required or invalid token" },
      Forbidden: { description: "Insufficient access" },
      NotFound: { description: "Resource not found" },
      TooManyRequests: { description: "Rate limit exceeded" },
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string" },
          errors: { type: "array", items: { type: "object" } },
        },
      },
      LocalizedString: localizedString,
      Media: media,
      Seo: seo,
      AuthLogin: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string", example: "admin" },
          password: { type: "string", format: "password", example: "StrongPass123" },
        },
      },
      AdminBootstrap: {
        type: "object",
        required: ["fullName", "username", "password"],
        properties: {
          fullName: { type: "string", example: "Site Admin" },
          username: { type: "string", example: "admin" },
          password: { type: "string", format: "password", example: "StrongPass123" },
        },
      },
      BrandInput: {
        type: "object",
        required: ["translations"],
        properties: {
          translations: triTranslations(translationName),
          slug: localizedString,
          logo: media,
          coverImage: media,
          website: { type: "string", format: "uri" },
          country: localizedString,
          foundedYear: { type: "integer" },
          socialLinks: { type: "object", additionalProperties: { type: "string" } },
          status,
          featured: { type: "boolean" },
          seo,
        },
      },
      CategoryInput: {
        type: "object",
        required: ["translations"],
        properties: {
          translations: triTranslations(categoryTranslation),
          slug: localizedString,
          parent: { type: "string", nullable: true, description: "Parent category ObjectId" },
          icon: media,
          status,
          seo,
        },
      },
      ProductInput: {
        type: "object",
        required: ["translations", "brandId", "categoryId"],
        properties: {
          translations: triTranslations(translationName),
          slug: localizedString,
          brandId: { type: "string" },
          categoryId: { type: "string" },
          sku: { type: "string" },
          images: { type: "array", items: media },
          specifications: {
            type: "array",
            items: {
              type: "object",
              properties: { key: localizedString, value: localizedString, group: localizedString },
            },
          },
          features: localizedStringArray,
          price: { type: "number", minimum: 0 },
          currency: { type: "string", example: "USD" },
          productUrl: { type: "string", format: "uri" },
          status,
          featured: { type: "boolean" },
          seo,
        },
      },
      PostInput: {
        type: "object",
        required: ["translations", "blogCategoryId"],
        properties: {
          translations: triTranslations(postTranslation),
          slug: localizedString,
          blogCategoryId: { type: "string" },
          coverImage: media,
          images: { type: "array", items: media },
          tags: localizedStringArray,
          relatedProducts: { type: "array", items: { type: "string" } },
          relatedBrands: { type: "array", items: { type: "string" } },
          status,
          featured: { type: "boolean" },
          seo,
        },
      },
      SiteSettingsInput: {
        type: "object",
        properties: {
          siteName: localizedString,
          tagline: localizedString,
          about: localizedString,
          logo: media,
          favicon: media,
          contact: {
            type: "object",
            properties: { email: { type: "string", format: "email" }, phone: { type: "string" }, address: localizedString },
          },
          socialLinks: { type: "object", additionalProperties: { type: "string" } },
          defaultSeo: seo,
          defaultLanguage: { type: "string", enum: ["fa", "en", "ar"] },
          supportedLanguages: { type: "array", items: { type: "string", enum: ["fa", "en", "ar"] } },
          maintenanceMode: { type: "boolean" },
        },
      },
    },
  },
  paths: {
    "/auth/bootstrap": {
      post: {
        tags: ["Auth"],
        summary: "Create the initial admin once",
        requestBody: jsonBody("AdminBootstrap"),
        responses: { 201: { description: "Initial admin created" }, 403: { description: "An admin already exists" }, ...basicResponses },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Admin login",
        requestBody: jsonBody("AuthLogin"),
        responses: { 200: { description: "JWT and admin profile" }, ...basicResponses },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Current admin profile",
        security: bearer,
        responses: { 200: { description: "Admin profile" }, ...basicResponses },
      },
    },
    ...crudPaths({ base: "/brands", tag: "Brands", schema: "BrandInput" }),
    ...crudPaths({ base: "/products", tag: "Products", schema: "ProductInput" }),
    ...crudPaths({ base: "/product-categories", tag: "Product Categories", schema: "CategoryInput" }),
    ...crudPaths({ base: "/posts", tag: "Posts", schema: "PostInput" }),
    ...crudPaths({ base: "/blog-categories", tag: "Blog Categories", schema: "CategoryInput" }),
    "/upload": {
      post: {
        tags: ["Upload"],
        summary: "Upload a single image to local storage",
        security: bearer,
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: { type: "object", required: ["file"], properties: { file: { type: "string", format: "binary" } } },
            },
          },
        },
        responses: { 201: { description: "Local file metadata and public URL" }, ...basicResponses },
      },
      delete: {
        tags: ["Upload"],
        summary: "Delete a local uploaded image",
        security: bearer,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                description: "Send either filename or the /uploads/... URL returned by the upload endpoint.",
                properties: {
                  filename: { type: "string" },
                  url: { type: "string", example: "/uploads/example.webp" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Asset removed" }, ...basicResponses },
      },
    },
    "/upload/multi": {
      post: {
        tags: ["Upload"],
        summary: "Upload up to 10 images to local storage",
        security: bearer,
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: { type: "object", required: ["files"], properties: { files: { type: "array", maxItems: 10, items: { type: "string", format: "binary" } } } },
            },
          },
        },
        responses: { 201: { description: "Uploaded assets" }, ...basicResponses },
      },
    },
    "/search": {
      get: {
        tags: ["Search"],
        summary: "Global multilingual search",
        parameters: [
          { name: "q", in: "query", required: true, schema: { type: "string", minLength: 2 } },
          { name: "lang", in: "query", schema: { type: "string", enum: ["fa", "en", "ar"], default: "fa" } },
          { name: "type", in: "query", schema: { type: "string", enum: ["all", "brands", "products", "productCategories", "posts", "blogCategories"] } },
          { name: "page", in: "query", schema: { type: "integer", minimum: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", minimum: 1, maximum: 50 } },
        ],
        responses: { 200: { description: "Search results" }, ...basicResponses },
      },
    },
    "/admin/dashboard": {
      get: {
        tags: ["Dashboard"],
        summary: "Admin dashboard overview",
        security: bearer,
        responses: { 200: { description: "Counts and latest content" }, ...basicResponses },
      },
    },
    "/settings": {
      get: {
        tags: ["Settings"],
        summary: "Get public site settings",
        responses: { 200: { description: "Settings" }, ...basicResponses },
      },
      patch: {
        tags: ["Settings"],
        summary: "Update site settings",
        security: bearer,
        requestBody: jsonBody("SiteSettingsInput"),
        responses: { 200: { description: "Updated settings" }, ...basicResponses },
      },
    },
  },
};

export const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
  },
  customSiteTitle: "Blog API Documentation",
};
