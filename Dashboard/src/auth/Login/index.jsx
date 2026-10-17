import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchData } from "../../Utils/fetchData";
import Notify from "../../Utils/Notify";
import { addToken } from "../../Store/Slice/auth";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [fields, setFields] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fields.username.trim() || !fields.password) return Notify("error", "نام کاربری و رمز عبور را وارد کنید");
    setLoading(true);
    const result = await fetchData("/auth/login", { method: "POST", body: JSON.stringify(fields) });
    setLoading(false);
    if (!result?.success) return Notify("error", result?.message || "ورود ناموفق بود");
    dispatch(addToken(result.data));
    Notify("success", "ورود موفق بود");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[url('/bg_auth.png')] bg-cover bg-center px-4 py-12 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full rounded-3xl border border-green-500/30 bg-black/45 p-8 backdrop-blur-xl shadow-[0_0_45px_rgba(34,197,94,0.15)]">
          <div className="mb-8 text-center"><h1 className="text-3xl font-bold text-green-400">ورود ادمین</h1><p className="mt-2 text-sm text-white/45">دسترسی به مدیریت کاتالوگ محصولات</p></div>
          <label className="mb-5 block text-sm text-green-200">نام کاربری<input autoComplete="username" value={fields.username} onChange={(e) => setFields((p) => ({ ...p, username: e.target.value }))} className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-green-400" /></label>
          <label className="mb-7 block text-sm text-green-200">رمز عبور<input autoComplete="current-password" type="password" value={fields.password} onChange={(e) => setFields((p) => ({ ...p, password: e.target.value }))} className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-green-400" /></label>
          <button disabled={loading} className="h-12 w-full rounded-xl bg-green-400 font-bold text-black transition hover:bg-green-300 disabled:opacity-50">{loading ? "در حال ورود..." : "ورود"}</button>
        </form>
      </div>
    </div>
  );
}
