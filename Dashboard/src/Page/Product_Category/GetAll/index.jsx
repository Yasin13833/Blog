import React, { useMemo, useState } from "react";
import {
  FiBox,
  FiEdit3,
  FiGrid,
  FiPlus,
  FiSearch,
  FiTag,
  FiTrash2,
  FiLayers,
  FiCheckCircle,
  FiMoreVertical,
  FiChevronLeft,
} from "react-icons/fi";

const categories = [
  {
    id: 1,
    title: "لوله‌های انتقال آب",
    slug: "water-pipes",
    description: "انواع لوله‌های مناسب برای انتقال و توزیع آب",
    products: 12,
    status: "فعال",
    icon: "pipe",
  },
  {
    id: 2,
    title: "سیستم‌های آبیاری",
    slug: "irrigation-systems",
    description: "محصولات مربوط به آبیاری قطره‌ای و تحت فشار",
    products: 8,
    status: "فعال",
    icon: "irrigation",
  },
  {
    id: 3,
    title: "اتصالات",
    slug: "fittings",
    description: "انواع اتصالات پلی‌اتیلن، PVC و برنجی",
    products: 18,
    status: "فعال",
    icon: "fitting",
  },
  {
    id: 4,
    title: "پمپ و موتور",
    slug: "pumps-motors",
    description: "پمپ‌های آب و تجهیزات انتقال آب کشاورزی",
    products: 6,
    status: "فعال",
    icon: "pump",
  },
  {
    id: 5,
    title: "تصفیه آب",
    slug: "water-filtration",
    description: "فیلترها و تجهیزات تصفیه و کنترل کیفیت آب",
    products: 5,
    status: "فعال",
    icon: "filter",
  },
  {
    id: 6,
    title: "تجهیزات جانبی",
    slug: "accessories",
    description: "ابزار و تجهیزات جانبی مورد نیاز سیستم‌های آبیاری",
    products: 3,
    status: "غیرفعال",
    icon: "accessory",
  },
];

function CategoryIcon({ type }) {
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#7be35b]/10 bg-[#7be35b]/5">
      <div className="absolute inset-0 rounded-2xl bg-[#7be35b]/5 blur-xl" />

      {type === "pipe" && (
        <FiLayers className="relative text-2xl text-[#7be35b]" />
      )}

      {type === "irrigation" && (
        <FiGrid className="relative text-2xl text-[#7be35b]" />
      )}

      {type === "fitting" && (
        <FiBox className="relative text-2xl text-[#7be35b]" />
      )}

      {type === "pump" && (
        <FiBox className="relative text-2xl text-[#7be35b]" />
      )}

      {type === "filter" && (
        <FiTag className="relative text-2xl text-[#7be35b]" />
      )}

      {type === "accessory" && (
        <FiGrid className="relative text-2xl text-[#7be35b]" />
      )}
    </div>
  );
}

export default function GetAll_Pr_Cat() {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter(
      (category) =>
        category.title.includes(search) ||
        category.description.includes(search) ||
        category.slug.includes(search)
    );
  }, [search]);

  const activeCount = categories.filter(
    (item) => item.status === "فعال"
  ).length;

  const totalProducts = categories.reduce(
    (total, category) => total + category.products,
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
              مدیریت دسته‌بندی‌ها
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              دسته‌بندی محصولات
            </h1>

            <p className="mt-2 text-sm text-white/40">
              دسته‌بندی‌های محصولات را ایجاد و مدیریت کنید.
            </p>
          </div>

          <button className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-[#7be35b] px-5 font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(123,227,91,0.25)]">
            <FiPlus className="text-lg transition-transform group-hover:rotate-90" />
            افزودن دسته‌بندی
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total Categories */}
          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7be35b]/10 text-[#7be35b]">
                <FiGrid />
              </div>

              <span className="text-xs text-white/30">
                دسته‌بندی
              </span>
            </div>

            <p className="text-2xl font-bold">
              {categories.length}
            </p>

            <p className="mt-1 text-sm text-white/40">
              کل دسته‌بندی‌ها
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
              {activeCount}
            </p>

            <p className="mt-1 text-sm text-white/40">
              دسته‌بندی فعال
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
              محصولات در دسته‌بندی‌ها
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
              placeholder="جستجوی دسته‌بندی..."
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pr-11 pl-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
            />
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">
              لیست دسته‌بندی‌ها
            </h2>

            <p className="mt-1 text-xs text-white/30">
              {filteredCategories.length} دسته‌بندی نمایش داده می‌شود
            </p>
          </div>

          <button className="flex items-center gap-2 text-sm text-white/35 transition hover:text-white">
            مرتب‌سازی
            <FiChevronLeft />
          </button>
        </div>

        {/* Categories */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#7be35b]/20 hover:bg-[#0d1510]"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#7be35b]/5 blur-3xl transition-all group-hover:bg-[#7be35b]/10" />

                {/* Top */}
                <div className="relative flex items-start justify-between">
                  <CategoryIcon type={category.icon} />

                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/20 transition hover:bg-white/5 hover:text-white">
                    <FiMoreVertical />
                  </button>
                </div>

                {/* Content */}
                <div className="relative mt-5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold">
                      {category.title}
                    </h3>

                    <span
                      className={`rounded-md px-2 py-1 text-[9px] ${
                        category.status === "فعال"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-white/5 text-white/30"
                      }`}
                    >
                      {category.status}
                    </span>
                  </div>

                  <p className="mt-2 min-h-10 text-xs leading-5 text-white/35">
                    {category.description}
                  </p>

                  {/* Slug */}
                  <div className="mt-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                    <span className="text-[10px] text-white/20">
                      slug
                    </span>

                    <p className="mt-1 text-xs text-white/45">
                      {category.slug}
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
                        {category.products}
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
              دسته‌بندی پیدا نشد
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