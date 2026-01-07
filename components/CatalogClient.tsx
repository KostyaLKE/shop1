"use client"

import { useState, useMemo, useEffect } from "react"
import ProductCard from "@/components/ProductCard"
import { useSearchParams, useRouter } from "next/navigation"

interface CatalogClientProps {
  initialProducts: any[]
  categories: string[]
}

const ITEMS_PER_PAGE = 20;

export default function CatalogClient({ initialProducts, categories }: CatalogClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const initialCategory = searchParams.get("category") || "all"
  const initialSearch = searchParams.get("search") || ""

  const [filter, setFilter] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [sort, setSort] = useState("price-asc")
  const [page, setPage] = useState(1)

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "")
    setFilter(searchParams.get("category") || "all")
    setPage(1)
  }, [searchParams])

  const handleCategoryChange = (newCat: string) => {
    setFilter(newCat);
    setSearchQuery("");
    setPage(1);
    
    if (newCat !== "all") {
        router.push(`/catalog?category=${encodeURIComponent(newCat)}`, { scroll: false });
    } else {
        router.push(`/catalog`, { scroll: false });
    }
  }

  const filteredProducts = useMemo(() => {
    let res = initialProducts

    if (filter !== "all") {
      res = res.filter((p) => p.category === filter)
    }

    if (searchQuery) {
        const lowerQ = searchQuery.toLowerCase();
        res = res.filter(p => 
            p.name.toLowerCase().includes(lowerQ) ||
            p.compat.toLowerCase().includes(lowerQ) ||
            String(p.id).includes(lowerQ)
        )
    }

    return res.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price
      if (sort === "price-desc") return b.price - a.price
      return 0
    })
  }, [initialProducts, filter, sort, searchQuery])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE, 
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      {searchQuery && (
          <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100 flex justify-between items-center text-sm md:text-base">
              <span>🔍 Пошук: <strong>{searchQuery}</strong></span>
              <button onClick={() => {
                  setSearchQuery("");
                  router.push("/catalog");
              }} className="text-red-500 font-bold hover:underline">Скинути</button>
          </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Сайдбар (Фильтры) */}
        <aside className="w-full md:w-64 shrink-0 md:sticky md:top-24 z-10">
          <div className="bg-white md:bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Категорії</h3>
            
            {/* На мобильном ограничиваем высоту и даем скролл */}
            <div className="flex flex-wrap md:flex-col gap-2 md:gap-1 max-h-[200px] md:max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-3 py-2 rounded text-sm text-left transition ${
                  filter === "all" ? "bg-slate-900 text-white shadow-md" : "bg-slate-100 md:bg-transparent hover:bg-slate-200 text-slate-700"
                }`}
              >
                Всі
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-2 rounded text-sm text-left transition ${
                    filter === cat ? "bg-slate-900 text-white shadow-md" : "bg-slate-100 md:bg-transparent hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <hr className="my-6 border-slate-200 hidden md:block" />
            
            <div className="mt-4 md:mt-0">
                <h3 className="font-bold text-sm mb-2 md:mb-2">Сортування</h3>
                <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full border border-slate-300 bg-white p-2.5 rounded-lg text-sm focus:outline-slate-900 cursor-pointer"
                >
                <option value="price-asc">Від дешевих</option>
                <option value="price-desc">Від дорогих</option>
                </select>
            </div>
          </div>
        </aside>

        {/* Сетка товаров */}
        <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-6">
                <h1 className="text-xl md:text-3xl font-bold leading-tight">
                    {searchQuery ? "Результати пошуку" : (filter === "all" ? "Всі товари" : filter)}
                </h1>
                <span className="text-slate-500 text-xs md:text-sm font-medium bg-slate-100 px-2 py-1 rounded-md">{filteredProducts.length} шт.</span>
            </div>

            {currentProducts.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <div className="text-4xl mb-2">😔</div>
                    {searchQuery ? "Нічого не знайдено" : "Товарів поки немає"}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            )}

            {/* Пагинация */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                    <button 
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                        className="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent transition"
                    >
                        ←
                    </button>
                    <span className="h-10 px-4 flex items-center justify-center bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md">
                        {page} / {totalPages}
                    </span>
                    <button 
                        disabled={page === totalPages}
                        onClick={() => handlePageChange(page + 1)}
                        className="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent transition"
                    >
                        →
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}