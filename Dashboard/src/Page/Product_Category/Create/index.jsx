import React, { useState } from "react";

import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiPlus,
  FiSave,
  FiTrash2,
} from "react-icons/fi";
import { fetchData, fetchUpload } from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";



export default function Create_Pr_Cat() {
  const [category, setCategory] = useState({
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

    description: {
      fa: "",
      en: "",
      ar: "",
    },

    image: "",
    icon: "",

    isFeatured: false,
    isPublished: true,
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
        fa: ["", "", ""],
        en: ["", "", ""],
        ar: ["", "", ""],
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    let imageUrl;
    if (category.image) {
      const formData = new FormData
      formData.append('file', category.image)
      const resultImg = await fetchUpload('/admin/media/image', {
        method: 'POST',
        body: formData
      })
      if (resultImg.success) {
        imageUrl = resultImg.data.url
      } else {
        Notify('error', 'خطا در آپلود عکس')
        return
      }
    }

    const result = await fetchData('/admin/product-categories', {
      method: 'POST',
      body: JSON.stringify({
        ...category,
        image: imageUrl
      })
    })
    if (result.success) {
      Notify('success', 'دسته بندی محصول با موفقیت انجام شد')
      return history.back()
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050806] px-6 py-8 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#7be35b]/5 blur-[120px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#7be35b]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-350">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <button
              onClick={() => history.back()}
              type="button"
              className="mb-4 flex cursor-pointer items-center gap-2 text-sm text-white/35 transition hover:text-[#7be35b]"
            >
              <FiArrowRight />
              بازگشت به دسته‌بندی‌ها
            </button>

            <div className="mb-3 flex items-center gap-2 text-sm text-[#7be35b]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7be35b] shadow-[0_0_10px_#7be35b]" />
              مدیریت دسته‌بندی
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              ایجاد دسته‌بندی جدید
            </h1>

            <p className="mt-2 text-sm text-white/40">
              اطلاعات دسته‌بندی جدید را وارد و آن را ایجاد کنید.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-[#7be35b]" />

            <span className="text-xs text-white/40">
              دسته‌بندی جدید
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">

            {/* ========================= */}
            {/* Name */}
            {/* ========================= */}

            <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7be35b]/10 text-[#7be35b]">
                  <FiBox />
                </div>

                <div>
                  <h2 className="font-semibold">
                    نام دسته‌بندی
                  </h2>

                  <p className="mt-1 text-xs text-white/30">
                    نام دسته‌بندی در سه زبان
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

                {/* FA */}
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    فارسی
                  </label>

                  <input
                    type="text"
                    value={category.name.fa}
                    onChange={(e) =>
                      setCategory((prev) => ({
                        ...prev,
                        name: {
                          ...prev.name,
                          fa: e.target.value,
                        },
                      }))
                    }
                    placeholder="نام دسته‌بندی"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                {/* EN */}
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    English
                  </label>

                  <input
                    type="text"
                    value={category.name.en}
                    onChange={(e) =>
                      setCategory((prev) => ({
                        ...prev,
                        name: {
                          ...prev.name,
                          en: e.target.value,
                        },
                      }))
                    }
                    placeholder="Category name"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                {/* AR */}
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    العربية
                  </label>

                  <input
                    type="text"
                    value={category.name.ar}
                    onChange={(e) =>
                      setCategory((prev) => ({
                        ...prev,
                        name: {
                          ...prev.name,
                          ar: e.target.value,
                        },
                      }))
                    }
                    placeholder="اسم التصنيف"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

              </div>
            </div>

            {/* ========================= */}
            {/* Slug */}
            {/* ========================= */}

            <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
              <div className="mb-6">
                <h2 className="font-semibold">
                  Slug
                </h2>

                <p className="mt-1 text-xs text-white/30">
                  شناسه متنی دسته‌بندی برای URL
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    فارسی
                  </label>

                  <input
                    type="text"
                    value={category.slug.fa}
                    onChange={(e) =>
                      setCategory((prev) => ({
                        ...prev,
                        slug: {
                          ...prev.slug,
                          fa: e.target.value,
                        },
                      }))
                    }
                    placeholder="لوله-آبیاری"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    English
                  </label>

                  <input
                    type="text"
                    value={category.slug.en}
                    onChange={(e) =>
                      setCategory((prev) => ({
                        ...prev,
                        slug: {
                          ...prev.slug,
                          en: e.target.value,
                        },
                      }))
                    }
                    placeholder="water-pipes"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    العربية
                  </label>

                  <input
                    type="text"
                    value={category.slug.ar}
                    onChange={(e) =>
                      setCategory((prev) => ({
                        ...prev,
                        slug: {
                          ...prev.slug,
                          ar: e.target.value,
                        },
                      }))
                    }
                    placeholder="أنابيب-المياه"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

              </div>
            </div>

            {/* ========================= */}
            {/* Description */}
            {/* ========================= */}

            <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
              <div className="mb-6">
                <h2 className="font-semibold">
                  توضیحات دسته‌بندی
                </h2>

                <p className="mt-1 text-xs text-white/30">
                  توضیحات دسته‌بندی در سه زبان
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    فارسی
                  </label>

                  <textarea
                    rows={5}
                    value={category.description.fa}
                    onChange={(e) =>
                      setCategory((prev) => ({
                        ...prev,
                        description: {
                          ...prev.description,
                          fa: e.target.value,
                        },
                      }))
                    }
                    placeholder="توضیحات دسته‌بندی..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    English
                  </label>

                  <textarea
                    rows={5}
                    value={category.description.en}
                    onChange={(e) =>
                      setCategory((prev) => ({
                        ...prev,
                        description: {
                          ...prev.description,
                          en: e.target.value,
                        },
                      }))
                    }
                    placeholder="Category description..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    العربية
                  </label>

                  <textarea
                    rows={5}
                    value={category.description.ar}
                    onChange={(e) =>
                      setCategory((prev) => ({
                        ...prev,
                        description: {
                          ...prev.description,
                          ar: e.target.value,
                        },
                      }))
                    }
                    placeholder="وصف التصنيف..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

              </div>
            </div>

            {/* ========================= */}
            {/* Image & Icon */}
            {/* ========================= */}


            <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 h-120 p-6 backdrop-blur-xl">
              <div className="mb-6">
                <h2 className="font-semibold text-white">
                  تصویر و آیکون
                </h2>

                <p className="mt-1 text-xs text-white/30">
                  تصویر و آیکون مربوط به دسته‌بندی
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Image */}
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    تصویر دسته‌بندی
                  </label>

                  <label className="group relative flex h-70 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.02] transition hover:border-[#7be35b]/40 hover:bg-[#7be35b]/[0.03]">

                    {/* اگر عکس انتخاب شده */}
                    {category.image instanceof File ? (
                      <img
                        src={URL.createObjectURL(category.image)}
                        alt="preview"
                        className="absolute inset-0 h-full w-full object-center opacity-70 transition group-hover:opacity-50"
                      />
                    ) : null}

                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-[#7be35b]">
                        <FiPlus size={22} />
                      </div>

                      <div className="text-center">
                        <p className="text-sm font-medium text-white/80">
                          انتخاب تصویر
                        </p>

                        <p className="mt-1 text-[11px] text-white/30">
                          PNG, JPG یا WEBP
                        </p>
                      </div>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setCategory((prev) => ({
                          ...prev,
                          image: e.target.files[0],
                        }))
                      }
                    />
                  </label>
                </div>

                {/* Icon */}
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    Icon
                  </label>

                  <input
                    type="text"
                    value={category.icon}
                    onChange={(e) =>
                      setCategory((prev) => ({
                        ...prev,
                        icon: e.target.value,
                      }))
                    }
                    placeholder="FiDroplet"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

              </div>
            </div>



            {/* ========================= */}
            {/* Settings */}
            {/* ========================= */}

            <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">

              <div className="mb-6">
                <h2 className="font-semibold">
                  تنظیمات دسته‌بندی
                </h2>

                <p className="mt-1 text-xs text-white/30">
                  وضعیت و ترتیب نمایش دسته‌بندی
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                {/* Sort Order */}

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    ترتیب نمایش
                  </label>

                  <input
                    type="number"
                    value={category.sortOrder}
                    onChange={(e) =>
                      setCategory((prev) => ({
                        ...prev,
                        sortOrder: Number(e.target.value),
                      }))
                    }
                    placeholder="0"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                {/* Featured */}

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    دسته‌بندی ویژه
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setCategory((prev) => ({
                        ...prev,
                        isFeatured: !prev.isFeatured,
                      }))
                    }
                    className={`flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm transition ${category.isFeatured
                      ? "border-[#7be35b]/30 bg-[#7be35b]/10 text-[#7be35b]"
                      : "border-white/10 bg-white/[0.03] text-white/40"
                      }`}
                  >
                    <span>
                      {category.isFeatured
                        ? "دسته‌بندی ویژه است"
                        : "دسته‌بندی معمولی"}
                    </span>

                    {category.isFeatured && <FiCheck />}
                  </button>
                </div>

                {/* Published */}

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    وضعیت انتشار
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setCategory((prev) => ({
                        ...prev,
                        isPublished: !prev.isPublished,
                      }))
                    }
                    className={`flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm transition ${category.isPublished
                      ? "border-[#7be35b]/30 bg-[#7be35b]/10 text-[#7be35b]"
                      : "border-white/10 bg-white/[0.03] text-white/40"
                      }`}
                  >
                    <span>
                      {category.isPublished
                        ? "منتشر شده"
                        : "پیش‌نویس"}
                    </span>

                    {category.isPublished && <FiCheck />}
                  </button>
                </div>

              </div>
            </div>

            {/* ========================= */}
            {/* SEO */}
            {/* ========================= */}

            <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">

              <div className="mb-6">
                <h2 className="font-semibold">
                  تنظیمات SEO
                </h2>

                <p className="mt-1 text-xs text-white/30">
                  اطلاعات مربوط به موتورهای جستجو
                </p>
              </div>

              <div className="space-y-7">

                {/* SEO Title */}

                <div>
                  <label className="mb-3 block text-xs text-white/45">
                    SEO Title
                  </label>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

                    <input
                      type="text"
                      value={category.seo.title.fa}
                      onChange={(e) =>
                        setCategory((prev) => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            title: {
                              ...prev.seo.title,
                              fa: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="عنوان SEO"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />

                    <input
                      type="text"
                      value={category.seo.title.en}
                      onChange={(e) =>
                        setCategory((prev) => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            title: {
                              ...prev.seo.title,
                              en: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="SEO title"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />

                    <input
                      type="text"
                      value={category.seo.title.ar}
                      onChange={(e) =>
                        setCategory((prev) => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            title: {
                              ...prev.seo.title,
                              ar: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="عنوان SEO"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />

                  </div>
                </div>

                {/* SEO Description */}

                <div>
                  <label className="mb-3 block text-xs text-white/45">
                    SEO Description
                  </label>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

                    <textarea
                      rows={5}
                      value={category.seo.description.fa}
                      onChange={(e) =>
                        setCategory((prev) => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            description: {
                              ...prev.seo.description,
                              fa: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="توضیحات SEO"
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />

                    <textarea
                      rows={5}
                      value={category.seo.description.en}
                      onChange={(e) =>
                        setCategory((prev) => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            description: {
                              ...prev.seo.description,
                              en: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="SEO description"
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />

                    <textarea
                      rows={5}
                      value={category.seo.description.ar}
                      onChange={(e) =>
                        setCategory((prev) => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            description: {
                              ...prev.seo.description,
                              ar: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="وصف SEO"
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />

                  </div>
                </div>


                {/* Keywords */}

                <div>
                  <label className="mb-4 block text-xs text-white/45">
                    Keywords
                  </label>

                  <div className="space-y-6">

                    {/* فارسی */}
                    <div>
                      <span className="mb-3 block text-sm text-white/60">
                        فارسی
                      </span>

                      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                        {category.seo.keywords.fa.map((keyword, index) => (
                          <input
                            key={index}
                            type="text"
                            value={keyword}
                            onChange={(e) =>
                              setCategory((prev) => {
                                const keywords = [...prev.seo.keywords.fa];
                                keywords[index] = e.target.value;

                                return {
                                  ...prev,
                                  seo: {
                                    ...prev.seo,
                                    keywords: {
                                      ...prev.seo.keywords,
                                      fa: keywords,
                                    },
                                  },
                                };
                              })
                            }
                            placeholder={`کلمه کلیدی ${index + 1}`}
                            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                          />
                        ))}
                      </div>
                    </div>


                    {/* English */}
                    <div>
                      <span className="mb-3 block text-sm text-white/60">
                        English
                      </span>

                      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                        {category.seo.keywords.en.map((keyword, index) => (
                          <input
                            key={index}
                            type="text"
                            value={keyword}
                            onChange={(e) =>
                              setCategory((prev) => {
                                const keywords = [...prev.seo.keywords.en];
                                keywords[index] = e.target.value;

                                return {
                                  ...prev,
                                  seo: {
                                    ...prev.seo,
                                    keywords: {
                                      ...prev.seo.keywords,
                                      en: keywords,
                                    },
                                  },
                                };
                              })
                            }
                            placeholder={`Keyword ${index + 1}`}
                            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                          />
                        ))}
                      </div>
                    </div>


                    {/* العربية */}
                    <div>
                      <span className="mb-3 block text-sm text-white/60">
                        العربية
                      </span>

                      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                        {category.seo.keywords.ar.map((keyword, index) => (
                          <input
                            key={index}
                            type="text"
                            value={keyword}
                            onChange={(e) =>
                              setCategory((prev) => {
                                const keywords = [...prev.seo.keywords.ar];
                                keywords[index] = e.target.value;

                                return {
                                  ...prev,
                                  seo: {
                                    ...prev.seo,
                                    keywords: {
                                      ...prev.seo.keywords,
                                      ar: keywords,
                                    },
                                  },
                                };
                              })
                            }
                            placeholder={`كلمة مفتاحية ${index + 1}`}
                            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                          />
                        ))}
                      </div>
                    </div>

                  </div>
                </div>



              </div>
            </div>

            {/* ========================= */}
            {/* Actions */}
            {/* ========================= */}

            <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">

              <button
              onClick={()=>{
                setCategory({
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

    description: {
      fa: "",
      en: "",
      ar: "",
    },

    image: "",
    icon: "",

    isFeatured: false,
    isPublished: true,
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
        fa: ["", "", ""],
        en: ["", "", ""],
        ar: ["", "", ""],
      },
    },
  })
              }}
                type="button"
                className="cursor-pointer flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm text-white/50 transition hover:border-white/20 hover:text-white"
              >
                <FiTrash2 />
                پاک کردن فرم
              </button>

              <button
                type="submit"
                className="cursor-pointer flex h-12 items-center justify-center gap-2 rounded-xl bg-[#7be35b] px-7 text-sm font-semibold text-black transition hover:shadow-[0_0_30px_rgba(123,227,91,0.25)]"
              >
                <FiSave />
                ایجاد دسته‌بندی
              </button>

            </div>

          </div>
        </form>
      </div>
    </section>
  );
}

