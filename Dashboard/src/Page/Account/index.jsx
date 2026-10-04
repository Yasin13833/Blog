import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiKey, FiShield, FiUser } from "react-icons/fi";
import { fetchData } from "../../Utils/fetchData";
import { replaceToken } from "../../Store/Slice/auth";
import Notify from "../../Utils/Notify";

export default function Account() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) return Notify("error", "تکرار رمز عبور با رمز جدید یکسان نیست");
    setLoading(true);
    const result = await fetchData("/auth/change-password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
    });
    setLoading(false);
    if (!result?.success) return Notify("error", result?.message || "تغییر رمز انجام نشد");
    dispatch(replaceToken(result.data?.token));
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    Notify("success", "رمز عبور تغییر کرد و توکن جدید ذخیره شد");
  };

  return (
    <section className="min-h-screen bg-[#050806] px-6 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8"><p className="text-sm text-[#7be35b]">امنیت حساب</p><h1 className="mt-2 text-3xl font-bold">حساب ادمین</h1></div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#0b1511] p-6">
            <div className="mb-5 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#7be35b]/10 text-[#7be35b]"><FiUser /></span><div><h2 className="font-semibold">پروفایل فعلی</h2><p className="text-xs text-white/35">اطلاعات از GET /auth/me</p></div></div>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-white/40">نام</dt><dd>{user?.fullName || "-"}</dd></div>
              <div className="flex justify-between border-b border-white/5 pb-3"><dt className="text-white/40">نام کاربری</dt><dd>{user?.username || "-"}</dd></div>
              <div className="flex justify-between"><dt className="text-white/40">نقش</dt><dd>{user?.role || "-"}</dd></div>
            </dl>
          </div>
          <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-[#0b1511] p-6">
            <div className="mb-5 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-400/10 text-amber-300"><FiKey /></span><div><h2 className="font-semibold">تغییر رمز عبور</h2><p className="text-xs text-white/35">رمز جدید حداقل ۸ کاراکتر، شامل حروف بزرگ، کوچک و عدد</p></div></div>
            {[['currentPassword','رمز فعلی'],['newPassword','رمز جدید'],['confirmPassword','تکرار رمز جدید']].map(([key,label]) => <label key={key} className="mb-4 block text-sm text-white/60">{label}<input type="password" value={form[key]} onChange={(e)=>setForm(p=>({...p,[key]:e.target.value}))} className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-white outline-none focus:border-[#7be35b]/50" /></label>)}
            <button disabled={loading} className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#7be35b] font-bold text-black disabled:opacity-50"><FiShield />{loading ? "در حال ذخیره..." : "تغییر رمز"}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
