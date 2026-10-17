import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiSearch,
  FiX,
  FiArrowUpRight,
  FiPackage,
  FiTag,
  FiGrid,
} from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";
import { fetchData, resolveMediaUrl } from "../Utils/fetchData";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const navbar = t("navbar", {
    returnObjects: true,
  });

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState({
    productCategories: [],
    brands: [],
    products: [],
  });

  const lang = (i18n.resolvedLanguage || i18n.language || "fa")
    .split("-")[0];

  const LIMIT = 6;

  // پشتیبانی از نام و اسلاگ رشته‌ای یا چندزبانه
  const getLocalizedValue = (value) => {
    if (typeof value === "string") return value;

    if (value && typeof value === "object") {
      return (
        value[lang] ||
        value[lang.toLowerCase()] ||
        value.en ||
        value.fa ||
        value.ar ||
        Object.values(value).find(
          (item) => typeof item === "string" && item.trim()
        ) ||
        ""
      );
    }

    return "";
  };

  useEffect(() => {
    if (!search.trim()) {
      setSearchResult({
        productCategories: [],
        brands: [],
        products: [],
      });
      return;
    }

    const params = new URLSearchParams();

    params.set("q", search.trim());
    params.set("limit", String(LIMIT));
    params.set("lang", lang);

    let cancelled = false;

    const getSearchResult = async () => {
      try {
        const result = await fetchData(
          `/public/search?${params.toString()}`
        );

        if (cancelled) return;
        console.log(result)
        if (result?.data) {
          setSearchResult({
            products: Array.isArray(result.data.products)
              ? result.data.products
              : [],
            productCategories: Array.isArray(
              result.data.productCategories
            )
              ? result.data.productCategories
              : [],
            brands: Array.isArray(result.data.brands)
              ? result.data.brands
              : [],
          });
        } else {
          setSearchResult({
            productCategories: [],
            brands: [],
            products: [],
          });
        }
      } catch (error) {
        if (!cancelled) {
          setSearchResult({
            productCategories: [],
            brands: [],
            products: [],
          });
        }

        console.error("Search error:", error);
      }
    };

    getSearchResult();

    return () => {
      cancelled = true;
    };
  }, [search, lang]);

  const closeSearch = () => {
    setOpenModal(false);
    setSearch("");

    setSearchResult({
      productCategories: [],
      brands: [],
      products: [],
    });
  };

  return (
    <header className="relative">
      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          w-full
          h-[64px]
          sm:h-[70px]
          md:h-[74px]
          lg:h-[78px]
          xl:h-[82px]
          bg-black
          border-b
          border-white/10
          fixed top-0 left-0 right-0
          z-50
        "
      >
        <nav
          className="
            h-full
            w-full
            max-w-[1440px]
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            xl:px-10
            flex
            items-center
            justify-between
            gap-3
            sm:gap-4
            lg:gap-6
          "
        >
          {/* ================= LOGO ================= */}
          <div
            className="
              logo-container
              shrink-0
              w-20
              sm:w-24
              md:w-28
              lg:w-32
              xl:w-36
              h-10
              sm:h-11
              md:h-12
              lg:h-14
              transition-all
              duration-200
              hover:scale-105
              cursor-pointer
            "
          >
            <img
              src="/Logo.png"
              alt="logo"
              className="w-full h-full object-contain"
              onClick={()=>navigate('/')}
            />
          </div>

          {/* ================= DESKTOP MENU ================= */}
          <ul
            className="
              hidden
              md:flex
              items-center
              justify-center
              gap-4
              lg:gap-6
              xl:gap-8
              min-w-0
              flex-1
            "
          >
            {Object.keys(navbar).map((item, index) => (
              <NavLink
                key={index}
                className={({ isActive }) => `
                  text-xs
                  lg:text-sm
                  xl:text-base
                  whitespace-nowrap
                  transition-all
                  duration-200
                  hover:scale-105
                  relative
                  group
                  inline-block
                  after:content-['']
                  after:absolute
                  after:left-0
                  after:-bottom-2
                  after:w-[120%]
                  after:h-0.5
                  after:bg-(--primary)
                  after:scale-x-0
                  after:transition-transform
                  after:translate-x-[-7%]
                  after:duration-300
                  after:rounded-2xl
                  hover:after:scale-x-100
                  ${
                    isActive
                      ? "text-(--primary)"
                      : "text-white"
                  }
                `}
                to={item === "home" ? "/" : `/${item}`}
              >
                {navbar[item]}
              </NavLink>
            ))}
          </ul>

          {/* ================= LANGUAGES ================= */}
          <div
            className="
              hidden
              lg:flex
              items-center
              gap-2
              xl:gap-3
              shrink-0
            "
          >
            <img
              src="Arabic.png"
              alt="العربية"
              onClick={() => i18n.changeLanguage("ar")}
              className="
                w-6 h-6
                xl:w-7 xl:h-7
                cursor-pointer
                transition-transform
                duration-200
                hover:scale-110
              "
            />

            <img
              src="English.png"
              alt="English"
              onClick={() => i18n.changeLanguage("en")}
              className="
                w-6 h-6
                xl:w-7 xl:h-7
                cursor-pointer
                transition-transform
                duration-200
                hover:scale-110
              "
            />

            <img
              src="Persian.png"
              alt="فارسی"
              onClick={() => i18n.changeLanguage("fa")}
              className="
                w-6 h-6
                xl:w-7 xl:h-7
                cursor-pointer
                transition-transform
                duration-200
                hover:scale-110
              "
            />
          </div>

          {/* ================= SEARCH ================= */}
          <FiSearch
            onClick={() => setOpenModal((prev) => !prev)}
            className="
              w-5 h-5
              sm:w-6 sm:h-6
              lg:w-7 lg:h-7
              hidden
              sm:flex
              shrink-0
              transition-all
              duration-250
              hover:scale-110
              text-white
              cursor-pointer
            "
          />

          {/* ================= MOBILE MENU ICON ================= */}
          <FiMenu
            className={`
              w-7 h-7
              sm:w-8 sm:h-8
              text-white
              md:hidden
              shrink-0
              cursor-pointer
              relative
              z-50
              transition-all
              duration-500
              ease-in-out
              hover:text-(--primary)
              ${open && "rotate-90 text-(--primary) scale-110"}
            `}
            onClick={() => setOpen((prev) => !prev)}
          />

          {/* ================= MOBILE MENU ================= */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: -20,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: -20,
                  x: -20,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  absolute
                  top-[calc(100%+8px)]
                  left-3
                  right-3
                  sm:left-5
                  sm:right-auto
                  w-auto
                  sm:w-80
                  max-w-[calc(100vw-24px)]
                  rounded-2xl
                  sm:rounded-br-[2rem]
                  sm:rounded-tr-[1.5rem]
                  border
                  border-white/10
                  bg-black/90
                  backdrop-blur-xl
                  shadow-[0_20px_60px_rgba(0,0,0,0.7)]
                "
              >
                <ul className="flex flex-col w-full p-3 gap-1">
                  {Object.keys(navbar).map((item, index) => (
                    <NavLink
                      key={index}
                      to={item === "home" ? "/" : `/${item}`}
                      className={({ isActive }) => `
                        relative
                        flex
                        items-center
                        justify-between
                        w-full
                        h-10
                        px-5
                        rounded-xl
                        overflow-hidden
                        text-base
                        whitespace-nowrap
                        transition-all
                        duration-300
                        group
                        ${
                          isActive
                            ? "text-(--primary) bg-white/[0.07]"
                            : "text-white/80 hover:text-white hover:bg-white/[0.04]"
                        }
                      `}
                    >
                      <span
                        className="
                          text-xs
                          font-mono
                          text-white/30
                          group-hover:text-(--primary)
                          transition-colors
                          duration-300
                        "
                      >
                        0{index + 1}
                      </span>

                      <motion.span
                        initial={{ opacity: 0, x: -15 }}
                        animate={{
                          opacity: open ? 1 : 0,
                          x: open ? 0 : -15,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.06,
                        }}
                      >
                        {navbar[item]}
                      </motion.span>

                      <span
                        className="
                          w-1.5
                          h-1.5
                          rounded-full
                          bg-white/20
                          group-hover:bg-(--primary)
                          group-hover:scale-150
                          transition-all
                          duration-300
                        "
                      />
                    </NavLink>
                  ))}

                  {/* ================= MOBILE LANGUAGES ================= */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                      opacity: open ? 1 : 0,
                      y: open ? 0 : 15,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3,
                    }}
                    className="
                      mt-3
                      pt-4
                      border-t
                      border-white/10
                      px-2
                    "
                  >
                    <div
                      className="
                        flex
                        w-full
                        justify-center
                        items-center
                        gap-5
                      "
                    >
                      <button
                        onClick={() => i18n.changeLanguage("ar")}
                        className="
                          w-10 h-10
                          flex items-center justify-center
                          rounded-xl
                          hover:bg-white/10
                          transition-all
                        "
                      >
                        <img src="Arabic.png" alt="العربية" className="w-7 h-7" />
                      </button>

                      <button
                        onClick={() => i18n.changeLanguage("en")}
                        className="
                          w-10 h-10
                          flex items-center justify-center
                          rounded-xl
                          hover:bg-white/10
                          transition-all
                        "
                      >
                        <img src="English.png" alt="English" className="w-7 h-7" />
                      </button>

                      <button
                        onClick={() => i18n.changeLanguage("fa")}
                        className="
                          w-10 h-10
                          flex items-center justify-center
                          rounded-xl
                          hover:bg-white/10
                          transition-all
                        "
                      >
                        <img src="Persian.png" alt="فارسی" className="w-7 h-7" />
                      </button>
                    </div>
                  </motion.div>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.nav>

      {/* ================= SEARCH MODAL ================= */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="
              fixed
              inset-0
              z-[100]
              flex
              justify-center
              items-start
              pt-[76px]
              sm:pt-[84px]
              lg:pt-[92px]
              px-3
              sm:px-5
              bg-black/75
              backdrop-blur-md
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: -40,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -40,
                scale: 0.94,
              }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                w-full
                max-w-4xl
                max-h-[calc(100vh-92px)]
                sm:max-h-[calc(100vh-110px)]
                overflow-hidden
                rounded-2xl
                sm:rounded-3xl
                border
                border-white/10
                bg-[#0b1118]/95
                shadow-[0_30px_100px_rgba(0,0,0,0.8)]
              "
            >
              {/* ================= SEARCH HEADER ================= */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  p-4
                  sm:p-5
                  border-b
                  border-white/10
                "
              >
                <div>
                  <p className="text-xs text-(--primary)">
                    {t("search.title")}
                  </p>

                  <h2
                    className="
                      text-lg
                      sm:text-xl
                      lg:text-2xl
                      text-white
                      font-semibold
                      mt-1
                    "
                  >
                    {t("search.title")}
                  </h2>
                </div>

                <button
                  onClick={closeSearch}
                  aria-label={t("search.close", { defaultValue: "Close search" })}
                  className="
                    w-9
                    h-9
                    sm:w-10
                    sm:h-10
                    flex
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/5
                    hover:bg-white/10
                    text-white
                    transition-all
                  "
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* ================= SEARCH INPUT ================= */}
              <div className="p-4 sm:p-5 pb-3">
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    w-full
                    h-12
                    sm:h-14
                    px-4
                    sm:px-5
                    rounded-xl
                    sm:rounded-2xl
                    bg-white/[0.04]
                    border
                    border-white/10
                    focus-within:border-(--primary)
                    focus-within:bg-white/[0.06]
                    transition-all
                  "
                >
                  <FiSearch className="w-5 h-5 text-white/50 shrink-0" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("search.placeholder")}
                    aria-label={t("search.placeholder")}
                    className="
                      w-full
                      bg-transparent
                      outline-none
                      text-white
                      text-sm
                      sm:text-base
                      placeholder:text-white/30
                    "
                  />
                </div>
              </div>

              {/* ================= SEARCH RESULTS ================= */}
              <div
                className="
                  px-4
                  sm:px-5
                  pb-5
                  sm:pb-6
                  overflow-y-auto
                  max-h-[calc(100vh-250px)]
                  sm:max-h-[55vh]
                "
              >
                {/* PRODUCTS */}
                {searchResult.products.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <FiPackage className="text-(--primary)" />

                      <h3 className="text-white font-medium">
                        {t("search.products")}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {searchResult.products.map((item) => (
                        <div
                          key={item._id}
                          onClick={() => {
                            navigate(
                              `detail-product/${item._id}`
                            );
                            closeSearch();
                          }}
                          className="
                            flex
                            items-center
                            gap-3
                            p-3
                            rounded-xl
                            bg-white/[0.03]
                            border
                            border-white/10
                            hover:border-(--primary)
                            cursor-pointer
                            transition-all
                          "
                        >
                          <img
                            src={resolveMediaUrl(item.thumbnail)}
                            alt=""
                            className="
                              w-12
                              h-12
                              rounded-lg
                              object-cover
                              shrink-0
                            "
                          />

                          <div className="min-w-0">
                            <p className="text-white text-sm truncate">
                              {getLocalizedValue(item.name)}
                            </p>

                            <p className="text-white/40 text-xs mt-1 truncate">
                              {getLocalizedValue(item.model)}
                            </p>
                          </div>

                          <FiArrowUpRight className="ml-auto text-white/40 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CATEGORIES */}
                {searchResult.productCategories.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <FiGrid className="text-(--primary)" />

                      <h3 className="text-white font-medium">
                        {t("search.categories")}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {searchResult.productCategories.map((item) => (
                        <div
                          key={item._id}
                          onClick={() => {
                            navigate(`/products?category=${item._id}`);
                            closeSearch();
                          }}
                          className="
                            flex
                            items-center
                            gap-3
                            p-3
                            rounded-xl
                            bg-white/[0.03]
                            border
                            border-white/10
                            hover:border-(--primary)
                            cursor-pointer
                            transition-all
                          "
                        >
                          <img
                            src={resolveMediaUrl(item.icon || item.image)}
                            alt=""
                            className="
                              w-12
                              h-12
                              rounded-lg
                              object-cover
                              shrink-0
                            "
                          />

                          <p className="text-white text-sm truncate">
                            {getLocalizedValue(item.name)}
                          </p>

                          <FiArrowUpRight className="ml-auto text-white/40 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* BRANDS */}
                {searchResult.brands.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FiTag className="text-(--primary)" />

                      <h3 className="text-white font-medium">
                        {t("search.brands")}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {searchResult.brands.map((item) => (
                        <div
                          key={item._id}
                          onClick={() => {
                            navigate(`/products?brand=${item._id}`);
                            closeSearch();
                          }}
                          className="
                            flex
                            items-center
                            gap-3
                            p-3
                            rounded-xl
                            bg-white/[0.03]
                            border
                            border-white/10
                            hover:border-(--primary)
                            cursor-pointer
                            transition-all
                          "
                        >
                          <img
                            src={resolveMediaUrl(item.logo)}
                            alt=""
                            className="
                              w-12
                              h-12
                              rounded-lg
                              object-contain
                              bg-white
                              p-1
                              shrink-0
                            "
                          />

                          <p className="text-white text-sm truncate">
                            {getLocalizedValue(item.name)}
                          </p>

                          <FiArrowUpRight className="ml-auto text-white/40 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* NO RESULTS */}
                {search.trim() &&
                  searchResult.products.length === 0 &&
                  searchResult.productCategories.length === 0 &&
                  searchResult.brands.length === 0 && (
                    <div className="py-12 text-center">
                      <FiSearch className="w-8 h-8 mx-auto text-white/20 mb-3" />

                      <p className="text-white/40 text-sm">
                        {t("search.noResults")}
                      </p>
                    </div>
                  )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
