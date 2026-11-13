import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from 'motion/react'
import { Link } from "react-router-dom";
import img from '../../assets/image/img.png'
import video from '../../assets/image/آبیاری.mp4'
// =============================
// Icons
// =============================

const ArrowIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlayIcon = () => (
  <svg
    width="46"
    height="46"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="24"
      cy="24"
      r="22"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M20 16L32 24L20 32V16Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="9"
      cy="8"
      r="3"
      stroke="currentColor"
      strokeWidth="1.6"
    />

    <circle
      cx="17"
      cy="9"
      r="2.5"
      stroke="currentColor"
      strokeWidth="1.6"
    />

    <path
      d="M3 20C3 16.6863 5.68629 14 9 14C12.3137 14 15 16.6863 15 20"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    <path
      d="M15 14.5C18.3137 14.5 21 16.5 21 20"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const TruckIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6H14V17H3V6Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />

    <path
      d="M14 10H18L21 13V17H14V10Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />

    <circle
      cx="7"
      cy="19"
      r="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />

    <circle
      cx="18"
      cy="19"
      r="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

const LeafIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.5 3.5C12 3.8 5.5 7 5.5 13C5.5 16.7 8 19 11.5 19C17.2 19 20.2 12.8 20.5 3.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />

    <path
      d="M4 21C6.5 16.5 10 13.3 15 10.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth="1.6"
    />

    <path
      d="M19.4 15A1.7 1.7 0 0 0 19.7 17L18 18.7A1.7 1.7 0 0 0 16 18.4A1.7 1.7 0 0 0 15 20V20.2H12.5V20A1.7 1.7 0 0 0 11 18.4A1.7 1.7 0 0 0 9 18.7L7.3 17A1.7 1.7 0 0 0 7.6 15A1.7 1.7 0 0 0 6 14H5.8V11.5H6A1.7 1.7 0 0 0 7.6 10A1.7 1.7 0 0 0 7.3 8L9 6.3A1.7 1.7 0 0 0 11 6.6A1.7 1.7 0 0 0 12 5V4.8H14.5V5A1.7 1.7 0 0 0 16 6.6A1.7 1.7 0 0 0 18 6.3L19.7 8A1.7 1.7 0 0 0 19.4 10A1.7 1.7 0 0 0 21 11.5H21.2V14H21A1.7 1.7 0 0 0 19.4 15Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3L20 6V11.5C20 16.5 16.9 19.8 12 21C7.1 19.8 4 16.5 4 11.5V6L12 3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />

    <path
      d="M8.5 12L10.8 14.3L15.5 9.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// =============================
// About Us
// =============================

export default function AboutUs() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen overflow-hidden bg-[#031321] text-white mt-16 ">
      <title>{t('seo.about.title')}</title>
      <meta
        name="description"
        content={t('seo.about.description')}
      />
      {/* =====================================
          HERO SECTION
      ====================================== */}

      <section className="border-b border-[#203445] py-8">
        <div className="mx-auto flex w-full max-w-350 flex-col items-center justify-center gap-10 px-6 sm:px-10 lg:gap-15 lg:px-20 lg:py-13 xl:flex-row xl:gap-10">

          {/* HERO TEXT */}
          <div

            className="flex justify-center items-center sm:px-10 lg:w-10/12">
            <div className="w-full flex flex-col items-center gap-5 xl:gap-8">
              <motion.div
                initial={{
                  opacity: 0,
                  y: -40,
                  x: 0,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                }}
                transition={{
                  duration: .7
                }}
                viewport={{ once: true }}
                className=" flex justify-center items-center gap-3 text-sm font-medium text-[#a7ff21]">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-[#a7ff21]" />

                <span className="text-2xl">
                  {t("about.hero.label")}
                </span>
              </motion.div>

              <motion.h1
                viewport={{ once: true }}
                initial={{
                  y: -30,
                  opacity: 0,
                  scale: .80
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  duration: .7,
                  delay: .1
                }}
                className="text-center text-3xl font-bold leading sm:text-4xl md:text-[40px] lg:text-[45px] xl:text-nowrap xl:text-4xl">
                {t("about.hero.title")}
              </motion.h1>

              <motion.p
                viewport={{ once: true }}
                initial={{
                  y: -40,
                  scale: .8,
                  opacity: 0
                }}
                whileInView={{
                  y: 0,
                  scale: 1,
                  opacity: 1
                }}
                transition={{
                  duration: .7,
                  delay: .2
                }}
                className="text-center mt-6 max-w-10/12 text-sm leading-8 text-[#b8c4cf] sm:text-base lg:text-2xl lg:leading-15 xl:text-xl xl:leading-12">
                {t("about.hero.description")}
              </motion.p>
            </div>
          </div>

          {/* HERO IMAGE */}
          <motion.div
            viewport={{ once: true }}
            initial={{
              scale: .6,
              opacity: 0
            }}
            whileInView={{
              scale: 1,
              opacity: 1
            }}
            transition={{
              duration: .7
            }}
            className="h-[330px] w-full max-w-[620px] lg:max-w-[850px] xl:max-w-[620px] shrink-0 overflow-hidden rounded-2xl lg:h-[430px]">
            <img
              src={img}
              alt={t("about.hero.title")}
              decoding="async"
              className="h-full w-full object-cover brightness-80"
            />
          </motion.div>

        </div>
      </section>


      {/* =====================================
          STORY SECTION
      ====================================== */}

      <section className="border-b border-[#203445]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-evenly gap-10 px-6 py-10 sm:px-10 xl:flex-row-reverse lg:gap-10 lg:px-20">

          {/* STORY TEXT */}
          <div className="flex w-full flex-col gap-10 items-center justify-center lg:flex-1">

            <motion.div
              viewport={{ once: true }}
              initial={{
                y: -20,
                opacity: 0
              }}

              whileInView={{
                y: 0,
                opacity: 1
              }}

              transition={{
                duration: .7
              }}

              className=" mb-4 flex items-center gap-3 text-sm font-medium text-[#a7ff21]">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-[#a7ff21]" />

              <span className="text-2xl">
                {t("about.story.label")}
              </span>
            </motion.div>

            <motion.h2
              viewport={{ once: true }}
              initial={{
                y: -40,
                opacity: 0,
                scale: .5
              }}
              whileInView={{
                y: 0,
                opacity: 1,
                scale: 1
              }}
              transition={{
                duration: .7
              }}
              className="text-2xl sm:text-4xl font-bold leading-[1.4] text-center">
              {t("about.story.title")}
            </motion.h2>

            <div className="mt-5 max-w-10/12 space-y-4 text-sm leading-8 text-[#b8c4cf]">



              <motion.p
                viewport={{ once: true }}
                initial={{
                  y: -40,
                  opacity: 0,
                  scale: .5
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  duration: .7,
                  delay: .3
                }}
                className="text-center text-[15px]"
              >
                {t("about.story.text2")}
              </motion.p>

            </div>

            <Link to={"products"}>

              <span className="
                                  flex
                                  items-center
                                  justify-center
                                  bg-[#a7ff21]
                                  text-[13px]
                                  font-bold
                                  text-nowrap
                                  px-15
                                  py-4
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
                {t('about.story.button')}
              </span>

            </Link>

          </div>


          {/* STORY VIDEO */}
          <div className="h-[330px] w-full max-w-[620px] lg:max-w-[850px] xl:max-w-[620px] shrink-0 lg:h-[430px]">
            <motion.div
              viewport={{ once: true }}
              initial={{
                scale: .80,
                opacity: 0
              }}
              whileInView={{
                scale: 1,
                opacity: 1
              }}
              transition={{
                duration: .7
              }}

              className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#101720] shadow-[0_25px_80px_rgba(0,0,0,0.4)]">

              <video
                src={video}
                className="h-full w-full object-cover"
                autoPlay
                poster="/img.png"
                loop
                muted
                playsInline
              />

              {/* Dark Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080d14]/90 via-[#080d14]/25 to-[#080d14]/10" />

              {/* Video Info */}

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:gap-4 sm:p-5 lg:p-7">

                <div className="hidden h-max max-w-[75%] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#080d14]/70 px-3 py-3 shadow-lg backdrop-blur-md sm:flex sm:px-5 md:max-w-[65%] lg:px-8">

                  <p className="mb-2 text-center text-xs font-semibold tracking-widest text-[#a7ff21]">
                    {t("about.story.videoLabel")}
                  </p>

                  <h3 className="text-center text-base font-bold leading-relaxed text-white sm:text-lg lg:text-2xl">
                    {t("about.story.videoTitle")}
                  </h3>

                  <p className="mt-2 hidden text-center text-xs leading-6 text-white/75 lg:block">
                    {t("about.story.videoText")}
                  </p>

                </div>

                <div className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#a7ff21]/30 bg-[#a7ff21]/15 text-[#a7ff21] shadow-lg backdrop-blur-md sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                  <PlayIcon />
                </div>

              </div>


              {/* Top Badge */}
              <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-2 text-[10px] font-medium text-white/90 backdrop-blur-md sm:right-5 sm:top-5 sm:text-xs">
                {t("about.story.videoBadge")}
              </div>

            </motion.div>
          </div>

        </div>
      </section>


      {/* =====================================
          FEATURES SECTION
      ====================================== */}

      <section className="border-b border-[#203445]">
        <div className="mx-auto max-w-[1400px] px-6 py-12 sm:px-10 lg:px-16">

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            <div>

              <motion.div
                viewport={{ once: true }}
                initial={{
                  y: -20,
                  opacity: 0
                }}

                whileInView={{
                  opacity: 1,
                  y: 0
                }}

                transition={{
                  duration: .7
                }}

                className="mb-4 flex items-center gap-3 text-sm font-medium text-[#a7ff21]">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-[#a7ff21]" />

                <span>
                  {t("about.features.label")}
                </span>
              </motion.div>

              <motion.h2
                viewport={{ once: true }}
                initial={{
                  y: -20,
                  opacity: 0
                }}

                whileInView={{
                  y: 0,
                  opacity: 1
                }}

                transition={{
                  duration: .7,
                  delay: .1
                }}
                className="max-w-[530px] text-3xl font-bold leading-[1.4] sm:text-4xl">
                {t("about.features.title")}
              </motion.h2>

            </div>



          </div>


          <motion.div
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  duration: 0.5,
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}

            className="mt-10 grid grid-cols-1 border-t border-b rounded-2xl overflow-hidden border-[#203445] sm:grid-cols-2 lg:grid-cols-5">

            {/* QUALITY */}
            <motion.div
              viewport={{ once: true }}
              variants={{
                hidden: {
                  opacity: 0,
                  y: -30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}

              className="border-b border-[#203445] px-5 py-8 text-center lg:border-b-0 lg:border-r">

              <div className="mb-5 flex justify-center text-[#a7ff21]">
                <ShieldIcon />
              </div>

              <h3 className="text-base font-bold">
                {t("about.features.items.quality.title")}
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#8999a8]">
                {t("about.features.items.quality.description")}
              </p>

            </motion.div>


            {/* SUPPORT */}
            <motion.div
              viewport={{ once: true }}
              variants={{
                hidden: {
                  opacity: 0,
                  y: -30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}

              className="border-b border-[#203445] px-5 py-8 text-center lg:border-b-0 lg:border-r">

              <div className="mb-5 flex justify-center text-[#a7ff21]">
                <SettingsIcon />
              </div>

              <h3 className="text-base font-bold">
                {t("about.features.items.support.title")}
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#8999a8]">
                {t("about.features.items.support.description")}
              </p>

            </motion.div>


            {/* SUSTAINABLE */}
            <motion.div
              viewport={{ once: true }}
              variants={{
                hidden: {
                  opacity: 0,
                  y: -30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}

              className="border-b border-[#203445] px-5 py-8 text-center lg:border-b-0 lg:border-r">

              <div className="mb-5 flex justify-center text-[#a7ff21]">
                <LeafIcon />
              </div>

              <h3 className="text-base font-bold">
                {t("about.features.items.sustainable.title")}
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#8999a8]">
                {t("about.features.items.sustainable.description")}
              </p>

            </motion.div>


            {/* DELIVERY */}
            <motion.div
              viewport={{ once: true }}
              variants={{
                hidden: {
                  opacity: 0,
                  y: -30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}

              className="border-b border-[#203445] px-5 py-8 text-center lg:border-b-0 lg:border-l lg:border-r">

              <div className="mb-5 flex justify-center text-[#a7ff21]">
                <TruckIcon />
              </div>

              <h3 className="text-base font-bold">
                {t("about.features.items.delivery.title")}
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#8999a8]">
                {t("about.features.items.delivery.description")}
              </p>

            </motion.div>


            {/* PARTNERSHIP */}
            <motion.div
            viewport={{ once: true }}
              variants={{
                hidden: {
                  opacity: 0,
                  y: -30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}

              className="border-b border-[#203445] px-5 py-8 text-center lg:border-b-0 lg:border-l">

              <div className="mb-5 flex justify-center text-[#a7ff21]">
                <UsersIcon />
              </div>

              <h3 className="text-base font-bold">
                {t("about.features.items.partnership.title")}
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#8999a8]">
                {t("about.features.items.partnership.description")}
              </p>

            </motion.div>

          </motion.div>

        </div>
      </section>


      {/* =====================================
          STATS + MISSION
      ====================================== */}

      <section className="border-b border-[#203445]">

        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 px-6 py-6 sm:px-10 lg:grid-cols-2 lg:px-16">

          {/* STATS */}
          <div className="relative min-h-[280px] overflow-hidden border border-[#263c4e]">

            <img
              src="/img.png"
              alt={t("about.stats.title")}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#031321] via-[#031321]/75 to-transparent" />

            <div className="relative z-10 flex min-h-[280px] flex-col justify-end p-6 sm:p-8">

              <div className="mb-3 flex items-center gap-3 text-xs font-medium text-[#a7ff21]">
                <span className="h-2 w-2 rounded-full border border-[#a7ff21]" />

                <span>
                  {t("about.stats.label")}
                </span>
              </div>

              <h2 className="text-2xl font-bold leading-[1.5] sm:text-3xl">
                {t("about.stats.title")}
              </h2>


              <div className="mt-7 grid grid-cols-4">

                {/* YEARS */}
                <div className="border-r border-[#43505b]/70 text-center">

                  <p className="text-xl font-bold text-[#a7ff21] sm:text-2xl">
                    {t("about.stats.items.years.value")}
                  </p>

                  <p className="mt-1 text-[10px] text-[#aab6c0] sm:text-xs">
                    {t("about.stats.items.years.label")}
                  </p>

                </div>


                {/* CUSTOMERS */}
                <div className="border-r border-[#43505b]/70 text-center">

                  <p className="text-xl font-bold text-[#a7ff21] sm:text-2xl">
                    {t("about.stats.items.customers.value")}
                  </p>

                  <p className="mt-1 text-[10px] text-[#aab6c0] sm:text-xs">
                    {t("about.stats.items.customers.label")}
                  </p>

                </div>


                {/* PRODUCTS */}
                <div className="border-r border-[#43505b]/70 text-center">

                  <p className="text-xl font-bold text-[#a7ff21] sm:text-2xl">
                    {t("about.stats.items.products.value")}
                  </p>

                  <p className="mt-1 text-[10px] text-[#aab6c0] sm:text-xs">
                    {t("about.stats.items.products.label")}
                  </p>

                </div>


                {/* SATISFACTION */}
                <div className="text-center">

                  <p className="text-xl font-bold text-[#a7ff21] sm:text-2xl">
                    {t("about.stats.items.satisfaction.value")}
                  </p>

                  <p className="mt-1 text-[10px] text-[#aab6c0] sm:text-xs">
                    {t("about.stats.items.satisfaction.label")}
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* MISSION */}
          <div className="relative min-h-[280px] overflow-hidden border border-[#244735] bg-[#08251b]">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#a7ff21]/10" />

            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#a7ff21]/10" />

            <div className="relative z-10 flex min-h-[280px] flex-col justify-center p-7 sm:p-10">

              <div className="mb-4 flex items-center gap-3 text-xs font-medium text-[#a7ff21]">

                <span className="h-2 w-2 rounded-full border border-[#a7ff21]" />

                <span>
                  {t("about.mission.label")}
                </span>

              </div>


              <h2 className="max-w-[500px] text-2xl font-bold leading-[1.5] sm:text-3xl">
                {t("about.mission.title")}
              </h2>


              <p className="mt-4 max-w-[520px] text-sm leading-7 text-[#b8c4cf]">
                {t("about.mission.description")}
              </p>


              <Link to={'/contact'}
                className="cursor-pointer mt-6 inline-flex w-fit items-center gap-3 rounded-sm bg-[#a7ff21] px-6 py-3 text-sm font-bold text-[#07131d] transition hover:bg-[#b9ff4c]"
              >
                <span>
                  {t("about.mission.button")}
                </span>

                <ArrowIcon />
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}