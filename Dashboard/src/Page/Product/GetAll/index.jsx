import React, { useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiBox,
  FiCheckCircle,
  FiEdit3,
  FiFilter,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiTag,
  FiLayers,
  FiChevronLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "لوله تحت فشار PVC-U PN16",
    category: "لوله‌های انتقال آب",
    price: "۱٬۸۵۰٬۰۰۰",
    stock: "۱۲۰ عدد",
    status: "منتشر شده",
    type: "pipe",
  },
  {
    id: 2,
    title: "نوار تیپ آبیاری",
    category: "سیستم‌های آبیاری",
    price: "۶۴۰٬۰۰۰",
    stock: "۳۴۰ عدد",
    status: "منتشر شده",
    type: "tape",
  },
  {
    id: 3,
    title: "فیلتر دیسکی ۱۳۲",
    category: "تصفیه آب",
    price: "۲٬۳۰۰٬۰۰۰",
    stock: "۴۵ عدد",
    status: "منتشر شده",
    type: "filter",
  },
  {
    id: 4,
    title: "پمپ آب کشاورزی",
    category: "پمپ و موتور",
    price: "۱۴٬۵۰۰٬۰۰۰",
    stock: "۱۲ عدد",
    status: "منتشر شده",
    type: "pump",
    low: true,
  },
  {
    id: 5,
    title: "زانویی ۹۰ درجه پلی‌اتیلن",
    category: "اتصالات",
    price: "۹۵٬۰۰۰",
    stock: "ناموجود",
    status: "پیش‌نویس",
    type: "elbow",
    out: true,
  },
  {
    id: 6,
    title: "شیر فلکه برنجی ۲ اینچ",
    category: "اتصالات",
    price: "۷۸۰٬۰۰۰",
    stock: "۶۰ عدد",
    status: "منتشر شده",
    type: "valve",
  },
];

const categories = [
  "همه",
  "لوله‌های انتقال آب",
  "سیستم‌های آبیاری",
  "تصفیه آب",
  "پمپ و موتور",
  "اتصالات",
];

function ProductIcon({ type }) {
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#7be35b]/10 bg-[#7be35b]/5">
      <div className="absolute inset-0 rounded-2xl bg-[#7be35b]/5 blur-xl" />

      {type === "pipe" && (
        <svg
          width="30"
          height="30"
          viewBox="0 0 40 40"
          fill="none"
          className="relative"
        >
          <rect
            x="7"
            y="12"
            width="26"
            height="16"
            rx="4"
            stroke="#7be35b"
            strokeWidth="2"
          />
          <path
            d="M13 12V28M27 12V28"
            stroke="#7be35b"
            strokeWidth="2"
          />
        </svg>
      )}

      {type === "tape" && (
        <svg
          width="30"
          height="30"
          viewBox="0 0 40 40"
          fill="none"
          className="relative"
        >
          <circle
            cx="20"
            cy="20"
            r="12"
            stroke="#7be35b"
            strokeWidth="2"
          />
          <circle
            cx="20"
            cy="20"
            r="5"
            stroke="#7be35b"
            strokeWidth="2"
          />
          <path
            d="M20 8V14M32 20H26M20 32V26M8 20H14"
            stroke="#7be35b"
            strokeWidth="2"
          />
        </svg>
      )}

      {type === "filter" && (
        <FiFilter className="relative text-2xl text-[#7be35b]" />
      )}

      {type === "pump" && (
        <FiBox className="relative text-2xl text-[#7be35b]" />
      )}

      {type === "elbow" && (
        <FiLayers className="relative text-2xl text-[#7be35b]" />
      )}

      {type === "valve" && (
        <FiTag className="relative text-2xl text-[#7be35b]" />
      )}
    </div>
  );
}

