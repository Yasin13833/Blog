import React, { useState } from "react";

import {
  FiBox,
  FiChevronDown,
  FiChevronUp,
  FiFileText,
  FiFolder,
  FiHome,
  FiLogOut,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const navItems = [
    'Home',
    'Product',
    'Product-Category',
    'Posts',
    'Brands',
    'Blog'

  ]
  // < NavLink key = { index } to = { e } > { e }<NavLink/  >
  const items = navItems.map((e, index) => {
    return (
      <button key={index} className="mt-1 flex w-full items-center justify-center rounded-lg px-3 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/5 hover:text-white">

        <div className="flex items-center justify-center gap-3">
          <NavLink to={e.toLowerCase()} className={({ isActive }) => {
            return `  ${isActive ? 'text-(--primary)' : 'text-white'}
            text-[15px]
            `
          }}>{e}</NavLink>
        </div>


      </button>
    )
  })


  return (
    <aside
      dir="rtl"
      className="fixed left-0 top-24 z-40 flex h-[calc(100vh-6rem)] w-56 flex-col justify-center items-center border-r border-white/10 bg-[#06131c]"
    >

      {/* Menu */}
      <div className="flex flex-col justify-evenly h-full w-full gap-10 overflow-y-auto px-3 py-5">


        {items}
        {/* Bottom */}
        <div className="border-t border-white/10 p-4">

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/70 transition hover:bg-red-500/10 hover:text-red-400">

            <FiLogOut className="text-lg" />

            <span>
              خروج از سیستم
            </span>

          </button>

        </div>

      </div>




    </aside>
  );
}