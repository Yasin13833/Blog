import React from "react";

import {
  FiBell,
  FiChevronDown,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { user } = useSelector(state => state.auth)
  console.log(user)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-25 border-b border-white/10 bg-[#06131c]">
      <nav className="flex h-full items-center justify-between px-5">

        {/* Left - User */}
        <div className="flex items-center gap-5">

          {/* User */}
          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#14232d]">
              <FiUser className="text-lg text-white/70" />
            </div>

            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">
                {user.fullName}
              </p>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] text-white/50">
                  {user.role}
                </span>
              </div>
            </div>

          </div>

          {/* Notification */}
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/5 hover:text-white">
            <FiBell className="text-xl" />

            <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] text-white">
              3
            </span>
          </button>

          {/* Language */}
          <button className="flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-[#091923] px-3 text-sm text-white/80 transition hover:border-white/20">
            <span>🇮🇷</span>
            <span>FA</span>
            <FiChevronDown className="text-sm" />
          </button>

        </div>


        {/* Center - Search */}
        <div className="absolute left-1/2 hidden w-[330px] -translate-x-1/2 md:block">
          <div className="flex h-9 items-center rounded-full border border-white/10 bg-[#0b1b25] px-4">

            <FiSearch className="text-lg text-white/60" />

            <input
              type="text"
              placeholder="جستجو در داشبورد..."
              className="mr-2 w-full bg-transparent text-right text-xs text-white outline-none placeholder:text-white/40"
            />

          </div>
        </div>


        {/* Right - Logo */}
        <div className="flex items-center gap-3">

          <div className=" w-60 h-20">
            <img src="/Logo.png" alt="logo" className="w-full h-full object-cover" />
          </div>



        </div>

      </nav>
    </header>
  );
}