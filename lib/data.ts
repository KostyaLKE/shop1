import { XMLParser } from "fast-xml-parser"

const XML_URL = process.env.NEXT_PUBLIC_XML_URL || ""

export async function getProducts() {
  if (!XML_URL) {
    throw new Error("XML_URL is not configured")
  }

  try {
    // ВАЖНО: cache: 'no-store' исправляет ошибку "items over 2MB can not be cached".
    // Мы говорим Next.js не пытаться сохранить этот огромный файл в кэш.
    const res = await fetch(XML_URL, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch XML: ${res.status}`)
    }

    const xmlData = await res.text()

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
    })

    const jsonObj = parser.parse(xmlData)

    // Проверяем структуру данных (в зависимости от XML она может немного отличаться)
    const rawItems = jsonObj?.catalog?.products?.product || []

    // Гарантируем, что это массив, даже если товар всего один
    const itemsArray = Array.isArray(rawItems) ? rawItems : [rawItems]

    const products = itemsArray
      .filter((item: any) => item && item.id)
      .map((item: any) => ({
        id: String(item.id),
        name: item.name || "Товар без назви",
        price: parseFloat(item.price) || 0,
        category: item.category_name || "Інші",
        image: item.picture_url || "/placeholder.png",
        description: item.description || "",
        vendor: item.vendor || "",
      }))

    return products
  } catch (error) {
    console.error("Error fetching/parsing XML:", error)
    // В случае ошибки возвращаем пустой массив, чтобы сайт не падал целиком
    return []
  }
}

export async function getCategories(products: any[]) {
  const uniqueCategories = [...new Set(products.map((p) => p.category))].filter(Boolean)
  return uniqueCategories
}

export async function getProductById(id: string) {
  const products = await getProducts()
  return products.find((p) => p.id === id)
}

export async function getProductsByCategory(category: string) {
  const products = await getProducts()
  return products.filter((p) => p.category === category)
}