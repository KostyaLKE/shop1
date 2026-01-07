"use client"
import { useCart } from "@/context/CartContext"

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart()

  return (
    <button 
      onClick={() => {
        addToCart(product);
        alert("Товар додано в кошик!");
      }}
      className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition active:scale-95"
    >
      Купити
    </button>
  )
}