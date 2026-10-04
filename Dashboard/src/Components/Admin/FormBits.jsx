import React, { useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { fetchUpload, resolveMediaUrl } from "../../Utils/fetchData";
import Notify from "../../Utils/Notify";

export const emptyLocalized = () => ({ fa: "", en: "", ar: "" });
export const emptySeo = () => ({
  title: emptyLocalized(),
  description: emptyLocalized(),
  keywords: { fa: [], en: [], ar: [] },
});

export function Panel({ title, subtitle, children }) {
  return <div className="rounded-3xl border border-white/10 bg-[#0b1511] p-6"><div className="mb-5"><h2 className="font-semibold text-white">{title}</h2>{subtitle && <p className="mt-1 text-xs text-white/30">{subtitle}</p>}</div>{children}</div>;
}
export function Field({ label, children }) { return <label className="block"><span className="mb-2 block text-xs text-white/50">{label}</span>{children}</label>; }
export function Input(props) { return <input {...props} className={`h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#7be35b]/50 ${props.className || ""}`} />; }
export function Textarea(props) { return <textarea {...props} className={`min-h-28 w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#7be35b]/50 ${props.className || ""}`} />; }
export function Select(props) { return <select {...props} className={`h-11 w-full rounded-xl border border-white/10 bg-[#0b1511] px-3 text-sm text-white outline-none focus:border-[#7be35b]/50 ${props.className || ""}`} />; }

const langLabels = { fa: "فارسی", en: "English", ar: "العربية" };
export function LocalizedFields({ label, value = {}, onChange, textarea = false, required = false, placeholder = "" }) {
  const Control = textarea ? Textarea : Input;
  return <div><div className="mb-3 text-sm font-medium text-white/70">{label}{required && <span className="mr-1 text-red-400">*</span>}</div><div className="grid gap-3 lg:grid-cols-3">{["fa","en","ar"].map((lang) => <Field key={lang} label={langLabels[lang]}><Control dir={lang === "en" ? "ltr" : "rtl"} value={value?.[lang] || ""} onChange={(e) => onChange(lang, e.target.value)} placeholder={placeholder} /></Field>)}</div></div>;
}

export function Toggle({ label, checked, onChange, note }) {
  return <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"><div><p className="text-sm text-white/75">{label}</p>{note && <p className="mt-1 text-[10px] text-white/30">{note}</p>}</div><button type="button" onClick={() => onChange(!checked)} className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-[#7be35b]" : "bg-white/15"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-black transition-all ${checked ? "right-1" : "left-1"}`} /></button></div>;
}

export function SeoFields({ value, onChange }) {
  const updateLocalized = (field, lang, next) => onChange({ ...value, [field]: { ...(value?.[field] || emptyLocalized()), [lang]: next } });
  const updateKeywords = (lang, raw) => onChange({ ...value, keywords: { ...(value?.keywords || {}), [lang]: raw.split(",").map((x) => x.trim()).filter(Boolean) } });
  return <div className="space-y-5"><LocalizedFields label="SEO Title" value={value?.title} onChange={(l,v)=>updateLocalized("title",l,v)} /><LocalizedFields label="SEO Description" textarea value={value?.description} onChange={(l,v)=>updateLocalized("description",l,v)} />
    <div className="grid gap-3 lg:grid-cols-3">{["fa","en","ar"].map((lang)=><Field key={lang} label={`Keywords - ${langLabels[lang]}`}><Textarea dir={lang === "en" ? "ltr" : "rtl"} value={(value?.keywords?.[lang] || []).join(", ")} onChange={(e)=>updateKeywords(lang,e.target.value)} placeholder="keyword 1, keyword 2" /></Field>)}</div></div>;
}

export function MediaField({ label, value, onChange, accept = "image/jpeg,image/png,image/webp,image/avif", endpoint = "/admin/media/image", required = false }) {
  const [loading, setLoading] = useState(false);
  const upload = async (file) => {
    if (!file) return;
    const isDocument = endpoint.endsWith("/document");
    const allowed = isDocument ? ["application/pdf"] : ["image/jpeg", "image/png", "image/webp", "image/avif"];
    const maxSize = isDocument ? 20 * 1024 * 1024 : 10 * 1024 * 1024;
    if (!allowed.includes(file.type)) return Notify("error", isDocument ? "فقط فایل PDF مجاز است" : "فقط JPG/PNG/WEBP/AVIF مجاز است");
    if (file.size > maxSize) return Notify("error", isDocument ? "حداکثر حجم PDF برابر ۲۰MB است" : "حداکثر حجم تصویر برابر ۱۰MB است");
    const formData = new FormData(); formData.append("file", file); setLoading(true);
    const result = await fetchUpload(endpoint, { method: "POST", body: formData }); setLoading(false);
    if (!result?.success) return Notify("error", result?.message || "آپلود ناموفق بود");
    onChange(result.data?.url || "");
  };
  return <div><div className="mb-2 text-xs text-white/50">{label}{required && <span className="mr-1 text-red-400">*</span>}</div><div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-3">
    {value ? <div className="flex items-center gap-3">{accept.includes("image") ? <img src={resolveMediaUrl(value)} alt="" className="h-16 w-16 rounded-xl bg-white/5 object-cover" /> : <div className="grid h-16 w-16 place-items-center rounded-xl bg-red-500/10 text-xs text-red-200">PDF</div>}<div className="min-w-0 flex-1"><p className="truncate text-xs text-white/55">{value}</p><button type="button" onClick={()=>onChange("")} className="mt-2 flex items-center gap-1 text-xs text-red-300"><FiX /> حذف از فرم</button></div></div> : <label className="flex cursor-pointer items-center justify-center gap-2 py-5 text-sm text-white/45 hover:text-[#7be35b]"><FiUploadCloud />{loading ? "در حال آپلود..." : "انتخاب و آپلود فایل"}<input disabled={loading} type="file" accept={accept} className="hidden" onChange={(e)=>upload(e.target.files?.[0])} /></label>}
  </div></div>;
}

export function ValidationErrors({ result }) {
  const errors = result?.errors;
  if (!errors || !Object.keys(errors).length) return null;
  return <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-xs text-red-200"><p className="mb-2 font-semibold">خطاهای اعتبارسنجی Backend</p><ul className="space-y-1">{Object.entries(errors).map(([key,msg])=><li key={key}><span className="font-mono text-red-300">{key}</span>: {msg}</li>)}</ul></div>;
}
