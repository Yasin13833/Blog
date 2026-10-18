import React from "react";
import { useTranslation } from "react-i18next";

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
    <main className="min-h-screen overflow-hidden bg-[#031321] text-white">

      {/* =====================================
          HERO SECTION
      ====================================== */}

      <section className="border-b border-[#203445]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-2">

          {/* HERO TEXT */}
          <div className="flex items-center px-6 py-16 sm:px-10 lg:px-16">
            <div className="max-w-[560px]">

              <div className="mb-5 flex items-center gap-3 text-sm font-medium text-[#a7ff21]">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-[#a7ff21]" />

                <span>
                  {t("about.hero.label")}
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-[1.25] sm:text-5xl lg:text-[58px]">
                {t("about.hero.title")}
              </h1>

              <p className="mt-6 max-w-[540px] text-sm leading-8 text-[#b8c4cf] sm:text-base">
                {t("about.hero.description")}
              </p>

              <div className="mt-7 h-[2px] w-20 bg-[#a7ff21]" />
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="min-h-[330px] lg:min-h-[430px]">
            <img
              src="/img.png"
              alt={t("about.hero.title")}
              className="h-full min-h-[330px] w-full object-cover lg:min-h-[430px]"
            />
          </div>

        </div>
      </section>


      {/* =====================================
          STORY SECTION
      ====================================== */}

      <section className="border-b border-[#203445]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:px-16 lg:py-8">

          {/* STORY TEXT */}
          <div className="order-2 lg:order-1">

            <div className="mb-4 flex items-center gap-3 text-sm font-medium text-[#a7ff21]">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-[#a7ff21]" />

              <span>
                {t("about.story.label")}
              </span>
            </div>

            <h2 className="max-w-[500px] text-3xl font-bold leading-[1.4] sm:text-4xl">
              {t("about.story.title")}
            </h2>

            <div className="mt-5 max-w-[520px] space-y-4 text-sm leading-8 text-[#b8c4cf]">

              <p>
                {t("about.story.paragraph1")}
              </p>

              <p>
                {t("about.story.paragraph2")}
              </p>

            </div>

            <button
              type="button"
              className="mt-6 inline-flex items-center gap-3 rounded-sm bg-[#a7ff21] px-6 py-3 text-sm font-bold text-[#07131d] transition hover:bg-[#b9ff4c]"
            >
              <span>
                {t("about.story.button")}
              </span>

              <ArrowIcon />
            </button>

          </div>


          {/* STORY IMAGE */}
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden">

              <img
                src="/img.png"
                alt={t("about.story.title")}
                className="aspect-[1.7/1] w-full object-cover"
              />

              <div className="absolute right-5 top-5 flex items-center gap-4">

                <div className="text-right">
                  <p className="text-sm font-bold text-[#a7ff21]">
                    {t("about.story.videoTitle")}
                  </p>

                  <p className="mt-1 text-xs text-[#d1dae2]">
                    {t("about.story.videoSubtitle")}
                  </p>
                </div>

                <div className="text-[#a7ff21]">
                  <PlayIcon />
                </div>

              </div>

            </div>
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

              <div className="mb-4 flex items-center gap-3 text-sm font-medium text-[#a7ff21]">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-[#a7ff21]" />

                <span>
                  {t("about.features.label")}
                </span>
              </div>

              <h2 className="max-w-[530px] text-3xl font-bold leading-[1.4] sm:text-4xl">
                {t("about.features.title")}
              </h2>

            </div>

            <p className="max-w-[520px] text-sm leading-8 text-[#b8c4cf] lg:justify-self-end">
              {t("about.features.description")}
            </p>

          </div>


          <div className="mt-10 grid grid-cols-1 border-t border-[#203445] sm:grid-cols-2 lg:grid-cols-5">

            {/* QUALITY */}
            <div className="border-b border-[#203445] px-5 py-8 text-center lg:border-b-0 lg:border-r">

              <div className="mb-5 flex justify-center text-[#a7ff21]">
                <ShieldIcon />
              </div>

              <h3 className="text-base font-bold">
                {t("about.features.items.quality.title")}
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#8999a8]">
                {t("about.features.items.quality.description")}
              </p>

            </div>


            {/* SUPPORT */}
            <div className="border-b border-[#203445] px-5 py-8 text-center lg:border-b-0 lg:border-r">

              <div className="mb-5 flex justify-center text-[#a7ff21]">
                <SettingsIcon />
              </div>

              <h3 className="text-base font-bold">
                {t("about.features.items.support.title")}
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#8999a8]">
                {t("about.features.items.support.description")}
              </p>

            </div>


            {/* SUSTAINABLE */}
            <div className="border-b border-[#203445] px-5 py-8 text-center lg:border-b-0 lg:border-r">

              <div className="mb-5 flex justify-center text-[#a7ff21]">
                <LeafIcon />
              </div>

              <h3 className="text-base font-bold">
                {t("about.features.items.sustainable.title")}
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#8999a8]">
                {t("about.features.items.sustainable.description")}
              </p>

            </div>


            {/* DELIVERY */}
            <div className="border-b border-[#203445] px-5 py-8 text-center sm:border-r lg:border-b-0">

              <div className="mb-5 flex justify-center text-[#a7ff21]">
                <TruckIcon />
              </div>

              <h3 className="text-base font-bold">
                {t("about.features.items.delivery.title")}
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#8999a8]">
                {t("about.features.items.delivery.description")}
              </p>

            </div>


            {/* PARTNERSHIP */}
            <div className="px-5 py-8 text-center">

              <div className="mb-5 flex justify-center text-[#a7ff21]">
                <UsersIcon />
              </div>

              <h3 className="text-base font-bold">
                {t("about.features.items.partnership.title")}
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#8999a8]">
                {t("about.features.items.partnership.description")}
              </p>

            </div>

          </div>

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


              <button
                type="button"
                className="mt-6 inline-flex w-fit items-center gap-3 rounded-sm bg-[#a7ff21] px-6 py-3 text-sm font-bold text-[#07131d] transition hover:bg-[#b9ff4c]"
              >
                <span>
                  {t("about.mission.button")}
                </span>

                <ArrowIcon />
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}