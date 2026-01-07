import { getProductById, getProducts } from "@/lib/data"
import Link from "next/link"
import { notFound } from "next/navigation"
import AddToCartButton from "@/components/AddToCartButton" // Создадим ниже

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Декодируем ID, так как он может содержать спецсимволы
  const id = decodeURIComponent(params.id)
  const product = await getProductById(id)

  if (!product) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/catalog" className="text-slate-500 hover:text-black mb-8 block">
        ← Повернутися в каталог
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Фото */}
        <div className="bg-slate-50 rounded-2xl p-8 flex items-center justify-center h-[400px] md:h-[500px]">
           <img 
             src={product.image} 
             alt={product.name}
             className="max-h-full max-w-full object-contain" 
           />
        </div>

        {/* Информация */}
        <div>
           <div className="text-sm text-blue-600 font-bold mb-2 uppercase tracking-wider">
             {product.category}
           </div>
           <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
             {product.name}
           </h1>
           <div className="text-3xl font-bold text-slate-900 mb-8">
             {product.price} грн
           </div>

           <div className="bg-slate-50 p-6 rounded-xl mb-8">
              <div className="flex items-center justify-between mb-4">
                 <span className="text-green-600 font-medium">✓ В наявності</span>
                 <span className="text-slate-500">Код: {product.id}</span>
              </div>
              {/* Клиентская кнопка добавления в корзину */}
              <AddToCartButton product={product} />
           </div>

           {/* Характеристики */}
           <div className="mb-8">
             <h3 className="font-bold text-lg mb-4 border-b pb-2">Характеристики</h3>
             <div className="grid grid-cols-2 gap-y-2 text-sm">
                {product.vendor && (
                    <>
                        <div className="text-slate-500">Бренд:</div>
                        <div>{product.vendor}</div>
                    </>
                )}
                {product.compat && (
                    <>
                        <div className="text-slate-500">Сумісність:</div>
                        <div>{product.compat}</div>
                    </>
                )}
                {product.material && (
                    <>
                        <div className="text-slate-500">Матеріал:</div>
                        <div>{product.material}</div>
                    </>
                )}
             </div>
           </div>

           {/* Описание */}
           <div>
             <h3 className="font-bold text-lg mb-4 border-b pb-2">Опис</h3>
             <div className="prose text-slate-600 leading-relaxed">
               {product.description || "Опис відсутній для цього товару."}
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}