import React, { useEffect, useState } from "react";

import {
    FiArrowUpRight,
    FiCheck,
    FiGrid,
    FiLayers,
    FiLink,
    FiStar,
} from "react-icons/fi";

import { motion } from "motion/react";

import { useParams, useNavigate } from "react-router-dom";

import { fetchData, resolveMediaUrl } from "../../Utils/fetchData";

import { useTranslation } from "react-i18next";

// =====================================================
// CATEGORY DETAIL
// =====================================================

export default function CategoryDetail() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const [seo, setSeo] = useState({
        title: null,
        description: null,
        keywords: null
    })
    const { i18n, t } = useTranslation();

    const langue = i18n.language;

    const direction = langue === "en" ? "ltr" : "rtl";


    // =====================================================
    // FETCH CATEGORY
    // =====================================================

    useEffect(() => {

        const getCategory = async () => {

            try {

                setLoading(true);

                setError(false);

                const result = await fetchData(
                    `/public/product-categories/${id}?lang=${langue}`
                );

                console.log("CATEGORY DETAIL:", result);

                if (result?.success) {
                    setData(result.data);
                    setSeo({
                        title: result.data.category.seo.title,
                        description: result.data.category.seo.description,
                        keywords: result.data.category.seo.keywords
                    })
                } else {

                    setError(true);

                }

            } catch (error) {

                console.log("Category detail error:", error);

                setError(true);

            } finally {

                setLoading(false);

            }

        };

        if (id) {

            getCategory();

        }

    }, [id, langue]);


    // =====================================================
    // MEDIA URL
    // =====================================================




    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <main
                dir={direction}
                className="
                    min-h-screen
                    w-full
                    bg-[#080d14]
                    text-white
                    flex
                    items-center
                    justify-center
                "
            >

                <div className="flex flex-col items-center gap-5">

                    <div
                        className="
                            w-12
                            h-12
                            rounded-full
                            border-2
                            border-white/10
                            border-t-lime-400
                            animate-spin
                        "
                    />

                    <p className="text-sm text-white/40">
                        {t("detailCategory.loading")}
                    </p>

                </div>

            </main>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error || !data) {

        return (

            <main
                dir={direction}
                className="
                    min-h-screen
                    w-full
                    bg-[#080d14]
                    text-white
                    flex
                    items-center
                    justify-center
                    px-6
                "
            >



                <div className="text-center">

                    <p className="text-lime-400 text-sm mb-4">
                        {t("detailCategory.notFound")}
                    </p>

                    <h1 className="text-3xl font-semibold mb-6">
                        {t("detailCategory.notFound")}
                    </h1>

                    <button
                        onClick={() => navigate("/categories")}
                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-lime-400
                            text-black
                            text-sm
                            font-semibold
                        "
                    >
                        {t("detailCategory.back")}
                    </button>

                </div>

            </main>

        );

    }


    // =====================================================
    // CATEGORY DATA
    // =====================================================

    const category = data.category || data;


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <main
            dir={direction}
            className="
                min-h-screen
                w-full
                bg-[#080d14]
                text-white
                overflow-hidden
            "
        >


            <title>{category.name}</title>
            <meta
                name="description"
                content={seo.description}
            />
            <meta
                name="keywords"
                content={seo.keywords}
            />
            {/* =================================================
                HERO
            ================================================= */}

            <section
                className="
                    relative
                    min-h-screen
                    flex
                    items-center
                    overflow-hidden
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

                {/* Main Glow */}

                <div
                    className="
                        absolute
                        w-125
                        h-125
                        rounded-full
                        bg-lime-400/10
                        blur-[150px]
                        -left-40
                        top-1/2
                        -translate-y-1/2
                    "
                />

                {/* Small Glow */}

                <div
                    className="
                        absolute
                        w-80
                        h-80
                        rounded-full
                        bg-lime-400/5
                        blur-[120px]
                        right-20
                        top-20
                    "
                />

                <div
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
                        pb-24
                    "
                >

                    <div
                        className="
                            grid
                            lg:grid-cols-2
                            gap-12
                            lg:gap-20
                            items-center
                        "
                    >

                        {/* =================================================
                            CATEGORY IMAGE
                        ================================================= */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -60,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="
                                order-2
                                lg:order-1
                            "
                        >

                            <div
                                className="
                                    relative
                                    aspect-square
                                    rounded-[2rem]
                                    overflow-hidden
                                    bg-[#101720]
                                    border
                                    border-white/10
                                    shadow-[0_30px_100px_rgba(0,0,0,0.4)]
                                "
                            >

                                {/* Image Glow */}

                                <div
                                    className="
                                        absolute
                                        w-80
                                        h-80
                                        rounded-full
                                        bg-lime-400/10
                                        blur-[100px]
                                        left-1/2
                                        top-1/2
                                        -translate-x-1/2
                                        -translate-y-1/2
                                    "
                                />

                                {/* Grid */}

                                <div
                                    className="
                                        absolute
                                        inset-0
                                        opacity-[0.04]
                                        bg-[linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
                                        bg-size-[40px_40px]
                                    "
                                />

                                {/* Category Image */}

                                <motion.img
                                    initial={{
                                        opacity: 0,
                                        scale: 1.08,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                    }}
                                    loading="lazy"
                                    decoding="async"
                                    src={resolveMediaUrl(category.image)}
                                    alt={category.name}
                                    className="
                                        relative
                                        z-10
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />

                                {/* Featured */}

                                {category.isFeatured && (

                                    <div
                                        className="
                                            absolute
                                            top-6
                                            right-6
                                            z-20
                                            flex
                                            items-center
                                            gap-2
                                            px-4
                                            py-2
                                            rounded-full
                                            bg-lime-400
                                            text-black
                                            text-[10px]
                                            font-bold
                                            tracking-wider
                                        "
                                    >

                                        <FiStar />

                                        {t("detailCategory.featured")}

                                    </div>

                                )}

                                {/* Sort Order */}

                                <div
                                    className="
                                        absolute
                                        bottom-6
                                        left-6
                                        z-20
                                        px-4
                                        py-2
                                        rounded-full
                                        bg-black/60
                                        backdrop-blur-xl
                                        border
                                        border-white/10
                                        text-[10px]
                                        text-white/50
                                    "
                                >

                                    {category.sortOrder ?? 0}

                                </div>

                            </div>


                            {/* Icon */}

                            {category.icon && (

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                        mt-5
                                    "
                                >

                                    <div
                                        className="
                                            w-16
                                            h-16
                                            rounded-2xl
                                            overflow-hidden
                                            bg-[#101720]
                                            border
                                            border-white/10
                                            shrink-0
                                        "
                                    >

                                        <img
                                            src={resolveMediaUrl(category.icon)}
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

                                    <div>

                                        <p
                                            className="
                                                text-[10px]
                                                text-white/30
                                                tracking-wider
                                                mb-1
                                            "
                                        >
                                            {t("detailCategory.icon")}
                                        </p>

                                        <p className="text-sm text-white/50">
                                            {category.name}
                                        </p>

                                    </div>

                                </div>

                            )}

                        </motion.div>


                        {/* =================================================
                            CATEGORY INFO
                        ================================================= */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 60,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.15,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="
                                order-1
                                lg:order-2
                            "
                        >

                            {/* Category Label */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    mb-6
                                "
                            >

                                <span
                                    className="
                                        w-10
                                        h-px
                                        bg-lime-400
                                    "
                                />

                                <span
                                    className="
                                        text-xs
                                        text-lime-400
                                        tracking-[0.18em]
                                    "
                                >
                                    {t("detailCategory.categoryLabel")}
                                </span>

                            </div>


                            {/* Slug */}

                            {category.slug && (

                                <p
                                    className="
                                        text-xs
                                        text-white/30
                                        tracking-[0.25em]
                                        mb-4
                                    "
                                >
                                    {category.slug}

                                </p>

                            )}


                            {/* Title */}

                            <h1
                                className="
                                    text-4xl
                                    sm:text-5xl
                                    lg:text-6xl
                                    font-semibold
                                    leading-[1.15]
                                "
                            >
                                {category.name}
                            </h1>


                            {/* Description */}

                            {category.description && (

                                <p
                                    className="
                                        mt-7
                                        max-w-xl
                                        text-sm
                                        sm:text-base
                                        leading-8
                                        text-white/50
                                    "
                                >
                                    {category.description}
                                </p>

                            )}


                            {/* Info Tags */}

                            <div
                                className="
                                    flex
                                    flex-wrap
                                    gap-2
                                    mt-8
                                "
                            >

                                {category.slug && (

                                    <InfoTag>
                                        {category.slug}
                                    </InfoTag>

                                )}

                                {category.isPublished && (

                                    <InfoTag>
                                        {t("detailCategory.published")}
                                    </InfoTag>

                                )}

                                {category.isFeatured && (

                                    <InfoTag>
                                        {t("detailCategory.featured")}
                                    </InfoTag>

                                )}

                                <InfoTag>
                                    {category.sortOrder ?? 0}
                                </InfoTag>

                            </div>


                            {/* Status */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    max-w-xl
                                    mt-10
                                    py-5
                                    border-y
                                    border-white/10
                                "
                            >

                                <span
                                    className="
                                        text-xs
                                        text-white/30
                                    "
                                >
                                    {t("detailCategory.status")}
                                </span>

                                <span
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-sm
                                        font-medium
                                        text-lime-400
                                    "
                                >

                                    <span
                                        className="
                                            w-2
                                            h-2
                                            rounded-full
                                            bg-lime-400
                                        "
                                    />

                                    {t("detailCategory.activePublished")}

                                </span>

                            </div>


                            {/* CTA */}

                            <button
                                onClick={() => navigate("/products")}
                                className="
                                    group
                                    mt-8
                                    flex
                                    items-center
                                    gap-4
                                    px-7
                                    py-4
                                    rounded-xl
                                    bg-lime-400
                                    text-black
                                    text-sm
                                    font-semibold
                                    hover:bg-lime-300
                                    transition-colors
                                "
                            >

                                {t("detailCategory.viewProducts")}

                                <FiArrowUpRight
                                    className="
                                        text-lg
                                        group-hover:-translate-y-1
                                        group-hover:translate-x-1
                                        transition-transform
                                    "
                                />

                            </button>

                        </motion.div>

                    </div>

                </div>

            </section>


            {/* =================================================
                DESCRIPTION
            ================================================= */}




            {/* =================================================
                CATEGORY INFORMATION
            ================================================= */}


            {/* =================================================
                SEO
            ================================================= */}





        </main>

    );
}







// =====================================================
// INFO TAG
// =====================================================

function InfoTag({ children }) {

    return (

        <span
            className="
                px-4
                py-2
                rounded-full
                bg-white/5
                border
                border-white/10
                text-xs
                text-white/60
            "
        >
            {children}
        </span>

    );

}

