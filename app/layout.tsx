import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CartProvider } from "@/context/CartContext"
import { Toaster } from "react-hot-toast" // Імпорт

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: 'ТОП-чехол - Аксесуари для телефонів',
  description: 'Найкращі чохли та скло в Україні',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-white">
              {children}
            </main>
            <Footer />
          </div>
          {/* Додаємо компонент для сповіщень */}
          <Toaster 
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  )
}