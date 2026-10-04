import React, { useEffect, useState } from "react";

import {
  FiArrowRight,
  FiEdit3,
  FiHash,
  FiImage,
  FiPlus,
  FiSave,
  FiSearch,
  FiSettings,
  FiTag,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import { fetchData, fetchUpload } from "../../../Utils/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import Notify from "../../../Utils/Notify";

export default function Update_Brands() {

  const { id } = useParams();
  const navigate = useNavigate();

  // ==================== Category State ====================
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
        fa: [],
        en: [],
        ar: [],
      },
    },
  });

  // ==================== Image State ====================
  const [img, setImg] = useState({
    local: false,
    remove: false,
    data: "",
  });

  // Preview جدا برای فایل Local
  // تا URL.createObjectURL مستقیماً داخل JSX ساخته نشود
  const [preview, setPreview] = useState("");

  // ==================== Get Category ====================
  useEffect(() => {
    (async () => {
      try {
        const result = await fetchData(
          `/admin/product-categories/${id}`
        );

        if (!result.success) {
          Notify("error", "خطا در بارگزاری کتگوری");
          return;
        }

        console.log(result);

        setCategory(result.data);

        setImg({
          local: false,
          remove: false,
          data: result.data.image,
        });
      } catch (error) {
        console.log(error);
        Notify("error", "خطا در ارتباط با سرور");
      }
    })();
  }, [id]);

  // ==================== Local Image Preview ====================
  useEffect(() => {

    // اگر فایل Local داریم، Preview بساز
    if (img.local && img.data) {

      const objectUrl = URL.createObjectURL(img.data);

      setPreview(objectUrl);

      // جلوگیری از Memory Leak
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    // اگر Local Image نداریم
    setPreview("");
  }, [img.local, img.data]);

  // ==================== Submit ====================
  const handleSubmit = async () => {
    try {

      // عکس قدیمی قبل از هر تغییری
      const oldImg = category.image;

      // تصویر نهایی که قرار است داخل Category ذخیره شود
      let finalImage = category.image;

      // اگر عکس جدید Upload شده باشد،
      // URL آن را اینجا نگه می‌داریم
      let uploadedNewImage = null;

      const formData = new FormData();

      // ==================== Upload New Image ====================
      if (img.local && !img.remove) {

        formData.append("file", img.data);

        // اول عکس جدید را Upload می‌کنیم
        const resultNewImg = await fetchUpload(
          "/admin/media/image",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!resultNewImg.success) {
          Notify("error", "خطا در بارگزاری عکس جدید");
          return;
        }

        // URL عکس جدید
        uploadedNewImage = resultNewImg.data.url;
        finalImage = uploadedNewImage;
      }

      // ==================== Remove Image ====================
      if (!img.local && img.remove) {

        // فقط مقدار تصویر Category را خالی می‌کنیم
        // خود فایل را بعد از PATCH حذف می‌کنیم
        finalImage = "";
      }

      // ==================== Update Data ====================
      // فقط فیلدهای قابل ویرایش را می‌فرستیم
      // تا _id / createdAt / updatedAt / __v و ... ارسال نشوند
      const updateData = {
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: finalImage,
        icon: category.icon,
        isFeatured: category.isFeatured,
        isPublished: category.isPublished,
        sortOrder: category.sortOrder,
        seo: category.seo,
      };

      // ==================== PATCH Category ====================
      const finalUpdate = await fetchData(
        `/admin/product-categories/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updateData),
        }
      );

      // اگر PATCH شکست خورد
      if (!finalUpdate.success) {

        // اگر عکس جدید قبلاً Upload شده،
        // چون Category ذخیره نشده، عکس جدید دیگر استفاده نمی‌شود
        // پس آن را پاک می‌کنیم
        if (uploadedNewImage) {

          const fileName = uploadedNewImage.split("/").pop();

          const resultRemoveNewImg = await fetchUpload(
            `/admin/media/${fileName}`,
            {
              method: "DELETE",
            }
          );

          if (!resultRemoveNewImg.success) {
            console.log(
              "عکس جدید هم حذف نشد:",
              resultRemoveNewImg
            );
          }
        }

        Notify("error", finalUpdate.message);
        return;
      }

      // ==================== Delete Old Image ====================
      // اگر عکس جدید جایگزین عکس قدیمی شده،
      // بعد از موفقیت PATCH عکس قدیمی را حذف می‌کنیم
      if (img.local && !img.remove && oldImg) {

        const fileName = oldImg.split("/").pop();

        const resultOldImg = await fetchUpload(
          `/admin/media/${fileName}`,
          {
            method: "DELETE",
          }
        );

        // حذف عکس قدیمی نباید باعث Fail شدن Update اصلی شود
        if (!resultOldImg.success) {
          Notify(
            "error",
            "دسته‌بندی به‌روزرسانی شد اما حذف تصویر قدیمی ناموفق بود"
          );

          console.log(
            "عکس قدیمی حذف نشد:",
            resultOldImg
          );
        }
      }

      // ==================== Delete Removed Image ====================
      // اگر کاربر عکس قبلی را حذف کرده باشد
      if (!img.local && img.remove && oldImg) {

        const fileName = oldImg.split("/").pop();

        const resultOldRemove = await fetchUpload(
          `/admin/media/${fileName}`,
          {
            method: "DELETE",
          }
        );

        // حذف فایل مهمان Update اصلی نیست
        if (!resultOldRemove.success) {
          Notify(
            "error",
            "دسته‌بندی به‌روزرسانی شد اما حذف تصویر ناموفق بود"
          );

          console.log(
            "عکس حذف نشد:",
            resultOldRemove
          );
        }
      }

      // ==================== Sync Category State ====================
      setCategory((prev) => ({
        ...prev,
        image: finalImage,
      }));

      // بعد از ذخیره، وضعیت Image را Reset می‌کنیم
      setImg({
        local: false,
        remove: false,
        data: finalImage,
      });

      Notify("success", finalUpdate.message);

    } catch (error) {

      console.log(error);

      Notify(
        "error",
        "خطایی هنگام ذخیره تغییرات رخ داد"
      );
    }
    navigate(-1)
  };

  // ==================== Remove Category ====================
  const handleRemove = async (image) => {
    try {

      // اول Category را حذف می‌کنیم
      const resultCatRemove = await fetchData(
        `/admin/product-categories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!resultCatRemove.success) {
        Notify("error", resultCatRemove.message);
        return;
      }

      // اگر Category تصویر داشت،
      // فایل تصویر را هم حذف می‌کنیم
      if (image) {

        const fileName = image.split("/").pop();

        const resultImgRemove = await fetchUpload(
          `/admin/media/${fileName}`,
          {
            method: "DELETE",
          }
        );

        // اگر Category حذف شده باشد ولی Image حذف نشود
        if (!resultImgRemove.success) {
          Notify(
            "error",
            "دسته‌بندی حذف شد ولی حذف تصویر ناموفق بود"
          );

          console.log(
            "عکس حذف نشد:",
            resultImgRemove
          );
        }
      }

      Notify(
        "success",
        resultCatRemove.message
      );

      // برگشت به صفحه قبل
      navigate(-1);

    } catch (error) {

      console.log(error);

      Notify(
        "error",
        "خطایی هنگام حذف دسته‌بندی رخ داد"
      );
    }
  };

  return (
    <section className="min-h-screen bg-[#050806] px-6 py-8 text-white">

      {/* ==================== Header ==================== */}
      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-4">

          {/* دکمه برگشت */}
          <button
            type="button"
            onClick={() => navigate(-1)}
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

        {/* ==================== Main ==================== */}
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
                  value={category.name.fa}
                  onChange={(e) => {
                    setCategory((prev) => ({
                      ...prev,
                      name: {
                        ...prev.name,
                        fa: e.target.value,
                      },
                    }));
                  }}
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
                  value={category.name.en}
                  onChange={(e) => {
                    setCategory((prev) => ({
                      ...prev,
                      name: {
                        ...prev.name,
                        en: e.target.value,
                      },
                    }));
                  }}
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
                  value={category.name.ar}
                  onChange={(e) => {
                    setCategory((prev) => ({
                      ...prev,
                      name: {
                        ...prev.name,
                        ar: e.target.value,
                      },
                    }));
                  }}
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
                  value={category.slug.fa}
                  onChange={(e) => {
                    setCategory((prev) => ({
                      ...prev,
                      slug: {
                        ...prev.slug,
                        fa: e.target.value,
                      },
                    }));
                  }}
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
                  value={category.slug.en}
                  onChange={(e) => {
                    setCategory((prev) => ({
                      ...prev,
                      slug: {
                        ...prev.slug,
                        en: e.target.value,
                      },
                    }));
                  }}
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
                  value={category.slug.ar}
                  onChange={(e) => {
                    setCategory((prev) => ({
                      ...prev,
                      slug: {
                        ...prev.slug,
                        ar: e.target.value,
                      },
                    }));
                  }}
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
                  value={category.description.fa}
                  onChange={(e) => {
                    setCategory((prev) => ({
                      ...prev,
                      description: {
                        ...prev.description,
                        fa: e.target.value,
                      },
                    }));
                  }}
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
                  value={category.description.en}
                  onChange={(e) => {
                    setCategory((prev) => ({
                      ...prev,
                      description: {
                        ...prev.description,
                        en: e.target.value,
                      },
                    }));
                  }}
                  rows={6}
                  placeholder="English description"
                  dir="ltr"
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                />

              </div>

              {/* AR */}
              <div>

                <label className="mb-2 block text-sm text-white/70">
                  العربية
                </label>

                <textarea
                  value={category.description.ar}
                  onChange={(e) => {
                    setCategory((prev) => ({
                      ...prev,
                      description: {
                        ...prev.description,
                        ar: e.target.value,
                      },
                    }));
                  }}
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

              {/* ==================== Image ==================== */}
              <div className="relative">

                {/* دکمه حذف / لغو تصویر */}
                {!img?.remove ? (
                  <button
                    type="button"
                    onClick={() => {

                      // اگر عکس Local انتخاب شده،
                      // فقط انتخاب جدید را لغو می‌کنیم
                      // و عکس قبلی را برمی‌گردانیم
                      if (img.local) {

                        setImg({
                          local: false,
                          remove: false,
                          data: category.image,
                        });

                      } else {

                        // اگر عکس قبلی است،
                        // برای حذف علامت می‌زنیم
                        setImg({
                          local: false,
                          remove: true,
                          data: "",
                        });
                      }
                    }}
                    className="absolute cursor-pointer right-3 top-7 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white backdrop-blur-sm transition hover:bg-red-500"
                  >
                    <FiX size={17} />
                  </button>
                ) : null}

                <label className="mb-2 block text-xs text-white/45">
                  تصویر دسته‌بندی
                </label>

                <label className="group relative flex h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.02] transition hover:border-[#7be35b]/40 hover:bg-[#7be35b]/[0.03]">

                  {/* ==================== Image Preview ==================== */}
                  {img?.data && !img?.remove ? (

                    <img
                      src={
                        img.local
                          ? preview
                          : `${import.meta.env.VITE_BASE_FILE}${img.data}`
                      }
                      alt="preview"
                      className="absolute inset-0 h-full w-full object-cover opacity-70 transition group-hover:opacity-50"
                    />

                  ) : null}

                  {/* ==================== Select Image Content ==================== */}
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
                    onChange={(e) => {

                      const file = e.target.files?.[0];

                      if (!file) return;

                      // فایل جدید فقط در State نگه داشته می‌شود
                      // و هنگام Save روی سرور Upload می‌شود
                      setImg({
                        local: true,
                        remove: false,
                        data: file,
                      });

                      // بعد از انتخاب فایل،
                      // مقدار input را Reset می‌کنیم
                      // تا انتخاب همان فایل دوباره هم Trigger شود
                      e.target.value = "";
                    }}
                  />

                </label>

              </div>

              {/* ==================== Icon ==================== */}
              <div>

                <label className="mb-2 flex items-center gap-2 text-sm text-white/70">

                  <FiTag size={15} />

                  آیکون

                </label>

                <input
                  value={category.icon}
                  onChange={(e) => {
                    setCategory((prev) => ({
                      ...prev,
                      icon: e.target.value,
                    }));
                  }}
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

              {/* ==================== SEO Title ==================== */}
              <div>

                <h3 className="mb-4 text-sm font-bold text-white/80">
                  عنوان SEO
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                  {/* FA */}
                  <input
                    value={category.seo.title.fa}
                    onChange={(e) => {
                      setCategory((prev) => ({
                        ...prev,
                        seo: {
                          ...prev.seo,
                          title: {
                            ...prev.seo.title,
                            fa: e.target.value,
                          },
                        },
                      }));
                    }}
                    type="text"
                    placeholder="عنوان SEO فارسی"
                    dir="rtl"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />

                  {/* EN */}
                  <input
                    value={category.seo.title.en}
                    onChange={(e) => {
                      setCategory((prev) => ({
                        ...prev,
                        seo: {
                          ...prev.seo,
                          title: {
                            ...prev.seo.title,
                            en: e.target.value,
                          },
                        },
                      }));
                    }}
                    type="text"
                    placeholder="English SEO title"
                    dir="ltr"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-left text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />

                  {/* AR */}
                  <input
                    value={category.seo.title.ar}
                    onChange={(e) => {
                      setCategory((prev) => ({
                        ...prev,
                        seo: {
                          ...prev.seo,
                          title: {
                            ...prev.seo.title,
                            ar: e.target.value,
                          },
                        },
                      }));
                    }}
                    type="text"
                    placeholder="عنوان SEO بالعربية"
                    dir="rtl"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />

                </div>
              </div>

              {/* ==================== SEO Description ==================== */}
              <div>

                <h3 className="mb-4 text-sm font-bold text-white/80">
                  توضیحات SEO
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                  {/* FA */}
                  <textarea
                    value={category.seo.description.fa}
                    onChange={(e) => {
                      setCategory((prev) => ({
                        ...prev,
                        seo: {
                          ...prev.seo,
                          description: {
                            ...prev.seo.description,
                            fa: e.target.value,
                          },
                        },
                      }));
                    }}
                    rows={5}
                    placeholder="توضیحات SEO فارسی"
                    dir="rtl"
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />

                  {/* EN */}
                  <textarea
                    value={category.seo.description.en}
                    onChange={(e) => {
                      setCategory((prev) => ({
                        ...prev,
                        seo: {
                          ...prev.seo,
                          description: {
                            ...prev.seo.description,
                            en: e.target.value,
                          },
                        },
                      }));
                    }}
                    rows={5}
                    placeholder="English SEO description"
                    dir="ltr"
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-left text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />

                  {/* AR */}
                  <textarea
                    value={category.seo.description.ar}
                    onChange={(e) => {
                      setCategory((prev) => ({
                        ...prev,
                        seo: {
                          ...prev.seo,
                          description: {
                            ...prev.seo.description,
                            ar: e.target.value,
                          },
                        },
                      }));
                    }}
                    rows={5}
                    placeholder="وصف SEO بالعربية"
                    dir="rtl"
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                  />

                </div>
              </div>

              {/* ==================== Keywords ==================== */}
              <div>

                <h3 className="mb-4 text-sm font-bold text-white/80">
                  کلمات کلیدی
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                  {/* FA */}
                  <div>

                    <label className="mb-2 block text-xs text-white/40">
                      فارسی
                    </label>

                    <input
                      value={category.seo.keywords.fa.join(",")}
                      onChange={(e) => {

                        setCategory((prev) => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            keywords: {
                              ...prev.seo.keywords,

                              // اگر خالی بود، آرایه خالی ذخیره شود
                              fa: e.target.value
                                ? e.target.value
                                  .split(",")
                                  .map((item) => item.trim())
                                : [],
                            },
                          },
                        }));
                      }}
                      type="text"
                      placeholder="کلمات کلیدی فارسی"
                      dir="rtl"
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                    />

                  </div>

                  {/* EN */}
                  <div>

                    <label className="mb-2 block text-xs text-white/40">
                      English
                    </label>

                    <input
                      value={category.seo.keywords.en.join(",")}
                      onChange={(e) => {

                        setCategory((prev) => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            keywords: {
                              ...prev.seo.keywords,

                              en: e.target.value
                                ? e.target.value
                                  .split(",")
                                  .map((item) => item.trim())
                                : [],
                            },
                          },
                        }));
                      }}
                      type="text"
                      placeholder="English keywords"
                      dir="ltr"
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-left text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                    />

                  </div>

                  {/* AR */}
                  <div>

                    <label className="mb-2 block text-xs text-white/40">
                      العربية
                    </label>

                    <input
                      value={category.seo.keywords.ar.join(",")}
                      onChange={(e) => {

                        setCategory((prev) => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            keywords: {
                              ...prev.seo.keywords,

                              ar: e.target.value
                                ? e.target.value
                                  .split(",")
                                  .map((item) => item.trim())
                                : [],
                            },
                          },
                        }));
                      }}
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

          {/* ==================== Settings ==================== */}
          <div className="rounded-3xl border border-white/10 bg-[#101720] sticky left-0 top-30 p-6">

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

              {/* ==================== isPublished ==================== */}
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
                  onClick={() => {
                    setCategory((prev) => ({
                      ...prev,
                      isPublished: !prev.isPublished,
                    }));
                  }}
                  type="button"
                  className={`cursor-pointer relative h-6 w-11 rounded-full transition ${category.isPublished
                      ? "bg-lime-400"
                      : "bg-white/10"
                    }`}
                >

                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-black transition-all ${category.isPublished
                        ? "right-1"
                        : "left-1"
                      }`}
                  />

                </button>

              </div>

              {/* ==================== isFeatured ==================== */}
              <div className="flex items-center justify-between ">

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
                  onClick={() => {
                    setCategory((prev) => ({
                      ...prev,
                      isFeatured: !prev.isFeatured,
                    }));
                  }}
                  className={`cursor-pointer relative h-6 w-11 rounded-full transition ${category.isFeatured
                      ? "bg-lime-400"
                      : "bg-white/10"
                    }`}
                >

                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-black transition-all ${category.isFeatured
                        ? "right-1"
                        : "left-1"
                      }`}
                  />

                </button>

              </div>

              {/* ==================== sortOrder ==================== */}
              <div>

                <label className="mb-2 block text-sm text-white/70">
                  ترتیب نمایش
                </label>

                <input
                  value={category.sortOrder}
                  onChange={(e) => {
                    setCategory((prev) => ({
                      ...prev,
                      sortOrder: +e.target.value,
                    }));
                  }}
                  type="number"
                  placeholder="0"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-lime-400/50"
                />

              </div>

            </div>
          </div>

          {/* ==================== Actions ==================== */}
          <div className="rounded-3xl border border-white/10 bg-[#101720] p-6 sticky left-0 top-110">

            <div className="space-y-3">

              {/* Save */}
              <button
                onClick={handleSubmit}
                type="button"
                className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 px-4 py-3.5 font-bold text-black transition hover:bg-lime-300"
              >

                <FiSave size={18} />

                ذخیره تغییرات

              </button>

              {/* Cancel */}
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white/70 transition hover:bg-white/10 hover:text-white"
              >

                <FiX size={18} />

                انصراف

              </button>

              {/* Delete Category */}
              <button
                onClick={() => handleRemove(category.image)}
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