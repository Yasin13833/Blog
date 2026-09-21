import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import { FiSearch } from "react-icons/fi";
import { motion } from "motion/react";
export default function Navbar() {
  const { t } = useTranslation()
  const navbar = t("navbar", { returnObjects: true })
  const location = useLocation()
console.log(location.pathname)
  return (
    <motion.header 
    initial={{y:-50}}
    animate={{y:0}}
    transition={{duration :.5}}
    className='w-full h-[14vh] bg-linear-to-b from-black/70 to-black/0 fixed top-0 left-0 right-0 z-50'>
      <nav className='h-full w-10/12 mx-auto   flex items-center justify-between'>
        <div className='search-box  cursor-pointer relative bg-red-100 h-10 rounded-2xl overflow-hidden'>
          <input type="text" className='w-full h-full rounded-2xl' />
          <FiSearch className='w-8 h-8 transition-all duration-250 hover:scale-120 absolute left-2 top-1/2 -translate-y-1/2' />
        </div>
        <ul className='flex gap-10'>
          {Object.keys(navbar).map((item, index) => <NavLink className='text-[26px] transition-all duration-200 hover:scale-110' key={index} to={`/${item}`}>{navbar[item]}</NavLink>)}
        </ul>
        <div className='logo-container w-12 h-12 transition-all duration-200 hover:scale-110 cursor-pointer'>
          <img src="public/Logo.png" alt="logo" className='w-full h-full ' />
        </div>
      </nav>
    </motion.header>
  )
}
