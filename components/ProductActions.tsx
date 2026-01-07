"use client"
import { useState } from "react"
import { useCart } from "@/context/CartContext"
import toast from "react-hot-toast"

export default function ProductActions({ product }: { product: any }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(q => q - 1)
  }

  const handleIncrease = () => {
    setQuantity(q => q + 1)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    // Красиве повідомлення замість alert
    toast.success(`Додано: ${product.name} (${quantity} шт.)`)
  }

  // Загальна сума за обрану кількість
  const totalAmount = (product.price * quantity).toFixed(2)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        {/* Вибір кількості */}
        <div className="flex items-center border border-slate-300 rounded-lg">
          <button 
            onClick={handleDecrease}
            className="w-12 h-12 flex items-center justify-center text-xl hover:bg-slate-100 rounded-l-lg transition"
          >
            -
          </button>
          <div className="w-12 h-12 flex items-center justify-center font-bold text-lg border-x border-slate-300">
            {quantity}
          </div>
          <button 
            onClick={handleIncrease}
            className="w-12 h-12 flex items-center justify-center text-xl hover:bg-slate-100 rounded-r-lg transition"
          >
            +
          </button>
        </div>

        {/* Сума */}
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 uppercase font-bold">Сума</span>
          <span className="text-2xl font-bold text-slate-900">{totalAmount} грн</span>
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-black transition active:scale-95 shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
      >
        <span>🛒</span>
        Купити
      </button>
    </div>
  )
}