import { getProducts, getCategories } from "@/lib/data"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"

export const revalidate = 3600

export default async function Home() {
  try {
    const products = await getProducts()
    const categories = await getCategories(products)

    return (
      <div>
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Магазин Аксессуаров
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Лучшие товары по лучшим ценам. Быстрая доставка по Україні
            </p>
            <Link 
              href="/catalog" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition"
            >
              Перейти в каталог →
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          {categories.length === 0 ? (
            <div className="text-center text-slate-500 py-12">
              Товари не знайдено
            </div>
          ) : (
            categories.map((cat: string) => {
              const catProducts = products
                .filter((p: any) => p.category === cat)
                .slice(0, 5)

              if (catProducts.length === 0) return null

              return (
                <div key={cat} className="mb-16">
                  <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold capitalize">
                      {cat || 'Інші товари'}
                    </h2>
                    <Link 
                      href={"/catalog?category=" + encodeURIComponent(cat)}
                      className="text-blue-600 hover:text-blue-700 font-medium transition"
                    >
                      Дивитись все →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {catProducts.map((product: any) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </section>

        <section className="bg-slate-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-bold mb-2">Швидка доставка</h3>
                <p className="text-slate-600">Новою Поштою по всій Україні</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">Якісні товари</h3>
                <p className="text-slate-600">Від перевірених постачальників</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-bold mb-2">Підтримка 24/7</h3>
                <p className="text-slate-600">Ми завжди готові допомогти</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Помилка завантаження даних
        </h1>
        <p className="text-slate-600">
          Перевірте URL XML фіду та підключення до інтернету
        </p>
      </div>
    )
  }
}