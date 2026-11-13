import React from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "motion/react";

export default function Footer() {

  const { t } = useTranslation();

  const footer = t("footer", {
    returnObjects: true
  });

  return (
    <footer className="w-full bg-[#080c12] text-white">

      {/* Main Footer */}
      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-14
        sm:px-10
        lg:px-16
      ">

        <div  className="
    flex
    flex-col
    gap-10

    sm:grid
    sm:grid-cols-2

    lg:flex
    lg:flex-row
    lg:flex-nowrap
    lg:items-start
    lg:justify-between
    lg:gap-10
  ">


          {/* Logo + Description */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}
            className="flex flex-col gap-5 items-center"
          >

            {/* Logo */}
            <div className="flex items-center gap-3 justify-center">

              <div className="
                w-9
                h-9
                rounded-full
                border-4
                border-lime-400
                flex
                items-center
                justify-center
                text-lime-400
              ">
                <div className="
                  w-3
                  h-3
                  rounded-full
                  bg-lime-400
                " />
              </div>

              <div className="
                text-sm
                font-bold
                leading-4
                tracking-wide
              ">
                AGRI<br />
                FLOW
              </div>

            </div>


            {/* Description */}
            <p className="
            text-center
              w-10/12
              md:max-w-xs
              text-sm
              leading-6
              text-white/50
            ">
              {footer.description}
            </p>

          </motion.div>


          {/* Products */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6,
              delay: 0.1
            }}
            className="text-center"
          >

            <h3 className="
              text-xs
              font-semibold
              tracking-[0.2em]
              text-lime-400
              mb-6
            ">
              {footer.productsTitle}
            </h3>


            <div className="flex flex-col gap-4 items-center">

              {footer.products.map((item, index) => (

                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ x: 5 }}
                  className="
                    w-fit
                    text-sm
                    text-white/70
                    hover:text-white
                    transition-colors
                    duration-300
                  "
                >
                  {item}
                </motion.a>

              ))}

            </div>

          </motion.div>


          {/* Company */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
          >

            <h3 className="
              text-xs
              font-semibold
              text-center
              tracking-[0.2em]
              text-lime-400
              mb-6
            ">
              {footer.companyTitle}
            </h3>


            <div className="flex flex-col gap-4 justify-center items-center">

              {footer.company.map((item, index) => (

                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ x: 5 }}
                  className="
                    w-fit
                    text-sm
                    text-white/70
                    hover:text-white
                    transition-colors
                    duration-300
                  "
                >
                  {item}
                </motion.a>

              ))}

            </div>

          </motion.div>


          {/* Legal */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6,
              delay: 0.3
            }}
          >

            <h3 className="
            text-center
              text-xs
              font-semibold
              tracking-[0.2em]
              text-lime-400
              mb-6
            ">
              {footer.legalTitle}
            </h3>


            <div className="flex flex-col gap-4 justify-center items-center">

              {footer.legal.map((item, index) => (

                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ x: 5 }}
                  className="
                    w-fit
                    text-sm
                    text-white/70
                    hover:text-white
                    transition-colors
                    duration-300
                  "
                >
                  {item}
                </motion.a>

              ))}

            </div>

          </motion.div>


          {/* Contact Button */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6,
              delay: 0.4
            }}
            className="sm:col-span-2 lg:col-span-1 self-center"
          >

            <motion.a
              href="/contact-us"
              whileHover={{
                y: -3
              }}
              className="
                group
                flex
                items-center
                justify-center
                gap-2
                w-50
                lg:w-36
                h-13
                md:w-8/12
                mx-auto
                border
                border-white/20
                hover:border-lime-400
                text-xs
                font-bold
                tracking-[0.15em]
                transition-colors
                duration-300
                rounded-2xl
              "
            >

              {footer.contactButton}

              <FiArrowUpRight
                className="
                  group-hover:opacity-100
                  transition-opacity
                  duration-300
                "
              />

            </motion.a>

          </motion.div>

        </div>

      </div>


      {/* Bottom */}
      <div className="
        border-t
        border-white/10
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          py-5
          sm:px-10
          lg:px-16
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-3
        ">

          <p className="
            text-xs
            text-white/40
          ">
            {footer.copyright}
          </p>


          <p className="
            text-xs
            text-white/40
          ">
            {footer.bottomText}
          </p>

        </div>

      </div>

    </footer>
  );
}