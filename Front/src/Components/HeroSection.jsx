import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";

export default function Slider() {
    const { t } = useTranslation();

    const slider = t("slider", {
        returnObjects: true,
    });

    const navigate = useNavigate();

    return (
        <section
            className="
                banner
                relative
                w-full
                h-[70vh]
                sm:h-screen
                overflow-hidden
                border-b border-white/10
                flex
            "

        >
            {/* Soft top fade */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    z-20
                    h-60
                    bg-linear-to-b
                    from-[#0a0f16]/70
                    to-transparent
                "
            />

            {/* Soft right fade */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    right-0
                    z-20
                    w-1/6
                    bg-linear-to-l
                    from-[#0a0f16]/80
                    via-[#0a0f16]/30
                    to-transparent
                "
            />

            {/* IMAGE - RIGHT */}
            <div className="w-7/12 h-full ml-auto shrink-0">
                <div
                    className="
                        w-full
                        h-full
                        overflow-hidden
                        [&_img]:scale-110
                        [&_img]:transition-transform
                        [&_img]:duration-[6000ms]
                        [&_img]:ease-out
                    "
                >
                    <img
                        src="/hero-image.png"
                        alt={slider.title}
                        draggable={false}
                        fetchPriority="high"
                        className="
                            w-full
                            h-full
                            object-cover
                            select-none
                        "
                    />
                </div>
            </div>

            {/* CONTENT - LEFT */}
            <div
                className="
                    relative
                    z-10
                    w-5/12
                    h-full
                    shrink-0
                    bg-black
                    text-white
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-5
                    sm:gap-14
                    md:gap-12
                    lg:gap-15
                    pt-15
                "
            >
                {/* Label */}
                <motion.p
                    className="
                        font-medium
                        tracking-wide
                        text-lime-400
                    "
                    initial={{
                        y: -50,
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                >
                    ○ {slider.label}
                </motion.p>

                {/* Title */}
                <motion.h1
                    className="
                        w-10/12
                        h-max
                        text-center
                        text-xl
                        leading-8
                        sm:text-3xl
                        sm:leading-15
                        lg:text-4xl
                    "
                    initial={{
                        y: -50,
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                >
                    {slider.title}
                </motion.h1>

                {/* Description */}
                <motion.p
                    className="
                        h-max
                        w-9/12
                        text-center
                        text-[10px]
                        leading-5
                        text-white/50
                        sm:text-[18px]
                        sm:leading-12
                        md:text-[20px]
                        lg:text-2xl
                    "
                    initial={{
                        y: -60,
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.9,
                    }}
                >
                    {slider.description}
                </motion.p>

                {/* Button */}
                <Link to={"products"}>
                    <motion.button
                        initial={{
                            y: -10,
                            rotate: 0,
                            opacity: 0,
                        }}
                        animate={{
                            y: [0, -4, 0, -4, 0],
                            rotate: [0, 1, 0, -1, 0],
                            opacity: 1,
                        }}
                        transition={{
                            y: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                            rotate: {
                                duration: 1,
                                repeat: Infinity,
                            },
                            opacity: {
                                duration: 1.1,
                            },
                        }}
                    >
                        <span className="
                        flex
                        items-center
                        justify-center

                        text-[8px]
                        text-nowrap

                        px-4
                        py-2

                        rounded-2xl

                        w-20
                        h-5

                        sm:h-8
                        sm:w-30
                        sm:text-[12px]

                        md:h-max

                        lg:h-12
                        lg:w-40
                        lg:text-[16px]

                        font-bold
                        text-center
                        bg-(--accent)
                        text-black
                        cursor-pointer

                        transition-all
                        duration-200

                        hover:shadow-2xl
                        hover:shadow-[0_0_5px_1px_var(--accent)]
                    ">
                            {slider.button}
                        </span>
                    </motion.button>
                </Link>

                {/* Left fade */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        w-30
                        h-full
                        top-0
                        left-full
                        bg-linear-to-r
                        from-black
                        to-transparent
                    "
                />
            </div>
        </section>
    );
}