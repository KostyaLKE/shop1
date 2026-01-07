"use client"
import { useState } from "react"

export default function ProductGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="space-y-4">
      {/* Главное фото - показываем полностью (object-contain) но даем высоту */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-center min-h-[400px]">
        <img 
          src={selectedImage} 
          alt="Product" 
          className="w-full h-auto max-h-[600px] object-contain mx-auto"
        />
      </div>

      {/* Миниатюры */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative w-20 h-20 shrink-0 border-2 rounded-lg overflow-hidden transition ${
                selectedImage === img ? "border-slate-900" : "border-transparent hover:border-slate-300"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}