import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowDownRight } from 'react-icons/fi'
import { motion } from "motion/react";

export default function Products() {
  const { t } = useTranslation()

  const product = t("product", {
    returnObjects: true
  })
  // console.log(product)

  const items = product.productCart?.map((e, index) => {
 return (
  <motion.div
    key={index}
    initial={{
      opacity: 0,
      y: 80,
      scale: 0.9
    }}
    whileInView={{
      opacity: 1,
      y: 0,
      scale: 1
    }}
    viewport={{
      once: true,
      amount: 0.2
    }}
    transition={{
      duration: 0.7,
      delay: index * 0.15,
      ease: [0.22, 1, 0.36, 1]
    }}
    whileHover={{
      y: -8
    }}
    className="
      product-container
      group
      relative
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
    <div className="relative h-72 overflow-hidden">

      <motion.img
        src="/hero-image.png"
        alt={e.title}
        className="
          w-full
          h-full
          object-cover
          select-none
        "
        initial={{
          scale: 1.15
        }}
        whileInView={{
          scale: 1
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut"
        }}
      />

      {/* Image Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-linear-to-t
          from-black
          via-black/20
          to-transparent
        "
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
        viewport={{
          once: true
        }}
        transition={{
          duration: 0.5,
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
        {e.category}
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
        viewport={{
          once: true
        }}
        transition={{
          duration: 0.5,
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
        {e.tags[0]}
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
        viewport={{
          once: true
        }}
        transition={{
          duration: 0.5,
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
        {e.title}
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
        viewport={{
          once: true
        }}
        transition={{
          duration: 0.5,
          delay: 0.5 + index * 0.15
        }}
        className="
          text-sm
          leading-7
          text-white/50
          mb-6
        "
      >
        {e.description}
      </motion.p>


      {/* Tags */}
      <motion.div
        initial={{
          opacity: 0,
          y: 15
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 0.5,
          delay: 0.6 + index * 0.15
        }}
        className="flex flex-wrap gap-2"
      >

        {e.tags.map((tag, index) => (

          <div
            key={index}
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
            {tag}
          </div>

        ))}

      </motion.div>

    </div>

  </motion.div>
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
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Product Card */}
        {
          items
        }

      </div>

    </div>
  )
}