export default function GetAll_Product() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("همه");
const navigate = useNavigate()
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.includes(search) ||
        product.category.includes(search);

      const matchesCategory =
        activeCategory === "همه" ||
        product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const publishedCount = products.filter(
    (item) => item.status === "منتشر شده"
  ).length;

  const draftCount = products.filter(
    (item) => item.status === "پیش‌نویس"
  ).length;

  const lowStockCount = products.filter((item) => item.low).length;

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
              مدیریت محصولات
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              محصولات
            </h1>

            <p className="mt-2 text-sm text-white/40">
              محصولات سایت را مدیریت، ویرایش و دسته‌بندی کنید.
            </p>
          </div>

          <button onClick={()=>navigate('create')} className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-[#7be35b] px-5 font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(123,227,91,0.25)]">
            <FiPlus className="text-lg transition-transform group-hover:rotate-90" />
            افزودن محصول
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7be35b]/10 text-[#7be35b]">
                <FiBox />
              </div>

              <span className="text-xs text-white/30">کل</span>
            </div>

            <p className="text-2xl font-bold">{products.length}</p>
            <p className="mt-1 text-sm text-white/40">
              کل محصولات
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <FiCheckCircle />
              </div>

              <span className="text-xs text-emerald-400/60">
                فعال
              </span>
            </div>

            <p className="text-2xl font-bold">{publishedCount}</p>
            <p className="mt-1 text-sm text-white/40">
              محصولات منتشر شده
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60">
                <FiEdit3 />
              </div>

              <span className="text-xs text-white/30">
                Draft
              </span>
            </div>

            <p className="text-2xl font-bold">{draftCount}</p>
            <p className="mt-1 text-sm text-white/40">
              پیش‌نویس
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/10 text-orange-400">
                <FiAlertCircle />
              </div>

              <span className="text-xs text-orange-400/60">
                نیاز به بررسی
              </span>
            </div>

            <p className="text-2xl font-bold">{lowStockCount}</p>
            <p className="mt-1 text-sm text-white/40">
              موجودی کم
            </p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#0a0f0c]/80 p-4 backdrop-blur-xl">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            {/* Search */}
            <div className="relative w-full xl:max-w-md">
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجوی محصول..."
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pr-11 pl-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => {
                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm transition-all ${
                      active
                        ? "bg-[#7be35b] font-medium text-black shadow-[0_0_20px_rgba(123,227,91,0.15)]"
                        : "border border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">لیست محصولات</h2>
            <p className="mt-1 text-xs text-white/30">
              {filteredProducts.length} محصول نمایش داده می‌شود
            </p>
          </div>

          <button className="flex items-center gap-2 text-sm text-white/35 transition hover:text-white">
            مرتب‌سازی
            <FiChevronLeft />
          </button>
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#7be35b]/20 hover:bg-[#0d1510]"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#7be35b]/5 blur-3xl transition-all group-hover:bg-[#7be35b]/10" />

                {/* Top */}
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ProductIcon type={product.type} />

                    <div>
                      <span className="text-[11px] text-[#7be35b]/70">
                        {product.category}
                      </span>

                      <h3 className="mt-1 max-w-[220px] text-sm font-semibold leading-6">
                        {product.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`rounded-lg px-2.5 py-1 text-[10px] ${
                      product.status === "منتشر شده"
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-white/[0.06]" />

                {/* Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 text-[11px] text-white/25">
                      قیمت
                    </p>

                    <p className="text-sm font-semibold">
                      {product.price}
                      <span className="mr-1 text-[10px] font-normal text-white/30">
                        تومان
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-[11px] text-white/25">
                      موجودی
                    </p>

                    <p
                      className={`text-sm font-semibold ${
                        product.out
                          ? "text-red-400"
                          : product.low
                          ? "text-orange-400"
                          : "text-white"
                      }`}
                    >
                      {product.stock}

                      {product.low && (
                        <span className="mr-2 text-[10px] font-normal text-orange-400/60">
                          کم
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex items-center gap-2">
                  <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] text-xs text-white/50 transition-all hover:border-[#7be35b]/20 hover:bg-[#7be35b]/5 hover:text-[#7be35b]">
                    <FiEdit3 />
                    ویرایش
                  </button>

                  <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/25 transition-all hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-400">
                    <FiTrash2 />
                  </button>
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
              محصولی پیدا نشد
            </h3>

            <p className="mt-2 text-xs text-white/30">
              عبارت جستجو یا دسته‌بندی را تغییر دهید.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}