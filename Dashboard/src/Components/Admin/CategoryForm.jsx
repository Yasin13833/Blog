import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../Utils/fetchData";
import { deleteMediaByUrl } from "../../Utils/media";
import Notify from "../../Utils/Notify";
import { emptyLocalized, emptySeo, Field, Input, LocalizedFields, MediaField, Panel, SeoFields, Toggle, ValidationErrors } from "./FormBits";

const emptyCategory = () => ({ name: emptyLocalized(), slug: emptyLocalized(), description: emptyLocalized(), image: "", icon: "", isFeatured: false, isPublished: true, sortOrder: 0, seo: emptySeo() });

export default function CategoryForm({ id }) {
  const navigate=useNavigate(); const [form,setForm]=useState(emptyCategory()); const [original,setOriginal]=useState(null); const [loading,setLoading]=useState(Boolean(id)); const [saving,setSaving]=useState(false); const [lastResult,setLastResult]=useState(null);
  useEffect(()=>{ if(!id)return; (async()=>{const r=await fetchData(`/admin/product-categories/${id}`);setLoading(false);if(!r?.success)return Notify("error",r?.message||"دسته‌بندی پیدا نشد");const data=r.data, base=emptyCategory(); const clean={ name:data.name||base.name, slug:data.slug||base.slug, description:data.description||base.description, image:data.image||"", icon:data.icon||"", isFeatured:Boolean(data.isFeatured), isPublished:Boolean(data.isPublished), sortOrder:data.sortOrder??0, seo:{...emptySeo(),...(data.seo||{}),keywords:{...emptySeo().keywords,...(data.seo?.keywords||{})}}};setForm(clean);setOriginal(clean);})();},[id]);
  const loc=(field,lang,value)=>setForm(p=>({...p,[field]:{...p[field],[lang]:value}}));
  const submit=async(e)=>{e.preventDefault();setSaving(true);setLastResult(null);const r=await fetchData(id?`/admin/product-categories/${id}`:"/admin/product-categories",{method:id?"PATCH":"POST",body:JSON.stringify({...form,sortOrder:Number(form.sortOrder)||0})});setSaving(false);setLastResult(r);if(!r?.success)return Notify("error",r?.message||"ذخیره دسته‌بندی ناموفق بود");if(id&&original){for(const key of ["image","icon"]){if(original[key]&&original[key]!==form[key])await deleteMediaByUrl(original[key]);}}Notify("success",r.message||"دسته‌بندی ذخیره شد");navigate("/product-category");};
  if(loading)return <div className="p-10 text-white/40">در حال دریافت دسته‌بندی...</div>;
  return <form onSubmit={submit} className="mx-auto max-w-7xl space-y-6 p-6 text-white"><div><p className="text-sm text-[#7be35b]">Product Category</p><h1 className="mt-2 text-3xl font-bold">{id?"ویرایش دسته‌بندی":"افزودن دسته‌بندی"}</h1></div><ValidationErrors result={lastResult}/>
    <Panel title="اطلاعات سه‌زبانه"><div className="space-y-5"><LocalizedFields required label="نام دسته‌بندی" value={form.name} onChange={(l,v)=>loc("name",l,v)}/><LocalizedFields label="Slug (اختیاری)" value={form.slug} onChange={(l,v)=>loc("slug",l,v)}/><LocalizedFields textarea label="توضیحات" value={form.description} onChange={(l,v)=>loc("description",l,v)}/></div></Panel>
    <Panel title="رسانه"><div className="grid gap-5 lg:grid-cols-2"><MediaField label="Image" value={form.image} onChange={(v)=>setForm(p=>({...p,image:v}))}/><MediaField label="Icon" value={form.icon} onChange={(v)=>setForm(p=>({...p,icon:v}))}/></div></Panel>
    <Panel title="انتشار و ترتیب"><div className="grid gap-4 lg:grid-cols-3"><Toggle label="منتشرشده" checked={form.isPublished} onChange={(v)=>setForm(p=>({...p,isPublished:v}))}/><Toggle label="ویژه" checked={form.isFeatured} onChange={(v)=>setForm(p=>({...p,isFeatured:v}))}/><Field label="Sort Order"><Input type="number" min="0" value={form.sortOrder} onChange={(e)=>setForm(p=>({...p,sortOrder:e.target.value}))}/></Field></div></Panel>
    <Panel title="SEO"><SeoFields value={form.seo} onChange={(seo)=>setForm(p=>({...p,seo}))}/></Panel><div className="flex gap-3"><button disabled={saving} className="rounded-xl bg-[#7be35b] px-7 py-3 font-bold text-black disabled:opacity-50">{saving?"در حال ذخیره...":"ذخیره دسته‌بندی"}</button><button type="button" onClick={()=>navigate("/product-category")} className="rounded-xl border border-white/10 px-7 py-3 text-white/60">انصراف</button></div>
  </form>;
}
