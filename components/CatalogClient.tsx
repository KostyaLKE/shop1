"use client"

import { useState, useMemo, useEffect } from "react"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"

interface CatalogClientProps {
  initialProducts: any[]
  categories: string[]
}

const ITEMS_PER_PAGE = 20;

export default function CatalogClient({ initialProducts, categories }: CatalogClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Отримуємо параметри з URL
  const initialCategory = searchParams.get("category") || "all"
  const initialSearch = searchParams.get("search") || ""

  const [filter, setFilter] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [sort, setSort] = useState("price-asc")
  const [page, setPage] = useState(1)

  // Синхронізація стейту з URL (якщо шукають через хедер)
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "")
    setFilter(searchParams.get("category") || "all")
    setPage(1)
  }, [searchParams])

  // Оновлення URL при зміні категорії
  const handleCategoryChange = (newCat: string) => {
    setFilter(newCat);
    setSearchQuery(""); // Скидаємо пошук, якщо обрали категорію
    setPage(1);
    
    if (newCat !== "all") {
        router.push(`/catalog?category=${encodeURIComponent(newCat)}`, { scroll: false });
    } else {
        router.push(`/catalog`, { scroll: false });
    }
  }

  // Головна логіка фільтрації
  const filteredProducts = useMemo(() => {
    let res = initialProducts

    // 1. Фільтр за категорією
    if (filter !== "all") {
      res = res.filter((p) => p.category === filter)
    }

    // 2. Фільтр за пошуком (шукаємо в назві, сумісності та артикулі)
    if (searchQuery) {
        const lowerQ = searchQuery.toLowerCase();
        res = res.filter(p => 
            p.name.toLowerCase().includes(lowerQ) ||
            p.compat.toLowerCase().includes(lowerQ) ||
            String(p.id).includes(lowerQ)
        )
    }

    // 3. Сортування
    return res.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price
      if (sort === "price-desc") return b.price - a.price
      return 0
    })
  }, [initialProducts, filter, sort, searchQuery])

  // Пагінація
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
    <div className="container mx-auto px-4 py-8">
      {/* Хлібні крихти для пошуку */}
      {searchQuery && (
          <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex justify-between items-center">
              <span>🔍 Результати пошуку: <strong>{searchQuery}</strong></span>
              <button onClick={() => {
                  setSearchQuery("");
                  router.push("/catalog");
              }} className="text-sm text-red-500 underline">Скинути</button>
          </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Сайдбар */}
        <aside className="w-full md:w-64 shrink-0 md:sticky md:top-24 bg-white z-10">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Категорії</h3>
            <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`block w-full text-left px-3 py-2 rounded text-sm transition ${
                  filter === "all" ? "bg-slate-900 text-white" : "hover:bg-slate-200 text-slate-700"
                }`}
              >
                Всі товари
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`block w-full text-left px-3 py-2 rounded text-sm transition ${
                    filter === cat ? "bg-slate-900 text-white" : "hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <hr className="my-6 border-slate-200" />
            <h3 className="font-bold text-sm mb-2">Сортування</h3>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-slate-300 p-2 rounded text-sm focus:outline-slate-900"
            >
              <option value="price-asc">Від дешевих</option>
              <option value="price-desc">Від дорогих</option>
            </select>
          </div>
        </aside>

        {/* Сетка */}
        <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    {searchQuery ? "Пошук" : (filter === "all" ? "Всі товари" : filter)}
                </h1>
                <span className="text-slate-500 text-sm">{filteredProducts.length} товарів</span>
            </div>

            {currentProducts.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-lg">
                    {searchQuery ? "Нічого не знайдено за вашим запитом 😔" : "В цій категорії товарів поки немає"}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            )}

            {/* Пагинація */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                    <button 
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-slate-100"
                    >
                        ←
                    </button>
                    <span className="px-4 py-2 bg-slate-900 text-white rounded">
                        Стор. {page} з {totalPages}
                    </span>
                    <button 
                        disabled={page === totalPages}
                        onClick={() => handlePageChange(page + 1)}
                        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-slate-100"
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