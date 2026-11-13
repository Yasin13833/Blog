import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import headerImg from '../assets/image/hero-image.png'
export default function Slider() {
    const { t } = useTranslation();

    const slider = t("slider", {
        returnObjects: true,
    });


    return (
        <section
            className="
                banner
                relative
                w-full
                h-[60vh]
                md:h-[80vh]
                lg:h-[90vh]
                xl:h-screen
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
            <div className="w-7/12 h-full ml-auto">
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
                        src={headerImg}
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
                    bg-black
                    text-white
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-5
                    sm:gap-3
                    md:gap-10
                    lg:gap-15
                    xl:gap-20
                    pt-15
                "
            >
                {/* Label */}
                <motion.p
                    className="
                        font-medium
                        tracking-wide
                        text-lime-400
                        text-[10px]
                        md:text-[15px]
                        xl:text-[18px]
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
                        text-[14px]
                        leading-8
                        sm:text-[15px]
                        md:text-[18px]
                        sm:leading-10
                        lg:leading-12                   
                        lg:text-3xl
                        xl:text-4xl
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
                        sm:text-[12px]
                        sm:leading-8
                        md:text-[14px]
                        lg:text-[17px]
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
                    
                        <span className="
                        flex
                        items-center
                        justify-center
                        bg-[#a7ff21]
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
                        text-center
                        bg-(--accent)
                        text-black
                        cursor-pointer
                        transition-all
                        duration-200
                    ">
                            {slider.button}
                        </span>
                
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