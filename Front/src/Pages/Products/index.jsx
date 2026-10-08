import React, { useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import {
    FiArrowUpRight,
    FiSearch,
    FiFilter,
} from "react-icons/fi";

import { motion } from "motion/react";

import { fetchData } from "../../Utils/fetchData";

import Notify from "../../Utils/Notify";

import { useNavigate, useSearchParams } from "react-router-dom";

export default function Products() {

    const navigate = useNavigate();

    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const product = t("product", {
        returnObjects: true,
    });

    const [searchParams] = useSearchParams();

    const category = searchParams.get("category");
    const brand = searchParams.get("brand");

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const [activeCategory, setActiveCategory] = useState(
        category || "all"
    );

    const [activeBrand, setActiveBrand] = useState(
        brand || "all"
    );

    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState("order");

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const LIMIT = 6;

    // ================= SYNC URL FILTERS =================

    useEffect(() => {

        setActiveCategory(category || "all");
        setActiveBrand(brand || "all");

        setPage(1);

    }, [category, brand]);


    // ================= GET PRODUCTS =================

    useEffect(() => {

        const getProducts = async () => {

            setLoading(true);

            try {

                const params = new URLSearchParams();

                params.set("lang", lang);
                params.set("sort", sort);
                params.set("limit", LIMIT);
                params.set("page", page);


                // Search

                if (search.trim()) {

                    params.set(
                        "q",
                        search.trim()
                    );

                }


                // Category

                if (activeCategory !== "all") {

                    params.set(
                        "category",
                        activeCategory
                    );

                }


                // Brand

                if (activeBrand !== "all") {

                    params.set(
                        "brand",
                        activeBrand
                    );

                }


                const result = await fetchData(
                    `/public/products?${params.toString()}`
                );


                if (!result?.success) {

                    Notify(
                        "error",
                        "خطا در بارگزاری محصولات"
                    );

                    setProducts([]);

                    return;

                }


                setTotalPage(
                    Math.ceil(
                        result.meta.pagination.total / LIMIT
                    )
                );

                setProducts(
                    result?.data || []
                );


            } catch (error) {

                console.error(error);

                Notify(
                    "error",
                    "خطا در دریافت محصولات"
                );

                setProducts([]);

            } finally {

                setLoading(false);

            }

        };

        getProducts();

    }, [
        lang,
        sort,
        activeCategory,
        activeBrand,
        search,
        LIMIT,
        page
    ]);


    // ================= CATEGORIES =================

    const categories = useMemo(() => {

        const allCategories = products
            ?.map((item) => item?.category)
            ?.filter(Boolean);


        const uniqueCategories = allCategories.filter(
            (category, index, self) =>
                index ===
                self.findIndex(
                    (item) =>
                        item?._id === category?._id
                )
        );


        return uniqueCategories;

    }, [products]);


    return (

        <main className="w-full min-h-screen bg-[#080d14] text-white">

            {/* ================= HERO ================= */}

            <section
                className="
                    relative
                    min-h-[55vh]
                    flex
                    items-center
                    overflow-hidden
                    border-b
                    border-white/10
                "
            >

                {/* Background */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-linear-to-br
                        from-[#101c2d]
                        via-[#080d14]
                        to-[#080d14]
                    "
                />


                {/* Glow */}

                <div
                    className="
                        absolute
                        w-100
                        h-100
                        rounded-full
                        bg-lime-400/10
                        blur-[120px]
                        -right-30
                        top-10
                    "
                />


                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
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

                    <p
                        className="
                            text-lime-400
                            text-xs
                            tracking-[0.2em]
                            mb-5
                        "
                    >
                        ○ {product.smallTitle}
                    </p>


                    {/* Title */}

                    <h1
                        className="
                            text-4xl
                            sm:text-5xl
                            lg:text-7xl
                            font-semibold
                            leading-tight
                            max-w-3xl
                        "
                    >
                        {product.bigTitle}
                    </h1>


                    {/* Description */}

                    <p
                        className="
                            mt-6
                            max-w-2xl
                            text-sm
                            sm:text-base
                            leading-7
                            text-white/50
                        "
                    >
                        {product.description}
                    </p>

                </motion.div>

            </section>


            {/* ================= PRODUCTS ================= */}

            <section
                className="
                    max-w-7xl
                    mx-auto
                    px-6
                    sm:px-10
                    lg:px-16
                    py-16
                "
            >

                {/* ================= FILTER ================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.6,
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

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            flex-wrap
                        "
                    >

                        <FiFilter
                            className="
                                text-lime-400
                                mr-2
                            "
                        />


                        {/* All */}

                        <button
                            onClick={() =>
                                setActiveCategory("all")
                            }
                            className={`
                                px-4
                                py-2
                                text-xs
                                border
                                transition-all
                                duration-300
                                ${
                                    activeCategory === "all"
                                        ? "bg-lime-400 text-black border-lime-400"
                                        : "border-white/15 text-white/60 hover:border-lime-400/50"
                                }
                            `}
                        >
                            همه
                        </button>


                        {/* Categories */}

                        {categories?.map(
                            (category) => (

                                <button
                                    key={category?._id}
                                    onClick={() =>
                                        setActiveCategory(
                                            category?._id
                                        )
                                    }
                                    className={`
                                        px-4
                                        py-2
                                        text-xs
                                        border
                                        transition-all
                                        duration-300
                                        ${
                                            activeCategory === category?._id
                                                ? "bg-lime-400 text-black border-lime-400"
                                                : "border-white/15 text-white/60 hover:border-lime-400/50"
                                        }
                                    `}
                                >
                                    {category?.name}
                                </button>

                            )
                        )}

                    </div>


                    {/* Search + Sort */}

                    <div
                        className="
                            flex
                            flex-col
                            sm:flex-row
                            gap-3
                            w-full
                            lg:w-auto
                        "
                    >

                        {/* Search */}

                        <div
                            className="
                                relative
                                w-full
                                sm:w-64
                            "
                        >

                            <FiSearch
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-white/30
                                "
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
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


                        {/* Sort */}

                        <select
                            value={sort}
                            onChange={(e) =>
                                setSort(e.target.value)
                            }
                            className="
                                h-11
                                w-full
                                sm:w-44
                                bg-[#101720]
                                border
                                border-white/10
                                outline-none
                                px-4
                                text-sm
                                text-white/70
                                focus:border-lime-400/50
                                cursor-pointer
                            "
                        >

                            <option
                                value="order"
                                className="bg-[#101720]"
                            >
                                مرتب‌سازی پیش‌فرض
                            </option>

                            <option
                                value="newest"
                                className="bg-[#101720]"
                            >
                                جدیدترین
                            </option>

                            <option
                                value="oldest"
                                className="bg-[#101720]"
                            >
                                قدیمی‌ترین
                            </option>

                            <option
                                value="name"
                                className="bg-[#101720]"
                            >
                                بر اساس نام
                            </option>

                        </select>

                    </div>

                </motion.div>


                {/* ================= LOADING ================= */}

                {loading && (

                    <div
                        className="
                            py-24
                            flex
                            items-center
                            justify-center
                            text-white/40
                            text-sm
                        "
                    >
                        در حال دریافت محصولات...
                    </div>

                )}


                {/* ================= PRODUCT GRID ================= */}

                {!loading &&
                    products?.length > 0 && (

                        <div
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-3
                                gap-6
                            "
                        >

                            {products.map(
                                (item, index) => (

                                    <motion.div
                                        onClick={() =>
                                            navigate(
                                                `/detail-product/${item?._id}`
                                            )
                                        }
                                        key={item?._id}
                                        initial={{
                                            opacity: 0,
                                            y: 50,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            amount: 0.15,
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.1,
                                        }}
                                        whileHover={{
                                            y: -8,
                                        }}
                                        className="
                                            cursor-pointer
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

                                        <div
                                            className="
                                                relative
                                                h-72
                                                overflow-hidden
                                                bg-[#0b1119]
                                            "
                                        >

                                            <motion.img
                                                src={
                                                    item?.thumbnail
                                                        ? `http://localhost:5001${item.thumbnail}`
                                                        : "/hero-image.png"
                                                }
                                                alt={
                                                    item?.name || ""
                                                }
                                                whileHover={{
                                                    scale: 1.06,
                                                }}
                                                transition={{
                                                    duration: 0.6,
                                                }}
                                                className="
                                                    w-full
                                                    h-full
                                                    object-cover
                                                "
                                            />


                                            {/* Overlay */}

                                            <div
                                                className="
                                                    absolute
                                                    inset-0
                                                    bg-linear-to-t
                                                    from-[#101720]
                                                    via-transparent
                                                    to-transparent
                                                "
                                            />


                                            {/* Category */}

                                            {(item?.category?.name ||
                                                item?.category) && (

                                                <span
                                                    className="
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
                                                    "
                                                >
                                                    {item?.category?.name ||
                                                        item?.category}
                                                </span>

                                            )}

                                        </div>


                                        {/* Content */}

                                        <div className="p-6">

                                            <p
                                                className="
                                                    text-[10px]
                                                    tracking-[0.2em]
                                                    text-lime-400
                                                    uppercase
                                                    mb-3
                                                "
                                            >
                                                PRODUCT
                                            </p>


                                            {/* Name */}

                                            <h2
                                                className="
                                                    text-xl
                                                    font-semibold
                                                    leading-tight
                                                    mb-4
                                                    group-hover:text-lime-400
                                                    transition-colors
                                                    duration-300
                                                "
                                            >
                                                {item?.name}
                                            </h2>


                                            {/* Description */}

                                            <p
                                                className="
                                                    text-sm
                                                    text-white/50
                                                    leading-7
                                                    min-h-14
                                                    mb-6
                                                "
                                            >
                                                {item?.shortDescription ||
                                                    item?.description}
                                            </p>


                                            {/* Details */}

                                            <motion.div
                                                whileHover={{
                                                    x: 5,
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
                                                مشاهده جزئیات

                                                <FiArrowUpRight />

                                            </motion.div>

                                        </div>

                                    </motion.div>

                                )
                            )}

                        </div>

                    )}


                {/* ================= PAGINATION ================= */}

                {totalPage > 1 && (

                    <div
                        className="
                            mt-14
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
                    >

                        {Array.from({
                            length: totalPage
                        }).map((_, index) => (

                            <button
                                key={index}
                                onClick={() =>
                                    setPage(index + 1)
                                }
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
                                    ${
                                        page === index + 1
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

                )}


                {/* ================= EMPTY ================= */}

                {!loading &&
                    products?.length === 0 && (

                        <div
                            className="
                                py-24
                                text-center
                                text-white/40
                            "
                        >
                            محصولی پیدا نشد.
                        </div>

                    )}

            </section>

        </main>
    );
}
