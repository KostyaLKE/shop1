import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">🔥 ТОП-чехол</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ваш надійний партнер у виборі якісних аксесуарів для мобільних пристроїв.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6">Каталог</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link href="/catalog?category=Чохли" className="hover:text-white transition">Чохли</Link></li>
              <li><Link href="/catalog?category=Захисне%20скло" className="hover:text-white transition">Захисне скло</Link></li>
              <li><Link href="/catalog?category=Кабелі" className="hover:text-white transition">Кабелі та зарядки</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6">Клієнтам</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition">Про нас</Link></li>
              <li><Link href="/offer" className="hover:text-white transition">Публічна оферта</Link></li>
              <li><Link href="/cart" className="hover:text-white transition">Кошик</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6">Контакти</h3>
            <p className="text-slate-400 text-sm mb-4">
              Ми працюємо щодня з 9:00 до 18:00
            </p>
            <a href="tel:+380000000000" className="block text-xl font-bold hover:text-blue-400 transition">+38 (000) 000-00-00</a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ТОП-чехол. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  )
}