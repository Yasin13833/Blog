import React from "react";

import {
  FiBox,
  FiFileText,
  FiHome,
  FiLogOut,
  FiTag,
  FiUsers,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

export default function SideBar() {

 const navItems = [
  {
    title: "Home",
    path: "/",
    icon: FiHome,
  },
  {
    title: "Product",
    path: "product",
    icon: FiBox,
  },
  {
    title: "Product Category",
    path: "product-category",
    icon: FiFileText,
  },
  {
    title: "Brands",
    path: "brands",
    icon: FiTag,
  },
];

  return (
    <aside
      dir="rtl"
      className="
        fixed
        left-0
        top-25
        z-40
        h-[calc(100vh-6.25rem)]
        w-56
        border-r
        border-white/[0.06]
        bg-[#06131c]
      "
    >

      <div className="flex h-full flex-col">

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-6">

          {/* Section title */}
          <div className="mb-4 px-3">
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/30">
              مدیریت
            </span>
          </div>

          <nav className="space-y-1.5">

            {navItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          bg-[#7be35b]/10
                          text-[#7be35b]
                          shadow-[inset_0_0_20px_#7be35b05]
                        `
                        : `
                          text-white/55
                          hover:bg-white/[0.035]
                          hover:text-white
                        `
                    }
                    `
                  }
                >

                  {({ isActive }) => (
                    <>
                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute right-0 top-1/2 h-7 w-0.5 -translate-y-1/2 rounded-full bg-[#7be35b] shadow-[0_0_10px_#7be35b]" />
                      )}

                      <span
                        className={`
                          grid
                          h-9
                          w-9
                          shrink-0
                          place-items-center
                          rounded-xl
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "bg-[#7be35b]/10 text-[#7be35b]"
                              : "bg-white/[0.025] text-white/40 group-hover:bg-white/[0.06] group-hover:text-white"
                          }
                        `}
                      >
                        <Icon size={17} />
                      </span>

                      <span className="truncate text-[13px] font-medium">
                        {item.title}
                      </span>
                    </>
                  )}

                </NavLink>
              );
            })}

          </nav>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] p-3">

          <button
            className="
              group
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-sm
              text-white/45
              transition-all
              duration-300
              hover:bg-red-500/10
              hover:text-red-400
            "
          >

            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.025] transition group-hover:bg-red-500/10">
              <FiLogOut size={17} />
            </span>

            <span className="text-[13px]">
              خروج از سیستم
            </span>

          </button>

        </div>

      </div>

    </aside>
  );
}

