import React, { useEffect, useState } from "react";

import { motion } from "motion/react";

import {
  FiArrowUpRight,
  FiGrid,
  FiStar,
  FiChevronRight,
} from "react-icons/fi";

import { fetchData } from "../../Utils/fetchData";
import Notify from "../../Utils/Notify";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const LIMIT = 6
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const navigate = useNavigate()
  useEffect(() => {

    (async () => {
      const params = new URLSearchParams()
      params.set('page', page)
      params.set('limit', LIMIT)
      params.set('lang', lang)
      const result = await fetchData(
        `/public/product-categories?${params}`
      );

      if (!result?.success) {
        Notify("error", "خطا در باگزاری محصولات");
        return;
      }
      setTotalPage(Math.ceil(result.meta.pagination.total / LIMIT))
      setCategories(result?.data || []);
      console.log(result.data)

    })();

  }, [lang, LIMIT, page]);

  return (
    <main className="min-h-screen bg-[#080d14] text-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          pt-32
          pb-16
          px-5
          sm:px-8
          lg:px-16
          xl:px-24
        "
      >

        {/* Background Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -top-40
            right-0
            w-96
            h-96
            rounded-full
            bg-lime-400/10
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            w-72
            h-72
            rounded-full
            bg-blue-500/5
            blur-[100px]
          "
        />

        <div className="relative max-w-7xl mx-auto">

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* Small Title */}

            <div
              className="
                flex
                items-center
                gap-2
                mb-5
                text-lime-400
                text-[10px]
                sm:text-xs
                font-medium
                tracking-[0.2em]
                uppercase
              "
            >

              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-lime-400
                  shadow-[0_0_12px_rgba(163,230,53,0.7)]
                "
              />

              {t("categoriesPage.hero.label")}

            </div>

            {/* Title */}

            <h1
              className="
                max-w-3xl
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                font-semibold
                leading-[1.1]
                tracking-tight
              "
            >

              {t("categoriesPage.hero.title")}

              <span className="text-lime-400">
                {" "}
                {t("categoriesPage.hero.titleHighlight")}
              </span>

            </h1>

            {/* Description */}

            <p
              className="
                max-w-2xl
                mt-6
                text-sm
                sm:text-base
                leading-7
                text-white/45
              "
            >

              {t("categoriesPage.hero.description")}

            </p>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      <section
        className="
          px-5
          sm:px-8
          lg:px-16
          xl:px-24
          pb-24
        "
      >

        <div className="max-w-7xl mx-auto">

          {/* Section Header */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-end
              sm:justify-between
              gap-5
              mb-8
            "
          >

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-white/40
                  text-xs
                "
              >

                <FiGrid />

                <span>
                  {t("categoriesPage.section.label")}
                </span>

              </div>

              <h2
                className="
                  mt-2
                  text-xl
                  sm:text-2xl
                  font-semibold
                "
              >

                {t("categoriesPage.section.title")}

              </h2>

            </div>

          </div>


          {/* =================================================
              GRID
          ================================================= */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            }}
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-5
            "
          >

            {categories.map((item) => (

              <article
                key={item._id}
                onClick={() => navigate(`/detail-categories/${item._id}`)}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-[#101720]
                  cursor-pointer
                "
              >

                {/* =========================================
                    IMAGE
                ========================================= */}

                <div
                  className="
                    relative
                    h-56
                    overflow-hidden
                  "
                >

                  <img
                    src={`http://localhost:5001${item.image}`}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-105
                    "
                  />


                  {/* Dark Gradient */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#101720]
                      via-black/10
                      to-transparent
                    "
                  />


                  {/* Featured */}

                  {item.isFeatured && (

                    <div
                      className="
                        absolute
                        top-4
                        left-4
                        flex
                        items-center
                        gap-1.5
                        px-2.5
                        py-1.5
                        rounded-full
                        bg-black/40
                        backdrop-blur-md
                        border
                        border-white/10
                        text-[10px]
                        text-lime-300
                      "
                    >

                      <FiStar />

                      {t("categoriesPage.card.featured")}

                    </div>

                  )}


                  {/* Icon */}

                  {item.icon && (

                    <div
                      className="
                        absolute
                        bottom-4
                        left-4
                        w-11
                        h-11
                        rounded-xl
                        overflow-hidden
                        border
                        border-white/20
                        bg-black/40
                        backdrop-blur-md
                        shadow-lg
                      "
                    >

                      <img
                        src={`http://localhost:5001${item.icon}`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />

                    </div>

                  )}

                </div>


                {/* =========================================
                    CONTENT
                ========================================= */}

                <div className="p-5">

                  {/* Name */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >

                    <h3
                      className="
                        text-base
                        sm:text-lg
                        font-semibold
                        leading-6
                        transition-colors
                        duration-300
                        group-hover:text-lime-400
                      "
                    >

                      {item.name}

                    </h3>


                    <div
                      className="
                        shrink-0
                        w-9
                        h-9
                        rounded-full
                        border
                        border-white/10
                        flex
                        items-center
                        justify-center
                        text-white/40
                        transition-all
                        duration-300
                        group-hover:bg-lime-400
                        group-hover:text-[#080d14]
                        group-hover:border-lime-400
                      "
                    >

                      <FiArrowUpRight />

                    </div>

                  </div>


                  {/* Description */}

                  <p
                    className="
                      mt-3
                      text-xs
                      sm:text-sm
                      leading-6
                      text-white/40
                      line-clamp-3
                    "
                  >

                    {item.description}

                  </p>


                  {/* Bottom */}

                  <div
                    className="
                      mt-5
                      pt-4
                      border-t
                      border-white/[0.06]
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <span
                      className="
                        text-[10px]
                        uppercase
                        tracking-widest
                        text-white/25
                      "
                    >

                      {t("categoriesPage.card.explore")}

                    </span>


                    <FiChevronRight
                      className="
                        text-white/30
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        group-hover:text-lime-400
                      "
                    />

                  </div>

                </div>


                {/* =========================================
                    HOVER GLOW
                ========================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-20
                    -right-20
                    w-40
                    h-40
                    rounded-full
                    bg-lime-400/10
                    blur-3xl
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                  "
                />

              </article>

            ))}

          </motion.div>

        </div>
        <div className="mt-14 flex items-center justify-center gap-2">
          {Array.from({ length: totalPage }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`
                relative
                w-10
                h-10
                flex
                items-center
                justify-center
                text-sm
                font-medium
                border
                transition-all
                duration-300
                ${page === index + 1
                  ? `
                            bg-lime-400
                            text-black
                            border-lime-400
                            shadow-[0_0_20px_rgba(163,230,53,0.2)]
                        `
                  : `
                            bg-[#101720]
                            text-white/50
                            border-white/10
                            hover:text-lime-400
                            hover:border-lime-400/50
                            hover:bg-lime-400/5
                        `
                }
            `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>

    </main>
  );
}
