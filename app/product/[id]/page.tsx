import { getProductById } from "@/lib/data"
import Link from "next/link"
import { notFound } from "next/navigation"
import ProductActions from "@/components/ProductActions"
import ProductGallery from "@/components/ProductGallery"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id)
  const product = await getProductById(id)

  if (!product) return notFound()

  return (
    // ИСПРАВЛЕНИЕ: overflow-x-hidden вместо overflow-hidden, чтобы работал скролл вниз
    <div className="container mx-auto px-4 py-6 md:py-12 overflow-x-hidden">
      <div className="mb-4 md:mb-6">
        <Link href="/catalog" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition font-medium text-sm">
          ← Назад у каталог
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div>
           <ProductGallery images={product.images} />
        </div>

        <div className="space-y-6 md:space-y-8 min-w-0">
           <div>
             <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
               {product.category}
             </span>
             <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-snug mb-3 break-words">
               {product.name}
             </h1>
             <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <span className="text-2xl md:text-3xl font-bold text-slate-900">{product.price} грн</span>
                {product.vendor && (
                    <span className="text-slate-400 font-medium text-sm md:text-base">| {product.vendor}</span>
                )}
             </div>
           </div>

           <div className="bg-white md:bg-slate-50 p-0 md:p-6 rounded-2xl md:border border-slate-100">
              <div className="flex items-center justify-between mb-4 md:mb-6 bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-lg">
                 <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    В наявності
                 </div>
                 <div className="text-slate-400 text-sm">Код: {product.id}</div>
              </div>
              
              <ProductActions product={product} />
           </div>

           {(product.compat || product.material) && (
             <div>
               <h3 className="font-bold text-lg mb-3 text-slate-900">Характеристики</h3>
               <div className="grid grid-cols-1 gap-2 text-sm">
                  {product.compat && (
                      <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-500">Сумісність</span>
                          <span className="font-medium text-slate-900 text-right w-1/2 break-words">{product.compat}</span>
                      </div>
                  )}
                  {product.material && (
                      <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-500">Матеріал</span>
                          <span className="font-medium text-slate-900 text-right w-1/2 break-words">{product.material}</span>
                      </div>
                  )}
               </div>
             </div>
           )}

           <div>
             <h3 className="font-bold text-lg mb-3 text-slate-900">Опис</h3>
             <div className="prose prose-slate prose-sm text-slate-600 leading-relaxed whitespace-pre-line break-words max-w-none">
               {product.description || "Опис відсутній."}
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}