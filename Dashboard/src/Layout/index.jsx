import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Navbar, SideBar } from "../Components";
import { fetchData } from "../Utils/fetchData";
import { removeToken, setUser } from "../Store/Slice/auth";

export default function Layout() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [checking, setChecking] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setChecking(false);
      return;
    }
    let active = true;
    (async () => {
      const result = await fetchData("/auth/me");
      if (!active) return;
      if (result?.success) dispatch(setUser(result.data));
      else dispatch(removeToken());
      setChecking(false);
    })();
    return () => {
      active = false;
    };
  }, [token, dispatch]);

  if (!token) return <Navigate to="/auth" replace />;
  if (checking) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#050806] text-white/60">
        در حال بررسی نشست ادمین...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#050806]">
      <Navbar />
      <SideBar />
      <main className="min-h-screen pt-25 pr-56">
        <Outlet />
      </main>
    </div>
  );
}
