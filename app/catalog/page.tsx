"use client"

import { useState, useMemo, useEffect } from "react"
import { getProducts, getCategories } from "@/lib/data"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function Catalog() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filter, setFilter] = useState(initialCategory)
  const [sort, setSort] = useState("price-asc")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data)
      getCategories(data).then(setCategories)
      setLoading(false)
    })
  }, [])

  const filteredProducts = useMemo(() => {
    let res = products
    if (filter !== "all") {
      res = res.filter((p) => p.category === filter)
    }

    return res.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price
      if (sort === "price-desc") return b.price - a.price
      return 0
    })
  }, [products, filter, sort])

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Завантаження...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">← Назад</Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Каталог товарів</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-20 bg-slate-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-4">Категорії</h3>
            <div className="space-y-2">
              <button
                onClick={() => setFilter("all")}
                className={`block w-full text-left px-4 py-2 rounded transition ${
                  filter === "all"
                    ? "bg-blue-600 text-white font-bold"
                    : "hover:bg-slate-200"
                }`}
              >
                Всі товари ({products.length})
              </button>
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat).length
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`block w-full text-left px-4 py-2 rounded transition capitalize ${
                      filter === cat
                        ? "bg-blue-600 text-white font-bold"
                        : "hover:bg-slate-200"
                    }`}
                  >
                    {cat || "Інші"} ({count})
                  </button>
                )
              })}
            </div>

            <hr className="my-6" />

            <h3 className="font-bold text-lg mb-4">Сортування</h3>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-slate-300 p-2 rounded focus:outline-blue-600"
            >
              <option value="price-asc">Дешевші спочатку</option>
              <option value="price-desc">Дорожчі спочатку</option>
            </select>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-6 text-slate-600">
            Знайдено товарів: <span className="font-bold">{filteredProducts.length}</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              Товари не знайдені
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}