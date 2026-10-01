import React, { useState } from 'react'
import {
  FiArrowLeft,
  FiBox,
  FiCheckCircle,
  FiEdit3,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiAlertCircle,
  FiFileText,
  FiTrendingUp,
} from 'react-icons/fi'

const stats = [
  {
    label: 'کل محصولات',
    value: '۲۶',
    note: '۸٪ نسبت به ماه گذشته',
    icon: FiBox,
    type: 'green',
  },
  {
    label: 'منتشر شده',
    value: '۲۱',
    note: '۱۲٪ نسبت به ماه گذشته',
    icon: FiCheckCircle,
    type: 'blue',
  },
  {
    label: 'پیش‌نویس',
    value: '۵',
    note: '۲ مورد آماده‌ی انتشار',
    icon: FiFileText,
    type: 'yellow',
  },
  {
    label: 'موجودی کم',
    value: '۳',
    note: 'نیاز به بررسی',
    icon: FiAlertCircle,
    type: 'red',
  },
]

const chips = [
  'همه',
  'لوله‌ها',
  'اتصالات',
  'پمپ و موتور',
  'سیستم‌های آبیاری',
]

const products = [
  {
    name: 'لوله تحت فشار PVC-U PN16',
    cat: 'لوله‌های انتقال آب',
    price: '۱٬۸۵۰٬۰۰۰',
    stock: '۱۲۰ عدد',
    status: 'منتشر شده',
    glow: 'from-emerald-700/50',
    icon: 'pipe',
  },
  {
    name: 'نوار تیپ آبیاری',
    cat: 'سیستم‌های آبیاری',
    price: '۶۴۰٬۰۰۰',
    stock: '۳۴۰ عدد',
    status: 'منتشر شده',
    glow: 'from-cyan-700/50',
    icon: 'tape',
  },
  {
    name: 'فیلتر دیسکی ۱۳۲',
    cat: 'تصفیه آب',
    price: '۲٬۳۰۰٬۰۰۰',
    stock: '۴۵ عدد',
    status: 'منتشر شده',
    glow: 'from-indigo-600/50',
    icon: 'filter',
  },
  {
    name: 'پمپ آب کشاورزی',
    cat: 'پمپ و موتور',
    price: '۱۴٬۵۰۰٬۰۰۰',
    stock: '۱۲ عدد · کم',
    status: 'منتشر شده',
    glow: 'from-orange-700/50',
    icon: 'pump',
    low: true,
  },
  {
    name: 'زانویی ۹۰ درجه پلی‌اتیلن',
    cat: 'اتصالات',
    price: '۹۵٬۰۰۰',
    stock: 'ناموجود',
    status: 'پیش‌نویس',
    glow: 'from-yellow-700/50',
    icon: 'elbow',
    out: true,
  },
  {
    name: 'شیر فلکه برنجی ۲ اینچ',
    cat: 'اتصالات',
    price: '۷۸۰٬۰۰۰',
    stock: '۶۰ عدد',
    status: 'منتشر شده',
    glow: 'from-emerald-700/60',
    icon: 'valve',
  },
]

function Icon({ type }) {
  const c = 'w-28 h-28 transition duration-500 group-hover:scale-110'

  switch (type) {
    case 'pipe':
      return (
        <svg viewBox="0 0 100 100" className={c}>
          <rect x="8" y="34" width="84" height="32" rx="8" fill="#2a2f33" />
          <rect x="8" y="34" width="84" height="10" rx="5" fill="#3d444a" />
          <rect x="22" y="30" width="8" height="40" rx="3" fill="#7be35b" />
          <rect x="70" y="30" width="8" height="40" rx="3" fill="#7be35b" />
        </svg>
      )

    case 'tape':
      return (
        <svg viewBox="0 0 100 100" className={c}>
          <circle cx="50" cy="50" r="38" fill="#1b1f22" />
          <circle cx="50" cy="50" r="26" fill="#2a3035" />
          <circle cx="50" cy="50" r="12" fill="#0a1a13" />
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#7be35b"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
        </svg>
      )

    case 'filter':
      return (
        <svg viewBox="0 0 100 100" className={c}>
          <rect x="30" y="12" width="40" height="76" rx="14" fill="#23282c" />
          <rect x="30" y="38" width="40" height="8" fill="#7be35b" />
          <rect
            x="30"
            y="54"
            width="40"
            height="8"
            fill="#7be35b"
            opacity=".6"
          />
          <rect x="42" y="4" width="16" height="12" rx="3" fill="#3d444a" />
        </svg>
      )

    case 'pump':
      return (
        <svg viewBox="0 0 100 100" className={c}>
          <circle cx="46" cy="56" r="30" fill="#23282c" />
          <circle cx="46" cy="56" r="18" fill="#2f353a" />
          <rect x="40" y="10" width="14" height="22" rx="4" fill="#3d444a" />
          <rect x="72" y="48" width="22" height="14" rx="4" fill="#7be35b" />
        </svg>
      )

    case 'elbow':
      return (
        <svg viewBox="0 0 100 100" className={c}>
          <path d="M20 20h22v38h38v22H20z" fill="#2a2f33" />
          <path
            d="M20 20h22v10H20zM70 58h10v22H70z"
            fill="#7be35b"
          />
        </svg>
      )

    default:
      return (
        <svg viewBox="0 0 100 100" className={c}>
          <rect x="10" y="42" width="80" height="16" rx="5" fill="#b08a3a" />
          <rect x="38" y="30" width="24" height="40" rx="6" fill="#c9a24c" />
          <rect x="44" y="8" width="12" height="26" rx="4" fill="#2a2f33" />
          <rect x="30" y="4" width="40" height="8" rx="4" fill="#7be35b" />
        </svg>
      )
  }
}

