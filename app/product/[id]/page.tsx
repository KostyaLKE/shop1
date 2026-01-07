import { getProductById } from "@/lib/data"
import Link from "next/link"
import { notFound } from "next/navigation"
import ProductActions from "@/components/ProductActions" // Новий імпорт
import ProductGallery from "@/components/ProductGallery"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id)
  const product = await getProductById(id)

  if (!product) return notFound()

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 overflow-hidden">
      <div className="mb-6">
        <Link href="/catalog" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition font-medium">
          ← Назад у каталог
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
        <div>
           <ProductGallery images={product.images} />
        </div>

        <div className="space-y-8 min-w-0">
           <div>
             <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
               {product.category}
             </span>
             <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4 break-words">
               {product.name}
             </h1>
             <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-slate-900">{product.price} грн</span>
                {product.vendor && (
                    <span className="text-slate-400 font-medium">| {product.vendor}</span>
                )}
             </div>
           </div>

           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    В наявності
                 </div>
                 <div className="text-slate-400 text-sm">Артикул: {product.id}</div>
              </div>
              
              {/* Тут тепер ProductActions замість AddToCartButton */}
              <ProductActions product={product} />
           </div>

           {(product.compat || product.material) && (
             <div>
               <h3 className="font-bold text-lg mb-4 text-slate-900">Характеристики</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {product.compat && (
                      <div className="bg-white p-3 rounded-lg border border-slate-100">
                          <span className="block text-slate-400 text-xs mb-1">Сумісність</span>
                          <span className="font-medium text-slate-700 break-words">{product.compat}</span>
                      </div>
                  )}
                  {product.material && (
                      <div className="bg-white p-3 rounded-lg border border-slate-100">
                          <span className="block text-slate-400 text-xs mb-1">Матеріал</span>
                          <span className="font-medium text-slate-700 break-words">{product.material}</span>
                      </div>
                  )}
               </div>
             </div>
           )}

           <div>
             <h3 className="font-bold text-lg mb-4 text-slate-900">Опис товару</h3>
             <div className="prose prose-slate text-slate-600 leading-relaxed whitespace-pre-line break-words">
               {product.description || "Опис відсутній."}
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}