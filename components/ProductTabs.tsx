"use client"

import { useState } from "react"

interface Props {
  description: string
  specs: { label: string; value: string }[]
}

const tabs = ["Опис", "Характеристики"] as const

export default function ProductTabs({ description, specs }: Props) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Опис")

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-slate-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-6 py-4 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px ${
              active === tab
                ? "border-[#2563EB] text-[#2563EB]"
                : "border-transparent text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6 md:p-8">
        {active === "Опис" && (
          <div className="text-[#64748B] text-base leading-[1.7] whitespace-pre-line break-words max-w-3xl">
            {description || "Опис відсутній."}
          </div>
        )}

        {active === "Характеристики" && (
          <div className="max-w-lg">
            {specs.length > 0 ? (
              <table className="w-full text-sm">
                <tbody>
                  {specs.map(({ label, value }) => (
                    <tr key={label} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 pr-6 text-[#64748B] font-medium w-1/3">{label}</td>
                      <td className="py-3 text-[#0F172A] font-medium break-words">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-[#64748B]">Характеристики відсутні.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
