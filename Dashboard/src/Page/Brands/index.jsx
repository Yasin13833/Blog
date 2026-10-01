import React, { useMemo, useState } from "react";
import {
  FiBox,
  FiCheckCircle,
  FiEdit3,
  FiGrid,
  FiMoreVertical,
  FiPlus,
  FiSearch,
  FiTag,
  FiTrash2,
  FiChevronLeft,
} from "react-icons/fi";

const brands = [
  {
    id: 1,
    title: "آبیاران",
    slug: "abiyaran",
    description: "تجهیزات و محصولات تخصصی حوزه آبیاری و انتقال آب",
    products: 14,
    status: "فعال",
    letter: "A",
  },
  {
    id: 2,
    title: "پارس لوله",
    slug: "pars-pipe",
    description: "تولیدکننده انواع لوله‌های PVC و پلی‌اتیلن",
    products: 9,
    status: "فعال",
    letter: "P",
  },
  {
    id: 3,
    title: "آب صنعت",
    slug: "ab-sanat",
    description: "تجهیزات پمپاژ، تصفیه و کنترل آب",
    products: 11,
    status: "فعال",
    letter: "A",
  },
  {
    id: 4,
    title: "کشاورز نوین",
    slug: "keshavarz-novin",
    description: "راهکارهای نوین برای آبیاری و کشاورزی",
    products: 7,
    status: "فعال",
    letter: "K",
  },
  {
    id: 5,
    title: "پایا پمپ",
    slug: "paya-pump",
    description: "تولیدکننده پمپ و تجهیزات انتقال آب",
    products: 6,
    status: "فعال",
    letter: "P",
  },
  {
    id: 6,
    title: "آریا تجهیز",
    slug: "arya-tajhiz",
    description: "تجهیزات و اتصالات سیستم‌های آبیاری",
    products: 4,
    status: "غیرفعال",
    letter: "A",
  },
];

export default function Brands() {
  const [search, setSearch] = useState("");

  const filteredBrands = useMemo(() => {
    return brands.filter(
      (brand) =>
        brand.title.includes(search) ||
        brand.description.includes(search) ||
        brand.slug.includes(search)
    );
  }, [search]);

  const activeBrands = brands.filter(
    (brand) => brand.status === "فعال"
  ).length;

  const totalProducts = brands.reduce(
    (total, brand) => total + brand.products,
    0
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050806] px-6 py-8 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#7be35b]/5 blur-[120px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#7be35b]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-[#7be35b]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7be35b] shadow-[0_0_10px_#7be35b]" />
              مدیریت برندها
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              برندها
            </h1>

            <p className="mt-2 text-sm text-white/40">
              برندهای محصولات را ایجاد و مدیریت کنید.
            </p>
          </div>

          <button className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-[#7be35b] px-5 font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(123,227,91,0.25)]">
            <FiPlus className="text-lg transition-transform group-hover:rotate-90" />
            افزودن برند
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total */}
          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7be35b]/10 text-[#7be35b]">
                <FiTag />
              </div>

              <span className="text-xs text-white/30">
                برندها
              </span>
            </div>

            <p className="text-2xl font-bold">
              {brands.length}
            </p>

            <p className="mt-1 text-sm text-white/40">
              کل برندها
            </p>
          </div>

          {/* Active */}
          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <FiCheckCircle />
              </div>

              <span className="text-xs text-emerald-400/60">
                فعال
              </span>
            </div>

            <p className="text-2xl font-bold">
              {activeBrands}
            </p>

            <p className="mt-1 text-sm text-white/40">
              برند فعال
            </p>
          </div>

          {/* Products */}
          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7be35b]/10 text-[#7be35b]">
                <FiBox />
              </div>

              <span className="text-xs text-white/30">
                محصولات
              </span>
            </div>

            <p className="text-2xl font-bold">
              {totalProducts}
            </p>

            <p className="mt-1 text-sm text-white/40">
              محصولات مرتبط با برندها
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#0a0f0c]/80 p-4 backdrop-blur-xl">
          <div className="relative max-w-xl">
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی برند..."
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pr-11 pl-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
            />
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">
              لیست برندها
            </h2>

            <p className="mt-1 text-xs text-white/30">
              {filteredBrands.length} برند نمایش داده می‌شود
            </p>
          </div>

          <button className="flex items-center gap-2 text-sm text-white/35 transition hover:text-white">
            مرتب‌سازی
            <FiChevronLeft />
          </button>
        </div>

        {/* Brands */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#7be35b]/20 hover:bg-[#0d1510]"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#7be35b]/5 blur-3xl transition-all group-hover:bg-[#7be35b]/10" />

                {/* Top */}
                <div className="relative flex items-start justify-between">
                  {/* Brand Logo */}
                  <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#7be35b]/10 bg-[#7be35b]/5">
                    <div className="absolute inset-0 bg-[#7be35b]/5 blur-xl" />

                    <span className="relative text-xl font-bold text-[#7be35b]">
                      {brand.letter}
                    </span>
                  </div>

                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/20 transition hover:bg-white/5 hover:text-white">
                    <FiMoreVertical />
                  </button>
                </div>

                {/* Content */}
                <div className="relative mt-5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold">
                      {brand.title}
                    </h3>

                    <span
                      className={`rounded-md px-2 py-1 text-[9px] ${
                        brand.status === "فعال"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-white/5 text-white/30"
                      }`}
                    >
                      {brand.status}
                    </span>
                  </div>

                  <p className="mt-2 min-h-10 text-xs leading-5 text-white/35">
                    {brand.description}
                  </p>

                  {/* Slug */}
                  <div className="mt-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                    <span className="text-[10px] text-white/20">
                      slug
                    </span>

                    <p className="mt-1 text-xs text-white/45">
                      {brand.slug}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-white/[0.06]" />

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7be35b]/10 text-[#7be35b]">
                      <FiBox className="text-sm" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold">
                        {brand.products}
                      </p>

                      <p className="text-[10px] text-white/25">
                        محصول
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/30 transition hover:border-[#7be35b]/20 hover:bg-[#7be35b]/5 hover:text-[#7be35b]">
                      <FiEdit3 />
                    </button>

                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/30 transition hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-400">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-white/20">
              <FiSearch className="text-xl" />
            </div>

            <h3 className="text-sm font-medium">
              برندی پیدا نشد
            </h3>

            <p className="mt-2 text-xs text-white/30">
              عبارت جستجو را تغییر دهید.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}