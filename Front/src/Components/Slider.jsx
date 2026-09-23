import React, { useState } from 'react'

import 'swiper/css'

import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { motion } from "motion/react";

export default function Slider() {
    const [activeSlide, setActiveSlide] = useState(0)
    const { t } = useTranslation()

    const slider = t(
        `slider${activeSlide + 1}`,
        { returnObjects: true }
    )

    return (

        <div className="banner w-full h-[50vh] sm:h-screen md:h-screen flex overflow-hidden border-b border-white/10" dir='rtl'>



            {/* soft top fade (navbar) */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-60 bg-linear-to-b from-[#0a0f16]/70 to-transparent" />

            {/* soft bottom fade (next section) */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-[#0a0f16] to-transparent" />

            {/* soft right fade */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/6 bg-linear-to-l from-[#0a0f16]/80 from-0% via-[#0a0f16]/30 via-50% to-transparent to-100%" />
            <div className="w-7/12 h-full ml-auto">

                <Swiper
                    onSlideChange={swiper => {
                        setActiveSlide(swiper.realIndex)
                    }}
                    slidesPerView={1}
                    loop
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 5000,
                    }}
                    speed={1000}
                    className="h-full"
                >

                    {Object.values(slider).map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className="h-screen overflow-hidden [&_img]:scale-110 [&_img]:transition-transform [&_img]:duration-[6000ms] [&_img]:ease-out [&.swiper-slide-active_img]:scale-100"
                        >

                            <img
                                src={'/hero-image.png'}
                                alt={item.title}
                                draggable={false}
                                className="w-full h-full object-cover object-center select-none"
                            />

                        </SwiperSlide>
                    ))}

                </Swiper>

            </div>
            {/* left fade */}
            <div
                key={activeSlide}
                className="
        z-10
        relative
        w-5/12
        h-full
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
                <motion.h1
                    className="w-10/12 sm:text-3xl sm:leading-15 lg:text-4xl  h-max text-center "
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    {slider.title}
                </motion.h1>

                <motion.p
                    className="h-max text-[10px] leading-5 sm:text-[18px] md:text-[20px] lg:text-2xl sm:leading-12 text-center w-9/12 text-white/50"
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9 }}
                >
                    {slider.description}
                </motion.p>

                <motion.button
                    className="
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
    font-bold
    flex
    items-center
    justify-center
    md:h-max
    lg:h-12
    lg:w-40
    lg:text-[16px]
    text-center
    bg-(--accent)
    cursor-pointer
    text-black
    transition-all
    duration-200
    hover:shadow-2xl
    hover:shadow-[0_0_10px_5px_var(--accent)]
  "
                    initial={{ y: -20, rotate: 0 }}
                    animate={{
                        y: [0, -6, 0, -6, 0],
                        rotate: [0, 2, 0, -2, 0]
                    }}
                    transition={{
                        y: {
                            duration: .5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        rotate: {
                            duration: 1,
                            repeat: Infinity,
                        },
                        opacity: {
                            duration: 1.1
                        }
                    }}
                >
                    {slider.button}
                </motion.button>

                <div className="bg-linear-to-r from-black to-transparent absolute w-30 h-full left-full" />
            </div>
        </div>
    )
}