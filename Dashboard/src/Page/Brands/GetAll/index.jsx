import React, { useEffect, useState } from "react";

import {
  FiEdit3,
  FiGrid,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiBox,
  FiCheckCircle,
  FiChevronLeft,
  FiGlobe,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { fetchData } from "../../../Utils/fetchData";
import Notify from "../../../Utils/Notify";

export default function GetAll_Brands() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("newest");

  const getData = async () => {
    const urlParams = new URLSearchParams();

    urlParams.append("sort", sort);

    if (search) {
      urlParams.append("q", search);
    }

    const finalUrl = `/admin/brands?${urlParams}`;

    try {
      const result = await fetchData(finalUrl);

      console.log(result);

      if (!result.success) {
        Notify("error", "خطا در بارگزاری اطلاعات");
        return;
      }

      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [search, sort]);

  const handleRemove = async (logo, id) => {
    const resultBrandRemove = await fetchData(`/admin/brands/${id}`, {
      method: "DELETE",
    });

    console.log(resultBrandRemove);

    if (!resultBrandRemove.success) {
      Notify("error", resultBrandRemove.message);
      return;
    }

    if (logo) {
      const fileName = logo.split("/").pop();

      const resultImgRemove = await fetchData(`/admin/media/${fileName}`, {
        method: "DELETE",
      });

      if (!resultImgRemove.success) {
        console.log("لوگوی برند حذف نشد:", resultImgRemove);
      }
    }

    getData();
  };

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

          <button
            onClick={() => navigate("create")}
            className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-[#7be35b] px-5 font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(123,227,91,0.25)]"
          >
            <FiPlus className="text-lg transition-transform group-hover:rotate-90" />
            افزودن برند
          </button>

        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Total Brands */}
          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl">

            <div className="mb-4 flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7be35b]/10 text-[#7be35b]">
                <FiGrid />
              </div>

              <span className="text-xs text-white/30">
                برندها
              </span>

            </div>

            <p className="text-2xl font-bold">
              {data.length}
            </p>

            <p className="mt-1 text-sm text-white/40">
              کل برندها
            </p>

          </div>

          {/* Active Brands */}
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
              {data.filter((e) => e.isPublished).length}
            </p>

            <p className="mt-1 text-sm text-white/40">
              برند فعال
            </p>

          </div>

          {/* Featured Brands */}
          <div className="rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl">

            <div className="mb-4 flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7be35b]/10 text-[#7be35b]">
                <FiBox />
              </div>

              <span className="text-xs text-white/30">
                ویژه
              </span>

            </div>

            <p className="text-2xl font-bold">
              {data.filter((e) => e.isFeatured).length}
            </p>

            <p className="mt-1 text-sm text-white/40">
              برندهای ویژه
            </p>

          </div>

        </div>

        {/* Search & Sort */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#0a0f0c]/80 p-4 backdrop-blur-xl">

          <div className="flex items-center justify-around gap-4">

            {/* Search */}
            <div className="relative max-w-xl flex-1">

              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجوی برند..."
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pr-11 pl-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#7be35b]/40 focus:bg-white/[0.05]"
              />

            </div>

            {/* Sort */}
            <div className="w-52">

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="cursor-pointer h-12 w-full rounded-xl border border-white/10 bg-[#101612] px-4 text-sm text-white outline-none transition-all focus:border-[#7be35b]/40"
              >
                <option value="newest">
                  جدیدترین
                </option>

                <option value="oldest">
                  قدیمی‌ترین
                </option>

                <option value="name">
                  بر اساس نام
                </option>

                <option value="order">
                  بر اساس ترتیب
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between">

          <div>

            <h2 className="font-semibold">
              لیست برندها
            </h2>

            <p className="mt-1 text-xs text-white/30">
              {data.length} برند نمایش داده می‌شود
            </p>

          </div>

          <button className="flex items-center gap-2 text-sm text-white/35 transition hover:text-white">
            مرتب‌سازی
            <FiChevronLeft />
          </button>

        </div>

        {/* Brands */}

        {data.length > 0 ? (

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

            {data.map((brand) => (

              <div
                key={brand._id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b110e]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#7be35b]/20 hover:bg-[#0d1510]"
              >

                {/* Glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#7be35b]/5 blur-3xl transition-all group-hover:bg-[#7be35b]/10" />

                {/* Logo */}
                <div className="relative mt-3 overflow-hidden rounded-xl border border-white/10">

                  {brand.logo ? (

                    <img
                      src={`${import.meta.env.VITE_BASE_FILE}${brand.logo}`}
                      alt={brand.name?.fa}
                      className="h-40 w-full object-contain bg-white/[0.03] p-6 transition duration-500 group-hover:scale-105"
                    />

                  ) : (

                    <div className="flex h-40 w-full items-center justify-center bg-white/[0.03] text-xs text-white/20">
                      بدون لوگو
                    </div>

                  )}

                </div>

                {/* Content */}
                <div className="relative mt-5">

                  <div className="flex items-center gap-2">

                    <h3 className="text-base font-semibold">
                      {brand.name?.fa}
                    </h3>

                    <span
                      className={`rounded-md px-2 py-1 text-[9px] ${
                        brand.isPublished
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-white/5 text-white/30"
                      }`}
                    >
                      {brand.isPublished ? "فعال" : "غیرفعال"}
                    </span>

                  </div>

                  <p className="mt-2 min-h-10 text-xs leading-5 text-white/35">
                    {brand.description?.fa}
                  </p>

                  {/* Country */}
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">

                    <FiGlobe className="text-white/20" />

                    <div>

                      <span className="text-[10px] text-white/20">
                        کشور
                      </span>

                      <p className="mt-1 text-xs text-white/45">
                        {brand.country?.fa || "ثبت نشده"}
                      </p>

                    </div>

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
                        {brand.sortOrder}
                      </p>

                      <p className="text-[10px] text-white/25">
                        ترتیب
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() => navigate(`update/${brand._id}`)}
                      className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/30 transition hover:border-[#7be35b]/20 hover:bg-[#7be35b]/5 hover:text-[#7be35b]"
                    >
                      <FiEdit3 />
                    </button>

                    <button
                      onClick={() =>
                        handleRemove(brand.logo, brand._id)
                      }
                      className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/30 transition hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-400"
                    >
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