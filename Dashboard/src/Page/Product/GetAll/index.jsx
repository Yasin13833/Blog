import React, { useEffect, useMemo, useState } from "react";
import { FiArrowDown, FiArrowUp, FiEdit3, FiPlus, FiRefreshCw, FiSearch, FiTrash2 } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchData, resolveMediaUrl, toQueryString } from "../../../Utils/fetchData";
import { deleteMediaByUrl } from "../../../Utils/media";
import Notify from "../../../Utils/Notify";

const productMedia = (item) => [item?.thumbnail, ...(item?.images || []), ...(item?.features || []).map(x=>x.icon), ...(item?.documents || []).map(x=>x.url)].filter(Boolean);

export default function GetAll_Product() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderDirty, setOrderDirty] = useState(false);
  const query = useMemo(()=>({
    page:Number(searchParams.get("page")||1), limit:12, q:searchParams.get("q")||"", status:searchParams.get("status")||"all", sort:searchParams.get("sort")||"order", brandId:searchParams.get("brandId")||"", categoryId:searchParams.get("categoryId")||"", featured:searchParams.get("featured")||"",
  }),[searchParams]);

  useEffect(()=>{(async()=>{const [br,cat]=await Promise.all([fetchData("/admin/brands?limit=100&status=all&sort=name"),fetchData("/admin/product-categories?limit=100&status=all&sort=name")]);if(br?.success)setBrands(br.data||[]);if(cat?.success)setCategories(cat.data||[]);})();},[]);
  const load=async()=>{setLoading(true);setOrderDirty(false);const r=await fetchData(`/admin/products?${toQueryString(query)}`);setLoading(false);if(!r?.success)return Notify("error",r?.message||"دریافت محصولات ناموفق بود");setItems(r.data||[]);setMeta(r.meta?.pagination||null);};
  useEffect(()=>{load();},[query.page,query.q,query.status,query.sort,query.brandId,query.categoryId,query.featured]);
  const canReorder=query.sort==="order"&&!query.q&&query.status==="all"&&!query.brandId&&!query.categoryId&&!query.featured;
  const setQuery=(key,value)=>{const next=new URLSearchParams(searchParams);if(!value||(key==="status"&&value==="all"))next.delete(key);else next.set(key,value);if(key!=="page")next.set("page","1");setSearchParams(next);};
  const publish=async(item)=>{const action=item.isPublished?"unpublish":"publish";const r=await fetchData(`/admin/products/${item._id}/${action}`,{method:"PATCH"});if(!r?.success)return Notify("error",r?.message||"تغییر وضعیت ناموفق بود");Notify("success",r.message);load();};
  const remove=async(item)=>{if(!window.confirm(`حذف محصول «${item.name?.fa||""}»؟`))return;const detail=await fetchData(`/admin/products/${item._id}`);const media=detail?.success?productMedia(detail.data):productMedia(item);const r=await fetchData(`/admin/products/${item._id}`,{method:"DELETE"});if(!r?.success)return Notify("error",r?.message||"حذف محصول ناموفق بود");for(const url of media)await deleteMediaByUrl(url);Notify("success",r.message);load();};
  const move=(index,delta)=>{if(!canReorder)return Notify("error","برای تغییر ترتیب، همه فیلترها را پاک کنید و Sort را روی ترتیب دستی بگذارید");const target=index+delta;if(target<0||target>=items.length)return;const next=[...items];[next[index],next[target]]=[next[target],next[index]];setItems(next);setOrderDirty(true);};
  const saveOrder=async()=>{if(!canReorder)return;const offset=(query.page-1)*query.limit;const r=await fetchData("/admin/products/reorder",{method:"PATCH",body:JSON.stringify({items:items.map((item,index)=>({id:item._id,sortOrder:offset+index}))})});if(!r?.success)return Notify("error",r?.message||"ذخیره ترتیب ناموفق بود");Notify("success",r.message);load();};

  return <section className="min-h-screen bg-[#050806] px-6 py-8 text-white"><div className="mx-auto max-w-[1500px]">
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-[#7be35b]">Products</p><h1 className="mt-2 text-3xl font-bold">مدیریت محصولات</h1><p className="mt-2 text-sm text-white/35">لیست واقعی محصولات Stage3-Vanta با فیلتر، انتشار و ترتیب نمایش</p></div><div className="flex gap-2">{orderDirty&&<button onClick={saveOrder} className="rounded-xl border border-[#7be35b]/30 bg-[#7be35b]/10 px-4 py-3 text-sm text-[#7be35b]">ذخیره ترتیب</button>}<button onClick={()=>navigate("create")} className="flex items-center gap-2 rounded-xl bg-[#7be35b] px-5 py-3 font-bold text-black"><FiPlus/>افزودن محصول</button></div></div>

    <div className="mb-5 grid gap-3 rounded-2xl border border-white/10 bg-[#0b1511] p-4 xl:grid-cols-[1fr_150px_150px_170px_170px_150px_auto]">
      <label className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3"><FiSearch className="text-white/30"/><input value={query.q} onChange={(e)=>setQuery("q",e.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="نام، مدل یا SKU..."/></label>
      <select value={query.status} onChange={(e)=>setQuery("status",e.target.value)} className="rounded-xl border border-white/10 bg-[#0b1511] px-3 text-sm"><option value="all">همه وضعیت‌ها</option><option value="published">منتشرشده</option><option value="draft">پیش‌نویس</option></select>
      <select value={query.sort} onChange={(e)=>setQuery("sort",e.target.value)} className="rounded-xl border border-white/10 bg-[#0b1511] px-3 text-sm"><option value="order">ترتیب دستی</option><option value="newest">جدیدترین</option><option value="oldest">قدیمی‌ترین</option><option value="name">نام</option></select>
      <select value={query.brandId} onChange={(e)=>setQuery("brandId",e.target.value)} className="rounded-xl border border-white/10 bg-[#0b1511] px-3 text-sm"><option value="">همه برندها</option>{brands.map(b=><option key={b._id} value={b._id}>{b.name?.fa||b.name?.en}</option>)}</select>
      <select value={query.categoryId} onChange={(e)=>setQuery("categoryId",e.target.value)} className="rounded-xl border border-white/10 bg-[#0b1511] px-3 text-sm"><option value="">همه دسته‌بندی‌ها</option>{categories.map(c=><option key={c._id} value={c._id}>{c.name?.fa||c.name?.en}</option>)}</select>
      <select value={query.featured} onChange={(e)=>setQuery("featured",e.target.value)} className="rounded-xl border border-white/10 bg-[#0b1511] px-3 text-sm"><option value="">همه Featured</option><option value="true">فقط ویژه</option><option value="false">غیرویژه</option></select>
      <button onClick={load} className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-white/50"><FiRefreshCw className={loading?"animate-spin":""}/></button>
    </div>

    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b1511]"><div className="overflow-x-auto"><table className="w-full min-w-[1100px] text-right text-sm"><thead><tr className="border-b border-white/10 text-xs text-white/35"><th className="px-4 py-4">محصول</th><th className="px-4 py-4">برند / دسته‌بندی</th><th className="px-4 py-4">مدل / SKU</th><th className="px-4 py-4">وضعیت</th><th className="px-4 py-4">ویژه</th><th className="px-4 py-4">ترتیب</th><th className="px-4 py-4">عملیات</th></tr></thead><tbody>
      {items.map((item,index)=><tr key={item._id} className="border-b border-white/[0.05] hover:bg-white/[0.02]"><td className="px-4 py-3"><div className="flex items-center gap-3"><img src={resolveMediaUrl(item.thumbnail)} alt="" className="h-12 w-12 rounded-xl bg-white/5 object-cover"/><div><p className="font-medium">{item.name?.fa||item.name?.en||"-"}</p><p className="max-w-xs truncate text-[10px] text-white/25">{item.shortDescription?.fa||""}</p></div></div></td><td className="px-4 py-3"><p className="text-xs text-white/65">{item.brandId?.name?.fa||"-"}</p><p className="mt-1 text-[10px] text-white/30">{item.categoryId?.name?.fa||"-"}</p></td><td className="px-4 py-3"><p className="text-xs text-white/60">{item.model||"-"}</p><p className="mt-1 font-mono text-[10px] text-white/30">{item.sku||"-"}</p></td><td className="px-4 py-3"><button onClick={()=>publish(item)} className={`rounded-lg px-2 py-1 text-[10px] ${item.isPublished?"bg-emerald-400/10 text-emerald-300":"bg-amber-400/10 text-amber-300"}`}>{item.isPublished?"منتشرشده":"پیش‌نویس"}</button></td><td className="px-4 py-3 text-white/50">{item.isFeatured?"بله":"خیر"}</td><td className="px-4 py-3"><div className="flex items-center gap-1"><button disabled={!canReorder} onClick={()=>move(index,-1)} className="rounded-lg border border-white/10 p-2 text-white/45 disabled:opacity-25"><FiArrowUp/></button><button disabled={!canReorder} onClick={()=>move(index,1)} className="rounded-lg border border-white/10 p-2 text-white/45 disabled:opacity-25"><FiArrowDown/></button><span className="mr-2 text-xs text-white/35">{item.sortOrder??0}</span></div></td><td className="px-4 py-3"><div className="flex gap-2"><button onClick={()=>navigate(`update/${item._id}`)} className="rounded-lg border border-white/10 p-2 text-[#7be35b]"><FiEdit3/></button><button onClick={()=>remove(item)} className="rounded-lg border border-red-500/10 p-2 text-red-300"><FiTrash2/></button></div></td></tr>)}
      {!loading&&!items.length&&<tr><td colSpan="7" className="py-12 text-center text-white/30">محصولی پیدا نشد.</td></tr>}{loading&&<tr><td colSpan="7" className="py-12 text-center text-white/30">در حال دریافت...</td></tr>}
    </tbody></table></div></div>
    {meta&&<div className="mt-5 flex items-center justify-between text-xs text-white/40"><span>کل: {meta.total} - صفحه {meta.page} از {meta.totalPages||1}</span><div className="flex gap-2"><button disabled={!meta.hasPrevPage} onClick={()=>setQuery("page",String(meta.page-1))} className="rounded-lg border border-white/10 px-3 py-2 disabled:opacity-30">قبلی</button><button disabled={!meta.hasNextPage} onClick={()=>setQuery("page",String(meta.page+1))} className="rounded-lg border border-white/10 px-3 py-2 disabled:opacity-30">بعدی</button></div></div>}
  </div></section>;
}
