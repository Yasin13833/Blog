import React, { useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/product?q=${encodeURIComponent(q)}` : "/product");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-25 border-b border-white/10 bg-[#06131c]">
      <nav className="flex h-full items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#14232d]"><FiUser className="text-lg text-white/70" /></div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">{user?.fullName || "Admin"}</p>
            <div className="mt-1 flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-green-400" /><span className="text-[10px] text-white/50">{user?.role || "admin"}</span></div>
          </div>
        </div>

        <form onSubmit={submitSearch} className="absolute left-1/2 hidden w-[360px] -translate-x-1/2 md:block">
          <div className="flex h-10 items-center rounded-full border border-white/10 bg-[#0b1b25] px-4">
            <FiSearch className="text-lg text-white/60" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="جستجو در محصولات..." className="mr-2 w-full bg-transparent text-right text-xs text-white outline-none placeholder:text-white/40" />
          </div>
        </form>

        <div className="flex h-20 w-60 items-center"><img src="/Logo.png" alt="logo" className="h-full w-full object-contain" /></div>
      </nav>
    </header>
  );
}
