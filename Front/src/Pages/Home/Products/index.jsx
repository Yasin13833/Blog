import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowDownRight } from 'react-icons/fi'
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { fetchData, resolveMediaUrl } from '../../../Utils/fetchData';
import Notify from '../../../Utils/Notify';
import { useNavigate } from 'react-router-dom';
export default function Products() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const langue = i18n.language;

  const [products, setProduct] = useState([])
  useEffect(() => {
    (async () => {
      const result = await fetchData(`/public/products?lang=${langue}`)
      // console.log(result)
      if (!result.success) {
        Notify('error', 'خطا در بارگزاری محصولات')
      }
      setProduct(result.data)
    })()
  }, [langue])


  const product = t("product", {
    returnObjects: true
  })


  const items = products?.map((e, index) => {
    return (
      <SwiperSlide key={e._id} className="!h-auto">
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.97
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          viewport={{
            amount: 0.15
          }}
          transition={{
            duration: 0.7,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="
    product-container
    group
    relative
    h-full
    flex
    flex-col
    overflow-hidden
    rounded-3xl
    bg-[#111]
    border
    border-white/10
    hover:border-lime-400/40
    transition-colors
    duration-500
    cursor-pointer
  "
        >

          {/* Image */}
          <div className="  relative
  h-56
  sm:h-64
  lg:h-72
  shrink-0
  overflow-hidden
  bg-[#0b0f0c]">

            <motion.img
              src={resolveMediaUrl(e.thumbnail)}
              alt={e.name}
              className="
    absolute
    inset-0
    w-full
    h-full
    object-center
    select-none
    transition-transform
    duration-700
    ease-out
    group-hover:scale-105
  "
              initial={{
                scale: 1.08
              }}
              whileInView={{
                scale: 1
              }}

              transition={{
                duration: 1.2,
                ease: "easeOut"
              }}
            />

            {/* Category */}
            <motion.span
              initial={{
                opacity: 0,
                x: 30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}

              transition={{
                duration: 0.2,
                delay: 0.25 + index * 0.15
              }}
              className="
              absolute
              top-5
              right-5
              px-3
              py-1.5
              rounded-full
              bg-black/60
              backdrop-blur-md
              border
              border-white/10
              text-xs
              text-lime-400
            "
            >
              {e.categoryId?.name}
            </motion.span>

          </div>

          {/* Content */}
          <div className="text-container p-6">

            {/* Small title */}
            <motion.p
              initial={{
                opacity: 0,
                y: 15
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.2,
                delay: 0.3 + index * 0.15
              }}
              className="
              text-[10px]
              sm:text-xs
              text-lime-400
              tracking-widest
              uppercase
              mb-3
            "
            >
              {e.model}
            </motion.p>

            {/* Title */}
            <motion.h3
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.2,
                delay: 0.4 + index * 0.15
              }}
              className="
              text-xl
              sm:text-2xl
              font-semibold
              mb-3
              leading-tight
            "
            >
              {e.name}
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.2,
                delay: 0.5 + index * 0.15
              }}
              className="
              text-sm
              leading-7
              text-white/50
              mb-6
            "
            >
              {e.shortDescription}
            </motion.p>

            {/* Tags / Info */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.2,
                delay: 0.6 + index * 0.15
              }}
              className="flex flex-wrap gap-2"
            >

              <div
                className="
                px-3
                py-1
                rounded-full
                bg-white/5
                border
                border-white/10
                text-xs
                text-white/60
              "
              >
                {e.sku}
              </div>

              <div
                className="
                px-3
                py-1
                rounded-full
                bg-white/5
                border
                border-white/10
                text-xs
                text-white/60
              "
              >
                {e.brandId?.name}
              </div>

            </motion.div>

          </div>
        </motion.div>
      </SwiperSlide>
    )
  })
  return (
    <div className="w-full min-h-screen bg-black text-white px-6 py-16 sm:px-10 lg:px-20">

      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3
        }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
        className="flex flex-col gap-5 mb-12"
      >

        {/* Small Title */}
        <motion.p
          variants={{
            hidden: {
              opacity: 0,
              y: -25
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut"
              }
            }
          }}
          className="
      text-lime-400
      text-sm
      sm:text-base
      font-medium
      tracking-wide
    "
        >
          ○ {product.smallTitle}
        </motion.p>


        {/* Big Title */}
        <motion.h1
          variants={{
            hidden: {
              opacity: 0,
              y: 30
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          }}
          className="
      text-3xl
      sm:text-4xl
      lg:text-5xl
      font-semibold
      max-w-xl
      leading-tight
    "
        >
          {product.bigTitle}
        </motion.h1>


        {/* View All */}
        <motion.div
        onClick={()=>navigate('products')}
          variants={{
            hidden: {
              opacity: 0,
              x: -25
            },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut"
              }
            }
          }}
          whileHover={{
            x: 6
          }}
          className="
      flex
      items-center
      gap-2
      text-white/60
      hover:text-lime-400
      transition-colors
      duration-300
      cursor-pointer
      w-fit
    "
        >
          <p className="text-sm sm:text-base">
            {product.viewAll}
          </p>

          <motion.div
            whileHover={{
              rotate: -45
            }}
            transition={{
              duration: 0.25
            }}
          >
            <FiArrowDownRight className="text-lg" />
          </motion.div>

        </motion.div>

      </motion.div>


      {/* Products */}

      <Swiper
     dir='rtl'
        key={products.length}
        slidesPerView={3}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation

        modules={[Autoplay, Pagination, Navigation]}
      >
        {items}
      </Swiper>



    </div>
  )
}
