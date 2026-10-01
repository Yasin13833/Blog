import React, { useState } from "react";
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiChevronDown,
  FiEdit3,
  FiHash,
  FiLayers,
  FiSave,
  FiTag,
  FiTrash2,
} from "react-icons/fi";

const initialProduct = {
  title: "لوله تحت فشار PVC-U PN16",
  slug: "pvc-u-pn16",
  category: "لوله‌های انتقال آب",
  brand: "آبیاران",
  price: "۱۸۵۰۰۰۰",
  stock: "۱۲۰",
  status: "منتشر شده",
  description:
    "لوله تحت فشار مقاوم برای خطوط اصلی آبیاری و ایستگاه‌های پمپاژ. مناسب برای استفاده در سیستم‌های انتقال آب کشاورزی.",
  tags: ["PVC", "PN16", "آبیاری"],
};

const categories = [
  "لوله‌های انتقال آب",
  "سیستم‌های آبیاری",
  "تصفیه آب",
  "پمپ و موتور",
  "اتصالات",
];

const brands = [
  "آبیاران",
  "پارس لوله",
  "آب صنعت",
  "کشاورز نوین",
  "پایا پمپ",
];

export default function Update_Product() {
  const [product, setProduct] = useState(initialProduct);

  const [tagInput, setTagInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTag = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const tag = tagInput.trim();

    if (!tag) return;

    if (product.tags.includes(tag)) {
      setTagInput("");
      return;
    }

    setProduct((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));

    setTagInput("");
  };

  const removeTag = (tag) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((item) => item !== tag),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Product:", product);

    // اینجا بعداً API update رو صدا می‌زنیم
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050806] px-6 py-8 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#7be35b]/5 blur-[120px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#7be35b]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <button
              type="button"
              className="mb-4 flex items-center gap-2 text-sm text-white/35 transition hover:text-[#7be35b]"
            >
              <FiArrowRight />
              بازگشت به محصولات
            </button>

            <div className="mb-3 flex items-center gap-2 text-sm text-[#7be35b]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7be35b] shadow-[0_0_10px_#7be35b]" />
              مدیریت محصول
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              ویرایش محصول
            </h1>

            <p className="mt-2 text-sm text-white/40">
              اطلاعات محصول را ویرایش و تغییرات را ذخیره کنید.
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/5 px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

            <span className="text-xs text-emerald-400">
              محصول منتشر شده
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
            {/* Main Form */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7be35b]/10 text-[#7be35b]">
                    <FiEdit3 />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      اطلاعات اصلی
                    </h2>

                    <p className="mt-1 text-xs text-white/30">
                      اطلاعات پایه محصول
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs text-white/45">
                      نام محصول
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={product.title}
                      onChange={handleChange}
                      placeholder="نام محصول"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs text-white/45">
                      <FiHash />
                      Slug
                    </label>

                    <input
                      type="text"
                      name="slug"
                      value={product.slug}
                      onChange={handleChange}
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white/60 outline-none transition focus:border-[#7be35b]/40"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="mb-2 block text-xs text-white/45">
                      دسته‌بندی
                    </label>

                    <div className="relative">
                      <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#0b110e] px-4 pl-10 text-sm text-white outline-none transition focus:border-[#7be35b]/40"
                      >
                        {categories.map((category) => (
                          <option
                            key={category}
                            value={category}
                            className="bg-[#0b110e]"
                          >
                            {category}
                          </option>
                        ))}
                      </select>

                      <FiChevronDown className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    </div>
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="mb-2 block text-xs text-white/45">
                      برند
                    </label>

                    <div className="relative">
                      <select
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#0b110e] px-4 pl-10 text-sm text-white outline-none transition focus:border-[#7be35b]/40"
                      >
                        {brands.map((brand) => (
                          <option
                            key={brand}
                            value={brand}
                            className="bg-[#0b110e]"
                          >
                            {brand}
                          </option>
                        ))}
                      </select>

                      <FiChevronDown className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Stock */}
              <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7be35b]/10 text-[#7be35b]">
                    <FiBox />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      قیمت و موجودی
                    </h2>

                    <p className="mt-1 text-xs text-white/30">
                      اطلاعات مربوط به قیمت و انبار
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Price */}
                  <div>
                    <label className="mb-2 block text-xs text-white/45">
                      قیمت
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 pl-16 text-sm text-white outline-none transition focus:border-[#7be35b]/40"
                      />

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/25">
                        تومان
                      </span>
                    </div>
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="mb-2 block text-xs text-white/45">
                      موجودی
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 pl-14 text-sm text-white outline-none transition focus:border-[#7be35b]/40"
                      />

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/25">
                        عدد
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
                <div className="mb-6">
                  <h2 className="font-semibold">
                    توضیحات محصول
                  </h2>

                  <p className="mt-1 text-xs text-white/30">
                    توضیحات کامل محصول را وارد کنید.
                  </p>
                </div>

                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="توضیحات محصول..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                />
              </div>

              {/* Tags */}
              <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7be35b]/10 text-[#7be35b]">
                    <FiTag />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      برچسب‌ها
                    </h2>

                    <p className="mt-1 text-xs text-white/30">
                      برای جستجوی بهتر محصول
                    </p>
                  </div>
                </div>

                <div className="flex min-h-12 flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2 focus-within:border-[#7be35b]/40">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-2 rounded-lg bg-[#7be35b]/10 px-3 py-1.5 text-xs text-[#7be35b]"
                    >
                      {tag}

                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-[#7be35b]/50 transition hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    placeholder="برچسب جدید..."
                    className="min-w-32 flex-1 bg-transparent px-2 py-1 text-xs text-white outline-none placeholder:text-white/20"
                  />
                </div>

                <p className="mt-2 text-[10px] text-white/20">
                  برای اضافه کردن برچسب Enter را بزنید.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Preview */}
              <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">
                      پیش‌نمایش
                    </h2>

                    <p className="mt-1 text-xs text-white/30">
                      نمایش محصول
                    </p>
                  </div>

                  <FiBox className="text-[#7be35b]" />
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#080d0a] p-5">
                  <div className="mb-5 flex h-24 items-center justify-center rounded-xl bg-[#7be35b]/5">
                    <FiBox className="text-4xl text-[#7be35b]/50" />
                  </div>

                  <span className="text-[10px] text-[#7be35b]">
                    {product.category}
                  </span>

                  <h3 className="mt-2 text-sm font-semibold leading-6">
                    {product.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-xs leading-6 text-white/35">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-sm font-bold">
                      {product.price}
                      <span className="mr-1 text-[9px] font-normal text-white/25">
                        تومان
                      </span>
                    </span>

                    <span className="text-[10px] text-white/30">
                      {product.stock} عدد
                    </span>
                  </div>
                </div>
              </div>

              {/* Publish */}
              <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl">
                <div className="mb-5">
                  <h2 className="font-semibold">
                    وضعیت انتشار
                  </h2>

                  <p className="mt-1 text-xs text-white/30">
                    وضعیت نمایش محصول در سایت
                  </p>
                </div>

                <div className="space-y-2">
                  {["منتشر شده", "پیش‌نویس"].map((status) => {
                    const active = product.status === status;

                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() =>
                          setProduct((prev) => ({
                            ...prev,
                            status,
                          }))
                        }
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${
                          active
                            ? "border-[#7be35b]/20 bg-[#7be35b]/5 text-[#7be35b]"
                            : "border-white/5 bg-white/[0.02] text-white/35 hover:border-white/10 hover:text-white"
                        }`}
                      >
                        <span>{status}</span>

                        {active && <FiCheck />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl">
                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#7be35b] font-semibold text-black transition-all hover:shadow-[0_0_30px_rgba(123,227,91,0.25)]"
                >
                  <FiSave />
                  ذخیره تغییرات
                </button>

                <button
                  type="button"
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 text-sm text-white/40 transition hover:border-white/20 hover:text-white"
                >
                  انصراف
                </button>

                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 text-xs text-red-400/50 transition hover:text-red-400"
                >
                  <FiTrash2 />
                  حذف محصول
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}