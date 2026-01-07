import { getProducts, getCategories } from "@/lib/data"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await getProducts()
  const categories = await getCategories(products)

  return (
    <div>
      {/* Hero Block */}
      <section className="bg-slate-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
            Нова колекція 2024
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Твій телефон заслуговує <br className="hidden md:block"/>на кращий захист
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Величезний вибір чохлів, скла та аксесуарів за найвигіднішими цінами в Україні. Швидка доставка Новою Поштою.
          </p>
          <Link 
            href="/catalog" 
            className="inline-block bg-white text-slate-900 hover:bg-blue-50 font-bold px-10 py-4 rounded-xl transition shadow-lg shadow-slate-900/20"
          >
            Перейти в каталог
          </Link>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Популярні категорії</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        {categories.map((cat: string) => {
          const catProducts = products
            .filter((p: any) => p.category === cat)
            .slice(0, 4) // Показываем по 4 товара

          if (catProducts.length === 0) return null

          return (
            <div key={cat} className="mb-20">
              <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-bold capitalize text-slate-800">
                  {cat}
                </h2>
                <Link 
                  href={"/catalog?category=" + encodeURIComponent(cat)}
                  className="text-blue-600 hover:text-blue-800 font-bold text-sm transition flex items-center gap-1"
                >
                  Дивитись всі →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {catProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Швидка відправка</h3>
              <p className="text-slate-500">Відправляємо замовлення в день оформлення</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold mb-2">Перевірена якість</h3>
              <p className="text-slate-500">Тільки оригінальні та якісні аксесуари</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Гарантія обміну</h3>
              <p className="text-slate-500">Повернення та обмін протягом 14 днів</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}