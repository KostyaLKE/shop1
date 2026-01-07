"use client"

import { useCart } from "@/context/CartContext"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    alert(`"${product.name}" додано до корзини!`)
  }

  return (
    <div className="group border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 bg-white flex flex-col h-full">
      <div className="relative h-40 w-full bg-slate-50 overflow-hidden">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-contain p-3 group-hover:scale-110 transition duration-300"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png"
          }}
        />
      </div>

      <div className="p-3 flex-grow flex flex-col justify-between">
        <h3 className="text-sm font-medium text-slate-900 line-clamp-2 mb-2 min-h-10">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-xs text-slate-500 line-clamp-1 mb-2">
            {product.description}
          </p>
        )}

        {product.vendor && (
          <p className="text-xs text-slate-400 mb-3">
            {product.vendor}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <span className="text-lg font-bold text-slate-900">
            {product.price.toFixed(2)} грн
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white w-9 h-9 rounded-full flex items-center justify-center transition font-bold text-lg"
            title="Додати до корзини"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}