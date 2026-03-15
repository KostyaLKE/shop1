"use client"

import { useState, useMemo, useEffect } from "react"
import ProductCard from "@/components/ProductCard"
import { useSearchParams, useRouter } from "next/navigation"

interface CatalogClientProps {
  initialProducts: any[]
  categories: string[]
  serverCategory: string
  serverSearch: string
}

const ITEMS_PER_PAGE = 20

const categoryIcons: Record<string, string> = {
  "Чохли": "🛡️",
  "Захисне скло": "🔮",
  "Кабелі та перехідники": "🔌",
  "Зарядні пристрої": "⚡",
  "Power Bank": "🔋",
  "Аудіо": "🎧",
  "Автотовари та тримачі": "🚗",
  "Ремінці для годинників": "⌚",
  "Смарт-годинники та гаджети": "📱",
  "Лампи та освітлення": "💡",
  "Захисні плівки": "🗒️",
  "Інші аксесуари": "✨",
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-6 w-1/2 mt-3" />
      </div>
    </div>
  )
}

export default function CatalogClient({ initialProducts, categories, serverCategory, serverSearch }: CatalogClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Use searchParams on client, fall back to server-passed value on first render
  const filter = searchParams.get("category") || serverCategory || "all"

  const [searchQuery, setSearchQuery] = useState(serverSearch)
  const [inputValue, setInputValue] = useState(serverSearch)
  const [sort, setSort] = useState("price-asc")
  const [page, setPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const s = searchParams.get("search") || ""
    setSearchQuery(s)
    setInputValue(s)
    setPage(1)
  }, [searchParams])

  const handleCategoryChange = (newCat: string) => {
    setPage(1)
    setSidebarOpen(false)
    if (newCat !== "all") {
      router.push(`/catalog?category=${encodeURIComponent(newCat)}`, { scroll: false })
    } else {
      router.push(`/catalog`, { scroll: false })
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(inputValue)
    setPage(1)
    if (inputValue.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(inputValue)}`, { scroll: false })
    } else {
      router.push(`/catalog`, { scroll: false })
    }
  }

  const filteredProducts = useMemo(() => {
    let res = initialProducts
    if (filter !== "all") res = res.filter((p) => p.category === filter)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      res = res.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.compat || "").toLowerCase().includes(q) ||
        String(p.id).includes(q)
      )
    }
    return res.sort((a, b) => sort === "price-asc" ? a.price - b.price : b.price - a.price)
  }, [initialProducts, filter, sort, searchQuery])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const currentProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handlePageChange = (p: number) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const Sidebar = () => (
    <div className="space-y-1">
      <button
        onClick={() => handleCategoryChange("all")}
        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-left font-medium transition-all duration-200 ${
          filter === "all"
            ? "bg-[#2563EB] text-white shadow-md shadow-blue-100"
            : "text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]"
        }`}
      >
        <span>🏠</span> Всі товари
        <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${filter === "all" ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>
          {initialProducts.length}
        </span>
      </button>
      {categories.map((cat) => {
        const count = initialProducts.filter(p => p.category === cat).length
        return (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-left font-medium transition-all duration-200 ${
              filter === cat
                ? "bg-[#2563EB] text-white shadow-md shadow-blue-100"
                : "text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]"
            }`}
          >
            <span>{categoryIcons[cat] || "📦"}</span>
            <span className="line-clamp-1 flex-1">{cat}</span>
            <span className={`shrink-0 text-xs px-1.5 py-0.5 rounded-full ${filter === cat ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 py-6 md:py-10">

        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="relative mb-6 max-w-xl">
          <input
            type="text"
            placeholder="Пошук в каталозі..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-white border border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 rounded-xl py-3 pl-4 pr-28 text-sm outline-none transition-all duration-200 shadow-sm"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex gap-1">
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setInputValue("")
                  setSearchQuery("")
                  setPage(1)
                  router.push("/catalog", { scroll: false })
                }}
                className="px-3 py-1.5 text-xs text-[#64748B] hover:text-[#0F172A] transition"
              >
                Скинути
              </button>
            )}
            <button
              type="submit"
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
            >
              Знайти
            </button>
          </div>
        </form>

        {searchQuery && (
          <div className="mb-5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-[#2563EB] font-medium">
            Результати пошуку: <strong>«{searchQuery}»</strong> — {filteredProducts.length} товарів
          </div>
        )}

        <div className="flex gap-8 items-start">

          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 shrink-0 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <h3 className="font-semibold text-[#0F172A] text-sm uppercase tracking-wide mb-4">Категорії</h3>
              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
                <Sidebar />
              </div>

              <hr className="my-4 border-slate-100" />

              <h3 className="font-semibold text-[#0F172A] text-sm uppercase tracking-wide mb-3">Сортування</h3>
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1) }}
                className="w-full border border-slate-200 bg-[#F8FAFC] p-2.5 rounded-xl text-sm outline-none focus:border-[#2563EB] transition-all duration-200 cursor-pointer"
              >
                <option value="price-asc">Від дешевих до дорогих</option>
                <option value="price-desc">Від дорогих до дешевих</option>
              </select>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Mobile top bar */}
            <div className="flex md:hidden items-center justify-between mb-4 gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-[#0F172A] shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                {filter !== "all" ? filter : "Фільтри"}
              </button>
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1) }}
                className="border border-slate-200 bg-white rounded-xl px-3 py-2.5 text-sm outline-none flex-1"
              >
                <option value="price-asc">Від дешевих</option>
                <option value="price-desc">Від дорогих</option>
              </select>
            </div>

            {/* Title + count */}
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-[20px] md:text-[28px] font-bold text-[#0F172A] leading-tight">
                {searchQuery ? "Результати пошуку" : filter === "all" ? "Всі товари" : filter}
              </h1>
              <span className="text-[#64748B] text-sm font-medium bg-white border border-slate-100 px-3 py-1 rounded-full shadow-sm">
                {filteredProducts.length} шт.
              </span>
            </div>

            {/* Grid */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                <div className="text-5xl mb-3">😔</div>
                <p className="text-[#64748B] font-medium">
                  {searchQuery ? "Нічого не знайдено" : "Товарів поки немає"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                  className="w-10 h-10 flex items-center justify-center border border-slate-200 bg-white rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-[#64748B]"
                >
                  ←
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let p: number
                  if (totalPages <= 5) p = i + 1
                  else if (page <= 3) p = i + 1
                  else if (page >= totalPages - 2) p = totalPages - 4 + i
                  else p = page - 2 + i
                  return (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                        page === p
                          ? "bg-[#2563EB] text-white shadow-md shadow-blue-100"
                          : "border border-slate-200 bg-white text-[#64748B] hover:bg-slate-50"
                      }`}
                    >
                      {p}
                    </button>
                  )
                })}

                <button
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-slate-200 bg-white rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-[#64748B]"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-[#0F172A]">Категорії</h3>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <svg className="w-5 h-5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
