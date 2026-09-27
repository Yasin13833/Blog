import React from "react"
import { useTranslation } from "react-i18next"

export default function Contact() {
  const { t } = useTranslation()

  const contact = t("contact", { returnObjects: true })

  return (
    <div>
      <section className="min-h-screen bg-[#0a1119] py-[12vh] [background-image:radial-gradient(circle_at_85%_0%,rgba(25,65,140,0.65),transparent_55%)]">
        <div className="px-6 py-24 md:px-12">
          <p className="mb-5 text-sm font-medium tracking-wide text-lime-400">
            ○ {contact.label}
          </p>

          <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
            {contact.title}
            <br />
            <span className="text-white">
              {contact.titleHighlight}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-400">
            {contact.description}
          </p>
        </div>
      </section>

      <section className="bg-[#07111c] px-5 py-20 text-white">
        <div className="mx-auto max-w-[1100px]">

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

            <div className="rounded-md border border-[#1b344e] bg-[#091827] p-7 md:p-8">
              <h2 className="mb-2 text-3xl font-bold">
                {contact.form.title}
              </h2>

              <p className="mb-8 text-sm leading-7 text-gray-400">
                {contact.form.description}
              </p>

              <form className="space-y-5">

                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      {contact.form.fullName} *
                    </label>

                    <input
                      type="text"
                      className="h-11 w-full rounded-md border border-[#203b56] bg-[#07131f] px-4 text-sm outline-none transition focus:border-[#b8f500]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      {contact.form.email}
                    </label>

                    <input
                      type="email"
                      className="h-11 w-full rounded-md border border-[#203b56] bg-[#07131f] px-4 text-sm outline-none transition focus:border-[#b8f500]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      {contact.form.phone} *
                    </label>

                    <input
                      type="text"
                      className="h-11 w-full rounded-md border border-[#203b56] bg-[#07131f] px-4 text-sm outline-none transition focus:border-[#b8f500]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      {contact.form.subject} *
                    </label>

                    <select className="h-11 w-full rounded-md border border-[#203b56] bg-[#07131f] px-4 text-sm text-gray-300 outline-none focus:border-[#b8f500]">
                      {contact.form.subjects.map((subject, index) => (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    {contact.form.message} *
                  </label>

                  <textarea
                    rows="5"
                    className="w-full resize-none rounded-md border border-[#203b56] bg-[#07131f] p-4 text-sm outline-none transition focus:border-[#b8f500]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="flex h-11 items-center gap-5 rounded-md bg-[#b8f500] px-6 font-bold text-[#07111c] transition hover:bg-[#c9ff38]"
                >
                  {contact.form.send}

                  <span className="text-xl">
                    ←
                  </span>
                </button>

              </form>
            </div>

            <div className="space-y-3">

              <div className="rounded-md border border-[#1b344e] bg-[#091827] p-5">
                <div className="flex items-start gap-4">

                  <span className="text-2xl text-[#b8f500]">
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
              </div>

              <div className="rounded-md border border-[#1b344e] bg-[#091827] p-5">
                <div className="flex items-center gap-4">

                  <span className="text-2xl text-[#b8f500]">
                    ♧
                  </span>

                  <div>
                    <h3 className="mb-1 text-lg font-bold">
                      {contact.info.phone.title}
                    </h3>

                    <p className="text-sm leading-7 text-gray-400">
                      {contact.info.phone.numbers.map((number, index) => (
                        <React.Fragment key={index}>
                          {number}
                          {index < contact.info.phone.numbers.length - 1 && (
                            <br />
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>

                </div>
              </div>

              <div className="rounded-md border border-[#1b344e] bg-[#091827] p-5">
                <div className="flex items-center gap-4">

                  <span className="text-2xl text-[#b8f500]">
                    ✉
                  </span>

                  <div>
                    <h3 className="mb-1 text-lg font-bold">
                      {contact.info.email.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {contact.info.email.address}
                    </p>
                  </div>

                </div>
              </div>

              <div className="rounded-md border border-[#1b344e] bg-[#091827] p-5">
                <div className="flex items-center gap-4">

                  <span className="text-2xl text-[#b8f500]">
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

              <div className="relative h-[195px] overflow-hidden rounded-md border border-[#1b344e] bg-[#0b1c2d]">

                <div className="absolute inset-0 opacity-30">
                  <div className="h-full w-full bg-[linear-gradient(#31506c_1px,transparent_1px),linear-gradient(90deg,#31506c_1px,transparent_1px)] bg-[size:55px_55px]" />
                </div>

                <div className="absolute left-0 top-[55%] h-3 w-full rotate-[-4deg] bg-blue-600/80 blur-[1px]" />

                <div className="absolute left-[43%] top-[38%] text-5xl text-[#b8f500]">
                  📍
                </div>

              </div>

            </div>

          </div>

          <div className="mt-20">

            <div className="mb-8">

              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#b8f500]">
                <span className="h-3 w-3 rounded-full border-2 border-[#b8f500]" />
                {contact.faq.label}
              </div>

              <h2 className="text-3xl font-bold md:text-4xl">
                {contact.faq.title}
              </h2>

            </div>

            <div className="border-t border-[#1b344e]">

              {contact.faq.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-[#1b344e] py-5"
                >
                  <span className="text-sm text-gray-300">
                    {item}
                  </span>

                  <span className="text-2xl text-[#b8f500]">
                    +
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>
    </div>
  )
}