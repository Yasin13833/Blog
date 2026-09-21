import React from 'react'
import { useTranslation } from 'react-i18next'

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

      <section className='bg-[#0a1119] px-6 py-20'>
        <div className='grid gap-12 md:grid-cols-2'>
        <div className='mb-4 text-sm text-lime-400'>
        <p className='mb-4 text-sm text-lime-400'>
          ارتباط با ما
        </p>
        <h2 className=''>
          
        </h2>
        </div>
        </div>
      </section>
    </div>
  )
}