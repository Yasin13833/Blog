import React from "react";

import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiPlus,
  FiSave,
  FiTrash2,
  FiGlobe,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
} from "react-icons/fi";

export default function Create_Brands() {
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
              type="button"
              className="mb-4 flex cursor-pointer items-center gap-2 text-sm text-white/35 transition hover:text-[#7be35b]"
            >
              <FiArrowRight />
              بازگشت به برندها
            </button>

            <div className="mb-3 flex items-center gap-2 text-sm text-[#7be35b]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7be35b] shadow-[0_0_10px_#7be35b]" />
              مدیریت برندها
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              ایجاد برند جدید
            </h1>

            <p className="mt-2 text-sm text-white/40">
              اطلاعات برند جدید را وارد و آن را ایجاد کنید.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-[#7be35b]" />
            <span className="text-xs text-white/40">
              برند جدید
            </span>
          </div>
        </div>

        <form>
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
                    نام برند
                  </h2>

                  <p className="mt-1 text-xs text-white/30">
                    نام برند در سه زبان
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    فارسی
                  </label>

                  <input
                    type="text"
                    placeholder="نام برند"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    English
                  </label>

                  <input
                    type="text"
                    placeholder="Brand name"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    العربية
                  </label>

                  <input
                    type="text"
                    placeholder="اسم العلامة التجارية"
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
                  شناسه متنی برند برای URL
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    فارسی
                  </label>

                  <input
                    type="text"
                    placeholder="برند-کشاورزی"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    English
                  </label>

                  <input
                    type="text"
                    placeholder="agriculture-brand"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    العربية
                  </label>

                  <input
                    type="text"
                    placeholder="علامة-زراعية"
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
                  توضیحات برند
                </h2>

                <p className="mt-1 text-xs text-white/30">
                  توضیحات برند در سه زبان
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    فارسی
                  </label>

                  <textarea
                    rows={5}
                    placeholder="توضیحات برند..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    English
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Brand description..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    العربية
                  </label>

                  <textarea
                    rows={5}
                    placeholder="وصف العلامة التجارية..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>
              </div>
            </div>

            {/* ========================= */}
            {/* Country */}
            {/* ========================= */}

            <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
              <div className="mb-6">
                <h2 className="font-semibold">
                  کشور برند
                </h2>

                <p className="mt-1 text-xs text-white/30">
                  کشور برند در سه زبان
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    فارسی
                  </label>

                  <input
                    type="text"
                    placeholder="ایران"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    English
                  </label>

                  <input
                    type="text"
                    placeholder="Iran"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    العربية
                  </label>

                  <input
                    type="text"
                    placeholder="إيران"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>
              </div>
            </div>

            {/* ========================= */}
            {/* Logo & Cover */}
            {/* ========================= */}

            <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
              <div className="mb-6">
                <h2 className="font-semibold text-white">
                  تصاویر برند
                </h2>

                <p className="mt-1 text-xs text-white/30">
                  لوگو و تصویر کاور برند
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Logo */}
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    لوگو برند
                  </label>

                  <label className="group relative flex h-70 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.02] transition hover:border-[#7be35b]/40 hover:bg-[#7be35b]/[0.03]">
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-[#7be35b]">
                        <FiPlus size={22} />
                      </div>

                      <div className="text-center">
                        <p className="text-sm font-medium text-white/80">
                          انتخاب لوگو
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
                    />
                  </label>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    تصویر کاور
                  </label>

                  <label className="group relative flex h-70 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.02] transition hover:border-[#7be35b]/40 hover:bg-[#7be35b]/[0.03]">
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-[#7be35b]">
                        <FiPlus size={22} />
                      </div>

                      <div className="text-center">
                        <p className="text-sm font-medium text-white/80">
                          انتخاب تصویر کاور
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
                    />
                  </label>
                </div>

              </div>
            </div>

            {/* ========================= */}
            {/* Website & Social Links */}
            {/* ========================= */}

            <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7be35b]/10 text-[#7be35b]">
                  <FiGlobe />
                </div>

                <div>
                  <h2 className="font-semibold">
                    اطلاعات ارتباطی
                  </h2>

                  <p className="mt-1 text-xs text-white/30">
                    وب‌سایت و شبکه‌های اجتماعی برند
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                {/* Website */}
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    وب‌سایت
                  </label>

                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

                  {/* Instagram */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs text-white/45">
                      <FiInstagram />
                      Instagram
                    </label>

                    <input
                      type="text"
                      placeholder="https://instagram.com/..."
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs text-white/45">
                      <FiLinkedin />
                      LinkedIn
                    </label>

                    <input
                      type="text"
                      placeholder="https://linkedin.com/..."
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />
                  </div>

                  {/* YouTube */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs text-white/45">
                      <FiYoutube />
                      YouTube
                    </label>

                    <input
                      type="text"
                      placeholder="https://youtube.com/..."
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* ========================= */}
            {/* Settings */}
            {/* ========================= */}

            <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-6 backdrop-blur-xl">
              <div className="mb-6">
                <h2 className="font-semibold">
                  تنظیمات برند
                </h2>

                <p className="mt-1 text-xs text-white/30">
                  وضعیت و ترتیب نمایش برند
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
                    placeholder="0"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                  />
                </div>

                {/* Featured */}
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    برند ویژه
                  </label>

                  <button
                    type="button"
                    className="flex h-12 w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white/40 transition"
                  >
                    <span>
                      برند معمولی
                    </span>
                  </button>
                </div>

                {/* Published */}
                <div>
                  <label className="mb-2 block text-xs text-white/45">
                    وضعیت انتشار
                  </label>

                  <button
                    type="button"
                    className="flex h-12 w-full items-center justify-between rounded-xl border border-[#7be35b]/30 bg-[#7be35b]/10 px-4 text-sm text-[#7be35b]"
                  >
                    <span>
                      منتشر شده
                    </span>

                    <FiCheck />
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
                      placeholder="عنوان SEO"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />

                    <input
                      type="text"
                      placeholder="SEO title"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />

                    <input
                      type="text"
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
                      placeholder="توضیحات SEO"
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />

                    <textarea
                      rows={5}
                      placeholder="SEO description"
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                    />

                    <textarea
                      rows={5}
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
                        <input
                          type="text"
                          placeholder="کلمه کلیدی 1"
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                        />

                        <input
                          type="text"
                          placeholder="کلمه کلیدی 2"
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                        />

                        <input
                          type="text"
                          placeholder="کلمه کلیدی 3"
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                        />
                      </div>
                    </div>

                    {/* English */}
                    <div>
                      <span className="mb-3 block text-sm text-white/60">
                        English
                      </span>

                      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                        <input
                          type="text"
                          placeholder="Keyword 1"
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                        />

                        <input
                          type="text"
                          placeholder="Keyword 2"
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                        />

                        <input
                          type="text"
                          placeholder="Keyword 3"
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                        />
                      </div>
                    </div>

                    {/* العربية */}
                    <div>
                      <span className="mb-3 block text-sm text-white/60">
                        العربية
                      </span>

                      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                        <input
                          type="text"
                          placeholder="كلمة مفتاحية 1"
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                        />

                        <input
                          type="text"
                          placeholder="كلمة مفتاحية 2"
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                        />

                        <input
                          type="text"
                          placeholder="كلمة مفتاحية 3"
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
                        />
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
                type="button"
                className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm text-white/50 transition hover:border-white/20 hover:text-white"
              >
                <FiTrash2 />
                پاک کردن فرم
              </button>

              <button
                type="submit"
                className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#7be35b] px-7 text-sm font-semibold text-black transition hover:shadow-[0_0_30px_rgba(123,227,91,0.25)]"
              >
                <FiSave />
                ایجاد برند
              </button>
            </div>

          </div>
        </form>
      </div>
    </section>
  );
}