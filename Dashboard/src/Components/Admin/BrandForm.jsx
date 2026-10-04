import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../Utils/fetchData";
import { deleteMediaByUrl } from "../../Utils/media";
import Notify from "../../Utils/Notify";
import { emptyLocalized, emptySeo, Field, Input, LocalizedFields, MediaField, Panel, SeoFields, Toggle, ValidationErrors } from "./FormBits";

const emptyBrand = () => ({ name: emptyLocalized(), slug: emptyLocalized(), description: emptyLocalized(), country: emptyLocalized(), logo: "", coverImage: "", website: "", socialLinks: { instagram: "", linkedin: "", youtube: "" }, isFeatured: false, isPublished: false, sortOrder: 0, seo: emptySeo() });

export default function BrandForm({ id }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyBrand());
  const [original, setOriginal] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => { if (!id) return; (async()=>{ const result=await fetchData(`/admin/brands/${id}`); setLoading(false); if(!result?.success) return Notify("error",result?.message||"برند پیدا نشد"); const data=result.data; const base=emptyBrand(); const clean={ name:data.name||base.name, slug:data.slug||base.slug, description:data.description||base.description, country:data.country||base.country, logo:data.logo||"", coverImage:data.coverImage||"", website:data.website||"", socialLinks:{...base.socialLinks,...(data.socialLinks||{})}, isFeatured:Boolean(data.isFeatured), isPublished:Boolean(data.isPublished), sortOrder:data.sortOrder??0, seo:{...emptySeo(),...(data.seo||{}), keywords:{...emptySeo().keywords,...(data.seo?.keywords||{})}} }; setForm(clean); setOriginal(clean); })(); }, [id]);
  const loc = (field, lang, value) => setForm((p)=>({...p,[field]:{...p[field],[lang]:value}}));

  const submit = async (e) => { e.preventDefault(); setSaving(true); setLastResult(null); const result=await fetchData(id?`/admin/brands/${id}`:"/admin/brands",{method:id?"PATCH":"POST",body:JSON.stringify({...form,sortOrder:Number(form.sortOrder)||0})}); setSaving(false); setLastResult(result); if(!result?.success) return Notify("error",result?.message||"ذخیره برند ناموفق بود");
    if(id && original){ for(const key of ["logo","coverImage"]){ if(original[key] && original[key]!==form[key]) await deleteMediaByUrl(original[key]); } }
    Notify("success",result.message||"برند ذخیره شد"); navigate("/brands"); };

  if (loading) return <div className="p-10 text-white/40">در حال دریافت برند...</div>;
  return <form onSubmit={submit} className="mx-auto max-w-7xl space-y-6 p-6 text-white"><div><p className="text-sm text-[#7be35b]">Brand</p><h1 className="mt-2 text-3xl font-bold">{id?"ویرایش برند":"افزودن برند"}</h1></div><ValidationErrors result={lastResult}/>
    <Panel title="اطلاعات سه‌زبانه"><div className="space-y-5"><LocalizedFields required label="نام برند" value={form.name} onChange={(l,v)=>loc("name",l,v)} /><LocalizedFields label="Slug (اختیاری)" value={form.slug} onChange={(l,v)=>loc("slug",l,v)} /><LocalizedFields required textarea label="توضیحات" value={form.description} onChange={(l,v)=>loc("description",l,v)} /><LocalizedFields label="کشور" value={form.country} onChange={(l,v)=>loc("country",l,v)} /></div></Panel>
    <Panel title="رسانه و لینک‌ها"><div className="grid gap-5 lg:grid-cols-2"><MediaField required label="Logo" value={form.logo} onChange={(v)=>setForm(p=>({...p,logo:v}))}/><MediaField label="Cover Image" value={form.coverImage} onChange={(v)=>setForm(p=>({...p,coverImage:v}))}/><Field label="Website"><Input dir="ltr" value={form.website} onChange={(e)=>setForm(p=>({...p,website:e.target.value}))} placeholder="https://..." /></Field>{["instagram","linkedin","youtube"].map(key=><Field key={key} label={key}><Input dir="ltr" value={form.socialLinks[key]} onChange={(e)=>setForm(p=>({...p,socialLinks:{...p.socialLinks,[key]:e.target.value}}))} placeholder="https://..." /></Field>)}</div></Panel>
    <Panel title="انتشار و ترتیب"><div className="grid gap-4 lg:grid-cols-3"><Toggle label="منتشرشده" checked={form.isPublished} onChange={(v)=>setForm(p=>({...p,isPublished:v}))}/><Toggle label="ویژه" checked={form.isFeatured} onChange={(v)=>setForm(p=>({...p,isFeatured:v}))}/><Field label="Sort Order"><Input type="number" min="0" value={form.sortOrder} onChange={(e)=>setForm(p=>({...p,sortOrder:e.target.value}))}/></Field></div></Panel>
    <Panel title="SEO"><SeoFields value={form.seo} onChange={(seo)=>setForm(p=>({...p,seo}))}/></Panel>
    <div className="flex gap-3"><button disabled={saving} className="rounded-xl bg-[#7be35b] px-7 py-3 font-bold text-black disabled:opacity-50">{saving?"در حال ذخیره...":"ذخیره برند"}</button><button type="button" onClick={()=>navigate("/brands")} className="rounded-xl border border-white/10 px-7 py-3 text-white/60">انصراف</button></div>
  </form>;
}
