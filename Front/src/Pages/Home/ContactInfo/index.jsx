import React from "react";
import { useTranslation } from "react-i18next";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiArrowUpRight
} from "react-icons/fi";
import { motion } from "motion/react";

export default function ContactInfo() {

  const { t } = useTranslation();

  const contactInfo = t("contactInfo", {
    returnObjects: true
  });

  return (
    <div className="w-full min-h-screen bg-[#3f5720] px-6 py-16 sm:px-10 lg:px-20 flex items-center">

      <div className="
        w-full
        max-w-7xl
        mx-auto
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-12
        lg:gap-20
        items-center
      ">

        {/* Image */}
        <motion.div
          initial={{
            opacity: 0,
            x: -70,
            scale: 0.95
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1
          }}
          viewport={{
            once: true,
            amount: 0.3
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="
            w-full
            h-72
            sm:h-96
            lg:h-[500px]
            overflow-hidden
          "
        >

          <motion.img
            src="/hero-image.png"
            alt={contactInfo.bigTitle}
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
              duration: 1.4,
              ease: "easeOut"
            }}
            className="
              w-full
              h-full
              object-cover
            "
          />

        </motion.div>


        {/* Content */}
        <motion.div
          initial={{
            opacity: 0,
            x: 70
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
          className="flex flex-col text-white"
        >

          {/* Small Title */}
          <p className="
            text-lime-300
            text-[10px]
            sm:text-xs
            tracking-[0.2em]
            mb-4
          ">
            ○ {contactInfo.smallTitle}
          </p>


          {/* Title */}
          <h1 className="
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-semibold
            leading-tight
            max-w-xl
            mb-5
          ">
            {contactInfo.bigTitle}
          </h1>


          {/* Description */}
          <p className="
            text-sm
            sm:text-base
            leading-7
            text-white/60
            max-w-lg
            mb-10
          ">
            {contactInfo.description}
          </p>


          {/* Contact Items */}
          <div className="flex flex-col">

            {/* Phone */}
            <motion.a
              href={`tel:${contactInfo.phoneValue}`}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.25 }}
              className="
                group
                flex
                items-center
                justify-between
                py-5
                border-b
                border-white/15
                cursor-pointer
              "
            >

              <div className="flex items-center gap-4">

                <div className="
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-lime-300
                  group-hover:bg-lime-300
                  group-hover:text-black
                  transition-all
                  duration-300
                ">
                  <FiPhone />
                </div>

                <div>
                  <p className="
                    text-xs
                    text-white/40
                    mb-1
                  ">
                    {contactInfo.phone}
                  </p>

                  <p className="text-sm sm:text-base">
                    {contactInfo.phoneValue}
                  </p>
                </div>

              </div>

              <FiArrowUpRight
                className="
                  text-white/40
                  group-hover:text-lime-300
                  transition-colors
                "
              />

            </motion.a>


            {/* Email */}
            <motion.a
              href={`mailto:${contactInfo.emailValue}`}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.25 }}
              className="
                group
                flex
                items-center
                justify-between
                py-5
                border-b
                border-white/15
                cursor-pointer
              "
            >

              <div className="flex items-center gap-4">

                <div className="
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-lime-300
                  group-hover:bg-lime-300
                  group-hover:text-black
                  transition-all
                  duration-300
                ">
                  <FiMail />
                </div>

                <div>
                  <p className="
                    text-xs
                    text-white/40
                    mb-1
                  ">
                    {contactInfo.email}
                  </p>

                  <p className="text-sm sm:text-base">
                    {contactInfo.emailValue}
                  </p>
                </div>

              </div>

              <FiArrowUpRight
                className="
                  text-white/40
                  group-hover:text-lime-300
                  transition-colors
                "
              />

            </motion.a>


            {/* Address */}
            <motion.div
              whileHover={{ x: 8 }}
              transition={{ duration: 0.25 }}
              className="
                group
                flex
                items-center
                justify-between
                py-5
                cursor-pointer
              "
            >

              <div className="flex items-center gap-4">

                <div className="
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-lime-300
                  group-hover:bg-lime-300
                  group-hover:text-black
                  transition-all
                  duration-300
                ">
                  <FiMapPin />
                </div>

                <div>
                  <p className="
                    text-xs
                    text-white/40
                    mb-1
                  ">
                    {contactInfo.address}
                  </p>

                  <p className="text-sm sm:text-base">
                    {contactInfo.addressValue}
                  </p>
                </div>

              </div>

              <FiArrowUpRight
                className="
                  text-white/40
                  group-hover:text-lime-300
                  transition-colors
                "
              />

            </motion.div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}