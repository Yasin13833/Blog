# Multilingual Product Catalog API - Stage 3

Backend API for a three-language (`fa`, `en`, `ar`) brand and product showcase website. The website is catalog-only: there are no orders, payments, carts, or customer accounts.

## Requirements

- Node.js 20+
- MongoDB

## Setup

```bash
cp config.example.env config.env
npm install
npm run migrate:stage2   # only when upgrading an old Stage 1 database
npm run seed
npm run check
npm run dev
```

Swagger UI:

```text
http://localhost:5000/api-docs
```

Health check:

```text
GET /api/health
```

## Stage 3 API groups

### Public

- `GET /api/public/home`
- `GET /api/public/products`
- `GET /api/public/products/:identifier`
- `GET /api/public/products/:identifier/related`
- `GET /api/public/brands`
- `GET /api/public/brands/:identifier`
- `GET /api/public/product-categories`
- `GET /api/public/product-categories/:identifier`
- `GET /api/public/search`

Public endpoints expose only published content. Language can be selected with `?lang=fa|en|ar`, then `Accept-Language`, then `DEFAULT_LANGUAGE`.

### Admin authentication

- `POST /api/auth/login`
- `GET /api/auth/me`
- `PATCH /api/auth/change-password`

### Admin dashboard

- `GET /api/admin/dashboard`

### Admin catalog

Each of Products, Brands, and Product Categories supports list, detail, create, patch, delete, publish, unpublish, and reorder.

Examples:

```text
GET   /api/admin/products?status=draft&page=1&limit=20&q=x100&sort=newest
PATCH /api/admin/products/reorder
PATCH /api/admin/products/:id/publish
PATCH /api/admin/products/:id/unpublish
```

The same reorder/publish/unpublish pattern exists for:

```text
/api/admin/brands
/api/admin/product-categories
```

### Admin media

- `POST /api/admin/media/image` (`file`)
- `POST /api/admin/media/images` (`files`, max 10)
- `POST /api/admin/media/document` (`file`, PDF)
- `DELETE /api/admin/media/:filename`

A media file cannot be deleted while referenced by a brand, category, or product.

## vanta-api integration

This project uses `vanta-api ^1.2.7`, matching the Vanta integration used in Stage 2.

- Controllers use `catchAsync` from `vanta-api`.
- `ApiError` extends Vanta `HandleERROR` so Stage 3 error codes/metadata remain available.
- `catchError` from `vanta-api` is the final global error middleware in `app.js`.
- Project validation and the Stage 3 success/error response contract are preserved.

After installing dependencies, `npm run check` also verifies the expected Vanta exports.

## Standard response contract

Successful response:

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [],
  "meta": {
    "language": "fa",
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 120,
      "totalPages": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

Error response:

```json
{
  "success": false,
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "errors": {
    "body.name.fa": "Field is required"
  }
}
```

## Validation rules

Create operations require all mandatory translations (`fa`, `en`, `ar`). Patch operations merge nested localized fields, so sending only `name.fa` does not erase `name.en` or `name.ar`.

Unknown request body fields and unsupported query parameters are rejected. Catalog requests validate booleans, numeric limits, sort modes, object IDs, nested features/specifications/documents, SEO data, and supported URLs.

## Notes for frontend/admin-panel integration

- Use the `code` field for programmatic error handling.
- Use `meta.pagination` for tables and public lists.
- Use `status=draft|published|all` in admin lists.
- Use the reorder endpoints for drag-and-drop ordering.
- Product detail already includes product, brand, category, and related products in one request.
- Brand/category detail already includes a limited published product list and `meta.productCount`.
- Slugs are localized; IDs are accepted by public detail/filter endpoints as well.

See `STAGE_3.md` for the complete Stage 3 change log and API examples.
