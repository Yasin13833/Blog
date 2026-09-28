import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight, FiSearch, FiFilter } from "react-icons/fi";
import { motion } from "motion/react";

export default function Products() {

    const { t } = useTranslation();

    const product = t("product", {
        returnObjects: true
    });

    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = useMemo(() => {

        const allCategories = product.productCart.map(
            item => item.category
        );

        return ["all", ...new Set(allCategories)];

    }, [product.productCart]);


    const filteredProducts = product.productCart.filter(item => {

        const matchesSearch =
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            activeCategory === "all" ||
            item.category === activeCategory;

        return matchesSearch && matchesCategory;

    });


    return (
        <main className="w-full min-h-screen bg-[#080d14] text-white">

            {/* ================= HERO ================= */}

            <section className="
        relative
        min-h-[55vh]
        flex
        items-center
        overflow-hidden
        border-b
        border-white/10
      ">

                {/* Background */}
                <div className="
          absolute
          inset-0
          bg-linear-to-br
          from-[#101c2d]
          via-[#080d14]
          to-[#080d14]
        " />

                {/* Glow */}
                <div className="
          absolute
          w-100
          h-100
          rounded-full
          bg-lime-400/10
          blur-[120px]
          -right-30
          top-10
        " />


                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    className="
            relative
            z-10
            w-full
            max-w-7xl
            mx-auto
            px-6
            sm:px-10
            lg:px-16
            pt-32
            pb-20
          "
                >

                    {/* Small title */}
                    <p className="
            text-lime-400
            text-xs
            tracking-[0.2em]
            mb-5
          ">
                        ○ {product.smallTitle}
                    </p>


                    {/* Title */}
                    <h1 className="
            text-4xl
            sm:text-5xl
            lg:text-7xl
            font-semibold
            leading-tight
            max-w-3xl
          ">
                        {product.bigTitle}
                    </h1>


                    {/* Description */}
                    <p className="
            mt-6
            max-w-2xl
            text-sm
            sm:text-base
            leading-7
            text-white/50
          ">
                        مجموعه‌ای از محصولات و راهکارهای تخصصی برای سیستم‌های
                        آبیاری و کشاورزی.
                    </p>

                </motion.div>

            </section>


            {/* ================= PRODUCTS ================= */}

            <section className="
        max-w-7xl
        mx-auto
        px-6
        sm:px-10
        lg:px-16
        py-16
      ">


                {/* ================= FILTER ================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        duration: 0.6
                    }}
                    className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
            mb-12
          "
                >

                    {/* Categories */}

                    <div className="
            flex
            items-center
            gap-2
            flex-wrap
          ">

                        <FiFilter className="text-lime-400 mr-2" />

                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`
                px-4
                py-2
                text-xs
                border
                transition-all
                duration-300
                ${activeCategory === "all"
                                    ? "bg-lime-400 text-black border-lime-400"
                                    : "border-white/15 text-white/60 hover:border-lime-400/50"
                                }
              `}
                        >
                            همه
                        </button>


                        {categories
                            .filter(category => category !== "all")
                            .map((category, index) => (

                                <button
                                    key={index}
                                    onClick={() => setActiveCategory(category)}
                                    className={`
                    px-4
                    py-2
                    text-xs
                    border
                    transition-all
                    duration-300
                    ${activeCategory === category
                                            ? "bg-lime-400 text-black border-lime-400"
                                            : "border-white/15 text-white/60 hover:border-lime-400/50"
                                        }
                  `}
                                >
                                    {category}
                                </button>

                            ))}

                    </div>


                    {/* Search */}

                    <div className="
            relative
            w-full
            lg:w-64
          ">

                        <FiSearch className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-white/30
            " />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="جستجوی محصول..."
                            className="
                w-full
                h-11
                bg-white/5
                border
                border-white/10
                outline-none
                px-4
                pr-11
                text-sm
                text-white
                placeholder:text-white/30
                focus:border-lime-400/50
                transition-colors
              "
                        />

                    </div>

                </motion.div>


                {/* ================= PRODUCT GRID ================= */}

                <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        ">

                    {filteredProducts.map((item, index) => (

                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 50
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}
                            viewport={{
                                once: true,
                                amount: 0.15
                            }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1
                            }}
                            whileHover={{
                                y: -8
                            }}
                            className="
                group
                relative
                overflow-hidden
                bg-[#101720]
                border
                border-white/10
                hover:border-lime-400/40
                transition-colors
                duration-500
              "
                        >

                            {/* Product Image */}

                            <div className="
                relative
                h-72
                overflow-hidden
                bg-[#0b1119]
              ">

                                <motion.img
                                    src="/hero-image.png"
                                    alt={item.title}
                                    whileHover={{
                                        scale: 1.06
                                    }}
                                    transition={{
                                        duration: 0.6
                                    }}
                                    className="
                    w-full
                    h-full
                    object-cover
                  "
                                />


                                {/* Overlay */}

                                <div className="
                  absolute
                  inset-0
                  bg-linear-to-t
                  from-[#101720]
                  via-transparent
                  to-transparent
                " />


                                {/* Category */}

                                <span className="
                  absolute
                  top-5
                  right-5
                  px-3
                  py-1.5
                  bg-black/60
                  backdrop-blur-md
                  border
                  border-white/10
                  text-[10px]
                  text-lime-400
                ">
                                    {item.category}
                                </span>

                            </div>


                            {/* Content */}

                            <div className="p-6">

                                <p className="
                  text-[10px]
                  tracking-[0.2em]
                  text-lime-400
                  uppercase
                  mb-3
                ">
                                    PRODUCT
                                </p>


                                <h2 className="
                  text-xl
                  font-semibold
                  leading-tight
                  mb-4
                  group-hover:text-lime-400
                  transition-colors
                  duration-300
                ">
                                    {item.title}
                                </h2>


                                <p className="
                  text-sm
                  text-white/50
                  leading-7
                  min-h-14
                  mb-6
                ">
                                    {item.description}
                                </p>


                                {/* Tags */}

                                <div className="
                  flex
                  flex-wrap
                  gap-2
                  mb-7
                ">

                                    {item.tags.map((tag, tagIndex) => (

                                        <span
                                            key={tagIndex}
                                            className="
                        px-3
                        py-1
                        border
                        border-white/10
                        bg-white/5
                        text-xs
                        text-white/50
                      "
                                        >
                                            {tag}
                                        </span>

                                    ))}

                                </div>


                                {/* Details */}

                                <motion.div
                                    whileHover={{
                                        x: 5
                                    }}
                                    className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    text-lime-400
                    cursor-pointer
                    w-fit
                  "
                                >

                                    {item.viewDetails}

                                    <FiArrowUpRight />

                                </motion.div>

                            </div>

                        </motion.div>

                    ))}

                </div>


                {/* ================= EMPTY ================= */}

                {filteredProducts.length === 0 && (

                    <div className="
            py-24
            text-center
            text-white/40
          ">
                        محصولی پیدا نشد.
                    </div>

                )}

            </section>

        </main>
    );
}
