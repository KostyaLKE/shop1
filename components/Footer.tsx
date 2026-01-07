export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Про магазин</h3>
            <p className="text-slate-400 text-sm">
              NCASE Shop — ваш надійний партнер у виборі якісних аксесуарів
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Категорії</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="/catalog" className="hover:text-white transition">Каталог</a></li>
              <li><a href="/catalog" className="hover:text-white transition">Нові товари</a></li>
              <li><a href="/catalog" className="hover:text-white transition">Популярні</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Допомога</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Доставка</a></li>
              <li><a href="#" className="hover:text-white transition">Контакти</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Контакти</h3>
            <p className="text-slate-400 text-sm mb-2">
              📧 support@ncase.shop<br/>
              📞 +38 (0__) ___-__-__<br/>
              🕐 Пн-Пт: 9:00 - 18:00
            </p>
          </div>
        </div>

        <hr className="border-slate-700 my-8" />

        <div className="text-center text-slate-400 text-sm">
          <p>&copy; 2024 NCASE Shop. Усі права захищені.</p>
          <p className="mt-2">Розроблено з ❤️ на Next.js + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}