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
      className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-base hover:bg-black transition active:scale-95 shadow-lg shadow-slate-200"
    >
      Купити
    </button>
  )
}