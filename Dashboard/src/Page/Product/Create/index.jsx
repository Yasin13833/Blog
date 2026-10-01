import React, { useState } from "react";
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiPlus,
  FiSave,
  FiTrash2,
} from "react-icons/fi";

const languages = [
  { key: "fa", label: "فارسی" },
  { key: "en", label: "English" },
  { key: "ar", label: "العربية" },
];

const emptyMultilingual = {
  fa: "",
  en: "",
  ar: "",
};

const createFeature = () => ({
  title: { ...emptyMultilingual },
  description: { ...emptyMultilingual },
  icon: "",
});

const createSpecification = () => ({
  label: { ...emptyMultilingual },
  value: { ...emptyMultilingual },
});

const createDocument = () => ({
  title: { ...emptyMultilingual },
  url: "",
});

const initialProduct = {
  brandId: "",
  categoryId: "",

  name: {
    fa: "",
    en: "",
    ar: "",
  },

  slug: {
    fa: "",
    en: "",
    ar: "",
  },

  shortDescription: {
    fa: "",
    en: "",
    ar: "",
  },

  description: {
    fa: "",
    en: "",
    ar: "",
  },

  model: "",
  sku: "",
  thumbnail: "",

  images: [],

  features: [],

  specifications: [],

  documents: [],

  videoUrl: "",

  relatedProductIds: [],

  isFeatured: false,
  isPublished: false,

  sortOrder: 0,

  seo: {
    title: {
      fa: "",
      en: "",
      ar: "",
    },

    description: {
      fa: "",
      en: "",
      ar: "",
    },

    keywords: {
      fa: [],
      en: [],
      ar: [],
    },
  },
};

