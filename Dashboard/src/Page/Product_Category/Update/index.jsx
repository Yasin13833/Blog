import React from "react";
import {
  FiArrowRight,
  FiEdit3,
  FiHash,
  FiImage,
  FiLayers,
  FiSave,
  FiSearch,
  FiSettings,
  FiTag,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

export default function Update_Pr_Cat() {
  return (
    <section className="min-h-screen bg-[#050806] px-6 py-8 text-white">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10"
          >
            <FiArrowRight size={20} />
          </button>

          <div>
            <p className="mb-1 text-sm text-lime-400">
              مدیریت دسته‌بندی
            </p>

            <h1 className="text-2xl font-bold">
              ویرایش دسته‌بندی محصول
            </h1>
          </div>
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50">
          ویرایش
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        {/* Main */}
        <div className="space-y-6">

          {/* ==================== Name ==================== */}
          <div className="rounded-3xl border border-white/10 bg-[#101720] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                <FiEdit3 size={20} />
              </div>

              <div>
                <h2 className="font-bold">
                  نام دسته‌بندی
                </h2>

                <p className="text-sm text-white/40">
                  نام دسته‌بندی را برای هر زبان وارد کنید
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* FA */}
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  فارسی
                </label>

                <input
                  type="text"
                  placeholder="نام فارسی"
                  dir="rtl"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                />
              </div>

              {/* EN */}
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  English
                </label>

                <input
                  type="text"
                  placeholder="English name"
                  dir="ltr"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-left text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                />
              </div>

              {/* AR */}
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  العربية
                </label>

                <input
                  type="text"
                  placeholder="اسم الفئة"
                  dir="rtl"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                />
              </div>
            </div>
          </div>

          {/* ==================== Slug ==================== */}
          <div className="rounded-3xl border border-white/10 bg-[#101720] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                <FiHash size={20} />
              </div>

              <div>
                <h2 className="font-bold">
                  Slug
                </h2>

                <p className="text-sm text-white/40">
                  شناسه URL برای هر زبان
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* FA */}
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  فارسی
                </label>

                <input
                  type="text"
                  placeholder="slug فارسی"
                  dir="rtl"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                />
              </div>

              {/* EN */}
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  English
                </label>

                <input
                  type="text"
                  placeholder="english-slug"
                  dir="ltr"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-left text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                />
              </div>

              {/* AR */}
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  العربية
                </label>

                <input
                  type="text"
                  placeholder="slug عربي"
                  dir="rtl"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                />
              </div>
            </div>
          </div>

          {/* ==================== Description ==================== */}
          <div className="rounded-3xl border border-white/10 bg-[#101720] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                <FiEdit3 size={20} />
              </div>

              <div>
                <h2 className="font-bold">
                  توضیحات
                </h2>

                <p className="text-sm text-white/40">
                  توضیحات دسته‌بندی برای هر زبان
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* FA */}
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  فارسی
                </label>

                <textarea
                  rows={6}
                  placeholder="توضیحات فارسی"
                  dir="rtl"
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                />
              </div>

              {/* EN */}
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  English
                </label>

                <textarea
                  rows={6}
                  placeholder="English description"
                  dir="ltr"
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-left text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                />
              </div>

              {/* AR */}
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  العربية
                </label>

                <textarea
                  rows={6}
                  placeholder="وصف الفئة"
                  dir="rtl"
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                />
              </div>
            </div>
          </div>

          {/* ==================== Media ==================== */}
          <div className="rounded-3xl border border-white/10 bg-[#101720] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                <FiImage size={20} />
              </div>

              <div>
                <h2 className="font-bold">
                  رسانه
                </h2>

                <p className="text-sm text-white/40">
                  تصویر و آیکون دسته‌بندی
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Image */}
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  تصویر
                </label>

                <div className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/20 transition hover:border-lime-400/40 hover:bg-lime-400/5">
                  <FiUploadCloud
                    size={34}
                    className="mb-3 text-white/30"
                  />

                  <p className="text-sm text-white/60">
                    تصویر را انتخاب کنید
                  </p>

                  <span className="mt-1 text-xs text-white/30">
                    PNG / JPG / WEBP
                  </span>
                </div>
              </div>

              {/* Icon */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm text-white/70">
                  <FiTag size={15} />
                  آیکون
                </label>

                <input
                  type="text"
                  placeholder="مثلاً FiLayers"
                  dir="ltr"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-left text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                />
              </div>
            </div>
          </div>

          {/* ==================== SEO ==================== */}
          <div className="rounded-3xl border border-white/10 bg-[#101720] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                <FiSearch size={20} />
              </div>

              <div>
                <h2 className="font-bold">
                  تنظیمات SEO
                </h2>

                <p className="text-sm text-white/40">
                  اطلاعات SEO برای هر زبان
                </p>
              </div>
            </div>

            <div className="space-y-6">

              {/* SEO Title */}
              <div>
                <h3 className="mb-4 text-sm font-bold text-white/80">
                  عنوان SEO
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <input
                    type="text"
                    placeholder="عنوان SEO فارسی"
                    dir="rtl"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />

                  <input
                    type="text"
                    placeholder="English SEO title"
                    dir="ltr"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-left text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />

                  <input
                    type="text"
                    placeholder="عنوان SEO بالعربية"
                    dir="rtl"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />
                </div>
              </div>

              {/* SEO Description */}
              <div>
                <h3 className="mb-4 text-sm font-bold text-white/80">
                  توضیحات SEO
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <textarea
                    rows={5}
                    placeholder="توضیحات SEO فارسی"
                    dir="rtl"
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />

                  <textarea
                    rows={5}
                    placeholder="English SEO description"
                    dir="ltr"
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-left text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />

                  <textarea
                    rows={5}
                    placeholder="وصف SEO بالعربية"
                    dir="rtl"
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />
                </div>
              </div>

              {/* Keywords */}
              <div>
                <h3 className="mb-4 text-sm font-bold text-white/80">
                  کلمات کلیدی
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-xs text-white/40">
                      فارسی
                    </label>

                    <input
                      type="text"
                      placeholder="کلمات کلیدی فارسی"
                      dir="rtl"
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs text-white/40">
                      English
                    </label>

                    <input
                      type="text"
                      placeholder="English keywords"
                      dir="ltr"
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-left text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs text-white/40">
                      العربية
                    </label>

                    <input
                      type="text"
                      placeholder="الكلمات المفتاحية"
                      dir="rtl"
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== Sidebar ==================== */}
        <aside className="space-y-6">

          {/* Settings */}
          <div className="rounded-3xl border border-white/10 bg-[#101720] p-6">
            <div className="mb-6 flex items-center gap-3">
              <FiSettings
                size={20}
                className="text-lime-400"
              />

              <h2 className="font-bold">
                تنظیمات
              </h2>
            </div>

            <div className="space-y-6">

              {/* isPublished */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">
                    وضعیت انتشار
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    نمایش دسته‌بندی در سایت
                  </p>
                </div>

                <button
                  type="button"
                  className="relative h-6 w-11 rounded-full bg-lime-400"
                >
                  <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-black" />
                </button>
              </div>

              {/* isFeatured */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">
                    دسته‌بندی ویژه
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    نمایش در بخش ویژه
                  </p>
                </div>

                <button
                  type="button"
                  className="relative h-6 w-11 rounded-full bg-lime-400"
                >
                  <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-black" />
                </button>
              </div>

              {/* sortOrder */}
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  ترتیب نمایش
                </label>

                <input
                  type="number"
                  placeholder="0"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="rounded-3xl border border-white/10 bg-[#101720] p-6">
            <div className="space-y-3">

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 px-4 py-3.5 font-bold text-black transition hover:bg-lime-300"
              >
                <FiSave size={18} />
                ذخیره تغییرات
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <FiX size={18} />
                انصراف
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3.5 text-red-400 transition hover:bg-red-500/10"
              >
                <FiTrash2 size={18} />
                حذف دسته‌بندی
              </button>

            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
