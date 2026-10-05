import React, { useEffect, useState } from "react";

import {
  FiArrowRight,
  FiDroplet,
  FiTruck,
  FiLink,
} from "react-icons/fi";

import { motion } from "motion/react";

import { useTranslation } from "react-i18next";

import { fetchData } from "../../../Utils/fetchData";

import Notify from "../../../Utils/Notify";

export default function Category() {
  const { t, i18n } = useTranslation();

  const lang = i18n.language;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetchData(
        `/public/product-categories?lang=${lang}`
      );

      console.log(result);

      if (!result?.success) {
        Notify("error", "خطا در بارگزاری دسته بندی ها");
        return;
      }

      setCategories(result?.data || []);
    })();
  }, [lang]);

  const category = t("category", {
    returnObjects: true,
  });

  return (
    <div
      className="
        w-full
        min-h-screen
        bg-[#1643a0]
        text-white

        px-4
        py-14

        sm:px-6
        sm:py-16

        md:px-10

        lg:px-16
        lg:py-20

        xl:px-20

        flex
        items-center
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          x: -60,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          flex
          flex-col
          w-full
          max-w-7xl
          mx-auto
        "
      >
        {/* ================= HEADER ================= */}

        <div
          className="
            w-full
            max-w-2xl
            mb-10

            sm:mb-12

            lg:mb-14
          "
        >
          {/* Small Title */}

          <motion.p
            initial={{
              opacity: 0,
              y: -20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.5,
            }}
            className="
              text-lime-400
              text-[9px]
              sm:text-[10px]
              md:text-xs
              font-medium
              tracking-[0.2em]
              mb-4
            "
          >
            ○ {category.smallTitle}
          </motion.p>

          {/* Big Title */}

          <h1
            className="
              text-2xl
              leading-[1.2]

              sm:text-3xl
              md:text-4xl
              lg:text-5xl

              font-semibold
              max-w-xl

              mb-4
              sm:mb-5
            "
          >
            {category.bigTitle}
          </h1>

          {/* Description */}

          <p
            className="
              text-white/60

              text-[11px]
              leading-6

              sm:text-xs
              md:text-sm

              max-w-xl

              mb-5
              sm:mb-6
            "
          >
            {category.description}
          </p>

          {/* View All */}

          <motion.div
            whileHover={{
              x: 6,
            }}
            className="
              flex
              items-center
              gap-2
              w-fit

              text-lime-400

              text-[9px]
              sm:text-[10px]
              md:text-xs

              font-semibold
              tracking-wider

              cursor-pointer
            "
          >
            <span>{category.viewAll}</span>

            <FiArrowRight />
          </motion.div>
        </div>

        {/* ================= CATEGORY CARDS ================= */}

        <div
          className="
            w-full

            grid

            grid-cols-1

            sm:grid-cols-2

            lg:grid-cols-3

            xl:grid-cols-4

            border
            border-white/10

            rounded-xl
            overflow-hidden

            bg-black/5

            shadow-[0_20px_60px_rgba(0,0,0,0.15)]
          "
        >
          {categories.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
              className="
                group

                min-h-80

                p-4

                sm:p-5

                lg:p-6

                border-r
                border-b
                border-white/10

                cursor-pointer

                transition-colors
                duration-300

                relative
                overflow-hidden

                flex
                flex-col
              "
            >
              {/* Image */}

              <div
                className="
                  w-full

                  h-36

                  sm:h-40

                  md:h-44

                  lg:h-40

                  xl:h-44

                  mb-5

                  overflow-hidden

                  rounded-lg

                  bg-black/10

                  relative
                "
              >
                <img
                  src={`http://localhost:5001${item.image}`}
                  alt={item.name}
                  className="
                    w-full
                    h-full
                    object-cover

                    transition-transform
                    duration-700
                    ease-out

                    group-hover:scale-110
                  "
                />

                {/* Image Overlay */}

                <div
                  className="
                    absolute
                    inset-0

                    bg-gradient-to-t
                    from-black/30
                    via-transparent
                    to-transparent

                    opacity-0
                    group-hover:opacity-100

                    transition-opacity
                    duration-500
                  "
                />
              </div>

              {/* Icon */}

              <div
                className="
                  w-9
                  h-9

                  sm:w-10
                  sm:h-10

                  rounded-full

                  flex
                  items-center
                  justify-center

                  text-lime-400

                  bg-lime-400/10

                  border
                  border-lime-400/20

                  text-base
                  sm:text-lg

                  mb-4

                  transition-all
                  duration-300

                  group-hover:bg-lime-400
                  group-hover:text-[#1643a0]
                  group-hover:scale-110
                "
              >
                {index === 0 && <FiDroplet />}
                {index === 1 && <FiDroplet />}
                {index === 2 && <FiTruck />}
                {index === 3 && <FiLink />}
                {index >= 4 && <FiDroplet />}
              </div>

              {/* Title */}

              <h3
                className="
                  text-xs

                  sm:text-sm

                  font-medium

                  leading-6

                  mb-2

                  line-clamp-2

                  transition-colors
                  duration-300

                  group-hover:text-lime-300
                "
              >
                {item.name}
              </h3>

              {/* Description */}

              <p
                className="
                  text-[9px]

                  sm:text-[10px]

                  leading-5

                  text-white/50

                  line-clamp-3

                  mb-5
                "
              >
                {item.description}
              </p>

              {/* Arrow */}

              <div
                className="
                  mt-auto

                  w-7
                  h-7

                  rounded-full

                  flex
                  items-center
                  justify-center

                  border
                  border-white/10

                  text-lime-400

                  transition-all
                  duration-300

                  group-hover:bg-lime-400
                  group-hover:text-[#1643a0]
                  group-hover:border-lime-400

                  group-hover:translate-x-1
                "
              >
                <FiArrowRight
                  className="
                    text-xs
                  "
                />
              </div>

              {/* Decorative Glow */}

              <div
                className="
                  absolute

                  -bottom-16
                  -right-16

                  w-32
                  h-32

                  rounded-full

                  bg-lime-400/10

                  blur-3xl

                  opacity-0

                  group-hover:opacity-100

                  transition-opacity
                  duration-500

                  pointer-events-none
                "
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
