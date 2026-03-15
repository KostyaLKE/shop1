"use client"

import { useState } from "react"

export default function ProductGallery({ images }: { images: string[] }) {
  const [selected, setSelected] = useState(images[0])

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="bg-white rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden" style={{ minHeight: 360 }}>
        <img
          src={selected}
          alt="Product"
          className="w-full h-auto max-h-[500px] object-contain p-6 transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(img)}
              className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 border-2 rounded-xl overflow-hidden transition-all duration-200 ${
                selected === img
                  ? "border-[#2563EB] shadow-md shadow-blue-100"
                  : "border-transparent hover:border-slate-300"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
