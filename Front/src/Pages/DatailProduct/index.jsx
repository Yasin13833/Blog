import React, { useEffect, useState } from "react";

import {
    FiArrowUpRight,
    FiDroplet,
    FiMaximize,
    FiShield,
    FiTool,
    FiLayers,
} from "react-icons/fi";

import { motion } from "motion/react";

import { useParams, useNavigate, Link } from "react-router-dom";

import { fetchData } from "../../Utils/fetchData";
import { useTranslation } from "react-i18next";


// =====================================================
// PRODUCT DETAIL
// =====================================================

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [seo, setSeo] = useState({
        title: null,
        description: null,
        keywords: null
    })
    const { t, i18n } = useTranslation();
    const langue = i18n.language;
    const isRTL = langue === "fa" || langue === "ar";

    // =====================================================
    // FETCH PRODUCT
    // =====================================================

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                setError(false);

                const result = await fetchData(
                    `/public/products/${id}?lang=${langue}&relatedLimit=3`
                );

                console.log("PRODUCT DETAIL:", result);

                if (result?.success) {
                    setData(result.data);
                    setSeo({
                        title: result.data.product.seo.title,
                        description: result.data.product.seo.description,
                        keywords: result.data.product.seo.keywords
                    })
                    console.log(result.data.product.seo)
                } else {
                    setError(true);
                }
            } catch (error) {
                console.log("Product detail error:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getProduct();
        }
    }, [id, langue]);

    // =====================================================
    // MEDIA URL
    // =====================================================

    const resolveMediaUrl = (url) => {
        if (!url) {
            return "/hero-image.png";
        }

        if (url.startsWith("http")) {
            return url;
        }

        return `http://localhost:5001${url}`;
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <main
                dir={isRTL ? "rtl" : "ltr"}
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
                <title>{seo.title}</title>
                <meta
                    name="description"
                    content={seo.description}
                />
                <meta
                    name="keywords"
                    content={seo.keywords}
                />
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
                        {t("detailProduct.loading")}
                    </p>
                </div>
            </main>
        );
    }

    // =====================================================
    // ERROR
    // =====================================================

    if (error || !data?.product) {
        return (
            <main
                dir={isRTL ? "rtl" : "ltr"}
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
                        {t("detailProduct.notFoundLabel")}
                    </p>

                    <h1 className="text-3xl font-semibold mb-6">
                        {t("detailProduct.notFound")}
                    </h1>

                    <button
                        onClick={() => navigate("/products")}
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
                        {t("detailProduct.backToProducts")}
                    </button>
                </div>
            </main>
        );
    }

    // =====================================================
    // REAL DATA
    // =====================================================

    const product = data.product;
    const brand = data.brand;
    const category = data.category;
    const relatedProducts = data.relatedProducts || [];

    // =====================================================
    // IMAGES
    // =====================================================

    const images = [
        product.thumbnail,
        ...(product.images || []),
    ].filter(Boolean);

    // اگر فقط thumbnail داشت
    if (images.length === 0) {
        images.push("");
    }

    // =====================================================
    // SPECIFICATIONS
    // =====================================================

    const specifications = product.specifications || {};

    // =====================================================
    // FEATURES
    // =====================================================

    const features = product.features || [];

    return (
        <main
            dir={isRTL ? "rtl" : "ltr"}
            className="
                min-h-screen
                w-full
                bg-[#080d14]
                text-white
                overflow-hidden
            "
        >
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
                            PRODUCT IMAGE
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
                            {/* Image Box */}

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
                                    md:w-full
                                    md:h-100
                                    sm:w-full
                                    sm:h-80
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

                                {/* Product Image */}

                                <motion.img
                                    key={images[activeImage]}
                                    initial={{
                                        opacity: 0,
                                        scale: 1.08,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                    }}
                                    src={resolveMediaUrl(
                                        images[activeImage]
                                    )}
                                    alt={product.name}
                                    className="
                                        relative
                                        z-10
                                        w-full
                                        h-full
                                        object-contain
                                        p-8
                                        sm:p-14
                                    "
                                />

                                {/* Featured */}

                                {product.isFeatured && (
                                    <div
                                        className="
                                            absolute
                                            top-6
                                            right-6
                                            z-20
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
                                        {t("detailProduct.featured")}
                                    </div>
                                )}

                                {/* SKU */}

                                {product.sku && (
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
                                        {product.sku}
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails */}

                            {images.length > 1 && (
                                <div
                                    className="
                                        flex
                                        gap-3
                                        mt-4
                                        flex-wrap
                                    "
                                >
                                    {images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setActiveImage(index)
                                            }
                                            className={`
                                                w-20
                                                h-20
                                                rounded-xl
                                                overflow-hidden
                                                bg-[#101720]
                                                border
                                                transition-all
                                                duration-300

                                                ${activeImage === index
                                                    ? "border-lime-400"
                                                    : "border-white/10 hover:border-white/30"
                                                }
                                            `}
                                        >
                                            <img
                                                src={resolveMediaUrl(image)}
                                                alt=""
                                                className="
                                                    w-full
                                                    h-full
                                                    object-contain
                                                    p-2
                                                "
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* =================================================
                            PRODUCT INFO
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
                            {/* Category */}

                            {category?.name && (
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
                                        {category.name}
                                    </span>
                                </div>
                            )}

                            {/* Model */}

                            {product.model && (
                                <p
                                    className="
                                        text-xs
                                        text-white/30
                                        tracking-[0.25em]
                                        mb-4
                                    "
                                >
                                    {t("detailProduct.model")} / {product.model}
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
                                {product.name}
                            </h1>

                            {/* Description */}

                            {product.shortDescription && (
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
                                    {product.shortDescription}
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
                                {product.model && (
                                    <InfoTag>
                                        {product.model}
                                    </InfoTag>
                                )}

                                {product.sku && (
                                    <InfoTag>
                                        {product.sku}
                                    </InfoTag>
                                )}

                                {brand?.name && (
                                    <InfoTag>
                                        {brand.name}
                                    </InfoTag>
                                )}

                                {category?.name && (
                                    <InfoTag>
                                        {category.name}
                                    </InfoTag>
                                )}
                            </div>

                            {/* Brand */}

                            {brand?.name && (
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
                                            text-[16px]
                                            font-bold
                                            text-white/50
                                        "
                                    >
                                        {t("detailProduct.brand")}
                                    </span>

                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        {brand.name}
                                    </span>
                                </div>
                            )}


                        </motion.div>
                    </div>
                </div>
            </section>

            {/* =================================================
                FEATURES
            ================================================= */}

            {features.length > 0 && (
                <section
                    className="
                        max-w-7xl
                        mx-auto
                        px-6
                        sm:px-10
                        lg:px-16
                        py-24
                    "
                >
                    <SectionTitle
                        eyebrow={t("detailProduct.featuresLabel")}
                        title={t("detailProduct.featuresTitle")}
                    />

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-4
                            gap-5
                        "
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature._id || index}
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
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                whileHover={{
                                    y: -6,
                                }}
                                className="
                                    group
                                    p-7
                                    rounded-2xl
                                    bg-[#101720]
                                    border
                                    border-white/10
                                    hover:border-lime-400/30
                                    transition-all
                                    duration-500
                                "
                            >
                                <div
                                    className="
                                        w-12
                                        h-12
                                        rounded-xl
                                        bg-lime-400/10
                                        text-lime-400
                                        flex
                                        items-center
                                        justify-center
                                        mb-7
                                        group-hover:bg-lime-400
                                        group-hover:text-black
                                        transition-colors
                                    "
                                >
                                    {index === 0 && <FiShield />}
                                    {index === 1 && <FiDroplet />}
                                    {index === 2 && <FiLayers />}
                                    {index === 3 && <FiTool />}
                                </div>

                                <h3
                                    className="
                                        text-lg
                                        font-semibold
                                        mb-3
                                    "
                                >
                                    {feature.title}
                                </h3>

                                {feature.description && (
                                    <p
                                        className="
                                            text-sm
                                            text-white/40
                                            leading-7
                                        "
                                    >
                                        {feature.description}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <section
                className="
                    border
                    border-white/10
                    bg-[#0b1119]
                "
            >
                <div
                    className="
                        max-w-7xl
                        mx-auto
                        px-6
                        sm:px-10
                        lg:px-16
                        py-10
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            justify-center
                            items-center
                            gap-10
                        "
                    >
                        <div className="flex flex-col items-center">
                            <p
                                className="
                                    text-xs
                                    text-lime-400
                                    tracking-[0.2em]
                                    mb-4
                                "
                            >
                                {t("detailProduct.informationLabel")}
                            </p>

                            <h2
                                className="
                                    text-2xl
                                    sm:text-3xl
                                    font-semibold
                                "
                            >
                                {t("detailProduct.informationTitle")}
                            </h2>
                        </div>

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-3
                            "
                        >
                            {product.sku && (
                                <InfoTag>
                                    SKU: {product.sku}
                                </InfoTag>
                            )}

                            {product.model && (
                                <InfoTag>
                                    {t("detailProduct.model")}: {product.model}
                                </InfoTag>
                            )}

                            {product._id && (
                                <InfoTag>
                                    ID: {product._id.slice(-8)}
                                </InfoTag>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* =================================================
                CATEGORY DESCRIPTION
            ================================================= */}



            {/* =================================================
                RELATED PRODUCTS
            ================================================= */}

            {relatedProducts.length > 0 && (
                <section
                    className="
                        max-w-7xl
                        mx-auto
                        px-6
                        sm:px-10
                        lg:px-16
                        py-24
                    "
                >
                    <SectionTitle
                        eyebrow={t("detailProduct.relatedLabel")}
                        title={t("detailProduct.relatedTitle")}
                    />

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3
                            gap-6
                        "
                    >
                        {relatedProducts.map((item, index) => (
                            <Link to={`/detail-product/${item._id}`}>
                                <motion.div
                                    key={item._id}
                                    initial={{
                                        opacity: 0,
                                        y: 25,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    whileHover={{
                                        y: -8,
                                    }}
                                    className="
                                group
                                cursor-pointer
                                rounded-2xl
                                overflow-hidden
                                bg-[#101720]
                                border
                                border-white/10
                                hover:border-lime-400/30
                                    transition-all
                                    duration-500
                                "
                                >
                                    {/* Image */}

                                    <div
                                        className="
                                        relative
                                        h-64
                                        bg-[#0d141d]
                                        overflow-hidden
                                    "
                                    >
                                        <div
                                            className="
                                            absolute
                                            w-40
                                            h-40
                                            rounded-full
                                            bg-lime-400/10
                                            blur-[70px]
                                            left-1/2
                                            top-1/2
                                            -translate-x-1/2
                                            -translate-y-1/2
                                        "
                                        />

                                        <img
                                            src={resolveMediaUrl(item.thumbnail)}
                                            alt={item.name}
                                            className="
                                        relative
                                            z-10
                                            w-full
                                            h-full
                                            object-contain
                                            p-8
                                            group-hover:scale-105
                                            transition-transform
                                            duration-500
                                            "
                                        />
                                    </div>

                                    {/* Content */}

                                    <div className="p-6">
                                        <div
                                            className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-4
                                            mb-4
                                            "
                                        >
                                            <span
                                                className="
                                                text-[10px]
                                                text-lime-400
                                                tracking-wider
                                            "
                                            >
                                                {item.model || t("detailProduct.product")}
                                            </span>

                                            <FiArrowUpRight
                                                className="
                                                text-white/30
                                                group-hover:text-lime-400
                                                transition-colors
                                                "
                                            />
                                        </div>

                                        <h3
                                            className="
                                        text-lg
                                        font-semibold
                                            leading-7
                                            line-clamp-2
                                        "
                                        >
                                            {item.name}
                                        </h3>

                                        {item.shortDescription && (
                                            <p
                                                className="
                                                mt-3
                                                text-sm
                                                text-white/40
                                                leading-7
                                                line-clamp-2
                                            "
                                            >
                                                {item.shortDescription}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}


// =====================================================
// SECTION TITLE
// =====================================================

function SectionTitle({
    eyebrow,
    title,
}) {
    return (
        <div className="mb-12">
            <p
                className="
                    text-xs
                    text-lime-400
                    tracking-[0.2em]
                    mb-4
                "
            >
                {eyebrow}
            </p>

            <h2
                className="
                    text-3xl
                    sm:text-4xl
                    font-semibold
                "
            >
                {title}
            </h2>
        </div>
    );
}


// =====================================================
// INFO TAG
// =====================================================

function InfoTag({
    children,
}) {
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


// =====================================================
// SPEC ITEM
// =====================================================

function SpecItem({
    icon,
    title,
    value,
}) {
    return (
        <div
            className="
                p-6
                sm:p-8
                border-l
                border-b
                border-white/10
            "
        >
            <div
                className="
                    w-11
                    h-11
                    rounded-xl
                    bg-lime-400/10
                    text-lime-400
                    flex
                    items-center
                    justify-center
                    text-lg
                    mb-5
                "
            >
                {icon}
            </div>

            <p
                className="
                    text-xs
                    text-white/30
                    mb-2
                "
            >
                {title}
            </p>

            <p
                className="
                    text-base
                    sm:text-lg
                    font-semibold
                "
            >
                {value}
            </p>
        </div>
    );
}