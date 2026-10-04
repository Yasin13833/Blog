import React, { useEffect, useMemo, useState } from "react";
import { FiPlus, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { fetchData, fetchUpload, resolveMediaUrl } from "../../Utils/fetchData";
import { deleteMediaByUrl } from "../../Utils/media";
import Notify from "../../Utils/Notify";
import { emptyLocalized, emptySeo, Field, Input, LocalizedFields, MediaField, Panel, Select, SeoFields, Toggle, ValidationErrors } from "./FormBits";

const feature = () => ({ title: emptyLocalized(), description: emptyLocalized(), icon: "" });
const specification = () => ({ label: emptyLocalized(), value: emptyLocalized() });
const documentItem = () => ({ title: emptyLocalized(), url: "" });
const emptyProduct = () => ({
  brandId: "", categoryId: "", name: emptyLocalized(), slug: emptyLocalized(), shortDescription: emptyLocalized(), description: emptyLocalized(), model: "", sku: "", thumbnail: "", images: [], features: [], specifications: [], documents: [], videoUrl: "", relatedProductIds: [], isFeatured: false, isPublished: false, sortOrder: 0, seo: emptySeo(),
});

const mergeProduct = (data = {}) => {
  const base = emptyProduct();
  return {
    brandId: data?.brandId?._id || data?.brandId || "",
    categoryId: data?.categoryId?._id || data?.categoryId || "",
    name: data.name || base.name,
    slug: data.slug || base.slug,
    shortDescription: data.shortDescription || base.shortDescription,
    description: data.description || base.description,
    model: data.model || "", sku: data.sku || "", thumbnail: data.thumbnail || "",
    images: Array.isArray(data.images) ? data.images : [],
    features: Array.isArray(data.features) ? data.features : [],
    specifications: Array.isArray(data.specifications) ? data.specifications : [],
    documents: Array.isArray(data.documents) ? data.documents : [],
    videoUrl: data.videoUrl || "",
    relatedProductIds: (data.relatedProductIds || []).map((x) => x?._id || x),
    isFeatured: Boolean(data.isFeatured), isPublished: Boolean(data.isPublished), sortOrder: data.sortOrder ?? 0,
    seo: { ...emptySeo(), ...(data.seo || {}), keywords: { ...emptySeo().keywords, ...(data.seo?.keywords || {}) } },
  };
};
const mediaSet = (p) => new Set([p?.thumbnail, ...(p?.images || []), ...(p?.features || []).map(x=>x.icon), ...(p?.documents || []).map(x=>x.url)].filter(Boolean));

export default function ProductForm({ id }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyProduct());
  const [original, setOriginal] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const [br, cat, pr, detail] = await Promise.all([
        fetchData("/admin/brands?limit=100&status=all&sort=name"),
        fetchData("/admin/product-categories?limit=100&status=all&sort=name"),
        fetchData("/admin/products?limit=100&status=all&sort=name"),
        id ? fetchData(`/admin/products/${id}`) : Promise.resolve(null),
      ]);
      if (!active) return;
      if (br?.success) setBrands(br.data || []); else Notify("error", br?.message || "دریافت برندها ناموفق بود");
      if (cat?.success) setCategories(cat.data || []); else Notify("error", cat?.message || "دریافت دسته‌بندی‌ها ناموفق بود");
      if (pr?.success) setProducts((pr.data || []).filter((p)=>p._id !== id));
      if (id) {
        if (!detail?.success) Notify("error", detail?.message || "محصول پیدا نشد");
        else { const normalized=mergeProduct(detail.data); setForm(normalized); setOriginal(normalized); }
      }
      setLoading(false);
    })();
    return () => { active = false; };
  }, [id]);

  const loc = (field, lang, value) => setForm((p)=>({...p,[field]:{...p[field],[lang]:value}}));
  const updateArray = (field, index, updater) => setForm((p)=>({...p,[field]:p[field].map((item,i)=>i===index?updater(item):item)}));
  const removeArray = (field,index) => setForm((p)=>({...p,[field]:p[field].filter((_,i)=>i!==index)}));

  const uploadGallery = async (files) => {
    const selected = [...(files || [])].slice(0, Math.min(10, Math.max(0, 30 - form.images.length)));
    if (!selected.length) return;
    const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
    if (selected.some((file) => !allowed.has(file.type))) return Notify("error", "Gallery فقط JPG/PNG/WEBP/AVIF می‌پذیرد");
    if (selected.some((file) => file.size > 10 * 1024 * 1024)) return Notify("error", "حجم هر تصویر باید حداکثر ۱۰MB باشد");
    const fd = new FormData(); selected.forEach((file)=>fd.append("files",file)); setUploadingGallery(true);
    const result = await fetchUpload("/admin/media/images", { method:"POST", body:fd }); setUploadingGallery(false);
    if (!result?.success) return Notify("error", result?.message || "آپلود تصاویر ناموفق بود");
    setForm((p)=>({...p,images:[...p.images,...(result.data || []).map(x=>x.url)].slice(0,30)}));
  };

  const submit = async (e) => {
    e.preventDefault(); setSaving(true); setLastResult(null);
    const payload = { ...form, sortOrder:Number(form.sortOrder)||0, sku:form.sku?.trim() || "" };
    const result = await fetchData(id ? `/admin/products/${id}` : "/admin/products", { method:id?"PATCH":"POST", body:JSON.stringify(payload) });
    setSaving(false); setLastResult(result);
    if (!result?.success) return Notify("error", result?.message || "ذخیره محصول ناموفق بود");
    if (id && original) {
      const before=mediaSet(original), after=mediaSet(form);
      for (const url of before) if (!after.has(url)) await deleteMediaByUrl(url);
    }
    Notify("success", result.message || "محصول ذخیره شد"); navigate("/product");
  };

  const relatedOptions = useMemo(()=>products.filter(p=>p._id!==id),[products,id]);
  if (loading) return <div className="p-10 text-white/40">در حال آماده‌سازی فرم محصول...</div>;

  return <form onSubmit={submit} className="mx-auto max-w-7xl space-y-6 p-6 text-white">
    <div><p className="text-sm text-[#7be35b]">Product</p><h1 className="mt-2 text-3xl font-bold">{id?"ویرایش محصول":"افزودن محصول"}</h1><p className="mt-2 text-sm text-white/35">فرم مطابق ProductMd و Validatorهای Stage3-Vanta</p></div>
    <ValidationErrors result={lastResult}/>

    <Panel title="ارتباطات محصول" subtitle="برای انتشار محصول، برند و دسته‌بندی هم باید Published باشند."><div className="grid gap-4 lg:grid-cols-2"><Field label="برند *"><Select value={form.brandId} onChange={(e)=>setForm(p=>({...p,brandId:e.target.value}))}><option value="">انتخاب برند</option>{brands.map(b=><option key={b._id} value={b._id}>{b.name?.fa||b.name?.en} {b.isPublished?"":"(Draft)"}</option>)}</Select></Field><Field label="دسته‌بندی *"><Select value={form.categoryId} onChange={(e)=>setForm(p=>({...p,categoryId:e.target.value}))}><option value="">انتخاب دسته‌بندی</option>{categories.map(c=><option key={c._id} value={c._id}>{c.name?.fa||c.name?.en} {c.isPublished?"":"(Draft)"}</option>)}</Select></Field></div></Panel>

    <Panel title="اطلاعات اصلی سه‌زبانه"><div className="space-y-5"><LocalizedFields required label="نام محصول" value={form.name} onChange={(l,v)=>loc("name",l,v)}/><LocalizedFields label="Slug (اختیاری)" value={form.slug} onChange={(l,v)=>loc("slug",l,v)}/><LocalizedFields required textarea label="توضیح کوتاه" value={form.shortDescription} onChange={(l,v)=>loc("shortDescription",l,v)}/><LocalizedFields required textarea label="توضیحات کامل" value={form.description} onChange={(l,v)=>loc("description",l,v)}/><div className="grid gap-4 lg:grid-cols-2"><Field label="Model"><Input value={form.model} onChange={(e)=>setForm(p=>({...p,model:e.target.value}))}/></Field><Field label="SKU"><Input value={form.sku||""} onChange={(e)=>setForm(p=>({...p,sku:e.target.value}))}/></Field></div></div></Panel>

    <Panel title="رسانه محصول"><div className="space-y-5"><MediaField required label="Thumbnail" value={form.thumbnail} onChange={(v)=>setForm(p=>({...p,thumbnail:v}))}/><div><div className="mb-3 flex items-center justify-between"><span className="text-sm text-white/65">Gallery ({form.images.length}/30)</span><label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-xs text-white/60 hover:text-[#7be35b]"><FiUploadCloud />{uploadingGallery?"در حال آپلود...":"آپلود چند تصویر"}<input multiple accept="image/jpeg,image/png,image/webp,image/avif" type="file" className="hidden" disabled={uploadingGallery} onChange={(e)=>uploadGallery(e.target.files)}/></label></div><div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">{form.images.map((url,index)=><div key={`${url}-${index}`} className="relative rounded-xl border border-white/10 p-2"><img src={resolveMediaUrl(url)} alt="" className="h-24 w-full rounded-lg object-cover"/><button type="button" onClick={()=>removeArray("images",index)} className="absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-lg bg-black/70 text-red-300"><FiTrash2/></button></div>)}</div></div><Field label="Video URL"><Input dir="ltr" value={form.videoUrl} onChange={(e)=>setForm(p=>({...p,videoUrl:e.target.value}))} placeholder="https://..."/></Field></div></Panel>

    <Panel title="ویژگی‌ها" subtitle="حداکثر ۵۰ ویژگی"><div className="space-y-4">{form.features.map((item,index)=><div key={index} className="rounded-2xl border border-white/[0.07] p-4"><div className="mb-4 flex justify-between"><span className="text-sm text-white/55">ویژگی {index+1}</span><button type="button" onClick={()=>removeArray("features",index)} className="text-red-300"><FiTrash2/></button></div><div className="space-y-4"><LocalizedFields required label="عنوان" value={item.title} onChange={(l,v)=>updateArray("features",index,x=>({...x,title:{...x.title,[l]:v}}))}/><LocalizedFields textarea label="توضیح" value={item.description} onChange={(l,v)=>updateArray("features",index,x=>({...x,description:{...x.description,[l]:v}}))}/><MediaField label="Icon" value={item.icon} onChange={(v)=>updateArray("features",index,x=>({...x,icon:v}))}/></div></div>)}<button type="button" disabled={form.features.length>=50} onClick={()=>setForm(p=>({...p,features:[...p.features,feature()]}))} className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-[#7be35b]"><FiPlus/> افزودن ویژگی</button></div></Panel>

    <Panel title="مشخصات فنی" subtitle="حداکثر ۱۰۰ مشخصه"><div className="space-y-4">{form.specifications.map((item,index)=><div key={index} className="rounded-2xl border border-white/[0.07] p-4"><div className="mb-4 flex justify-between"><span className="text-sm text-white/55">مشخصه {index+1}</span><button type="button" onClick={()=>removeArray("specifications",index)} className="text-red-300"><FiTrash2/></button></div><div className="space-y-4"><LocalizedFields required label="عنوان مشخصه" value={item.label} onChange={(l,v)=>updateArray("specifications",index,x=>({...x,label:{...x.label,[l]:v}}))}/><LocalizedFields required label="مقدار" value={item.value} onChange={(l,v)=>updateArray("specifications",index,x=>({...x,value:{...x.value,[l]:v}}))}/></div></div>)}<button type="button" disabled={form.specifications.length>=100} onClick={()=>setForm(p=>({...p,specifications:[...p.specifications,specification()]}))} className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-[#7be35b]"><FiPlus/> افزودن مشخصه</button></div></Panel>

    <Panel title="اسناد PDF" subtitle="حداکثر ۲۰ سند"><div className="space-y-4">{form.documents.map((item,index)=><div key={index} className="rounded-2xl border border-white/[0.07] p-4"><div className="mb-4 flex justify-between"><span className="text-sm text-white/55">سند {index+1}</span><button type="button" onClick={()=>removeArray("documents",index)} className="text-red-300"><FiTrash2/></button></div><div className="space-y-4"><LocalizedFields required label="عنوان سند" value={item.title} onChange={(l,v)=>updateArray("documents",index,x=>({...x,title:{...x.title,[l]:v}}))}/><MediaField label="PDF" accept="application/pdf" endpoint="/admin/media/document" value={item.url} onChange={(v)=>updateArray("documents",index,x=>({...x,url:v}))}/></div></div>)}<button type="button" disabled={form.documents.length>=20} onClick={()=>setForm(p=>({...p,documents:[...p.documents,documentItem()]}))} className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-[#7be35b]"><FiPlus/> افزودن سند</button></div></Panel>

    <Panel title="محصولات مرتبط"><Field label="انتخاب چند محصول (حداکثر ۲۰)"><select multiple size="8" value={form.relatedProductIds} onChange={(e)=>setForm(p=>({...p,relatedProductIds:[...e.target.selectedOptions].map(o=>o.value).slice(0,20)}))} className="w-full rounded-xl border border-white/10 bg-[#07100c] p-3 text-sm text-white outline-none">{relatedOptions.map(p=><option key={p._id} value={p._id}>{p.name?.fa||p.name?.en} {p.sku?`- ${p.sku}`:""}</option>)}</select></Field></Panel>

    <Panel title="انتشار و ترتیب"><div className="grid gap-4 lg:grid-cols-3"><Toggle label="منتشرشده" checked={form.isPublished} onChange={(v)=>setForm(p=>({...p,isPublished:v}))} note="Backend هنگام Publish وضعیت Brand/Category را بررسی می‌کند."/><Toggle label="ویژه" checked={form.isFeatured} onChange={(v)=>setForm(p=>({...p,isFeatured:v}))}/><Field label="Sort Order"><Input type="number" min="0" value={form.sortOrder} onChange={(e)=>setForm(p=>({...p,sortOrder:e.target.value}))}/></Field></div></Panel>
    <Panel title="SEO"><SeoFields value={form.seo} onChange={(seo)=>setForm(p=>({...p,seo}))}/></Panel>
    <div className="flex gap-3 pb-10"><button disabled={saving} className="rounded-xl bg-[#7be35b] px-8 py-3 font-bold text-black disabled:opacity-50">{saving?"در حال ذخیره...":"ذخیره محصول"}</button><button type="button" onClick={()=>navigate("/product")} className="rounded-xl border border-white/10 px-8 py-3 text-white/60">انصراف</button></div>
  </form>;
}
