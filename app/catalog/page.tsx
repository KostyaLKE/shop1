import { getProducts, getCategories } from "@/lib/data"
import CatalogClient from "@/components/CatalogClient"
import { Suspense } from "react"

// Эта строка заставляет сервер пересобирать страницу при каждом запросе,
// чтобы ты видел актуальные данные из CSV
export const dynamic = 'force-dynamic'

export default async function CatalogPage() {
  // 1. Загружаем данные на сервере (тут работает fs)
  const products = await getProducts()
  const categories = await getCategories(products)

  // 2. Передаем данные в Клиентский Компонент
  return (
    <Suspense fallback={<div className="text-center py-20">Завантаження каталогу...</div>}>
      <CatalogClient initialProducts={products} categories={categories} />
    </Suspense>
  )
}