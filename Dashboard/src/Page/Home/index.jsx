import React, { useEffect, useState } from "react";
import { FiBox, FiCheckCircle, FiFileText, FiRefreshCw, FiStar, FiTag, FiGrid, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { fetchData, resolveMediaUrl } from "../../Utils/fetchData";
import Notify from "../../Utils/Notify";

const entityConfig = [
  { key: "products", title: "محصولات", icon: FiBox, path: "/product" },
  { key: "brands", title: "برندها", icon: FiTag, path: "/brands" },
  { key: "categories", title: "دسته‌بندی‌ها", icon: FiGrid, path: "/product-category" },
];

function Metric({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="mb-3 flex items-center justify-between text-white/35"><span className="text-xs">{label}</span><Icon /></div>
      <div className="text-2xl font-bold text-white">{value ?? 0}</div>
    </div>
  );
}

function EntityCard({ config, stats }) {
  const Icon = config.icon;
  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[#0b1511] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#7be35b]/10 text-[#7be35b]"><Icon /></span><div><h2 className="font-semibold">{config.title}</h2><p className="text-xs text-white/30">وضعیت محتوای کاتالوگ</p></div></div>
        <Link to={config.path} className="text-xs text-[#7be35b] hover:underline">مدیریت</Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Metric label="کل" value={stats?.total} icon={Icon} />
        <Metric label="منتشرشده" value={stats?.published} icon={FiCheckCircle} />
        <Metric label="پیش‌نویس" value={stats?.draft} icon={FiFileText} />
        <Metric label="ویژه" value={stats?.featured} icon={FiStar} />
      </div>
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const result = await fetchData("/admin/dashboard");
    setLoading(false);
    if (!result?.success) return Notify("error", result?.message || "دریافت آمار داشبورد ناموفق بود");
    setData(result.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <section className="min-h-screen bg-[#050806] px-6 py-8 text-white">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-sm text-[#7be35b]">Admin Dashboard</p><h1 className="mt-2 text-3xl font-bold">نمای کلی کاتالوگ</h1><p className="mt-2 text-sm text-white/35">آمار مستقیم از GET /api/admin/dashboard</p></div>
          <button onClick={load} disabled={loading} className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white/65 hover:bg-white/[0.06] disabled:opacity-50"><FiRefreshCw className={loading ? "animate-spin" : ""} /> بروزرسانی</button>
        </div>

        {loading && !data ? (
          <div className="rounded-3xl border border-white/10 bg-[#0b1511] p-10 text-center text-white/40">در حال دریافت آمار...</div>
        ) : (
          <>
            <div className="grid gap-5 xl:grid-cols-3">
              {entityConfig.map((config) => <EntityCard key={config.key} config={config} stats={data?.stats?.[config.key]} />)}
            </div>

            <div className="mt-6 rounded-3xl border border-white/[0.08] bg-[#0b1511] p-5">
              <div className="mb-5 flex items-center justify-between"><div><h2 className="font-semibold">آخرین محصولات</h2><p className="mt-1 text-xs text-white/30">۸ محصول اخیر ثبت‌شده در Backend</p></div><Link to="/product" className="flex items-center gap-2 text-xs text-[#7be35b]">همه محصولات <FiArrowLeft /></Link></div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-right text-sm">
                  <thead><tr className="border-b border-white/10 text-xs text-white/35"><th className="px-3 py-3">محصول</th><th className="px-3 py-3">برند</th><th className="px-3 py-3">دسته‌بندی</th><th className="px-3 py-3">وضعیت</th><th className="px-3 py-3">ترتیب</th><th className="px-3 py-3">تاریخ</th></tr></thead>
                  <tbody>
                    {(data?.recentProducts || []).map((item) => (
                      <tr key={item._id} className="border-b border-white/[0.05] hover:bg-white/[0.02]">
                        <td className="px-3 py-3"><div className="flex items-center gap-3"><img src={resolveMediaUrl(item.thumbnail)} alt="" className="h-10 w-10 rounded-lg bg-white/5 object-cover" /><div><p className="font-medium">{item.name?.fa || item.name?.en || "-"}</p><p className="text-[10px] text-white/30">{item.sku || item.model || "بدون SKU"}</p></div></div></td>
                        <td className="px-3 py-3 text-white/55">{item.brandId?.name?.fa || "-"}</td>
                        <td className="px-3 py-3 text-white/55">{item.categoryId?.name?.fa || "-"}</td>
                        <td className="px-3 py-3"><span className={`rounded-lg px-2 py-1 text-[10px] ${item.isPublished ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"}`}>{item.isPublished ? "منتشرشده" : "پیش‌نویس"}</span></td>
                        <td className="px-3 py-3 text-white/45">{item.sortOrder ?? 0}</td>
                        <td className="px-3 py-3 text-white/35">{item.createdAt ? new Date(item.createdAt).toLocaleDateString("fa-IR") : "-"}</td>
                      </tr>
                    ))}
                    {!data?.recentProducts?.length && <tr><td colSpan="6" className="py-10 text-center text-white/30">محصولی ثبت نشده است.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
