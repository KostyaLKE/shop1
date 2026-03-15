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
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 py-6 md:py-10">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-6 flex-wrap">
          <Link href="/" className="hover:text-[#2563EB] transition-colors duration-200">Головна</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-[#2563EB] transition-colors duration-200">Каталог</Link>
          <span>/</span>
          <Link
            href={catalogHref(product.category)}
            className="hover:text-[#2563EB] transition-colors duration-200"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#0F172A] font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">

          {/* Gallery */}
          <ProductGallery images={product.images} />

          {/* Info */}
          <div className="space-y-6">

            {/* Category badge + title */}
            <div>
              <span className="inline-block bg-blue-50 text-[#2563EB] border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
                {product.category}
              </span>
              <h1 className="text-[24px] md:text-[32px] lg:text-[36px] font-bold text-[#0F172A] leading-[1.2] mb-4 break-words">
                {product.name}
              </h1>

              {/* Stock + SKU */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className={`flex items-center gap-1.5 text-sm font-semibold ${product.available !== false ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                  <span className={`w-2 h-2 rounded-full ${product.available !== false ? "bg-[#10B981]" : "bg-[#EF4444]"}`} />
                  {product.available !== false ? "В наявності" : "Немає в наявності"}
                </div>
                <span className="text-[#64748B] text-sm">Арт: {product.id}</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <p className="text-[32px] md:text-[40px] font-bold text-[#0F172A] leading-none mb-1">
                {product.price.toFixed(0)} <span className="text-lg font-medium text-[#64748B]">грн</span>
              </p>
              <p className="text-[#64748B] text-sm mt-2 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Доставка Новою Поштою по всій Україні
              </p>
            </div>

            {/* Actions */}
            <ProductActions product={product} />

            {/* Delivery info */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "📦", text: "Нова Пошта" },
                { icon: "🔄", text: "Обмін 14 днів" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-3 py-2.5">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-[#64748B] font-medium">{item.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Tabs: Description + Specs */}
        <div className="mt-10 md:mt-14">
          <ProductTabs description={product.description} specs={specs} />
        </div>

      </div>
    </div>
  )
}