function SectionTitle({ title, description }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-white">{title}</h2>

      {description && (
        <p className="mt-1 text-sm text-white/40">{description}</p>
      )}
    </div>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-white/70">
        {label}
      </label>

      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/50 focus:ring-1 focus:ring-[#7be35b]/20"
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/50 focus:ring-1 focus:ring-[#7be35b]/20"
    />
  );
}

function LanguageInputs({
  value,
  onChange,
  placeholder,
  textarea = false,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {languages.map((language) => (
        <Field key={language.key} label={language.label}>
          {textarea ? (
            <Textarea
              value={value[language.key]}
              onChange={(e) =>
                onChange(language.key, e.target.value)
              }
              placeholder={placeholder}
            />
          ) : (
            <Input
              value={value[language.key]}
              onChange={(e) =>
                onChange(language.key, e.target.value)
              }
              placeholder={placeholder}
            />
          )}
        </Field>
      ))}
    </div>
  );
}

export default function Create_Product() {
  const [product, setProduct] = useState(initialProduct);

  const handleChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMultilingualChange = (
    field,
    language,
    value
  ) => {
    setProduct((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [language]: value,
      },
    }));
  };

  const handleSeoChange = (
    field,
    language,
    value
  ) => {
    setProduct((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: {
          ...prev.seo[field],
          [language]: value,
        },
      },
    }));
  };

  // -----------------------------
  // Images
  // -----------------------------

  const addImage = () => {
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const updateImage = (index, value) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // -----------------------------
  // Features
  // -----------------------------

  const addFeature = () => {
    setProduct((prev) => ({
      ...prev,
      features: [...prev.features, createFeature()],
    }));
  };

  const removeFeature = (index) => {
    setProduct((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (index, field, value) => {
    setProduct((prev) => ({
      ...prev,
      features: prev.features.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      ),
    }));
  };

  const updateFeatureLanguage = (
    index,
    field,
    language,
    value
  ) => {
    setProduct((prev) => ({
      ...prev,
      features: prev.features.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: {
                ...item[field],
                [language]: value,
              },
            }
          : item
      ),
    }));
  };

  // -----------------------------
  // Specifications
  // -----------------------------

  const addSpecification = () => {
    setProduct((prev) => ({
      ...prev,
      specifications: [
        ...prev.specifications,
        createSpecification(),
      ],
    }));
  };

  const removeSpecification = (index) => {
    setProduct((prev) => ({
      ...prev,
      specifications: prev.specifications.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const updateSpecificationLanguage = (
    index,
    field,
    language,
    value
  ) => {
    setProduct((prev) => ({
      ...prev,
      specifications: prev.specifications.map(
        (item, i) =>
          i === index
            ? {
                ...item,
                [field]: {
                  ...item[field],
                  [language]: value,
                },
              }
            : item
      ),
    }));
  };

  // -----------------------------
  // Documents
  // -----------------------------

  const addDocument = () => {
    setProduct((prev) => ({
      ...prev,
      documents: [
        ...prev.documents,
        createDocument(),
      ],
    }));
  };

  const removeDocument = (index) => {
    setProduct((prev) => ({
      ...prev,
      documents: prev.documents.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const updateDocument = (index, field, value) => {
    setProduct((prev) => ({
      ...prev,
      documents: prev.documents.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      ),
    }));
  };

  const updateDocumentLanguage = (
    index,
    language,
    value
  ) => {
    setProduct((prev) => ({
      ...prev,
      documents: prev.documents.map((item, i) =>
        i === index
          ? {
              ...item,
              title: {
                ...item.title,
                [language]: value,
              },
            }
          : item
      ),
    }));
  };

  // -----------------------------
  // Related Products
  // -----------------------------

  const addRelatedProduct = () => {
    setProduct((prev) => ({
      ...prev,
      relatedProductIds: [
        ...prev.relatedProductIds,
        "",
      ],
    }));
  };

  const updateRelatedProduct = (index, value) => {
    setProduct((prev) => ({
      ...prev,
      relatedProductIds: prev.relatedProductIds.map(
        (item, i) =>
          i === index ? value : item
      ),
    }));
  };

  const removeRelatedProduct = (index) => {
    setProduct((prev) => ({
      ...prev,
      relatedProductIds:
        prev.relatedProductIds.filter(
          (_, i) => i !== index
        ),
    }));
  };

  // -----------------------------
  // SEO Keywords
  // -----------------------------

  const addKeyword = (language) => {
    setProduct((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: {
          ...prev.seo.keywords,
          [language]: [
            ...prev.seo.keywords[language],
            "",
          ],
        },
      },
    }));
  };

  const updateKeyword = (
    language,
    index,
    value
  ) => {
    setProduct((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: {
          ...prev.seo.keywords,
          [language]:
            prev.seo.keywords[language].map(
              (item, i) =>
                i === index ? value : item
            ),
        },
      },
    }));
  };

  const removeKeyword = (language, index) => {
    setProduct((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: {
          ...prev.seo.keywords,
          [language]:
            prev.seo.keywords[language].filter(
              (_, i) => i !== index
            ),
        },
      },
    }));
  };

  // -----------------------------
  // Submit
  // -----------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      ...product,

      sortOrder: Number(product.sortOrder),

      images: product.images.filter(
        (item) => item.trim() !== ""
      ),

      relatedProductIds:
        product.relatedProductIds.filter(
          (item) => item.trim() !== ""
        ),

      seo: {
        ...product.seo,

        keywords: {
          fa: product.seo.keywords.fa.filter(
            (item) => item.trim() !== ""
          ),
          en: product.seo.keywords.en.filter(
            (item) => item.trim() !== ""
          ),
          ar: product.seo.keywords.ar.filter(
            (item) => item.trim() !== ""
          ),
        },
      },
    };

    console.log("REQUEST BODY:", requestBody);

    // اینجا بعداً API را صدا بزن:
    // await createProduct(requestBody)
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050806] px-6 py-8 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-80 w-80 rounded-full bg-[#7be35b]/10 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#7be35b]/5 blur-[140px]" />

      <form
        onSubmit={handleSubmit}
        className="relative mx-auto max-w-7xl"
      >
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-7 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#7be35b]/20 bg-[#7be35b]/10 text-[#7be35b]">
                <FiBox size={21} />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  ایجاد محصول جدید
                </h1>

                <p className="mt-1 text-sm text-white/40">
                  اطلاعات محصول را کامل کنید
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <FiArrowRight size={17} />
            بازگشت
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* -------------------------------- */}
          {/* Basic Information */}
          {/* -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
            <SectionTitle
              title="اطلاعات اصلی"
              description="اطلاعات پایه و شناسایی محصول"
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="شناسه برند">
                <Input
                  value={product.brandId}
                  onChange={(e) =>
                    handleChange(
                      "brandId",
                      e.target.value
                    )
                  }
                  placeholder="Brand ID"
                />
              </Field>

              <Field label="شناسه دسته‌بندی">
                <Input
                  value={product.categoryId}
                  onChange={(e) =>
                    handleChange(
                      "categoryId",
                      e.target.value
                    )
                  }
                  placeholder="Category ID"
                />
              </Field>

              <Field label="مدل">
                <Input
                  value={product.model}
                  onChange={(e) =>
                    handleChange(
                      "model",
                      e.target.value
                    )
                  }
                  placeholder="مثلاً PN16"
                />
              </Field>

              <Field label="SKU">
                <Input
                  value={product.sku}
                  onChange={(e) =>
                    handleChange(
                      "sku",
                      e.target.value
                    )
                  }
                  placeholder="مثلاً PVC-PN16-001"
                />
              </Field>
            </div>
          </div>

          {/* -------------------------------- */}
          {/* Name */}
          {/* -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
            <SectionTitle
              title="نام محصول"
              description="نام محصول را برای هر زبان وارد کنید"
            />

            <LanguageInputs
              value={product.name}
              onChange={(language, value) =>
                handleMultilingualChange(
                  "name",
                  language,
                  value
                )
              }
              placeholder="نام محصول"
            />
          </div>

          {/* -------------------------------- */}
          {/* Slug */}
          {/* -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
            <SectionTitle
              title="Slug"
              description="شناسه متنی محصول برای URL"
            />

            <LanguageInputs
              value={product.slug}
              onChange={(language, value) =>
                handleMultilingualChange(
                  "slug",
                  language,
                  value
                )
              }
              placeholder="product-slug"
            />
          </div>

          {/* -------------------------------- */}
          {/* Short Description */}
          {/* -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
            <SectionTitle
              title="توضیح کوتاه"
              description="توضیح کوتاه محصول برای کارت و لیست محصولات"
            />

            <LanguageInputs
              value={product.shortDescription}
              onChange={(language, value) =>
                handleMultilingualChange(
                  "shortDescription",
                  language,
                  value
                )
              }
              placeholder="توضیح کوتاه محصول"
              textarea
            />
          </div>

          {/* -------------------------------- */}
          {/* Description */}
          {/* -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
            <SectionTitle
              title="توضیحات محصول"
              description="توضیحات کامل محصول"
            />

            <LanguageInputs
              value={product.description}
              onChange={(language, value) =>
                handleMultilingualChange(
                  "description",
                  language,
                  value
                )
              }
              placeholder="توضیحات کامل محصول"
              textarea
            />
          </div>

          {/* -------------------------------- */}
          {/* Images */}
          {/* -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <SectionTitle
                title="تصاویر"
                description="لینک تصویر اصلی و تصاویر محصول"
              />

              <button
                type="button"
                onClick={addImage}
                className="flex items-center gap-2 rounded-xl bg-[#7be35b] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-[#8cf56b]"
              >
                <FiPlus />
                افزودن تصویر
              </button>
            </div>

            <div className="space-y-4">
              <Field label="Thumbnail">
                <Input
                  value={product.thumbnail}
                  onChange={(e) =>
                    handleChange(
                      "thumbnail",
                      e.target.value
                    )
                  }
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </Field>

              {product.images.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-white/50">
                    تصاویر محصول
                  </p>

                  {product.images.map(
                    (image, index) => (
                      <div
                        key={index}
                        className="flex gap-3"
                      >
                        <Input
                          value={image}
                          onChange={(e) =>
                            updateImage(
                              index,
                              e.target.value
                            )
                          }
                          placeholder="https://example.com/image.jpg"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(index)
                          }
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 transition hover:bg-red-500/10"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* -------------------------------- */}
          {/* Features */}
          {/* -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <SectionTitle
                title="ویژگی‌های محصول"
                description="ویژگی‌های محصول با عنوان و توضیح چندزبانه"
              />

              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 rounded-xl bg-[#7be35b] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-[#8cf56b]"
              >
                <FiPlus />
                افزودن ویژگی
              </button>
            </div>

            {product.features.length === 0 && (
              <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-sm text-white/30">
                هنوز ویژگی‌ای اضافه نشده است
              </div>
            )}

            <div className="space-y-5">
              {product.features.map(
                (feature, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <h3 className="font-semibold">
                        ویژگی {index + 1}
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          removeFeature(index)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>

                    <div className="mb-5">
                      <Field label="Icon">
                        <Input
                          value={feature.icon}
                          onChange={(e) =>
                            updateFeature(
                              index,
                              "icon",
                              e.target.value
                            )
                          }
                          placeholder="مثلاً FiDroplet"
                        />
                      </Field>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <p className="mb-3 text-sm font-medium text-white/50">
                          عنوان ویژگی
                        </p>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                          {languages.map(
                            (language) => (
                              <Input
                                key={
                                  language.key
                                }
                                value={
                                  feature.title[
                                    language.key
                                  ]
                                }
                                onChange={(e) =>
                                  updateFeatureLanguage(
                                    index,
                                    "title",
                                    language.key,
                                    e.target.value
                                  )
                                }
                                placeholder={`${language.label} - عنوان`}
                              />
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="mb-3 text-sm font-medium text-white/50">
                          توضیح ویژگی
                        </p>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                          {languages.map(
                            (language) => (
                              <Textarea
                                key={
                                  language.key
                                }
                                value={
                                  feature
                                    .description[
                                    language.key
                                  ]
                                }
                                onChange={(e) =>
                                  updateFeatureLanguage(
                                    index,
                                    "description",
                                    language.key,
                                    e.target.value
                                  )
                                }
                                placeholder={`${language.label} - توضیح`}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* -------------------------------- */}
          {/* Specifications */}
          {/* -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <SectionTitle
                title="مشخصات فنی"
                description="مشخصات فنی محصول به صورت Label و Value"
              />

              <button
                type="button"
                onClick={addSpecification}
                className="flex items-center gap-2 rounded-xl bg-[#7be35b] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-[#8cf56b]"
              >
                <FiPlus />
                افزودن مشخصات
              </button>
            </div>

            {product.specifications.length ===
              0 && (
              <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-sm text-white/30">
                هنوز مشخصاتی اضافه نشده است
              </div>
            )}

            <div className="space-y-5">
              {product.specifications.map(
                (specification, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <h3 className="font-semibold">
                        مشخصه {index + 1}
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          removeSpecification(
                            index
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>

                    <div className="mb-5">
                      <p className="mb-3 text-sm font-medium text-white/50">
                        Label
                      </p>

                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {languages.map(
                          (language) => (
                            <Input
                              key={language.key}
                              value={
                                specification
                                  .label[
                                  language.key
                                ]
                              }
                              onChange={(e) =>
                                updateSpecificationLanguage(
                                  index,
                                  "label",
                                  language.key,
                                  e.target.value
                                )
                              }
                              placeholder={`${language.label} - عنوان`}
                            />
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-sm font-medium text-white/50">
                        Value
                      </p>

                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {languages.map(
                          (language) => (
                            <Input
                              key={language.key}
                              value={
                                specification
                                  .value[
                                  language.key
                                ]
                              }
                              onChange={(e) =>
                                updateSpecificationLanguage(
                                  index,
                                  "value",
                                  language.key,
                                  e.target.value
                                )
                              }
                              placeholder={`${language.label} - مقدار`}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* -------------------------------- */}
          {/* Documents */}
          {/* -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <SectionTitle
                title="مستندات"
                description="کاتالوگ، دیتاشیت و فایل‌های مرتبط"
              />

              <button
                type="button"
                onClick={addDocument}
                className="flex items-center gap-2 rounded-xl bg-[#7be35b] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-[#8cf56b]"
              >
                <FiPlus />
                افزودن مستند
              </button>
            </div>

            {product.documents.length === 0 && (
              <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-sm text-white/30">
                هنوز مستندی اضافه نشده است
              </div>
            )}

            <div className="space-y-5">
              {product.documents.map(
                (document, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <h3 className="font-semibold">
                        مستند {index + 1}
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          removeDocument(index)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <p className="mb-3 text-sm font-medium text-white/50">
                          عنوان مستند
                        </p>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                          {languages.map(
                            (language) => (
                              <Input
                                key={language.key}
                                value={
                                  document.title[
                                    language.key
                                  ]
                                }
                                onChange={(e) =>
                                  updateDocumentLanguage(
                                    index,
                                    language.key,
                                    e.target.value
                                  )
                                }
                                placeholder={`${language.label} - عنوان`}
                              />
                            )
                          )}
                        </div>
                      </div>

                      <Field label="URL مستند">
                        <Input
                          value={document.url}
                          onChange={(e) =>
                            updateDocument(
                              index,
                              "url",
                              e.target.value
                            )
                          }
                          placeholder="https://example.com/document.pdf"
                        />
                      </Field>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* -------------------------------- */}
          {/* Video */}
          {/* -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
            <SectionTitle
              title="ویدیو"
              description="لینک ویدیوی معرفی محصول"
            />

            <Field label="Video URL">
              <Input
                value={product.videoUrl}
                onChange={(e) =>
                  handleChange(
                    "videoUrl",
                    e.target.value
                  )
                }
                placeholder="https://youtube.com/..."
              />
            </Field>
          </div>

          {/* -------------------------------- */}
          {/* Related Products */}
          {/* -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <SectionTitle
                title="محصولات مرتبط"
                description="شناسه محصولاتی که با این محصول مرتبط هستند"
              />

              <button
                type="button"
                onClick={addRelatedProduct}
                className="flex items-center gap-2 rounded-xl bg-[#7be35b] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-[#8cf56b]"
              >
                <FiPlus />
                افزودن محصول
              </button>
            </div>

            {product.relatedProductIds.length ===
              0 && (
              <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-sm text-white/30">
                محصول مرتبطی اضافه نشده است
              </div>
            )}

            <div className="space-y-3">
              {product.relatedProductIds.map(
                (id, index) => (
                  <div
                    key={index}
                    className="flex gap-3"
                  >
                    <Input
                      value={id}
                      onChange={(e) =>
                        updateRelatedProduct(
                          index,
                          e.target.value
                        )
                      }
                      placeholder="Related Product ID"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeRelatedProduct(
                          index
                        )
                      }
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* -------------------------------- */}
          {/* SEO */}
          {/* -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
            <SectionTitle
              title="SEO"
              description="تنظیمات بهینه‌سازی موتورهای جستجو"
            />

            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-medium text-white/50">
                  SEO Title
                </p>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  {languages.map(
                    (language) => (
                      <Input
                        key={language.key}
                        value={
                          product.seo.title[
                            language.key
                          ]
                        }
                        onChange={(e) =>
                          handleSeoChange(
                            "title",
                            language.key,
                            e.target.value
                          )
                        }
                        placeholder={`${language.label} - SEO Title`}
                      />
                    )
                  )}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-white/50">
                  SEO Description
                </p>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  {languages.map(
                    (language) => (
                      <Textarea
                        key={language.key}
                        value={
                          product.seo.description[
                            language.key
                          ]
                        }
                        onChange={(e) =>
                          handleSeoChange(
                            "description",
                            language.key,
                            e.target.value
                          )
                        }
                        placeholder={`${language.label} - SEO Description`}
                      />
                    )
                  )}
                </div>
              </div>

              <div>
                <p className="mb-4 text-sm font-medium text-white/50">
                  Keywords
                </p>

                <div className="space-y-6">
                  {languages.map(
                    (language) => (
                      <div key={language.key}>
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-sm text-white/70">
                            {language.label}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              addKeyword(
                                language.key
                              )
                            }
                            className="flex items-center gap-1.5 text-xs text-[#7be35b] hover:text-[#8cf56b]"
                          >
                            <FiPlus />
                            افزودن
                          </button>
                        </div>

                        <div className="space-y-3">
                          {product.seo.keywords[
                            language.key
                          ].map(
                            (
                              keyword,
                              index
                            ) => (
                              <div
                                key={index}
                                className="flex gap-3"
                              >
                                <Input
                                  value={keyword}
                                  onChange={(e) =>
                                    updateKeyword(
                                      language.key,
                                      index,
                                      e.target
                                        .value
                                    )
                                  }
                                  placeholder="keyword"
                                />

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeKeyword(
                                      language.key,
                                      index
                                    )
                                  }
                                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------- */}
          {/* Publish Settings */}
          {/* -------------------------------- */}

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
            <SectionTitle
              title="تنظیمات انتشار"
              description="وضعیت و ترتیب نمایش محصول"
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <Field label="ترتیب نمایش">
                <Input
                  type="number"
                  value={product.sortOrder}
                  onChange={(e) =>
                    handleChange(
                      "sortOrder",
                      e.target.value
                    )
                  }
                  placeholder="0"
                />
              </Field>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">
                  محصول ویژه
                </label>

                <button
                  type="button"
                  onClick={() =>
                    handleChange(
                      "isFeatured",
                      !product.isFeatured
                    )
                  }
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 transition ${
                    product.isFeatured
                      ? "border-[#7be35b]/30 bg-[#7be35b]/10 text-[#7be35b]"
                      : "border-white/10 bg-black/20 text-white/50"
                  }`}
                >
                  <span>
                    {product.isFeatured
                      ? "محصول ویژه است"
                      : "محصول معمولی"}
                  </span>

                  {product.isFeatured && (
                    <FiCheck />
                  )}
                </button>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">
                  وضعیت انتشار
                </label>

                <button
                  type="button"
                  onClick={() =>
                    handleChange(
                      "isPublished",
                      !product.isPublished
                    )
                  }
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 transition ${
                    product.isPublished
                      ? "border-[#7be35b]/30 bg-[#7be35b]/10 text-[#7be35b]"
                      : "border-white/10 bg-black/20 text-white/50"
                  }`}
                >
                  <span>
                    {product.isPublished
                      ? "منتشر شده"
                      : "پیش‌نویس"}
                  </span>

                  {product.isPublished && (
                    <FiCheck />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* -------------------------------- */}
          {/* Actions */}
          {/* -------------------------------- */}

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              انصراف
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#7be35b] px-7 py-3 text-sm font-bold text-black transition hover:bg-[#8cf56b]"
            >
              <FiSave size={17} />
              ایجاد محصول
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}