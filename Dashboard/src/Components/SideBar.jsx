import React from "react";
import { FiBox, FiFileText, FiHome, FiLogOut, FiSettings, FiTag } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeToken } from "../Store/Slice/auth";

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navItems = [
    { title: "داشبورد", path: "/", icon: FiHome, end: true },
    { title: "محصولات", path: "/product", icon: FiBox },
    { title: "دسته‌بندی محصولات", path: "/product-category", icon: FiFileText },
    { title: "برندها", path: "/brands", icon: FiTag },
    { title: "حساب ادمین", path: "/account", icon: FiSettings },
  ];

  const logout = () => {
    dispatch(removeToken());
    navigate("/auth", { replace: true });
  };

  return (
    <aside dir="rtl" className="fixed right-0 top-25 z-40 h-[calc(100vh-6.25rem)] w-56 border-l border-white/[0.06] bg-[#06131c]">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <div className="mb-4 px-3 text-[10px] font-medium uppercase tracking-widest text-white/30">مدیریت</div>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) => `group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-300 ${isActive ? "bg-[#7be35b]/10 text-[#7be35b]" : "text-white/55 hover:bg-white/[0.035] hover:text-white"}`}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="absolute left-0 top-1/2 h-7 w-0.5 -translate-y-1/2 rounded-full bg-[#7be35b]" />}
                      <span className={`grid h-9 w-9 place-items-center rounded-xl ${isActive ? "bg-[#7be35b]/10" : "bg-white/[0.025]"}`}><Icon size={17} /></span>
                      <span className="truncate text-[13px] font-medium">{item.title}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
        <div className="border-t border-white/[0.06] p-3">
          <button onClick={logout} className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/45 transition hover:bg-red-500/10 hover:text-red-400">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.025]"><FiLogOut size={17} /></span>
            <span className="text-[13px]">خروج از سیستم</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
