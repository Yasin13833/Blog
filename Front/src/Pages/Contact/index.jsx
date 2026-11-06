
import React, { useId, useState } from "react";

import { useTranslation } from "react-i18next";

import { motion } from "motion/react";

export default function Contact() {
  const { t } = useTranslation();

  const contact = t("contact", { returnObjects: true });

  const [openFaq, setOpenFaq] = useState(null);

  const faqId = useId();

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <main>
      <title>{t('seo.contact.title')}</title>
      <meta
        name="description"
        content={t('seo.contact.description')}
      />
      <meta
        name="keywords"
        content={t('seo.contact.keywords')}
      />
      {/* Hero Section */}
      <section
        aria-labelledby="contact-heading"
        className="flex min-h-[80vh] flex-col items-center justify-center gap-10 bg-[#0a1119] px-6 py-20 md:flex-row md:justify-evenly md:px-12 [background-image:radial-gradient(circle_at_85%_0%,rgba(25,65,140,0.65),transparent_55%)]"
      >
        <div className="w-full md:w-1/2">
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-5 text-sm font-medium tracking-wide text-lime-400"
          >
            ○ {contact.label}
          </motion.p>

          <motion.h1
            id="contact-heading"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl font-semibold leading-tight text-white md:text-5xl"
          >
            {contact.title}
            <br />
            <span className="text-lime-400">
              {contact.titleHighlight}
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-7 text-gray-400"
          >
            {contact.description}
          </motion.p>
        </div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="h-[300px] w-full overflow-hidden rounded-2xl md:h-[400px] md:w-5/12"
        >
          <img
            src="/contact.jpg"
            className="h-full w-full object-cover brightness-80"
            alt={contact.imageAlt || contact.title}
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
      </section>

      {/* Contact Section */}
      <section
        aria-labelledby="contact-form-heading"
        className="bg-[#07111c] px-5 py-20 text-white"
      >
        <div className="mx-auto max-w-[1100px]">

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

            {/* Contact Form */}
            <div className="rounded-md border border-[#1b344e] bg-[#091827] p-6 md:p-8">

              <h2
                id="contact-form-heading"
                className="mb-2 text-3xl font-bold"
              >
                {contact.form.title}
              </h2>

              <p className="mb-8 text-sm leading-7 text-gray-400">
                {contact.form.description}
              </p>

              <form
                className="space-y-5"
                aria-label={contact.form.title}
              >

                <div className="grid gap-5 md:grid-cols-2">

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm text-gray-300"
                    >
                      {contact.form.fullName} *
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      className="h-11 w-full rounded-md border border-[#203b56] bg-[#07131f] px-4 text-sm text-white outline-none transition focus:border-[#b8f500]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm text-gray-300"
                    >
                      {contact.form.email}
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="h-11 w-full rounded-md border border-[#203b56] bg-[#07131f] px-4 text-sm text-white outline-none transition focus:border-[#b8f500]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm text-gray-300"
                    >
                      {contact.form.phone} *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      className="h-11 w-full rounded-md border border-[#203b56] bg-[#07131f] px-4 text-sm text-white outline-none transition focus:border-[#b8f500]"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm text-gray-300"
                    >
                      {contact.form.subject} *
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      required
                      defaultValue=""
                      className="h-11 w-full rounded-md border border-[#203b56] bg-[#07131f] px-4 text-sm text-gray-300 outline-none focus:border-[#b8f500]"
                    >
                      <option value="" disabled>
                        {contact.form.subjectPlaceholder}
                      </option>

                      {contact.form.subjects.map(
                        (subject, index) => (
                          <option
                            key={index}
                            value={subject}
                          >
                            {subject}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm text-gray-300"
                  >
                    {contact.form.message} *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full resize-none rounded-md border border-[#203b56] bg-[#07131f] p-4 text-sm text-white outline-none transition focus:border-[#b8f500]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  className="flex h-11 items-center gap-5 rounded-md bg-[#b8f500] px-6 font-bold text-[#07111c] transition hover:bg-[#c9ff38] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8f500]"
                >
                  {contact.form.send}

                  <span className="text-xl" aria-hidden="true">
                    ←
                  </span>
                </button>

              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">

              {/* Office */}
              <address className="not-italic rounded-md border border-[#1b344e] bg-[#091827] p-5">
                <div className="flex items-start gap-4">

                  <span
                    className="text-2xl text-[#b8f500]"
                    aria-hidden="true"
                  >
                    ⌖
                  </span>

                  <div>
                    <h3 className="mb-2 text-lg font-bold">
                      {contact.info.office.title}
                    </h3>

                    <p className="text-sm leading-7 text-gray-400">
                      {contact.info.office.address}
                    </p>
                  </div>

                </div>
              </address>

              {/* Phone */}
              <div className="rounded-md border border-[#1b344e] bg-[#091827] p-5">
                <div className="flex items-center gap-4">

                  <span
                    className="text-2xl text-[#b8f500]"
                    aria-hidden="true"
                  >
                    ♧
                  </span>

                  <div>
                    <h3 className="mb-1 text-lg font-bold">
                      {contact.info.phone.title}
                    </h3>

                    <div className="space-y-1 text-sm text-gray-400">
                      {contact.info.phone.numbers.map(
                        (number, index) => (
                          <p key={index}>
                            <a
                              href={`tel:${number.replace(/[\s()-]/g, "")}`}
                              className="transition hover:text-[#b8f500]"
                            >
                              {number}
                            </a>
                          </p>
                        )
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Email */}
              <div className="rounded-md border border-[#1b344e] bg-[#091827] p-5">
                <div className="flex items-center gap-4">

                  <span
                    className="text-2xl text-[#b8f500]"
                    aria-hidden="true"
                  >
                    ✉
                  </span>

                  <div>
                    <h3 className="mb-1 text-lg font-bold">
                      {contact.info.email.title}
                    </h3>

                    <a
                      href={`mailto:${contact.info.email.address}`}
                      className="text-sm text-gray-400 transition hover:text-[#b8f500]"
                    >
                      {contact.info.email.address}
                    </a>
                  </div>

                </div>
              </div>

              {/* Working Hours */}
              <div className="rounded-md border border-[#1b344e] bg-[#091827] p-5">
                <div className="flex items-center gap-4">

                  <span
                    className="text-2xl text-[#b8f500]"
                    aria-hidden="true"
                  >
                    ◷
                  </span>

                  <div>
                    <h3 className="mb-1 text-lg font-bold">
                      {contact.info.hours.title}
                    </h3>

                    <p className="text-sm leading-7 text-gray-400">
                      {contact.info.hours.time}
                    </p>
                  </div>

                </div>
              </div>

              {/* Map Placeholder */}
              <div
                className="relative h-[195px] overflow-hidden rounded-md border border-[#1b344e] bg-[#0b1c2d]"
                role="img"
                aria-label={contact.info.mapAlt}
              >

                <div
                  className="absolute inset-0 opacity-30"
                  aria-hidden="true"
                >
                  <div className="h-full w-full bg-[linear-gradient(#31506c_1px,transparent_1px),linear-gradient(90deg,#31506c_1px,transparent_1px)] bg-[size:55px_55px]" />
                </div>

                <div
                  className="absolute left-0 top-[55%] h-3 w-full rotate-[-4deg] bg-blue-600/80 blur-[1px]"
                  aria-hidden="true"
                />

                <div
                  className="absolute left-[43%] top-[38%] text-5xl text-[#b8f500]"
                  aria-hidden="true"
                >
                  📍
                </div>

              </div>

            </div>
          </div>

          {/* FAQ Section */}
          <section
            aria-labelledby="faq-heading"
            className="mt-20"
          >

            <div className="mb-8">

              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#b8f500]">

                <span
                  className="h-3 w-3 rounded-full border-2 border-[#b8f500]"
                  aria-hidden="true"
                />

                {contact.faq.label}

              </div>

              <h2
                id="faq-heading"
                className="text-3xl font-bold md:text-4xl"
              >
                {contact.faq.title}
              </h2>

            </div>

            <div className="border-t border-[#1b344e]">

              {contact.faq.items.map((item, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={index}
                    className="border-b border-[#1b344e]"
                  >

                    <h3>
                      <button
                        type="button"
                        id={`${faqId}-button-${index}`}
                        aria-expanded={isOpen}
                        aria-controls={`${faqId}-answer-${index}`}
                        onClick={() => toggleFaq(index)}
                        className="flex w-full items-center justify-between gap-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-[#b8f500]"
                      >

                        <span className="text-sm leading-7 text-gray-300">
                          {item.question}
                        </span>

                        <span
                          className="shrink-0 text-2xl text-[#b8f500] transition-transform duration-300"
                          aria-hidden="true"
                        >
                          {isOpen ? "−" : "+"}
                        </span>

                      </button>
                    </h3>

                    <div
                      id={`${faqId}-answer-${index}`}
                      role="region"
                      aria-labelledby={`${faqId}-button-${index}`}
                      hidden={!isOpen}
                      className="pb-5"
                    >
                      <p className="max-w-3xl text-sm leading-8 text-gray-400">
                        {item.answer}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>

          </section>

        </div>
      </section>
    </main>
  );
}
