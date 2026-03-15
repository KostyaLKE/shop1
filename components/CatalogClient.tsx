"use client"

import { useState, useMemo, useEffect } from "react"
import ProductCard from "@/components/ProductCard"
import { useSearchParams, useRouter } from "next/navigation"
import { catalogHref, fromSlug } from "@/lib/slugs"

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

export default function CatalogClient({ initialProducts, categories, serverCategory, serverSearch }: CatalogClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Resolve slug → category name: "chohly" → "Чохли"
  const rawSlug = searchParams.get("category") || ""
  const filter = rawSlug ? fromSlug(rawSlug) : (serverCategory || "all")

  const [searchQuery, setSearchQuery] = useState(serverSearch)
  const [inputValue, setInputValue] = useState(serverSearch)
  const [sort, setSort] = useState("price-asc")
  const [page, setPage] = useState(1)

  // Mobile drawers
  const [catDrawerOpen, setCatDrawerOpen] = useState(false)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

  useEffect(() => {
    const s = searchParams.get("search") || ""
    setSearchQuery(s)
    setInputValue(s)
    setPage(1)
  }, [searchParams])

  // Reset page when filter changes
  useEffect(() => {
    setPage(1)
  }, [filter])

  const handleCategoryChange = (newCat: string) => {
    setCatDrawerOpen(false)
    if (newCat !== "all") {
      router.push(catalogHref(newCat), { scroll: false })
    } else {
      router.push(`/catalog`, { scroll: false })
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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

  // Category list used in both desktop sidebar and mobile drawer
  const CategoryList = () => (
    <div className="space-y-1">
      <button
        onClick={() => handleCategoryChange("all")}
        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-left font-medium transition-all duration-200 ${
          filter === "all"
            ? "bg-[#2563EB] text-white shadow-md"
            : "text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]"
        }`}
      >
        <span>🏠</span>
        <span className="flex-1">Всі товари</span>
        <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === "all" ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>
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
                ? "bg-[#2563EB] text-white shadow-md"
                : "text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]"
            }`}
          >
            <span>{categoryIcons[cat] || "📦"}</span>
            <span className="flex-1 line-clamp-1">{cat}</span>
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
        <form onSubmit={handleSearchSubmit} className="relative mb-5 w-full md:max-w-xl">
          <input
            type="text"
            placeholder="Пошук в каталозі..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-white border border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 rounded-xl py-3 pl-4 pr-28 text-sm outline-none transition-all duration-200 shadow-sm"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex gap-1 items-center">
            {(searchQuery || inputValue) && (
              <button
                type="button"
                onClick={() => {
                  setInputValue("")
                  setSearchQuery("")
                  setPage(1)
                  router.push("/catalog", { scroll: false })
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
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
          <div className="mb-4 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-[#2563EB] font-medium">
            Результати для: <strong>«{searchQuery}»</strong> — {filteredProducts.length} товарів
          </div>
        )}

        <div className="flex gap-8 items-start">

          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 shrink-0 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">Категорії</p>
              <div className="max-h-[55vh] overflow-y-auto custom-scrollbar pr-1">
                <CategoryList />
              </div>
              <hr className="my-4 border-slate-100" />
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">Сортування</p>
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

          {/* Products area */}
          <div className="flex-1 min-w-0">

            {/* Mobile controls row */}
            <div className="flex md:hidden items-center gap-2 mb-4">
              {/* Categories button */}
              <button
                onClick={() => setCatDrawerOpen(true)}
                className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-[#0F172A] shadow-sm flex-1 justify-center"
              >
                <svg className="w-4 h-4 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h16" />
                </svg>
                {filter !== "all" ? (
                  <span className="truncate max-w-[100px]">{filter}</span>
                ) : "Категорії"}
                {filter !== "all" && (
                  <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0" />
                )}
              </button>

              {/* Filters (sort) button */}
              <button
                onClick={() => setFilterDrawerOpen(true)}
                className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-[#0F172A] shadow-sm flex-1 justify-center"
              >
                <svg className="w-4 h-4 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Фільтри
              </button>
            </div>

            {/* Title + count */}
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-[18px] md:text-[28px] font-bold text-[#0F172A] leading-tight truncate pr-4">
                {searchQuery ? "Результати пошуку" : filter === "all" ? "Всі товари" : filter}
              </h1>
              <span className="shrink-0 text-[#64748B] text-sm font-medium bg-white border border-slate-100 px-3 py-1 rounded-full shadow-sm">
                {filteredProducts.length} шт.
              </span>
            </div>

            {/* Grid — key forces full re-render on filter/sort change */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                <div className="text-5xl mb-3">😔</div>
                <p className="text-[#64748B] font-medium">
                  {searchQuery ? "Нічого не знайдено" : "Товарів поки немає"}
                </p>
              </div>
            ) : (
              <div
                key={`${filter}__${sort}__${page}`}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
              >
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
                  className="w-10 h-10 flex items-center justify-center border border-slate-200 bg-white rounded-xl hover:bg-slate-50 disabled:opacity-40 transition-all duration-200 text-[#64748B]"
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
                          ? "bg-[#2563EB] text-white shadow-md"
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
                  className="w-10 h-10 flex items-center justify-center border border-slate-200 bg-white rounded-xl hover:bg-slate-50 disabled:opacity-40 transition-all duration-200 text-[#64748B]"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: Categories drawer */}
      {catDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCatDrawerOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h16" />
                </svg>
                <h3 className="font-bold text-[#0F172A]">Категорії</h3>
              </div>
              <button onClick={() => setCatDrawerOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-[#64748B]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <CategoryList />
            </div>
          </div>
        </div>
      )}

      {/* Mobile: Filters (sort) drawer */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFilterDrawerOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                <h3 className="font-bold text-[#0F172A]">Фільтри</h3>
              </div>
              <button onClick={() => setFilterDrawerOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-[#64748B]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 pb-8">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">Сортування</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "price-asc", label: "Від дешевих" },
                  { value: "price-desc", label: "Від дорогих" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setPage(1); setFilterDrawerOpen(false) }}
                    className={`py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      sort === opt.value
                        ? "bg-[#2563EB] text-white shadow-md"
                        : "bg-slate-100 text-[#64748B] hover:bg-slate-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
