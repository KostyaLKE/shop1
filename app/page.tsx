import { getProducts, getCategories } from "@/lib/data"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"

export const dynamic = 'force-dynamic'

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

export default async function Home() {
  const products = await getProducts()
  const categories = await getCategories(products)

  return (
    <div className="bg-[#F8FAFC]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] text-white py-16 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-20 w-80 h-80 bg-[#2563EB] opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/40 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-6">
            Нова колекція 2026
          </span>
          <h1 className="text-[28px] md:text-[48px] lg:text-[56px] font-bold mb-5 leading-[1.2] tracking-tight">
            Твій телефон заслуговує<br className="hidden md:block" /> на кращий захист
          </h1>
          <p className="text-slate-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-[1.6]">
            Величезний вибір чохлів, скла та аксесуарів.<br className="hidden md:block" /> Швидка доставка Новою Поштою по всій Україні.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/40 active:scale-95 btn-ripple"
            >
              Перейти в каталог
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Category tiles */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-[22px] md:text-[28px] font-semibold text-[#0F172A] mb-2">Популярні категорії</h2>
          <div className="w-12 h-1 bg-[#2563EB] mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
          {categories.map((cat: string) => (
            <Link
              key={cat}
              href={`/catalog?category=${encodeURIComponent(cat)}`}
              className="group bg-white hover:bg-[#2563EB] border border-slate-100 hover:border-[#2563EB] rounded-2xl p-3 md:p-4 flex flex-col items-center gap-2 text-center transition-all duration-200 hover:shadow-lg hover:shadow-blue-100 active:scale-95"
            >
              <span className="text-2xl md:text-3xl">{categoryIcons[cat] || "📦"}</span>
              <span className="text-[11px] md:text-xs font-medium text-[#64748B] group-hover:text-white line-clamp-2 leading-snug transition-colors duration-200">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Products by category */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 pb-16">
        {categories.map((cat: string) => {
          const catProducts = products.filter((p: any) => p.category === cat).slice(0, 4)
          if (catProducts.length === 0) return null
          return (
            <div key={cat} className="mb-12">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-[18px] md:text-[22px] font-semibold text-[#0F172A] flex items-center gap-2">
                  <span>{categoryIcons[cat] || "📦"}</span>
                  {cat}
                </h2>
                <Link
                  href={`/catalog?category=${encodeURIComponent(cat)}`}
                  className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold text-sm transition-colors duration-200 flex items-center gap-1"
                >
                  Всі товари
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                {catProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* Features */}
      <section className="bg-white border-t border-slate-100 py-14">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "🚀", title: "Швидка відправка", text: "Відправляємо в день замовлення Новою Поштою" },
              { icon: "💎", title: "Перевірена якість", text: "Тільки оригінальні сертифіковані аксесуари" },
              { icon: "🛡️", title: "Гарантія обміну", text: "Повернення або обмін протягом 14 днів" },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4 bg-[#F8FAFC] rounded-2xl p-5 md:p-6 border border-slate-100">
                <div className="text-3xl shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-[#0F172A] mb-1">{f.title}</h3>
                  <p className="text-[#64748B] text-sm leading-[1.5]">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
