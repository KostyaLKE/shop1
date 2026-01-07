"use client"
import { useCart } from "@/context/CartContext"
import Link from "next/link"

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart()

  return (
    <div className="group border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 bg-white flex flex-col h-full">
      {/* Ссылка на карточку товара вокруг картинки и названия */}
      <Link href={`/product/${encodeURIComponent(product.id)}`} className="block relative h-48 w-full bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-300"
        />
      </Link>

      <div className="p-4 flex-grow flex flex-col justify-between">
        <Link href={`/product/${encodeURIComponent(product.id)}`}>
            <h3 className="text-sm font-medium text-slate-900 line-clamp-2 mb-2 hover:text-blue-600 transition">
            {product.name}
            </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg font-bold text-slate-900">
            {product.price.toFixed(2)} грн
          </span>
          <button
            onClick={(e) => {
                e.stopPropagation(); // Чтобы клик не открывал страницу товара
                addToCart(product);
            }}
            className="bg-slate-900 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}