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
  
  const initialCategory = searchParams.get("category") || "all"
  const [filter, setFilter] = useState(initialCategory)
  const [sort, setSort] = useState("price-asc")
  const [page, setPage] = useState(1)

  // Сброс страницы при смене категории
  useEffect(() => {
    setPage(1);
    // Обновляем URL без перезагрузки
    if (filter !== "all") {
        router.push(`/catalog?category=${filter}`, { scroll: false });
    } else {
        router.push(`/catalog`, { scroll: false });
    }
  }, [filter, router]);

  const filteredProducts = useMemo(() => {
    let res = initialProducts
    if (filter !== "all") {
      res = res.filter((p) => p.category === filter)
    }
    return res.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price
      if (sort === "price-desc") return b.price - a.price
      return 0
    })
  }, [initialProducts, filter, sort])

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE, 
    page * ITEMS_PER_PAGE
  );

  // Скролл наверх при смене страницы
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Сайдбар (Фильтры) */}
        <aside className="w-full md:w-64 shrink-0 md:sticky md:top-24 bg-white z-10">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Категорії</h3>
            <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <button
                onClick={() => setFilter("all")}
                className={`block w-full text-left px-3 py-2 rounded text-sm transition ${
                  filter === "all" ? "bg-slate-900 text-white" : "hover:bg-slate-200 text-slate-700"
                }`}
              >
                Всі товари
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
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

        {/* Сетка товаров */}
        <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{filter === "all" ? "Всі товари" : filter}</h1>
                <span className="text-slate-500 text-sm">{filteredProducts.length} товарів</span>
            </div>

            {currentProducts.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-lg">Товари не знайдені</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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