import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white pt-14 pb-8 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-xl font-extrabold text-[#2563EB]">ТОП</span>
              <span className="text-xl font-bold text-white">чехол</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Ваш надійний партнер у виборі якісних аксесуарів для мобільних пристроїв.
            </p>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wide mb-4">Каталог</h3>
            <ul className="space-y-2.5 text-slate-400 text-sm">
              {[
                ["Чохли", "/catalog?category=%D0%A7%D0%BE%D1%85%D0%BB%D0%B8"],
                ["Захисне скло", "/catalog?category=%D0%97%D0%B0%D1%85%D0%B8%D1%81%D0%BD%D0%B5+%D1%81%D0%BA%D0%BB%D0%BE"],
                ["Кабелі та зарядки", "/catalog?category=%D0%9A%D0%B0%D0%B1%D0%B5%D0%BB%D1%96+%D1%82%D0%B0+%D0%BF%D0%B5%D1%80%D0%B5%D1%85%D1%96%D0%B4%D0%BD%D0%B8%D0%BA%D0%B8"],
                ["Power Bank", "/catalog?category=Power+Bank"],
                ["Аудіо", "/catalog?category=%D0%90%D1%83%D0%B4%D1%96%D0%BE"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wide mb-4">Клієнтам</h3>
            <ul className="space-y-2.5 text-slate-400 text-sm">
              {[
                ["Про нас", "/about"],
                ["Публічна оферта", "/offer"],
                ["Кошик", "/cart"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wide mb-4">Контакти</h3>
            <p className="text-slate-400 text-sm mb-3 leading-relaxed">Працюємо щодня<br />з 9:00 до 18:00</p>
            <a href="tel:+380000000000" className="text-lg font-bold hover:text-[#2563EB] transition-colors duration-200 block">
              +38 (000) 000-00-00
            </a>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} ТОП-чехол. Всі права захищені.</p>
          <p className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Доставка Новою Поштою по всій Україні
          </p>
        </div>
      </div>
    </footer>
  )
}
