import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { FiMenu, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";
export default function Navbar() {
  const { t, i18n } = useTranslation()

  const navbar = t("navbar", { returnObjects: true })
  const [open, setOpen] = useState(false)
  return (
    <motion.header
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: .5 }}
      className='w-full h-[12vh] bg-linear-to-b bg-black border-b-white border fixed top-0 left-0 right-0 z-50'>
      <nav className='h-full  mx-auto   flex items-center justify-evenly relative'>


        <div className='logo-container sm:w-12 sm:h-12 w-9 h-9 transition-all duration-200 hover:scale-110 cursor-pointer'>
          <img src="/Logo.png" alt="logo" className='w-full h-full ' />
        </div>

        <ul className='md:flex gap-15 hidden'>
          {Object.keys(navbar).map((item, index) => {
            return <NavLink
              className={({ isActive }) => {
                return `text-[18px] lg:text-[20px] text-nowrap
    transition-all
    duration-200
    hover:scale-110
    relative
    group
    inline-block
    after:content-['']
    after:absolute
    after:left-0
    after:-bottom-2
    after:w-[120%]
    after:h-0.5
    after:bg-(--primary)
    after:scale-x-0
    after:transition-transform
    after:translate-x-[-7%]
    after:duration-300
    after:rounded-2xl
    hover:after:scale-x-100
       ${isActive ? 'text-(--primary)' : 'text-white'}
    `
              }

              }


              key={index}
              to={item === 'home' ? '/' : `${item}`}
            >
              {navbar[item]}
            </NavLink>
          })}
        </ul>
        <div className=' sm:gap-10 hidden gap-4 lg:flex'>
          <img src="Arabic.png" onClick={() => i18n.changeLanguage('ar')} className='w-6 h-6 sm:w-8 sm:h-8 cursor-pointer' />
          <img src="English.png" onClick={() => i18n.changeLanguage('en')} className='w-6 h-6 sm:w-8 sm:h-8 cursor-pointer' />
          <img src="Persian.png" onClick={() => i18n.changeLanguage('fa')} className='w-6 h-6 sm:w-8 sm:h-8 cursor-pointer' />
        </div>
        <FiSearch className='w-6 h-6 lg:w-8 lg:h-8 hidden sm:flex  transition-all duration-250 hover:scale-120 text-white cursor-pointer' />
        <FiMenu
          className={`
    w-8 h-8
    text-white
    lg:hidden
    cursor-pointer
    relative
    z-50

    transition-all
    duration-500
    ease-in-out

    hover:text-(--primary)

    ${open && 'rotate-90 text-(--primary) scale-110'}
  `}
          onClick={() => setOpen(prev => !prev)}
        />
        <AnimatePresence>
          {open && (

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: -20,
                x: -20
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                x: 0
              }}

              exit={{
                opacity: 0,
                scale: 0.9,
                y: -20,
                x: -20
              }}

              transition={{
                duration: .5,
                ease: [0.16, 1, 0.3, 1]
              }}

              className="
        absolute
        top-[105%]
        left-0
        w-72
        sm:w-80
        rounded-br-[2rem]
        rounded-tr-[1.5rem]
        border
        border-white/10
        bg-black/90
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.7)]
      "
            >
              <ul className="
  flex
  flex-col
  w-full

  p-3
  gap-1
">
                {Object.keys(navbar).map((item, index) => {

                  return (
                    <NavLink
                      key={index}
                      to={item === 'home' ? '/' : `/${item}`}

                      className={({ isActive }) => `
        relative

        flex
        items-center
        justify-between

        w-full
        h-14

        px-5

        rounded-xl

        overflow-hidden

        text-base
        text-nowrap

        transition-all
        duration-300

        group

        ${isActive
                          ? 'text-(--primary) bg-white/[0.07]'
                          : 'text-white/80 hover:text-white hover:bg-white/[0.04]'
                        }
      `}
                    >

                      {/* شماره */}
                      <span className="
        text-xs
        font-mono
        text-white/30
        group-hover:text-(--primary)
        transition-colors
        duration-300
      ">
                        0{index + 1}
                      </span>

                      {/* عنوان */}
                      <motion.span
                        initial={{
                          opacity: 0,
                          x: -15
                        }}

                        animate={{
                          opacity: open ? 1 : 0,
                          x: open ? 0 : -15
                        }}

                        transition={{
                          duration: 0.3,
                          delay: index * 0.06
                        }}
                      >
                        {navbar[item]}
                      </motion.span>

                      {/* نقطه */}
                      <span className="
        w-1.5
        h-1.5
        rounded-full

        bg-white/20

        group-hover:bg-(--primary)

        group-hover:scale-150

        transition-all
        duration-300
      " />

                    </NavLink>
                  )
                })}
                <motion.div initial={{
                  opacity: 0,
                  y: 15
                }}

                  animate={{
                    opacity: open ? 1 : 0,
                    y: open ? 0 : 15
                  }}

                  transition={{
                    duration: 0.4,
                    delay: 0.3
                  }}

                  className="
    mt-3
    pt-4
    border-t
    border-white/10
    px-2
  ">
                  <div className="flex w-full justify-center items-center gap-5">

                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        rotate: 3
                      }}

                      whileTap={{
                        scale: 0.9
                      }}

                      onClick={() => i18n.changeLanguage('fa')}

                      className="
    w-10
    h-10
    flex
    items-center
    justify-center
    rounded-full
    bg-black/40
    border
    border-white/10
    hover:border-(--primary)
    transition-colors
    cursor-pointer
  "
                    >
                      <img
                        src="Persian.png"
                        className="w-7 h-7"
                      />
                    </motion.button>


                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        rotate: 3
                      }}

                      whileTap={{
                        scale: 0.9
                      }}

                      onClick={() => i18n.changeLanguage('en')}

                      className="
    w-10
    h-10
    flex
    items-center
    justify-center
    rounded-full
    bg-black/40
    border
    border-white/10
    hover:border-(--primary)
    transition-colors
    cursor-pointer
  "
                    >
                      <img
                        src="English.png"
                        className="w-7 h-7"
                      />
                    </motion.button>


                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        rotate: 3
                      }}

                      whileTap={{
                        scale: 0.9
                      }}

                      onClick={() => i18n.changeLanguage('ar')}

                      className="
    w-10
    h-10
    flex
    items-center
    justify-center
    rounded-full
    bg-black/40
    border
    border-white/10
    hover:border-(--primary)
    transition-colors
    cursor-pointer
  "
                    >
                      <img
                        src="Arabic.png"
                        className="w-7 h-7"
                      />
                    </motion.button>

                  </div>
                </motion.div>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header >
  )
}