function StatCard({ stat }) {
  const IconComponent = stat.icon

  const colors = {
    green: {
      icon: 'text-[#7be35b]',
      bg: 'bg-[#7be35b]/10',
      glow: 'group-hover:shadow-[0_0_35px_#7be35b12]',
    },
    blue: {
      icon: 'text-cyan-400',
      bg: 'bg-cyan-400/10',
      glow: 'group-hover:shadow-[0_0_35px_#22d3ee12]',
    },
    yellow: {
      icon: 'text-amber-400',
      bg: 'bg-amber-400/10',
      glow: 'group-hover:shadow-[0_0_35px_#fbbf2412]',
    },
    red: {
      icon: 'text-red-400',
      bg: 'bg-red-400/10',
      glow: 'group-hover:shadow-[0_0_35px_#f8717112]',
    },
  }

  const color = colors[stat.type]

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b1511]/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.13] ${color.glow}`}
    >
      <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#7be35b]/5 blur-3xl transition duration-500 group-hover:bg-[#7be35b]/10" />

      <div className="relative flex items-start justify-between">
        <div>
          <span className="text-xs text-[#71857a]">
            {stat.label}
          </span>

          <strong className="mt-2 block text-3xl font-black tracking-tight text-white">
            {stat.value}
          </strong>
        </div>

        <div
          className={`grid h-11 w-11 place-items-center rounded-2xl ${color.bg} ${color.icon}`}
        >
          <IconComponent size={20} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <span className={color.icon}>
          <FiTrendingUp size={13} />
        </span>

        <span className="text-[11px] text-[#71857a]">
          {stat.note}
        </span>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeChip, setActiveChip] = useState('همه')
  const [search, setSearch] = useState('')

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.includes(search) ||
      product.cat.includes(search)

    const matchesCategory =
      activeChip === 'همه' ||
      product.cat.includes(activeChip)

    return matchesSearch && matchesCategory
  })

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full overflow-x-hidden bg-[#050806] pb-20 pt-28 text-white"
    >
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-60 top-20 h-[500px] w-[500px] rounded-full bg-[#7be35b]/5 blur-[140px]" />
        <div className="absolute -left-60 top-[45%] h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto w-[92%] max-w-7xl">

        {/* ================= HERO ================= */}
        <section className="group relative overflow-hidden rounded-[2rem] border border-[#234c38] bg-gradient-to-br from-[#10291c] via-[#0a1b13] to-[#07100c] p-7 shadow-[0_25px_80px_#00000055] sm:p-9">

          {/* Glow */}
          <div className="absolute -left-20 -top-32 h-80 w-80 rounded-full bg-[#7be35b]/10 blur-[90px] transition duration-700 group-hover:bg-[#7be35b]/15" />

          <div className="absolute bottom-0 right-1/3 h-px w-1/2 bg-gradient-to-l from-transparent via-[#7be35b]/30 to-transparent" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#7be35b] shadow-[0_0_12px_#7be35b]" />

                <span className="text-xs font-medium tracking-wide text-[#7be35b]">
                  پنل مدیریت محصولات
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                همه محصولات
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#91a89b]">
                لوله‌ها، اتصالات و تجهیزات آبیاری را از یک‌جا
                مدیریت کنید و همیشه وضعیت محصولات را زیر نظر داشته باشید.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2 text-xs text-[#91a89b] backdrop-blur-md">
                  <span className="text-white">۲۶</span> محصول
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2 text-xs text-[#91a89b] backdrop-blur-md">
                  <span className="text-[#7be35b]">۲۱</span> منتشر شده
                </div>
              </div>
            </div>

            <button className="group/btn relative flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#7be35b] px-6 py-3.5 text-sm font-bold text-[#06150c] shadow-[0_10px_35px_#7be35b22] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_#7be35b35]">
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition duration-500 group-hover/btn:translate-x-full" />

              <FiPlus
                size={18}
                className="relative transition duration-300 group-hover/btn:rotate-90"
              />

              <span className="relative">
                افزودن محصول
              </span>
            </button>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </section>

        {/* ================= TOOLBAR ================= */}
        <section className="mt-7 rounded-3xl border border-white/[0.06] bg-[#090f0c]/80 p-3 backdrop-blur-xl">

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

            {/* Chips */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {chips.map((chip) => {
                const active = activeChip === chip

                return (
                  <button
                    key={chip}
                    onClick={() => setActiveChip(chip)}
                    className={`shrink-0 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all duration-300 ${
                      active
                        ? 'border-[#7be35b]/40 bg-[#7be35b] text-[#06150c] shadow-[0_0_25px_#7be35b15]'
                        : 'border-white/[0.06] bg-[#0d1712] text-[#71857a] hover:border-white/[0.12] hover:text-white'
                    }`}
                  >
                    {chip}
                  </button>
                )
              })}
            </div>

            {/* Search */}
            <div className="relative w-full xl:w-72">
              <FiSearch
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#63766c]"
                size={16}
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجو در محصولات..."
                className="w-full rounded-xl border border-white/[0.06] bg-[#0d1712] py-3 pl-4 pr-11 text-xs text-white outline-none transition placeholder:text-[#52645a] focus:border-[#7be35b]/40 focus:bg-[#101b15]"
              />
            </div>
          </div>
        </section>

        {/* ================= PRODUCTS HEADER ================= */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">
              محصولات
            </h2>

            <p className="mt-1 text-xs text-[#62746b]">
              نمایش {filteredProducts.length} محصول
            </p>
          </div>

          <button className="group flex items-center gap-2 text-xs text-[#7b8e84] transition hover:text-[#7be35b]">
            مشاهده همه
            <FiArrowLeft
              size={14}
              className="transition group-hover:-translate-x-1"
            />
          </button>
        </div>

        {/* ================= PRODUCTS ================= */}
        <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {filteredProducts.map((p) => (
            <article
              key={p.name}
              className="group relative overflow-hidden rounded-[1.7rem] border border-white/[0.07] bg-[#0a120e] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#7be35b]/20 hover:shadow-[0_25px_60px_#00000055]"
            >

              {/* Card Glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#7be35b]/8 blur-3xl" />
              </div>

              {/* Product Visual */}
              <div
                className={`relative grid h-48 place-items-center overflow-hidden bg-gradient-to-b ${p.glow} to-[#09110d]`}
              >

                {/* grid */}
                <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:28px_28px]" />

                {/* spotlight */}
                <div className="absolute bottom-[-70px] h-44 w-44 rounded-full bg-[#7be35b]/10 blur-3xl transition duration-500 group-hover:bg-[#7be35b]/20" />

                {/* Status */}
                <span
                  className={`absolute right-4 top-4 z-10 rounded-full border px-3 py-1.5 text-[10px] font-medium backdrop-blur-md ${
                    p.status === 'پیش‌نویس'
                      ? 'border-amber-400/20 bg-amber-400/10 text-amber-300'
                      : 'border-[#7be35b]/20 bg-[#7be35b]/10 text-[#7be35b]'
                  }`}
                >
                  {p.status}
                </span>

                <div className="relative z-10">
                  <Icon type={p.icon} />
                </div>
              </div>

              {/* Content */}
              <div className="relative p-5">

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] text-[#65776d]">
                    {p.cat}
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-[#7be35b]/50" />
                </div>

                <h3 className="mt-2 min-h-[52px] text-[15px] font-bold leading-7 text-white transition group-hover:text-[#dfffd5]">
                  {p.name}
                </h3>

                <div className="mt-4 flex items-end justify-between">

                  <div>
                    <span className="text-[10px] text-[#62746b]">
                      قیمت
                    </span>

                    <div className="mt-1 text-base font-black">
                      {p.price}
                      <span className="mr-1 text-[10px] font-normal text-[#687a70]">
                        تومان
                      </span>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg px-2.5 py-1.5 text-[10px] ${
                      p.out
                        ? 'bg-red-400/10 text-red-400'
                        : p.low
                        ? 'bg-amber-400/10 text-amber-400'
                        : 'bg-white/[0.04] text-[#819187]'
                    }`}
                  >
                    {p.stock}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-2 border-t border-white/[0.06] pt-4">

                  <button className="group/edit flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] py-2.5 text-xs text-[#899a91] transition-all hover:border-[#7be35b]/30 hover:bg-[#7be35b]/5 hover:text-[#7be35b]">
                    <FiEdit3
                      size={14}
                      className="transition group-hover/edit:-rotate-6"
                    />
                    ویرایش
                  </button>

                  <button
                    aria-label="حذف"
                    className="group/delete grid w-11 place-items-center rounded-xl border border-red-400/10 bg-red-400/[0.03] text-red-400/60 transition-all hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400"
                  >
                    <FiTrash2
                      size={14}
                      className="transition group-hover/delete:scale-110"
                    />
                  </button>
                </div>
              </div>
            </article>
          ))}

        </section>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="mt-5 rounded-3xl border border-white/[0.06] bg-[#0a120e] py-20 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.04] text-[#71857a]">
              <FiSearch size={22} />
            </div>

            <h3 className="mt-4 text-sm font-bold">
              محصولی پیدا نشد
            </h3>

            <p className="mt-2 text-xs text-[#617269]">
              عبارت جستجو یا دسته‌بندی انتخابی را تغییر دهید.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

