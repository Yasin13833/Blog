import React from "react";
import { FiArrowRight, FiDroplet, FiTruck, FiLink } from "react-icons/fi";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function Category() {

  const { t } = useTranslation();

  const category = t("category", {
    returnObjects: true
  });

  return (
    <div
      className="
        w-full
        min-h-screen
        bg-[#1643a0]
        text-white
        px-6
        py-16
        sm:px-10
        lg:px-16
        flex
        items-center
      "
    >

      <div className="
        w-full
        max-w-7xl
        mx-auto
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-10
        lg:gap-16
        items-center
      ">

        {/* ================= LEFT ================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: -60
          }}
          whileInView={{
            opacity: 1,
            x: 0
          }}
          viewport={{
            once: true,
            amount: 0.3
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="flex flex-col"
        >

          {/* Small Title */}
          <motion.p
            initial={{
              opacity: 0,
              y: -20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5
            }}
            className="
              text-lime-400
              text-[10px]
              sm:text-xs
              font-medium
              tracking-[0.2em]
              mb-4
            "
          >
            ○ {category.smallTitle}
          </motion.p>


          {/* Big Title */}
          <h1 className="
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-semibold
            leading-tight
            max-w-lg
            mb-5
          ">
            {category.bigTitle}
          </h1>


          {/* Description */}
          <p className="
            text-white/60
            text-xs
            sm:text-sm
            leading-6
            max-w-md
            mb-5
          ">
            {category.description}
          </p>


          {/* View All */}
          <motion.div
            whileHover={{
              x: 6
            }}
            className="
              flex
              items-center
              gap-2
              w-fit
              text-lime-400
              text-[10px]
              sm:text-xs
              font-semibold
              tracking-wider
              cursor-pointer
              mb-8
            "
          >
            <span>
              {category.viewAll}
            </span>

            <FiArrowRight />
          </motion.div>


          {/* Category Cards */}
          <div className="
            grid
            grid-cols-2
            border
            border-white/10
          ">

            {category.categoryCards.map((item, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true,
                  amount: 0.2
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12
                }}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.06)"
                }}
                className="
                  min-h-36
                  p-5
                  border-r
                  border-b
                  border-white/10
                  cursor-pointer
                  transition-colors
                  duration-300
                "
              >

                {/* Icon */}
                <div className="
                  text-lime-400
                  text-lg
                  mb-4
                ">
                  {index === 0 && <FiDroplet />}
                  {index === 1 && <FiDroplet />}
                  {index === 2 && <FiTruck />}
                  {index === 3 && <FiLink />}
                </div>


                {/* Title */}
                <h3 className="
                  text-xs
                  sm:text-sm
                  font-medium
                  mb-2
                ">
                  {item.title}
                </h3>


                {/* Description */}
                <p className="
                  text-[9px]
                  sm:text-[10px]
                  leading-5
                  text-white/50
                  mb-3
                ">
                  {item.description}
                </p>


                {/* Arrow */}
                <FiArrowRight
                  className="
                    text-lime-400
                    text-xs
                  "
                />

              </motion.div>

            ))}

          </div>

        </motion.div>


        {/* ================= RIGHT IMAGE ================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 60,
            scale: 0.9
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1
          }}
          viewport={{
            once: true,
            amount: 0.2
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="
            relative
            w-full
            h-[450px]
            sm:h-[550px]
            lg:h-[600px]
            overflow-hidden
          "
        >

          <motion.img
            src="/hero-image.png"
            alt={category.bigTitle}
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
              duration: 1.5,
              ease: "easeOut"
            }}
            className="
              w-full
              h-full
              object-cover
            "
          />

        </motion.div>

      </div>

    </div>
  );
}