import { getProductById } from "@/lib/data"
import { catalogHref } from "@/lib/slugs"
import Link from "next/link"
import { notFound } from "next/navigation"
import ProductActions from "@/components/ProductActions"
import ProductGallery from "@/components/ProductGallery"
import ProductTabs from "@/components/ProductTabs"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id)
  const product = await getProductById(id)

  if (!product) return notFound()

  const specs = [
    product.compat && { label: "Сумісність", value: product.compat },
    product.material && { label: "Матеріал", value: product.material },
    product.color && { label: "Колір", value: product.color },
    product.vendor && { label: "Бренд", value: product.vendor },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 py-4 md:py-10">

        {/* Breadcrumbs — scrollable on mobile */}
        <nav className="flex items-center gap-1.5 text-xs md:text-sm text-[#64748B] mb-4 md:mb-6 overflow-x-auto whitespace-nowrap custom-scrollbar pb-1">
          <Link href="/" className="hover:text-[#2563EB] transition-colors shrink-0">Головна</Link>
          <span className="shrink-0">/</span>
          <Link href="/catalog" className="hover:text-[#2563EB] transition-colors shrink-0">Каталог</Link>
          <span className="shrink-0">/</span>
          <Link href={catalogHref(product.category)} className="hover:text-[#2563EB] transition-colors shrink-0">
            {product.category}
          </Link>
          <span className="shrink-0">/</span>
          <span className="text-[#0F172A] font-medium truncate max-w-[180px] md:max-w-none">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-5 md:gap-8 lg:gap-14">

          {/* Gallery */}
          <ProductGallery images={product.images} />

          {/* Info */}
          <div className="space-y-4 md:space-y-6">

            {/* Category + title */}
            <div>
              <span className="inline-block bg-blue-50 text-[#2563EB] border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-2 md:mb-3">
                {product.category}
              </span>
              <h1 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[36px] font-bold text-[#0F172A] leading-[1.2] mb-3 break-words">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <div className={`flex items-center gap-1.5 text-sm font-semibold ${product.available !== false ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                  <span className={`w-2 h-2 rounded-full ${product.available !== false ? "bg-[#10B981]" : "bg-[#EF4444]"}`} />
                  {product.available !== false ? "В наявності" : "Немає в наявності"}
                </div>
                <span className="text-[#64748B] text-xs md:text-sm">Арт: {product.id}</span>
              </div>
            </div>

            {/* Price block */}
            <div className="bg-white rounded-2xl border border-slate-100 px-4 py-3.5 md:p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[28px] md:text-[36px] font-bold text-[#0F172A] leading-none">
                  {product.price.toFixed(0)}{" "}
                  <span className="text-base md:text-lg font-medium text-[#64748B]">грн</span>
                </p>
                <p className="text-[#64748B] text-xs mt-1.5 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-[#10B981] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Доставка Новою Поштою
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-100 rounded-xl px-3 py-2">
                  <span className="text-base">📦</span>
                  <span className="text-xs text-[#64748B] font-medium hidden sm:inline">Нова Пошта</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-slate-100 rounded-xl px-3 py-2">
                  <span className="text-base">🔄</span>
                  <span className="text-xs text-[#64748B] font-medium hidden sm:inline">14 днів</span>
                </div>
              </div>
            </div>

            {/* Actions (promo + quantity + buttons) */}
            <ProductActions product={product} />

          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 md:mt-14">
          <ProductTabs description={product.description} specs={specs} />
        </div>

      </div>
    </div>
  )
}
