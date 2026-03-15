import { getProducts, getCategories } from "@/lib/data"
import { fromSlug } from "@/lib/slugs"
import CatalogClient from "@/components/CatalogClient"
import { Suspense } from "react"

export const dynamic = 'force-dynamic'

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string }
}) {
  const products = await getProducts()
  const categories = await getCategories(products)

  // Resolve slug → category name (e.g. "zaryadni-prystroi" → "Зарядні пристрої")
  const rawCategory = searchParams.category || "all"
  const serverCategory = rawCategory === "all" ? "all" : fromSlug(rawCategory)

  return (
    <Suspense fallback={<div className="text-center py-20 text-[#64748B]">Завантаження...</div>}>
      <CatalogClient
        initialProducts={products}
        categories={categories}
        serverCategory={serverCategory}
        serverSearch={searchParams.search || ""}
      />
    </Suspense>
  )
}
